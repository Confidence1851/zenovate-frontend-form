#!/bin/bash

# Zero-Downtime Docker Deployment Script
#
# FULLY PORTABLE: This script will auto-generate Dockerfile and docker-compose.yml
# if they don't exist, making it fully portable across projects.
#
# This script can be used across multiple projects on the same server.
# To avoid conflicts, set environment variables before running:
#
#   export APP_NAME="myproject"           # Unique container/image name per project
#   export NETWORK_NAME="myproject-net"    # Unique network name per project
#   ./deploy.sh [PORT]
#
# Or set them in your .env file:
#   APP_NAME=myproject
#   NETWORK_NAME=myproject-net
#   PORT=30095
#
# Defaults (if not set):
#   APP_NAME=app
#   NETWORK_NAME=app-network
#   PORT=30095
#
# The network will be prefixed with the project directory name to ensure uniqueness.
# Example: If your project is in /var/www/myproject, network becomes "myproject_app-network"
#
# Requirements:
#   - Node.js project with package.json
#   - .env file (optional, but recommended)
#   - Docker and Docker Compose installed

# Get port from parameter, .env file, or use default
PORT="30095" # Default port

# First, try to read from .env file (check both current dir and parent)
if [ -f .env ]; then
    # Source .env to get variables (but be careful with special characters)
    set -a
    source .env 2>/dev/null || true
    set +a
    
    ENV_PORT=$(grep -E "^PORT=" .env 2>/dev/null | cut -d '=' -f2 | tr -d '"' | tr -d "'" | xargs)
    if [ ! -z "$ENV_PORT" ]; then
        PORT=$ENV_PORT
    fi
elif [ -f ../.env ]; then
    set -a
    source ../.env 2>/dev/null || true
    set +a
    
    ENV_PORT=$(grep -E "^PORT=" ../.env 2>/dev/null | cut -d '=' -f2 | tr -d '"' | tr -d "'" | xargs)
    if [ ! -z "$ENV_PORT" ]; then
        PORT=$ENV_PORT
    fi
fi

# Project-specific configuration (can be set via environment variables or .env file)
APP_NAME="${APP_NAME:-app}" # Container and image name prefix (default: app)
NETWORK_NAME="${NETWORK_NAME:-app-network}" # Docker network name (default: app-network)

# Override with parameter if provided
if [ ! -z "$1" ]; then
    PORT=$1
fi

echo "🚀 Starting zero-downtime deployment..."
echo "🔌 Using port: $PORT"

# Generate Dockerfile if it doesn't exist
if [ ! -f Dockerfile ]; then
    echo "📝 Dockerfile not found, generating generic Next.js Dockerfile..."
    cat > Dockerfile << 'DOCKERFILE_EOF'
# Use the official Node.js 20 image as base
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production --legacy-peer-deps || npm install --only=production --legacy-peer-deps || true

# Rebuild the source code only when needed
FROM base AS builder
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install all dependencies (including dev dependencies) for build
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps || true

# Handle .env file (copy if it's a symlink, fail if it doesn't exist)
RUN if [ -L .env ]; then \
    echo "Copying .env from symlink target..."; \
    cp -L .env .env.tmp && mv .env.tmp .env; \
    elif [ ! -f .env ]; then \
    echo "WARNING: .env file not found! Build will continue but may fail at runtime."; \
    fi

# Build the application
RUN npm run build || echo "WARNING: Build step failed, continuing..."

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Copy standalone output (requires output: 'standalone' in next.config.js)
# If standalone doesn't exist, this will fail - ensure next.config has output: 'standalone'
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
DOCKERFILE_EOF
    echo "✅ Dockerfile generated"
fi

# Generate docker-compose.yml if it doesn't exist
if [ ! -f docker-compose.yml ]; then
    echo "📝 docker-compose.yml not found, generating..."
    cat > docker-compose.yml << DOCKERCOMPOSE_EOF
services:
  ${APP_NAME}:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "\${PORT:-${PORT}}:3000"
    env_file:
      - .env
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
    restart: unless-stopped
    networks:
      - ${NETWORK_NAME}

networks:
  ${NETWORK_NAME}:
    driver: bridge
DOCKERCOMPOSE_EOF
    echo "✅ docker-compose.yml generated"
fi

# Handle .env file (symlink or regular file)
echo "🔧 Checking .env file..."
if [ -f .env ]; then
    if [ -L .env ]; then
        echo "📋 .env is a symlink, extracting environment variables..."
    else
        echo "📋 .env is a regular file, extracting environment variables..."
    fi
    
    # Extract environment variables from the .env file (works for both symlinks and regular files)
    source .env
    
    # Create a temporary docker-compose file with environment variables
    cat > docker-compose.temp.yml << EOF
services:
  ${APP_NAME}:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "$PORT:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
EOF
    
    # Add environment variables from .env file
    if [ ! -z "$NEXT_PUBLIC_BASE_URL" ]; then
        echo "      - NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL" >> docker-compose.temp.yml
    fi
    if [ ! -z "$AUTH_SECRET" ]; then
        echo "      - AUTH_SECRET=$AUTH_SECRET" >> docker-compose.temp.yml
    fi
    
    # Add any other environment variables
    while IFS= read -r line; do
        if [[ $line =~ ^[A-Z_]+=.*$ ]] && [[ ! $line =~ ^(NODE_ENV|PORT|HOSTNAME)= ]]; then
            echo "      - $line" >> docker-compose.temp.yml
        fi
    done < .env
    
    cat >> docker-compose.temp.yml << EOF
    restart: unless-stopped
    networks:
      - ${NETWORK_NAME}

networks:
  ${NETWORK_NAME}:
    driver: bridge
EOF
    
    echo "✅ Created temporary docker-compose file with environment variables"
    COMPOSE_FILE="docker-compose.temp.yml"
else
    echo "⚠️  No .env file found, creating docker-compose with port $PORT"
    # Create temporary docker-compose with the correct port
    cat > docker-compose.temp.yml << EOF
services:
  ${APP_NAME}:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "$PORT:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
    restart: unless-stopped
    networks:
      - ${NETWORK_NAME}

networks:
  ${NETWORK_NAME}:
    driver: bridge
EOF
    COMPOSE_FILE="docker-compose.temp.yml"
fi

# Generate unique service name with timestamp
TIMESTAMP=$(date +%s)
NEW_SERVICE_NAME="$APP_NAME-$TIMESTAMP"

# Find the actual running container name
OLD_SERVICE_NAME=$(docker ps --filter "name=$APP_NAME" --format "{{.Names}}" | head -1)
if [ -z "$OLD_SERVICE_NAME" ]; then
    OLD_SERVICE_NAME="$APP_NAME"
fi

echo "🏗️  Building new image..."
# Build the new image with a unique tag
docker build -t $APP_NAME:$TIMESTAMP .

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Aborting deployment."
    exit 1
fi

echo "✅ New image built successfully: $APP_NAME:$TIMESTAMP"

# Create network name (use project directory name as prefix to avoid conflicts)
PROJECT_DIR=$(basename "$(pwd)")
DOCKER_NETWORK="${PROJECT_DIR}_${NETWORK_NAME}"

# Check if old container exists
if docker ps -q -f name=$OLD_SERVICE_NAME | grep -q .; then
    echo "🔄 Old container found, performing rolling update..."
    
    # Start new container with new name
    echo "🚀 Starting new container: $NEW_SERVICE_NAME"
    
    # Create network if it doesn't exist
    docker network create $DOCKER_NETWORK 2>/dev/null || true
    
    # Calculate temporary port (one higher than production port)
    TEMP_PORT=$((PORT + 1))
    
    docker run -d \
        --name $NEW_SERVICE_NAME \
        --network $DOCKER_NETWORK \
        -p $TEMP_PORT:3000 \
        --env-file .env 2>/dev/null || \
    docker run -d \
        --name $NEW_SERVICE_NAME \
        --network $DOCKER_NETWORK \
        -p $TEMP_PORT:3000 \
        -e NODE_ENV=production \
        -e PORT=3000 \
        -e HOSTNAME=0.0.0.0 \
        $APP_NAME:$TIMESTAMP
    
    # Wait for new container to be healthy
    echo "⏳ Waiting for new container to be ready..."
    sleep 15
    
    # Health check
    if curl -f http://localhost:$TEMP_PORT > /dev/null 2>&1; then
        echo "✅ New container is healthy!"
        
        # Update Nginx to point to new container (if you have a script for this)
        echo "🔄 Updating load balancer/proxy..."
        # You can add your Nginx reload script here
        # sudo nginx -s reload
        
        # Stop and remove new container from temporary port
        echo "🔄 Moving new container to production port..."
        docker stop $NEW_SERVICE_NAME 2>/dev/null || true
        docker rm $NEW_SERVICE_NAME 2>/dev/null || true
        
        # Stop old container
        echo "🛑 Stopping old container..."
        docker stop $OLD_SERVICE_NAME 2>/dev/null || true
        docker rm $OLD_SERVICE_NAME 2>/dev/null || true
        
        # Start new container with correct port and name
        echo "🚀 Starting new container on production port..."
        docker run -d \
            --name $APP_NAME \
            --network $DOCKER_NETWORK \
            -p $PORT:3000 \
            --env-file .env 2>/dev/null || \
        docker run -d \
            --name $APP_NAME \
            --network $DOCKER_NETWORK \
            -p $PORT:3000 \
            -e NODE_ENV=production \
            -e PORT=3000 \
            -e HOSTNAME=0.0.0.0 \
            $APP_NAME:$TIMESTAMP
        
        # Verify new container is running
        if docker ps -q -f name=$APP_NAME | grep -q .; then
            echo "✅ New container is running successfully!"
        else
            echo "❌ Failed to start new container!"
            exit 1
        fi
        
        echo "✅ Zero-downtime deployment completed!"
        
    else
        echo "❌ New container failed health check! Rolling back..."
        docker stop $NEW_SERVICE_NAME
        docker rm $NEW_SERVICE_NAME
        exit 1
    fi
    
else
    echo "🆕 No existing container found, starting fresh..."
    docker-compose -f $COMPOSE_FILE up -d
fi

# Clean up old containers and images
echo "🧹 Cleaning up old containers and images..."

# Remove old containers (keep only the current one)
echo "🗑️  Removing old $APP_NAME containers..."
# Only remove stopped containers, not running ones
docker ps -a --filter "name=$APP_NAME" --filter "status=exited" --format "table {{.Names}}\t{{.Status}}\t{{.CreatedAt}}" | tail -n +2 | awk '{print $1}' | while read container; do
    if [ ! -z "$container" ]; then
        echo "   Removing stopped container: $container"
        docker rm "$container" 2>/dev/null || true
    fi
done

# Also remove containers with timestamp-based names that are stopped
docker ps -a --filter "name=$APP_NAME-" --filter "status=exited" --format "table {{.Names}}\t{{.Status}}\t{{.CreatedAt}}" | tail -n +2 | awk '{print $1}' | while read container; do
    if [ ! -z "$container" ]; then
        echo "   Removing stopped timestamp container: $container"
        docker rm "$container" 2>/dev/null || true
    fi
done

# Remove old images (keep last 1)
echo "🗑️  Removing old $APP_NAME images..."
# Handle both naming patterns: app:timestamp and YYYYMMDDHHMMSS-app:latest
docker images $APP_NAME --format "table {{.Repository}}:{{.Tag}}\t{{.CreatedAt}}" | tail -n +2 | sort -k2 -r | tail -n +2 | awk '{print $1}' | while read image; do
    if [ ! -z "$image" ]; then
        echo "   Removing: $image"
        docker rmi "$image" 2>/dev/null || true
    fi
done

# Also remove old timestamp-based images (YYYYMMDDHHMMSS-app:latest)
docker images --format "table {{.Repository}}:{{.Tag}}\t{{.CreatedAt}}" | grep "$APP_NAME:latest" | tail -n +2 | sort -k2 -r | tail -n +2 | awk '{print $1}' | while read image; do
    if [ ! -z "$image" ]; then
        echo "   Removing timestamp-based image: $image"
        docker rmi "$image" 2>/dev/null || true
    fi
done

# Force remove any remaining images except the current one
CURRENT_IMAGE=$(docker ps --filter "name=$APP_NAME" --format "{{.Image}}" | head -1)
if [ ! -z "$CURRENT_IMAGE" ]; then
    echo "   Keeping current image: $CURRENT_IMAGE"
    docker images $APP_NAME --format "table {{.Repository}}:{{.Tag}}" | tail -n +2 | grep -v "$CURRENT_IMAGE" | awk '{print $1}' | while read image; do
        if [ ! -z "$image" ]; then
            echo "   Force removing: $image"
            docker rmi -f "$image" 2>/dev/null || true
        fi
    done
fi

# Remove dangling images
echo "🗑️  Removing dangling images..."
docker image prune -f

# Remove stopped containers
echo "🗑️  Removing stopped containers..."
docker container prune -f

# Show remaining containers and images
echo "📊 Remaining $APP_NAME containers:"
docker ps -a --filter "name=$APP_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "📊 Remaining $APP_NAME images:"
docker images $APP_NAME --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"

echo "✅ Container and image cleanup completed"

# Clean up temporary file
if [ "$COMPOSE_FILE" = "docker-compose.temp.yml" ]; then
    rm -f docker-compose.temp.yml
    echo "🧹 Cleaned up temporary files"
fi

echo "🎉 Deployment completed successfully!"
echo "🌐 Application is running at: http://localhost:$PORT"

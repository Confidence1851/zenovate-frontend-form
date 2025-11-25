module.exports = {
    apps: [
      {
        name: "zenovate-form", // Change this to your app name
        script: "next",
        args: "start",
        env: {
          PORT: 3016,
          NODE_ENV: "production"
        },
        env_development: {
          PORT: 3016,
          NODE_ENV: "development"
        }
      }
    ]
  };
  
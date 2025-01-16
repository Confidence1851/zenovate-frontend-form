[ ] can't start application (prod)
[ ] product image on 3/13
[ ] edit UI on price selection 4/13
[ ] edit UI checkout
[ ] fix counter after stripe payment
[ ] edit dashboard user
[ ] deploy testing
[ ] button colors after brand change
[ ] active errors on loading

    error 1
        Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
            at input
            at _c (webpack-internal:///(app-pages-browser)/./src/components/ui/input.tsx:13:11)
            at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-slot/dist/index.mjs:34:11)
            at eval (webpack-internal:///(app-pages-browser)/./node_modules/@radix-ui/react-slot/dist/index.mjs:15:11)
            at eval (webpack-internal:///(app-pages-browser)/./src/components/ui/form.tsx:124:14)
            at div
            at div
            at eval (webpack-internal:///(app-pages-browser)/./src/components/ui/form.tsx:74:11)
            at Controller (webpack-internal:///(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs:568:37)
            at FormField (webpack-internal:///(app-pages-browser)/./src/components/ui/form.tsx:29:14)
            at FormInputText (webpack-internal:///(app-pages-browser)/./src/components/common/FormInputText.tsx:26:11)
            at div
            at FormWrapper (webpack-internal:///(app-pages-browser)/./src/components/forms/FormWrapper.tsx:5:11)
            at ProfileStep (webpack-internal:///(app-pages-browser)/./src/components/forms/ProfileStep.tsx:19:11)
            at form
            at FormProvider (webpack-internal:///(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs:212:13)
            at div
            at FormPage (webpack-internal:///(app-pages-browser)/./src/app/(form)/[sessionId]/page.tsx:62:83)
            at ClientPageRoot (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/client-page.js:14:11)
            at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)
            at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
            at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
            at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
            at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:349:11)
            at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
            at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)
            at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)
            at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)
            at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:370:11)
            at SessionLayout (Server)
            at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)
            at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
            at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
            at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
            at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
            at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:349:11)
            at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
            at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)
            at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)
            at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)
            at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:370:11)
            at div
            at main
            at RootLayout (Server)
            at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)
            at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
            at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
            at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
            at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
            at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:349:11)
            at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
            at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)
            at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)
            at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)
            at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:370:11)
            at body
            at html
            at RootLayout (Server)
            at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
            at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
            at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
            at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
            at DevRootNotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/dev-root-not-found-boundary.js:33:11)
            at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/ReactDevOverlay.js:87:9)
            at HotReload (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:321:11)
            at Router (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:207:11)
            at ErrorBoundaryHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:113:9)
            at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)
            at AppRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:585:13)
            at ServerRoot (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:112:27)
            at Root (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:117:11)
            at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/ReactDevOverlay.js:87:9)
        window.console.error @ app-index.js:33
        Show 1 more frame
        Show less

    error 2
        ⨯ src/app/(form)/[sessionId]/page.tsx (52:43) @ hasHydrated
        ⨯ TypeError: Cannot read properties of undefined (reading 'hasHydrated')
            at FormPage ([sessionId]/page.tsx:77:93)
        digest: "2882964180"
        50 |  );
        51 |
        > 52 |  const hasHydrated = useFormStore.persist.hasHydrated();
            |                                           ^
        53 |  const form = useForm({
        54 |          resolver: zodResolver(formValidationSchema[currentStepIndex]),
        55 |          mode: 'all',
        GET /9df7e5b5-8530-4871-b556-30ae8c35b812 500 in 2332ms

[x] locally couldnt start form was backend not running at port 8000 by itself
[x] review concent form
[x] placement on concent and agreement "Private Policy", no space

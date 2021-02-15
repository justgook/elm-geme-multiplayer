const isDev = process.env.NODE_ENV === "development"
const prefix = process.env.SNOWPACK_PUBLIC_URL || ""

if (isDev) {
    require("./server-host/peer").start()
}

module.exports = {
    plugins: [
        [
            "snowpack-plugin-elm",
            {
                verbose: false,
                // When to enable Elm's time-traveling debugger
                debugger: "never", // One of "never", "dev" (only on `snowpack dev`) or "always"
                optimize: "build", // One of "never", "build" (only on `snowpack build`) or "always"
            },
        ],
        [
            "@snowpack/plugin-run-script",
            {
                cmd: "eslint src --ext .js,.ts",
            },
        ],
        ["./snowpack-plugin/manifest-snowpack-plugin.js", { prefix }],
        [
            "./snowpack-plugin/pwa-snowpack-plugin.js",
            {
                favicon: {
                    source: "src/asset/favicon/base.svg",
                    outputFolderPath: "./src/asset/generated",
                    options: {
                        pathOverride: `${isDev ? "" : prefix}/asset/generated`,
                        // pathOverride: `/asset/generated`,
                        // scrape: false,
                        favicon: true,
                        background: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
                        // splashOnly: true,
                        // portraitOnly: true,
                        log: false,
                    },
                },
            },
        ],
    ],
    packageOptions: {
        sourceMap: false,
        installTypes: true,
        // rollup: {
        //     preserveSourceFiles: false,
        // },
    },
    devOptions: {
        // hostname:
        port: 8888,
        fallback: `404.html`,
        hmr: true,
        hmrErrorOverlay: true,
        // secure: true,
        output: "stream", // "stream" | "dashboard"
    },
    buildOptions: {
        clean: true,
        sourceMaps: false,
        out: "target",
        baseUrl: `${prefix}/`,
    },

    mount: {
        src: `/`,
    },
    exclude: isDev ? ["**/generated/**/*"] : [],
    routes: [
        {
            match: "routes",
            src: "/api/.*",
            dest: (req, res) => {
                console.log(req)
                res.statusCode = 200
                res.end("hello World")
            },
        },
    ],
    optimize: {
        // entrypoints: 'auto' | string[] | (({files: string[]}) => string[]);
        // preload: true,
        bundle: true,
        manifest: true,
        minify: true,
        target: "es2020", //import.meta.env
    },
}

const fs = require("fs").promises
const path = require("path")
const Mustache = require("mustache")
const pwaAssetGenerator = require("pwa-asset-generator")
// const packageJson = require("../package.json")

module.exports = function (snowpackConfig, { favicon }) {
    const cachePath = `${favicon.outputFolderPath}/cache.json`
    return {
        name: "pwa-snowpack-plugin",
        partials: { default: "template" },
        async config() {
            await this.onChange({ filePath: "src/default.mustache" })
        },
        data: {
            htmlMeta: {},
        },
        lastUpdate: null,
        async onChange({ filePath }) {
            // console.log("onChange", filePath)
            if (path.basename(filePath) === "default.mustache") {
                this.partials.default = await fs.readFile("src/default.mustache", "utf-8")
                this.updateFiles.forEach((path) => this.markChanged(path))
            }
        },
        generateImages() {
            return pwaAssetGenerator.generateImages(favicon.source, favicon.outputFolderPath, favicon.options).then((data) => {
                this.data = data
                // TODO find reason why
                this.data.htmlMeta.favicon = this.data.htmlMeta.favicon.replace(".jpg", ".png")
                fs.writeFile(cachePath, JSON.stringify(data)).then()
                this.updateFiles.forEach((path) => this.markChanged(path))
            })
        },
        async getData(isDev) {
            const { mtimeMs: statsInput } = await fs.stat(favicon.source)
            if (isDev) {
                if (this.lastUpdate < statsInput) {
                    this.lastUpdate = statsInput
                    const { mtimeMs: statsCache } = await fs.stat(cachePath).catch((/*err*/) => Promise.resolve({ mtimeMs: 0 }))
                    if (statsCache > statsInput) {
                        await fs.readFile(cachePath, "utf-8").then((content) => {
                            Promise.resolve((this.data = JSON.parse(content)))
                        })
                    } else {
                        this.generateImages().then()
                    }
                }
            } else {
                await this.generateImages()
            }
            return this.data
        },

        resolve: {
            input: [".mustache"],
            output: [".html"],
        },

        updateFiles: new Set(),
        async load({ filePath, isDev, fileExt /*, ...rest*/ }) {
            this.updateFiles.add(filePath)
            const template = await fs.readFile(filePath, "utf-8")
            const props = {
                ...(await this.getData(isDev)),
                fileName: path.basename(filePath, fileExt),
            }
            const partials = this.partials
            return {
                ".html": Mustache.render(template, props, partials),
            }
        },
        // async optimize() {
        //     const data = this.getData()
        //     // console.log(snowpackConfig)
        // },
    }
}

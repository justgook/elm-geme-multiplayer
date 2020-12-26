const fs = require("fs").promises
// const path = require("path")
const packageJson = require("../package.json")
module.exports = function (snowpackConfig, pluginOptions) {
    return {
        name: "manifest-snowpack-plugin",
        config() {
            console.log("Success! -- manifest-snowpack-plugin")
        },
        resolve: {
            input: [".webmanifest"],
            output: [".webmanifest"],
        },
        async load({ filePath }) {
            const fileContents = await fs.readFile(filePath, "utf-8")
            const data = JSON.parse(fileContents)
            // console.log(packageJson)
            data.name = packageJson.name
            return JSON.stringify(data)
        },
    }
}

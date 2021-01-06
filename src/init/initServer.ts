export const initServer = (): Worker => {
    const server = new Worker(`${import.meta.env.SNOWPACK_PUBLIC_URL}/worker/server.js`, {
        name: "server-web-worker",
        // type: import.meta.env.MODE === "development" ? "module" : "classic",
        type: "module",
    })
    console.log("initServer", server)
    return server
}

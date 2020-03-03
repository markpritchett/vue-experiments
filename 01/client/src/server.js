import { Server } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
    let server = new Server({
        environment,

        routes() {
            this.namespace = "api"

            this.get("/values", () => ['mirage-1','mirage-2'])

        },
    })

    return server
}
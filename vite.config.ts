import { defineConfig } from "vite"
import type { CommonServerOptions } from "vite"
import { sveltekit } from "@sveltejs/kit/vite"
import { enhancedImages } from "@sveltejs/enhanced-img"

const server: CommonServerOptions = {
    host: "localhost",
    port: 3000,
    strictPort: true
}

export default defineConfig({
    server: server,
    preview: server,
    plugins: [sveltekit(), enhancedImages()]
})

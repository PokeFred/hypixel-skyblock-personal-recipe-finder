<script lang="ts">
    import "../app.css"
    import type { LayoutProps } from "./$types"

    const { children }: LayoutProps = $props()
</script>

<div class="w-screen h-auto min-h-dvh bg-slate-50">
    <div class="w-full h-auto text-xl font-bold text-center border-b border-black p-4">Hypixel Skyblock - Personal  Recipe Finder</div>
    <div class="mx-auto w-full max-w-5xl h-auto grid grid-cols-1 gap-4 p-4">
        {@render children()}
    </div>
</div>

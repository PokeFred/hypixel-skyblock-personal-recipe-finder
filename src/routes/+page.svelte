<script lang="ts">
    import type { PageProps } from "./$types"

    let { data }: PageProps = $props()
</script>

<div class="w-full h-auto text-slate-800 bg-slate-200 border border-slate-300 rounded-xl">
    <div class="w-full h-auto border-b border-slate-300 p-4">All Recipes</div>
    <div class="w-full h-auto grid grid-cols-1 gap-4 p-4">
        {#await data.recipes}
            <div>Loading...</div>
        {:then data}
            {#if data.success}
                {#each data.data as section}
                    <details>
                        <summary class="font-bold">{section.title} ({section.recipes.length})</summary>
                        <table>
                            <thead>
                                <tr>
                                    <th class="border px-4 py-1">Collection</th>
                                    <th class="border px-4 py-1">Item</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each section.recipes as recipe}
                                    <tr>
                                        <td class="border px-4 py-1">{recipe.collection}</td>
                                        <td class="border px-4 py-1">{recipe.title}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </details>
                {/each}
            {:else}
                <div class="italic">{data.message}</div>
            {/if}
        {:catch error}
            <div class="italic">{JSON.stringify(error)}</div>
        {/await}
    </div>
</div>

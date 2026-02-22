import type { PageServerLoad } from "./$types"
import { existsSync, readFileSync } from "node:fs"
import { join as joinPath } from "node:path"

type RecipeData = {
    success: boolean,
    data: RecipeSection[],
    message: string
}

type RecipeSection = {
    title: string,
    recipes: Recipe[]
}

type Recipe = {
    collection: string,
    title: string
}

function analyze(data: any): Recipe[] {
    const c: Recipe[][] = Object.keys(data).map((element1): Recipe[] => {
        const a: any[] = data[element1]["tiers"]
            .map((element2: any): Recipe => {
                return element2["unlocks"]
                    .map((element3: any): Recipe => {
                        return {
                            collection: `${data[element1]["name"]} (${element2.tier})`,
                            title: element3
                        }
                    })
            })
        const b: Recipe[] = []
        a.forEach((element1: any): void => {
            element1.forEach((element2: any): void => {
                b.push(element2)
            })
        })

        return a
    })
    const d: Recipe[] = []
    c.forEach((element: Recipe[]): number => d.push(...element))
    const e: Recipe[] = []
    d.forEach((element: any): void => {
        e.push(...element)
    })

    return e
        .filter((element: Recipe): boolean => element.title.endsWith("Recipe") || element.title.endsWith("Recipes"))
        .map((element: Recipe): Recipe => {
            element.title = element.title.replace(" Recipes", "")
            element.title = element.title.replace(" Recipe", "")
            return element
        })
}

async function getRecipeData(): Promise<RecipeData> {
    const DATA_FOLDER: string = joinPath(process.cwd(), "data")
    const COLLECTIONS_FILE: string = joinPath(DATA_FOLDER, "collections.json")
    const ITEMS_FILE: string = joinPath(DATA_FOLDER, "collections.json")

    if (!existsSync(COLLECTIONS_FILE)) return { success: false, data: [], message: "Error: ." }
    if (!existsSync(ITEMS_FILE)) return { success: false, data: [], message: "Error: ." }

    const collections: any = JSON.parse(readFileSync(COLLECTIONS_FILE, { encoding: "utf-8" }))
    const items: any = JSON.parse(readFileSync(ITEMS_FILE, { encoding: "utf-8" }))

    return {
        success: true,
        data: Object.keys(collections["collections"])
            .map((element: string): RecipeSection => {
                return {
                    title: collections["collections"][element]["name"],
                    recipes: analyze(collections["collections"][element]["items"])
                }
            }),
        message: ""
    }
}

export const load: PageServerLoad = async (): Promise<{ recipes: Promise<RecipeData> }> => {
    return {
        recipes: getRecipeData()
    }
}

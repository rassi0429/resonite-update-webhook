import fs from "fs/promises"

const url = "https://api.steamcmd.net/v1/info/2519830"


const main = async () => {
    // read current data
    try {
        const data = JSON.parse(await fs.readFile("./json/data.json"))
        const beforeUpdate = data.data["2519830"].depots.branches.public.timeupdated

        // fetch new data
        const response = await fetch(url)
        const newData = await response.json()
        const afterUpdate = newData.data["2519830"].depots.branches.public.timeupdated

        // compare data
        if (beforeUpdate !== afterUpdate) {
            // send notification
            const webHooks = process.env.WEBHOOKS.split(",")

            for (const webHook of webHooks) {
                await fetch(webHook, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content: `Update detected at ${new Date(afterUpdate * 1000)}`,
                    })
                })
            }

            // save new data
            await fs.writeFile("./json/data.json", JSON.stringify(newData))

        } else {
            console.log("No update detected")
        }
    } catch (error) {
        const response = await fetch(url)
        const data = await response.json()
        await fs.writeFile("./json/data.json", JSON.stringify(data))
        console.log("First run, data saved")
    }
}


main()
import fs from "node:fs/promises"
import path from "node:path"
import { v4 as uuidv4 } from "uuid"
import {simulateMarketActivity} from "../data/goldData.js";

export async function goldPriceHandler(req, res) {
    try {
        const filePath = path.join('data', 'goldPrice.json')
        res.statusCode = 200

        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        // res.setHeader('Access-Control-Allow-Origin', '*')

        // send initial data imimediately upon connection
        const initialData = await fs.readFile(filePath, 'utf-8')
        const initialObj = JSON.parse(initialData)
        const lastEntry = initialObj[initialObj.length - 1]
        res.write(`data: ${JSON.stringify(lastEntry)}\n\n`)

        // Send every 30 seconds new data
        const intervalId = setInterval(async () => {
            try {
                const data = await fs.readFile(filePath, 'utf-8')
                const dataObj = JSON.parse(data)
                const lastEntry = dataObj[dataObj.length - 1]
                const newEntry = simulateMarketActivity(lastEntry.price_libra, lastEntry.supply)
                const responseObj = {
                    uuid: uuidv4(),
                    price_libra: newEntry.price_libra,
                    time: new Date().toLocaleString(),
                    price_change: (newEntry.price_libra - lastEntry.price_libra).toFixed(2),
                    percentage_change: (((newEntry.price_libra - lastEntry.price_libra) / lastEntry.price_libra) * 100)
                        .toFixed(2) + '%',
                    supply: newEntry.supply
                }
                dataObj.push(responseObj)
                await fs.writeFile(filePath, JSON.stringify(dataObj, null, 2))
                res.write(`data: ${JSON.stringify(responseObj)}\n\n`)
            } catch (err) {
                console.error('Error in SSE interval:', err)
                res.write(`data: ${JSON.stringify({error: 'Server error'})}\n\n`)
            }
        }, 10000)
        // error handling for loop
        req.on('error', (err) => {
            clearInterval(intervalId)
            console.error('SSE request error:', err)
        })
    // error handling for initialconnection
    } catch (err) {
        console.error('Error in goldPriceHandler:', err)
        res.statusCode = 500
        res.end(JSON.stringify({error: 'Failed to initialize SSE'}))
    }
}
import fs from "node:fs/promises"
import path from "node:path"
import { v4 as uuidv4 } from "uuid"
import {simulateMarketActivity} from "../data/goldData.js";
import {sendResponse} from "../utility/sendResponse.js";


let lastPrice = 0
let lastSupply = 0
export function getPrice(res){
    sendResponse(res, 200, 'application/json',
        JSON.stringify({price_libra: lastPrice}))
}

async function goldPriceHandler(req, res) {
    try {
        const filePath = path.join('data', 'goldPrice.json')
        res.statusCode = 200

        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        // res.setHeader('Access-Control-Allow-Origin', '*')

        // send initial data immediately upon connection
        const rawData = await fs.readFile(filePath, 'utf-8')
        const dataObj = JSON.parse(rawData)
        const lastEntry = dataObj[dataObj.length - 1]
        res.write(`data: ${JSON.stringify(lastEntry)}\n\n`)


        lastPrice = lastEntry.price_libra
        lastSupply = lastEntry.supply
        // Send every 10 seconds new data
        const intervalId = setInterval(() => {
            try {
                const newEntry = simulateMarketActivity(lastPrice, lastSupply)
                const responseObj = {
                    uuid: uuidv4(),
                    price_libra: newEntry.price_libra,
                    time: new Date().toLocaleString(),
                    price_change: (newEntry.price_libra - lastPrice).toFixed(2),
                    percentage_change: (((newEntry.price_libra - lastPrice) / lastPrice) * 100).toFixed(2) + '%',
                    supply: newEntry.supply
                }
                lastPrice = newEntry.price_libra
                lastSupply = newEntry.supply
                dataObj.push(responseObj)
                res.write(`data: ${JSON.stringify(responseObj)}\n\n`)
            } catch (err) {
                console.error('Error in SSE interval:', err)
            }
        }, 10000)

        // Handle client disconnect
        req.on('close', () => {
            fs.writeFile(filePath, JSON.stringify(dataObj, null, 2))
            clearInterval(intervalId)
            console.log('Client disconnected, SSE stream closed')
        })

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

export default goldPriceHandler
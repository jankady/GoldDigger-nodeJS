import fs from "node:fs/promises"
import path from "node:path"

export function goldPriceHandler(req, res) {
    const filePath = path.join('data', 'goldPrice.json')
    res.statusCode = 200

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    setInterval(async () => {
        const data = await fs.readFile(filePath, 'utf-8')
        res.write(`
        data: how are you
        \n\n`)
    }, 3000)
        // object gold
        // uuid: '1',
        // price_libra:  '3,423',
        // time: now,
        // price change: '+12.34',
        // percentage change: '+0.36%'
        // send every 30 seconds
        // use SSE (Server-Sent Events) to send data to client
        //

}
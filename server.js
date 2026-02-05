import http from 'node:http'
import path from "node:path"
import fs from "node:fs/promises"
import {displayWeb} from "./webpage/displayWeb.js"
import goldPriceHandler, {getPrice} from "./handlers/goldPriceHandler.js"
import {dataGET} from "./handlers/dataGET.js"
import {sendResponse} from "./utility/sendResponse.js";

const PORT = 3000

const __dirname = import.meta.dirname
const server = http.createServer(async (req, res) => {

    // Disable favicon requests
    if (req.url === '/favicon.ico') {
        // 404 favicon not found
        res.writeHead(404)
        res.end()
        return
    }
    if (req.url.startsWith('/api') && req.method === 'GET') {
        // API endpoint
        if (req.url === '/api') {
            return await dataGET(res)
        }
        // SSE endpoint for gold price updates
        if (req.url === '/api/events') {
            return await goldPriceHandler(req, res)
        }
        if (req.url === '/api/events/price') {
            return getPrice(res)
        }

        // 404 for other API endpoints
        else {
            sendResponse(res, 404, 'application/json',
                JSON.stringify({error: 'Endpoint not found'}))
            return
        }
    }


    // web page
    if (!req.url.startsWith('/api')) {
        return await displayWeb(req, res)
    }
    else {
        // Invalid URL - return 404 page
        const filePath =  path.join('public', '404.html')
        const payload = await fs.readFile(filePath, 'utf-8')
        sendResponse(res, 404, 'text/html', payload)
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
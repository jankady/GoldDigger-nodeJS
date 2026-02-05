import path from "node:path"
import fs from "node:fs/promises"
import {sendResponse} from "../utility/sendResponse.js";
import {getContentType} from "../utility/getContentType.js";

export async function displayWeb(req, res){
    try {
        // Determine file to serve
        const fileType = req.url === '/' ? 'index.html' : req.url
        const extension = path.extname(fileType)
        // Get content type
        const contentType = getContentType(extension)
        const filePath =  path.join('public', fileType)
        const payload = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, payload)
    }

    catch (err) {
        if (err.code === 'ENOENT') {
            // Invalid URL - return 404 page
            const filePath =  path.join('public', '404.html')
            const payload = await fs.readFile(filePath, 'utf-8')
            sendResponse(res, 404, 'text/html', payload)
        } else {
            // Server error
            sendResponse(res, 500, 'text/html', '<h1>500 Internal Server Error</h1>')
        }
    }

}
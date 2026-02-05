import path from 'node:path'
import {sendResponse} from "../utility/sendResponse.js"
import fs from 'node:fs/promises'

// function to handle GET from /api endpoint
export async function dataGET(res){
    try {
        // get data from json file and send as response
        const filePath = path.join('data', 'goldPrice.json')
        const file = await fs.readFile(filePath, 'utf-8')
        const payload = JSON.parse(file)
        sendResponse(res, 200, 'application/json', JSON.stringify(payload, null, 2))

    }
    catch (err) {
        // default send [] on error
        console.error('failed to fetch data:', err)
        sendResponse(res, 200, 'application/json', JSON.stringify([]))
    }
}
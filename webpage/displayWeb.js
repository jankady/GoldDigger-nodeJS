import {sendResponse} from "../utility/sendResponse.js";
import path from "node:path"

export  function displayWeb(req, res){
    // console.log(res)
    const filePath =  path.join('public', 'index.html')
    console.log(filePath)
    const payload = `hi`
    sendResponse(res, 200, 'text/html', payload)

}
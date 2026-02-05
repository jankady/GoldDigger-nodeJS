import http from 'node:http';
import {displayWeb} from "./webpage/displayWeb.js";

const PORT = 3000;

const __dirname = import.meta.dirname
const server = http.createServer(async (req, res) => {

    // API endpoint
    if (req.url.startsWith('/api')) {
        console.log('api endpoint hit');
        return
    }

    // web page
    if (!req.url.startsWith('/api')) {
        console.log('web page endpoint hit');
        displayWeb(req, res)
        return
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
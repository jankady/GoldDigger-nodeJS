import http from 'node:http';
import {displayWeb} from "./webpage/displayWeb.js";
import {goldPriceHandler} from "./handlers/goldPriceHandler.js";

const PORT = 3000;

const __dirname = import.meta.dirname
const server = http.createServer(async (req, res) => {

    // Disable favicon requests
    if (req.url === '/favicon.ico') {
        // 404 favicon not found
        res.writeHead(404);
        res.end();
        return;
    }

    // API endpoint
    if (req.url === '/api') {
        return console.log('api endpoint hit');
    }

    if (req.url === '/api/events') {
        return goldPriceHandler(req, res)
    }

    // web page
    if (!req.url.startsWith('/api')) {
        return await displayWeb(req, res)
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
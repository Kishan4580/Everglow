const http = require('http');
// ... rest of your imports

const server = http.createServer();

server.on('request', (req, res) => {
    // Convert your HTTP/2 stream logic to HTTP/1.1
    const reqPath = req.url;
    const method = req.method;
    
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Origin, data');
    
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Your existing route logic here...
});

server.listen(8080, () => {
    console.log('HTTP server running on http://localhost:8080');
});
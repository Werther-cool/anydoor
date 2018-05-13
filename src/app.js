const http = require('http');
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const path = require('path')
const route = require('./helper/route')
// const hostname = '127.0.0.1';
// const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root,req.url) 
    route(req,res,filePath)
});

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
server.listen(conf.port,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.port}`
    console.info(`server start at${chalk.green(addr)}`)
})
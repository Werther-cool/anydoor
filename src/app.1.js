const http = require('http');
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

// const hostname = '127.0.0.1';
// const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root,req.url) 
    fs.stat(filePath,(err,stats)=>{
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`${filePath} is not a directory or file`)
            return
        }
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            fs.readdir(filePath,(err,files)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/palin');
                res.end(files.join(','))
            })
        }

    })
});

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
server.listen(conf.port,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.port}`
    console.info(`server start at${chalk.green(addr)}`)
})
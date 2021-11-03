const http = require('http');
const url = require('url');
const fs = require('fs');



function handleFile(req, res, callback) {
    let path = url.parse(req.url).pathname;

    let fileName = "." + path;


    fs.readFile(fileName, (err, data) => {
        if (err) {

            if (callback) {
                if (!callback(req, res)) {
                    res.writeHead(404, { "content-type": "text/html;charset=utf-8" });
                    res.end("<h1>Pagina nao encontrada</h1>")
                }
            }





        } else {
            res.writeHead(200, { "content-type": "text/html" })
            res.write(data);
            res.end();
        }
    })

}

function handleRequest(req, res) {

    let path = url.parse(req.url).pathname;
    let method = req.method;
    console.log(method)
    if (method == 'PUT') {
        res.writeHead(404, { "content-type": "text/html;charset=utf-8" })
    }


    if (path == "/teste") {
        res.end("teste");
        return true;
    }
    return false;
}




http.createServer((request, response) => {
    handleFile(request, response, handleRequest);
}).listen(3000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Servidor Rodando na Porta 3000")
    }
})
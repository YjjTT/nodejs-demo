var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.env.PORT || 8888

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('含查询字符串的路径\n' + pathWithQuery)

    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf8')
        var amount = fs.readFileSync('./db', 'utf8')
        string = string.replace('&&&amount&&&', amount)
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.end(string)
    }else if(path === '/pay') {
        var amount = fs.readFileSync('./db', 'utf8')
        var newAmount = amount - 1
        if(Math.random() > 0.5){
            fs.writeFileSync('./db', newAmount)
            response.setHeader('Content-Type', 'image/jpeg')
            response.statusCode = 200
            response.write(fs.readFileSync('./dog.jpeg'))
        }else{
            response.statusCode = 400
            response.write('fail')
        }
        response.end()
    }else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.end()
    }








    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
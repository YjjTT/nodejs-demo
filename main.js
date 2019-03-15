myButton.addEventListener('click', (e)=>{
    let request = new XMLHttpRequest()
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            console.log("请求响应都完毕了")
            if(request.status === 200){
                console.log("请求成功")
                console.log(request.responseText)
                let string = request.responseText
                // 把符合JSON 语法的字符串
                // 转换成 JS 对应的值
                let object = window.JSON.parse(string)
                console.log(object)
                console.log(typeof object)
                console.log(object.note)
                console.log(object.note.from)
            }else if(request.status >= 400){
                console.log("请求失败")
            }
        }
    }
    request.open('GET', '/xxx') // 配置request
    request.send()
})
myButton.addEventListener('click', (e)=>{
    let request = new XMLHttpRequest()
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            console.log("请求响应都完毕了")
            if(request.status === 200){
                console.log("请求成功")
                console.log(request.responseText)
                parser = new DOMParser()
                let xmlDoc = parser.parseFromString(request.responseText, "text/xml")
                let c = xmlDoc.getElementsByTagName('from')[0].textContent
                console.log(c)
            }else if(request.status >= 400){
                console.log("请求失败")
            }
        }
    }
    request.open('GET', '/xxx') // 配置request
    request.send()
})
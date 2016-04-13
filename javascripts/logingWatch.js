var  isLoginWechat=(function(){
	if(!cookie.get('token',false)){
		login();
	}
	function login(){
		var urlObj =  _location.urlformat, code  =  urlObj.code;
		if (code==""||code==undefined) {
			//var url = $_location.
			href = $$c.watchUrl+"appid="+$$c.appId+"&redirect_uri="+encodeURI(_location.href)+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
			console.log(href);
			location.href=href;
		} else {
			console.log("code ok :"+code);
			$.ajax({
				type:"GET",
				url:$$c.ajxUrl,
				timeout:5000,
				data:"code="+code,
				dataType:"jsonp",
				success:function(data){
					if(data.ret!="ok"){
						//alert(data.msg);
						console.log(data.msg)
					location.href=$$c.watchUrl+"appid="+$$c.appId+"&redirect_uri="+encodeURI(_location.href)+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
					}
					console.log(data.data)
					cookie.set("token",data.data.token)
				},
				error:function(state,error){
					console.log("ajax error info : state="+state+"error="+error);
					if(error=="timeout"){alert("请求超时 请刷新重试")}

				}
			})
			//var url=$$c.ajxUrl+"&code="+code;
		}
	}
})()
//isLoginWatch();
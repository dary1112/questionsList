window.onload = function(){
	//如果没有登录，那么进入登录页面
	if(!tools.cookie("user")){
		window.location.href = "login.html";
	}
}
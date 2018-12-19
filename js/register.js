window.onload = function(){
	tools.$("#register-form").onsubmit = function(e){
		e = e || window.event;

		//用ajax提交
		tools.ajaxGet("api/v1/register.php",{
			"username": tools.$("#inputusername").value,
			"email": tools.$("#inputEmail3").value,
			"password": tools.$("#inputPassword3").value
		}, function(res){
			if(res.res_code === 1){
				alert("注册成功");

			}else{
				alert("注册失败");
			}
		})

		e.preventDefault();
		return false;
	}
}
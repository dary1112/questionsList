window.onload = function(){
	tools.$("#register-form").onsubmit = function(e){
		e = e || window.event;

		//用ajax提交
		tools.ajax({
			method:"post",
			url:"api/v1/register.php",
			params: {
				"username": tools.$("#inputusername").value.trim(),
				"email": tools.$("#inputEmail3").value.trim(),
				"password": tools.$("#inputPassword3").value
			},
			cbSucc: function(res){
				if(res.res_code){
					if(confirm("注册成功，去登录")){
						window.location.href = "login.html";
					}
				}
			}
		})


		//阻止表单的默认提交
		e.preventDefault();
		return false;
	}
}
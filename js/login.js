window.onload = function(){
	tools.$("#loginForm").onsubmit = function(e){
		e = e || window.event;

		tools.ajax({
			method: "post",
			url: "http://127.0.0.1/day24/questionsList/api/v1/login.php",
			params: {
				username: tools.$("#inputusername").value.trim(),
				password: tools.$("#inputPassword3").value
			},
			cbSucc: function(res){
				if(res.res_code){
					//是否记住我
					if(tools.$("#rememberMe").checked){
						//把用户名和用户id存cookie
						tools.cookie(
							"user", 
							JSON.stringify({
								id:res.res_body.id, 
								name:res.res_body.username
							}),
							{expires:3}
						);
					}else{
						//把用户名和用户id存cookie
						tools.cookie(
							"user", 
							JSON.stringify({
								id:res.res_body.id, 
								name:res.res_body.username
							})
						);
					}
					
					if(confirm("登录成功，去首页")){
						window.location.href = "index.html";
					}
				}
			},
			cbFail: function(){
				alert("网络出错");
			}
		})


		e.preventDefault();
		return false;
	}
}
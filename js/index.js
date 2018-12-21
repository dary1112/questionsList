//页面加载之前，如果没有登录，那么进入登录页面
if(!tools.cookie("user")){
	window.location.href = "login.html";
}

window.onload = function(){

	//显示登录用户名
	var username = JSON.parse(tools.cookie("user")).name;
	tools.$("#username").innerHTML = username;

	//退出登录
	tools.on(tools.$("#exit"), "click", function(){
		if(confirm("确定要退出登录吗？")){
			tools.cookie("user","", {expires:-1});
			window.location.href = "login.html";
		}
		
	})

	//使用添加题目模态框
	$('#modal').modal({show: false});



	//请求数据，渲染tbody
	tools.ajax({
		method:"GET",
		url:"api/v1/index.php",
		cbSucc: function(res){
			if(res.res_code){
				//拼接tr
				var str = "";
				var data = res.res_body;
				data.forEach( function(element, index) {
					str += `<tr>
		            <td>${element.id}</td>
		            <td><span>${element.title}</span><input type="text"></td>
		            <td><span>${element.answer}</span><input type="text"></td>
		            <td>
		            	<a href="javascript:;" class="editBtn">编辑</a>
		            	<a href="javascript:;" class="okBtn">确定</a>
		            	<a href="javascript:;" class="cancelBtn">取消</a>
		            	<a href="javascript:;" class="delBtn">删除</a>
		            </td>
		        </tr>`;
				});

				tools.$("tbody")[0].innerHTML = str;
			}
		}
	})

	//表格编辑
	var box = tools.$("#box");
	var	tbody = tools.$("tbody",box)[0];
		
	
	//按钮事件，委托给父级tbody
	tbody.onclick = function(e){
		e = e || event;
		//找到事件源
		var target = e.target || e.srcElement;
		
		//根据事件源class的不同执行不同的操作
		if(target.className === "editBtn"){
			//编辑按钮
			var tr = target.parentNode.parentNode;
			tr.className = "edit";
			
			var aSpan = tools.$("span", tr);
			for(var i = 0; i < aSpan.length; i++){
				aSpan[i].nextElementSibling.value = aSpan[i].innerHTML;
			}
		}else if(target.className === "okBtn"){
			//确定按钮
			var tr = target.parentNode.parentNode;
			tr.className = "";
			
			//var aSpan = tools.$("span", tr);
			var id = tr.children[0].innerHTML,
				aInput = tools.$("input", tr),
				title = aInput[0].value,
				answer = aInput[1].value;


			//请求服务器，更新数据库
			tools.ajax({
				method: "post",
				url:"api/v1/update.php",
				params: {id,title,answer},
				cbSucc: function(res){
					if(res.res_code){
						aInput[0].previousElementSibling.innerHTML = res.res_body.title;
						aInput[1].previousElementSibling.innerHTML = res.res_body.answer;
					}
				}
			});

		}else if(target.className === "cancelBtn"){
			//取消按钮
			var tr = target.parentNode.parentNode;
			tr.className = "";
		}else if(target.className === "delBtn"){
			//删除按钮
			if(confirm("你确定要删除吗？")){
				var tr = target.parentNode.parentNode;
				var id = tr.children[0].innerHTML;

				//带着id去请求服务器

				// api/v1/delete.php
				// get
				// request params  id
				// response  json
				//     res_code  1 | 0
				//     res_message  

				tools.ajaxPromiseGet("api/v1/delete.php", {id})
					.then(function(res){
						if(res.res_code){
							//删除成功
							tr.parentNode.removeChild(tr);
						}else{
							alert(res.res_message+"，删除失败，请重试");
						}
					})



				//tr.parentNode.removeChild(tr);
			}
		}
			
	}
}

//页面加载之前，如果没有登录，那么进入登录页面
if(!tools.cookie("user")){
	window.location.href = "login.html";
}

window.onload = function(){
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
}

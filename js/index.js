// 页面加载之前，如果没有登录，那么进入登录页面
if(!tools.cookie("user")){
	window.location.href = "login.html";
}

window.onload = function(){

	// 每一页的数据量
	const pageCount = 4;
	var pageIndex = 1;
	var allPage;

	// 显示登录用户名
	var username = JSON.parse(tools.cookie("user")).name;
	tools.$("#username").innerHTML = username;

	// 退出登录
	tools.on(tools.$("#exit"), "click", function(){
		if(confirm("确定要退出登录吗？")){
			tools.cookie("user","", {expires:-1});
			window.location.href = "login.html";
		}
	})

	// 使用添加题目模态框
	// $('#modal').modal({show: false});


	getData();
	// 请求对应的那一页的数据，渲染tbody
	function getData(){
		tools.ajax({
			method: "GET",
			url: "api/v1/select.php",
			params: { pageIndex, pageCount },
			cbSucc: function (res) {
				if(res.res_code){
					//总页数赋值
					allPage = res.pages;
					pageIndex = Number(res.pageIndex);

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

					//分页的li
					//先把page删除
					var aPage = tools.$(".page", tools.$("#pagination"));
					//遍历DOM集合
					aPage = Array.from(aPage);
					for(let key in aPage){
						tools.$("#pagination").removeChild(aPage[key]);
					}

					for(let j = 1; j <= res.pages; j++){
						var li = document.createElement("li");
						li.className = j===pageIndex ? "page active":"page";
						li.innerHTML = '<a class="pageNum" href="javascript:;">'+j+'</a>';
						tools.$("#pagination").insertBefore(li, tools.$("#nextPage"));
					}
				}
			}
		})
  }
  
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
							//重新请求这一页的数据
							getData();
						}else{
							alert(res.res_message+"，删除失败，请重试");
						}
					})
			}
		}
	}

	//添加操作
	var inputTitle = tools.$("#inputTitle"),
		inputAnswer = tools.$("#inputAnswer");

	//事件委派
	tools.on(tools.$("#modal-content"), "click", function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
		//判断事件源
		if(target.id === "closeBtn" || target.id === "closeSpan"){
			inputTitle.value = inputAnswer.value = "";
		}else if(target.id === "addBtn"){
			//添加题目，提交后台
			tools.ajaxPromiseGet("api/v1/add.php", {
				title: inputTitle.value,
				answer: inputAnswer.value
			}).then(function(res){
				if(res.res_code){
					inputTitle.value = inputAnswer.value = "";
					//重新请求当前页的数据
					getData();
					alert(res.res_message);
				}else{
					alert(res.res_message);
				}
			})
		}
		
	})

	//分页
	tools.on(tools.$("#pagination"), "click", function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;

		if(target.className === "prevPage"){
			//上一页
			if(--pageIndex<1) pageIndex = 1;
			getData();
		}else if(target.className === "nextPage"){
			//下一页
			if(++pageIndex > allPage) pageIndex = allPage;
			getData();
		}else if(target.className === "pageNum"){
			//分页
			pageIndex = Number(target.innerHTML);
			getData();
		}
	})
}

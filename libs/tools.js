var tools = {
	/* 查找DOM对象
	 * @param selector string css基本选择器
	 * @param [parent] DOMobj 父级元素对象
	 * @return   DOMobj || HTMLCollection
	 */
	$: function(selector ,parent){
		parent = parent || document;
		switch(selector.charAt(0)){
			case "#":
				return document.getElementById(selector.slice(1));
			case ".":
				return parent.getElementsByClassName(selector.slice(1));
			default:
				return parent.getElementsByTagName(selector);
		}
	},
	
	/*获取外部样式
	 * @param obj  DOMobj 要获取属性的DOM对象 
	 * @param attr string 获取某一条属性的属性名
	 * @return  string  obj的attr属性值
	 */
	getStyle: function(obj, attr){
		if(obj.currentStyle){ //针对IE
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	},
	
	/* 获取body宽高
	 * 
	 * @return obj {width,height}
	 * */
	getBody: function(){
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
		};
	},
	
	/*让元素在body里绝对居中
	 * @param obj  DOMobj 居中的那个元素对象
	 */
	showCenter: function(obj){
		
		//console.log(this);
		//this在不同执行环境指向的对象是不一样的，所以用一个变量在指向变化之前先存下来
		var _this = this;
		
		//obj相对于body定位
		document.body.appendChild(obj);
		obj.style.position = "absolute";
		
		function center(){
			//console.log(_this);
			var _left = (_this.getBody().width - obj.offsetWidth)/2,
				_top = (_this.getBody().height - obj.offsetHeight)/2;
			obj.style.left = _left + "px";
			obj.style.top = _top + "px";
		}
		
		center();
		window.onresize = center;
		
	},

	/* 获取和设置样式
	 * @param obj DOMobj 设置谁的样式
	 * @param oAttr obj  {left:"200px",top:"100px"} 设置css
	 * @param oAttr string 获取属性值  @return string  oAttr对应的属性值
	 * */
	css: function(obj,oAttr){
		if(typeof oAttr === "string"){
			return obj.style[oAttr];
		}else{
			for(var key in oAttr){
				obj.style[key] = oAttr[key]; 
			}
		}
		
	},
	
	/*添加事件监听
	 * @param obj DOMobj 添加事件的DOM元素
	 * @param type string 事件句柄
	 * @param fn Function 事件处理函数
	 * */
	on: function(obj, type, fn){
		//兼容判断
		if(window.attachEvent){
			obj.attachEvent("on"+type, fn);
		}else{
			obj.addEventListener(type, fn, false); //第三个参数指是否捕获，默认是false
		}
	},
	
	/*移除事件监听
	 * @param obj DOMobj 添加事件的DOM元素
	 * @param type string 事件句柄
	 * @param fn Function 事件处理函数
	 * */
	off: function(obj, type, fn){
		window.detachEvent ?
			obj.detachEvent("on"+type, fn) :
			obj.removeEventListener(type, fn, false);
	},
	
	/* 存取cookie
	 * @param [key] string cookie的名称    [如果不传的话，获取所有cookie  @return object]
	 * @param [value] string cookie的值   [如果不传，获取cookie, @return string]
	 * @param [exp] object  {expires:3,path:"/"} 
	 * */
	cookie: function(key, value, exp){
		//判断value是否有效
		if(value === undefined){
			//获取
			var obj = new Object();
			var str = document.cookie;
			var arr = str.split("; ");
			for(var i = 0; i < arr.length; i++){
				var item = arr[i].split("=");
				obj[item[0]] = item[1];
			}
			
			//判断有没有取到
			
			//是否传了key
			if(key){
				return obj[key] ? decodeURIComponent(obj[key]) : undefined;
			}else{
				return obj;
			}
			
			
		}else{
			//拼接expires
			var str = "";
			if(exp){
				//如果传了过期时间
				if(exp.expires){
					//设置new Date到过期的那一天
					var d = new Date();
					d.setDate(d.getDate()+exp.expires);
					str += ";expires="+d;
				}
				//如果传了path
				if(exp.path){
					str += ";path="+exp.path;
				}
			}
			
			document.cookie = key+"="+encodeURIComponent(value)+str;
		}
	},

	/*
	* 计算obj到浏览器边缘的距离
	* @param obj DOMObj 要计算的元素对象
	* @return object  {left,top}
	*/
	getPosition: function(obj){
		var left = 0, top = 0;
		//只要obj的offsetParent不等于null，那么就要继续计算
		while(obj.offsetParent){
			left += obj.offsetLeft;
			top += obj.offsetTop;
			//把offsetParent作为obj继续算下一段
			obj = obj.offsetParent;
		}
		return {left,top};
	},

	/*
	* 封装ajax的get请求方法
	* @param url string 请求路径
	* @param params Object 请求携带的参数
	* @param cb  Function  请求成功之后的回调函数
	* @param isJson boolean true代表是json 默认值就是true false就是普通字符串
	*/
	ajaxGet: function(url, params, cb, isJson = true){  
		//1、new对象
		var ajax = new XMLHttpRequest();

		//拼接url+params
		if(typeof params === "function"){
			//参数都往前移动一位，isJson默认值为true
			if(cb === undefined){
				//cb没有传
				isJson = true;
			}else{
				//传了cb
			 	isJson = cb;
			}
			cb = params;
		}else{
			//id=1&name=zhangsan
			url += "?";
			for(var key in params){
				url += key+"="+params[key]+"&";
			}
			//url删除最后一个 &
			url = url.substr(0,url.length-1);
		}
		//2、打开连接
		//第三个参数代表是否异步，默认为true
		ajax.open("GET", url);

		//3、发送请求
		ajax.send(null);

		//4、状态改变
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4 && ajax.status === 200){
				cb(isJson? JSON.parse(ajax.responseText):ajax.responseText);
			}
		}

		

	},

	/*
	* 封装ajax的post请求方法
	* @param url string 请求路径
	* @param params Object 请求携带的参数
	* @param cb  Function  请求成功之后的回调函数
	* @param isJson boolean true代表是json 默认值就是true false就是普通字符串
	*/
	ajaxPost: function(url, params, cb, isJson=true){
		//判断是否有参数
		var str = "";
		if(typeof params === "function"){
			//没有参数要发送
			str = null;
			
			//参数都往前移动一位，isJson默认值为true
			if(cb === undefined){
				//cb没有传
				isJson = true;
			}else{
				//传了cb
			 	isJson = cb;
			}
			cb = params;
		}else{
			for(let key in params){
				str += key+"="+params[key]+"&";
			}
			str = str.slice(0, -1);
		
		}

		//1、new 对象
		var ajax = new XMLHttpRequest();

		//2、打开连接
		ajax.open("POST", url, true);
		//设置请求头的content-type
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//3、发送请求
		ajax.send(str);

		//4、监听状态改变
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4 && ajax.status === 200){
				cb(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
			}
		}


	},


	/*
	* 封装ajax方法，get、post都能请求
	* @param  obj object  
	*           --method  string   get|post
	*           --url     string   请求的接口地址
	*           --params  object   请求携带的参数
	*           --cbSucc  function 请求成功的回调函数
	*           --cbFail  function 请求失败的回调函数
	*           --isJson  boolean  是否转换json，默认值为true
	*/
	ajax: function(obj){
		//method, url, params, cbSucc, cbFail, isJson
		//如果没有传isJson，默认值为true
		if(obj.isJson === undefined){
			obj.isJson = true;
		}
		//判断是否有参数
		let str = "";
		if(obj.params){
			for(let key in obj.params){
				str += key+"="+obj.params[key]+"&";
			}
			str = str.slice(0,-1);
		}else{
			str = null;
		}

		var ajax = new XMLHttpRequest();

		if(obj.method.toUpperCase() === "GET"){
			ajax.open("GET", obj.url+"?"+str);

			ajax.send(null);

		}else if(obj.method.toUpperCase() === "POST"){
			ajax.open("POST", obj.url);
			//设置请求头的content-type
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			ajax.send(str);

		}else{
			obj.cbFail();
			return;
		}

		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4){
				if(ajax.status === 200){
					obj.cbSucc(obj.isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
				}else{
					obj.cbFail();
				}
			}
		}



	}
}


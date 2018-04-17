// 
// 

var container = document.getElementsByClassName('container');//容器
var lis = document.getElementsByTagName('li');//图片集
var autoShow = document.getElementsByClassName('autoShow');
var time=10000,index=0,interval=10,animated=false,change=1,handler;

if(container !== null && lis !== null){
	var con_w = container[0].clientWidth;
	for(var i=0;i<lis.length;i++){
		var lis_w = con_w * 0.8;
		lis[i].index = i;//给图片编辑序列号
		lis[i].style.width = lis_w +'px';
		
	}
	var con_h = container[0].clientHeight;
	for(var i=0;i<lis.length;i++){
		lis[i].style.height = con_h +'px';
	}
}
	
console.log(container[0].offsetHeight,container[0].clientHeight);
	autoShow[0].style.marginLeft = -(lis_w-con_w*0.1)+'px';
// 运行主函数
function run(){
	animated = true;
	var moveL = parseFloat(lis_w)/(time/interval);//每次移动的距离
	var autoShowLpass = parseFloat(autoShow[0].style.marginLeft);
	var leftL = parseFloat(autoShow[0].style.marginLeft) - parseFloat(lis_w);
	leftL = Number(leftL.toFixed(2));
	// console.log(leftL)
	function animate(){
		var autoShowL = parseFloat(autoShow[0].style.marginLeft); 
		moveL++;
		console.log(autoShowL - leftL,leftL)
		if(autoShowL > leftL){
			if(autoShowL - moveL <leftL){
				autoShow[0].style.marginLeft = autoShowLpass - lis_w + 'px';
				setTimeout(arguments.callee,interval);
			}else{

				autoShow[0].style.marginLeft = autoShowL - moveL + 'px';
				setTimeout(arguments.callee,interval);
			}

		}else{
			if(autoShowL <= -lis_w * (lis.length-3)){

				autoShow[0].style.marginLeft = -(lis_w-con_w*0.1) + 'px';
			}
			animated=false;
		} 
	}
	animate();
}

function changeShow(){
	for(var i=0;i<lis.length;i++){
		if(change == i){
			lis[change].style.padding = 0 + 'px';
		}else{
			lis[i].style.padding = 10 +'px';
		}
	}
}

function autoplay(){
	console.log(1);
	if(animated){return };
	
	change++;
	run();
	changeShow();
	if(change>=lis.length-3){change=0;}
	handler=setTimeout(arguments.callee,2000);
}
autoplay();

document.ontouchstart = function(){
	clearTimeout(handler);
	alert(1);
}
document.ontouchend = function(){
	autoplay();
	alert(2);
}


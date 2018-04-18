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

var marginLeftNow=0;
console.log(container[0].offsetHeight,container[0].clientHeight);
	autoShow[0].style.marginLeft = -(lis_w-con_w*0.1)+'px';
// 运行主函数
function run(marginLeftNow,offset){
	animated = true;
	var moveL = offset/(time/interval);//每次移动的距离
	var autoShowLpass = parseFloat(autoShow[0].style.marginLeft);
	var leftL = marginLeftNow + offset;
	leftL = Number(leftL.toFixed(2));
	// console.log(moveL)
	function animate(){
		var autoShowL = parseFloat(autoShow[0].style.marginLeft);
		var autoShowL_move =  autoShowL - moveL;
		moveL<0 ? moveL-- : moveL++;
		// console.log(moveL)
		if(autoShowL > leftL || autoShowL < leftL ){
			if(autoShowL_move <leftL && autoShowL > leftL || autoShowL_move > leftL && autoShowL < leftL){
				// console.log(1);
				autoShow[0].style.marginLeft = marginLeftNow + offset + 'px';
				setTimeout(arguments.callee,interval);
			}else{
				autoShow[0].style.marginLeft = autoShowL + moveL + 'px';
				setTimeout(arguments.callee,interval);
			}
		}else{
			if(autoShowL >=0){
				autoShow[0].style.marginLeft = -(lis_w-con_w*0.1) - lis_w * (lis.length-4) + 'px';
			}else if(autoShowL <= -lis_w * (lis.length-3)){
				autoShow[0].style.marginLeft = -(lis_w-con_w*0.1) + 'px';
			}
			animated=false;
			// console.log(autoShowL)
			// autoplay();
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
changeShow();
function autoplay(){
	
	if(animated){return };
	// console.log(1);
	marginLeftNow = parseFloat(autoShow[0].style.marginLeft);
	change++;
	run(marginLeftNow,-lis_w);
	changeShow();
	if(change>=lis.length-3){change=0;}
	
	handler=setTimeout(autoplay,2000);
}
var X=0;
autoShow[0].ontouchstart = function(e){
	clearTimeout(handler);
	if(animated){return };
	e = e || window.e;
	e.preventDefault();
	startX = e.touches[0].clientX;
	marginLeftNow = parseFloat(autoShow[0].style.marginLeft);
}
autoShow[0].ontouchmove = function(e){
	clearTimeout(handler);
	if(animated){return };
	e = e || window.e;
	e.preventDefault();
	endX = e.touches[0].clientX;
	X = endX - startX;
	if(X<0 && X <= -lis_w){
		X = -lis_w;
	}else if( X>0 && X >= lis_w){
		X = lis_w;
	}
    autoShow[0].style.marginLeft = marginLeftNow + X + 'px';

}
autoShow[0].ontouchend = function(e){
	clearTimeout(handler);
	e = e || window.e;
	e.preventDefault();
	console.log("start"+change,X);
	if(animated){return };
	if(X>0){
		change--;
		if(change < 1){console.log(5); change=lis.length-3;}
		console.log("endX"+change);
		changeShow();
		run(marginLeftNow,lis_w);
		console.log('右');
	}else{
		change++;
		if(change>lis.length-3){change=1;}
		changeShow();
		run(marginLeftNow,-lis_w);
		console.log('左');
	}
	handler=setTimeout(autoplay,2000);
	
}
autoplay();



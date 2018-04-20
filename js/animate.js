// 
// 

var container = document.getElementsByClassName('container');//容器
var lis = document.getElementsByTagName('li');//图片集
var autoShow = document.getElementsByClassName('autoShow');
var time=10000,index=0,interval=10,animated=false,change=1,handler;
show = document.createElement('div');
show.style.textAlign = 'center';
document.body.appendChild(show);
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
			setTimeout(function(){
				animated =false;
			},500);
			// animated=false;
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
	if(animated){return false};
	marginLeftNow = parseFloat(autoShow[0].style.marginLeft);
	change++;
	if(change>lis.length-3){change=1;}
	run(marginLeftNow,-lis_w);
	changeShow();
	handler=setTimeout(autoplay,1500);
}
var X=0,slidingstate=0,z=0,end1=0,end2=0,screen=false;
autoShow[0].ontouchstart = function(e){//手指触发
	e = e || window.e;
	e.preventDefault();
	clearTimeout(handler);
	if(screen){return;}
	if(animated){return;}
	if(slidingstate==0){
		slidingstate=1;
		startX = e.touches[0].pageX;
		marginLeftNow = parseFloat(autoShow[0].style.marginLeft);
	}
}
autoShow[0].ontouchmove = function(e){
	e = e || window.e;
	clearTimeout(handler);
	if (e.touches) {
        pointerData = e.touches[0];
     } else {
        pointerData = e;
     }
     endX = pointerData.pageX;
     show.innerHTML =endX;
     X = endX-startX;
	if(slidingstate==1 && X!=0){
		slidingstate=2;
	}
	if(slidingstate==2){
		e.preventDefault();
		if(X<0 && X <= -lis_w){
			X = -lis_w;
		}else if( X>0 && X >= lis_w){
			X = lis_w;
		}
	    autoShow[0].style.marginLeft = marginLeftNow + X + 'px';
	}
}
autoShow[0].ontouchend = function(e){
	e = e || window.e;
	e.preventDefault();
	if(slidingstate==2){
		console.log('run');
		screen=true;
		slidingstate=0;
		if(X>0){
			change--;
			if(change < 1){change=lis.length-3;}
			changeShow();
			run(marginLeftNow,lis_w);
		}else if(X<0){
			change++;
			if(change>lis.length-3){change=1;}
			changeShow();
			run(marginLeftNow,-lis_w);
		}
		setTimeout(function(){
			screen = false;
		},500)
		handler=setTimeout(autoplay,1500);	
	}
	slidingstate=0;
}
autoplay();



window.onload=function(){
    //JS简单绑定
    var $$=function(num){
        if(num.substring(0,1) == "."){
            return document.getElementsByClassName(num.substring(1,num.length));
        }else if(num.substring(0,1) == "#"){
            return document.getElementById(num.substring(1,num.length));
        }else{
            return document.getElementsByTagName(num);
        }
    }
    //兼容性
    var eventuntil={
        addhandler:function(element,type,handler){
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
                element.attachEvent("on"+type,handler);
            }else{
                element["on"+type]=handler;
            }
        },
        getevent:function(event){
            return window.event || event;
        }
    }

//JS无缝轮播
    var JSbanner = function(){
        var banner_imgs=$$(".banner-imgs1")[0].children;//绑定图片集
        var banner_main1=$$(".banner-main1")[0];//绑定大盒子
        var main_left=$$(".main-left")[0];//绑定左按钮
        var main_right=$$(".main-right")[0];//绑定右按钮
        var main_li=banner_main1.getElementsByTagName("ul")[0].children;//绑定小圆点集
        var banner_w=parseFloat(banner_main1.clientWidth);//大盒子宽度
        var banner_h=parseFloat(banner_main1.clientHeight)-50;//大盒子高度
        var animated=false,index= 0,isplay=false,//监测轮播动画运行
            time=1000,//运行时间 offset是运行的距离，是一个距离参数(可修改数值来改变轮播速度！)
            interval=10;//间隔时间
        console.log(banner_main1.clientWidth);
        for(var i=0;i<banner_imgs.length;i++){//设置图片的大小和显示框大小一样；
            banner_imgs[i].style.width=banner_w+"px";
            banner_imgs[i].style.height=banner_h+"px";
        }
    //运行轮播动画函数
        function animate(offset){
            animated=true;
            var left=parseFloat($$(".banner-imgs1")[0].style.marginLeft)+offset;
            var move_w=offset/(time/interval);//每次移动的距离
            function run(){
                mainLeft=parseFloat($$(".banner-imgs1")[0].style.marginLeft);//大盒子宽度
                if(move_w<0 && mainLeft>left || move_w>0 && mainLeft<left){
                    $$(".banner-imgs1")[0].style.marginLeft=mainLeft+move_w+"px";
                    setTimeout(arguments.callee,interval);
                }else{
                    if(mainLeft>=0){
                        $$(".banner-imgs1")[0].style.marginLeft=-banner_w*(banner_imgs.length-2)+"px";
                    }else if(mainLeft<=-banner_w*(banner_imgs.length-1)){
                        $$(".banner-imgs1")[0].style.marginLeft=-banner_w+"px";
                    }
                    animated=false;}}run();
        }
        function btn(){//圆点变化函数
            for(var j=0;j<main_li.length;j++){
                if(main_li[j].className == "active"){
                    main_li[j].className = "";
                }
                main_li[index].className="active";}}
        main_right.onclick=function(){//右键点击，向左移动
            clearInterval(handtime);
            if(animated){return;}
            index++;
            if(index>=main_li.length){index=0;}
            btn();
            animate(-banner_w);
            handtime = setInterval(atuoplay,1000);
        }
        main_left.onclick=function(){//左键点击，向右移动
            clearInterval(handtime);
            if(animated){return;}
            index--;
            if(index<0){index=main_li.length-1;}
            btn();
            animate(banner_w);
            handtime = setInterval(atuoplay,1000);
        }
        for(var j=0;j<main_li.length;j++){//圆点点击运行轮播函数
            main_li[j].setAttribute("index",j);//添加序列号
            main_li[j].onclick=function(){
                clearInterval(handtime);
                if(animated){return;}
                var currentindex=parseInt(this.getAttribute("index"));//获取序列号的值
                var offset = -banner_w*(currentindex-index),len=Math.abs(currentindex-index);
                //time=time*len;
                animate(offset);
                //time=time/len;
                index = currentindex;
                btn();}}
        //自动轮播
        function atuoplay(){
                if(animated){return;}
                index++;
                if(index>=main_li.length){index=0;}
                btn();
                animate(-banner_w);
        }
        var handtime = setInterval(atuoplay,1000);
    }
    JSbanner();
}

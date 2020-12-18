var EventUtil = {
    // 事件兼容处理
    addhandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    removehandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type] = null;
        }
    },
};

let OtherUtil = {
    getComputedStyle:function(ele,attr){
        if(ele.currentStyle){
            return ele.currentStyle[attr];
        }else{
            return window.getComputedStyle(ele)[attr];
        }
    },
    getDocumentScrollLeft:function(){
        return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft;
    },
    getDocumentScrollTop:function(){
        return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
    },
    animate:function(obj,target,step=10,state=false,fre=30,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            if(state){
                //缓动动画
                step = (target-obj.offsetLeft)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                if(obj.offsetLeft==target){
                    clearInterval(obj.timer);
                    callback&&callback();
                }
            }else{
                //匀速动画
                if(obj.offsetLeft>=target){
                    clearInterval(obj.timer);
                    callback&&callback();
                }
            }
            obj.style.left = obj.offsetLeft+step+"px";
        },fre);
    },
    changeOpacity:function (obj,target,step=2,fre=30,callback) {
        clearInterval(obj.timer);
        obj.opa = 100;
        obj.timer = setInterval(function () {
            if (obj.opa<= target){
                obj.opa = target;
                clearInterval(obj.timer);
                callback&&callback();
            }else{
                obj.opa-=step;
            }
            obj.style.opacity = (obj.opa/100).toFixed(2);
            obj.style.filter = `alpha(opacity=${obj.opa})`;
        },fre);
    }
};
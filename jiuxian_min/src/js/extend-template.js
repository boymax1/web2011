/*
* 放大镜插件：
* 1.原始图框、放大镜图框、图片列表尺寸可自定义
* 2.当图片列表中添加的图片宽度总和超过列表宽度时，自动产生幻灯片效果
* */

class ExtendTemplate {
    liDefault = {
        float: "left",
        boxSizing: "border-box",
        width: "64px",
        height: "64px",
        padding: "3px",
        cursor: "pointer",
        marginLeft: "6px",
        marginRight: "6px",
        border: "2px solid transparent"
    };
    liStyleState = true;
    default = {
        originalInfo:{
            width: "350px",
            height: "350px",
            borderWidth: "2px",
            borderColor: "red",
            borderStyle: "solid",
            padding: "10px"
        },
        extendInfo:{
            width: "540px",
            height: "540px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "red",
            left: "354px",
            top: "0px",
            visibility: "hidden",
            zIndex:"99999"
        },
        extendImg:{
            backgroundSize: "800px 800px"
        },
        showList:{
            width: "354px",
            height: this.liDefault.height,
            marginTop: "5px",
            marginBottom: "5px",
            overflow: "hidden"
        },
        cursorStyle:{
            position: "absolute",
            left: "0",
            top: "0",
            width: "200px",
            height: "200px",
            backgroundColor: "#fede4f",
            opacity: "0.5",
            filter: "alpha(opacity=50)",
            cursor: "move",
            visibility: "hidden"
        }
    };
    constructor(elem,options) {
        this.elem=elem;
        this.options=options||{};
        this.init();
    }
    init(){
        //重置参数
        this.changeOptions(this.default,this.options);
        // 页面绘制
        this.showHTML();
        // 悬浮切换图片
        this.listChange();
        // 放大镜效果
        this.playerExtend();
    }
    changeOptions(oldOptions,NewOptions){
        //重置参数
        for( let tempKey in NewOptions){
            if(oldOptions.hasOwnProperty(tempKey+"")&&NewOptions[tempKey+""] instanceof Object){
                for(let myKey in NewOptions[tempKey+""]){
                    if(oldOptions[tempKey+""][myKey+""]){
                        oldOptions[tempKey+""][myKey+""] = NewOptions[tempKey+""][myKey+""];
                    }
                }
            }else{
                if(oldOptions[tempKey+""]){
                    oldOptions[tempKey+""] = NewOptions[tempKey+""];
                }
            }
        }
    }
    showHTML(){
        //绘制页面：放大镜框，原图片框，图片列表框
        this.elem.style.position = "relative";
        let frag = document.createDocumentFragment();

        let pic = document.createElement("div");
        this.setCss(pic,this.default.originalInfo);
        let cursor = document.createElement("span");
        this.setCss(cursor,this.default.cursorStyle);
        pic.appendChild(cursor);
        frag.appendChild(pic);
        this.pic = pic;
        this.cursor = cursor;

        let div = document.createElement("div");
        this.div = div;
        this.setCss(div,this.default.showList);
        frag.appendChild(div);

        let ex = document.createElement("div");
        ex.style.position = "absolute";
        this.setCss(ex,this.default.extendInfo);
        frag.appendChild(ex);
        this.ex = ex;

        this.elem.appendChild(frag);
    }
    listChange(){
        //悬浮切换图片
        let that = this;
        this.div.onmouseover=function(e){
            let event = e||window.event;
            let target = event.target||event.srcElement;
            while (target.nodeName!=="LI"){
                target=target.parentNode?target.parentNode:"";
                if(target){
                    break;
                }
            }
            if(target.nodeName==="LI"){
                Array.from(that.div.firstElementChild.children).forEach(function(item){
                    item.style.borderColor = "transparent";
                });
                that.changeOriginal(target.children[0].src);
                target.style.borderColor = "#c00";
            }
        }
    }
    playerExtend(){
        // 放大镜效果
        let that = this;
        this.pic.addEventListener("mouseover",function(e){
            let event = e||window.event;
            that.pic.firstElementChild.style.visibility = "visible";
            that.ex.style.visibility = "visible";
        });
        this.pic.addEventListener("mouseout",function(e){
            let event = e||window.event;
            that.pic.firstElementChild.style.visibility = "hidden";
            that.ex.style.visibility = "hidden";
        });
        this.pic.addEventListener("mousemove",function(e){
            let event = e||window.event;
            let x = event.pageX-that.elem.offsetLeft;
            let y = event.pageY-that.elem.offsetTop;
            let spanX = x-that.pic.firstElementChild.offsetWidth/2+this.clientLeft;
            let spanY = y-that.pic.firstElementChild.offsetHeight/2+this.clientTop;
            let spanYMax = this.clientHeight-this.firstElementChild.offsetHeight+this.clientTop;
            let spanXMax = this.clientWidth-this.firstElementChild.offsetWidth+this.clientLeft;
            let imgSize=null;
            if(window.getComputedStyle){
                imgSize=(window.getComputedStyle(that.ex).backgroundSize).split(" ");
            }else{
                imgSize=(that.ex.currentStyle.backgroundSize).split(" ");
            }
            let foldX = (parseInt(imgSize[0].slice(0,-2))-that.ex.clientWidth)/(spanXMax);
            let foldY = (parseInt(imgSize[1].slice(0,-2))-that.ex.clientHeight)/(spanYMax);
            // 水平方向
            if(spanX<=this.clientLeft){
                spanX = this.clientLeft;
            }else if(spanX>=spanXMax){
                spanX=spanXMax;
            }
            //垂直方向
            if(spanY<=this.clientTop){
                spanY=this.clientTop;
            }else if(spanY>=spanYMax){
                spanY=spanYMax;
            }
            this.firstElementChild.style.left = spanX+"px";
            this.firstElementChild.style.top = spanY+"px";
            that.ex.style.backgroundPositionX = -spanX*foldX+"px";
            that.ex.style.backgroundPositionY = -spanY*foldY+"px";
        });
    }
    setCss(ele,options){
        //添加样式
        for(let tempKey in options){
            ele.style[tempKey+""]=options[tempKey+""]
        }
    }
    addPic(arr,options){
        //自定义添加图片
        options = options||{};
        this.changeOptions(this.liDefault,options);
        let ul = document.createElement("ul");
        ul.className = "clearfix";
        for(let item of arr){
            let li = document.createElement("li");
            this.setCss(li,this.liDefault);
            let img = document.createElement("img");
            img.style.width = "100%";
            img.style.height = "100%";
            img.src = item;
            li.appendChild(img);
            ul.appendChild(li);
        }
        ul.children[0].style.borderColor= "#c00";
        this.div.appendChild(ul);
        this.changeOriginal(ul.children[0].children[0].src);
        this.ppt();
    }
    changeOriginal(src){
        //自定义切换图片
        if(this.pic.children.length<=1){
            let img = document.createElement("img");
            img.src = src;
            img.style.width = "100%";
            img.style.height = "100%";
            this.pic.appendChild(img);
        }else{
            this.pic.lastElementChild.src = src;
        }
        this.ex.style.backgroundSize = this.default.extendImg.backgroundSize;
        this.ex.style.backgroundImage = `url(${src})`;
    }
    ppt() {
        // 当添加的图片超过所设宽度时，生成幻灯片
        let that = this;
        let tempUl = this.div.children[0].children;
        let ulWidth = tempUl.length * (parseFloat(this.liDefault.width.slice(0, -2)) + parseFloat(this.liDefault.marginRight.slice(0, -2))+parseFloat(this.liDefault.marginLeft.slice(0, -2)));
        //以下减去2个箭头的宽度30
        let pos = 30;//左箭头宽度就是初始位置
        let step = that.div.offsetWidth - pos*2;
        let count = Math.ceil(ulWidth / step);

        this.div.children[0].style.width = count * step + "px";
        this.div.style.boxSizing = "border-box";
        this.div.style.position = "relative";
        this.div.children[0].style.position = "absolute";
        this.div.children[0].style.left = pos+"px";

        // 生成切换左箭头
        let arrowLeft = document.createElement("a");
        arrowLeft.href = "javascript:;";
        arrowLeft.className = "extend-arrow extend-arrow-l";
        arrowLeft.innerHTML = "<i></i>";

        // 生成切换右箭头
        let arrowRight = document.createElement("a");
        arrowRight.href = "javascript:;";
        arrowRight.className = "extend-arrow extend-arrow-r";
        if (ulWidth > this.div.offsetWidth) {
            arrowRight.className = "extend-arrow extend-arrow-rbg";
        }
        arrowRight.innerHTML = "<i></i>";

        this.div.appendChild(arrowLeft);
        this.div.appendChild(arrowRight);
        this.div.children[2].onclick = func;

        function func(){
            console.log(count,step,pos);
            // if(pos>-(count-1)*step)
            if(pos-step>-(count-1)*step){
                pos-=step;
                that.div.children[0].style.left = pos+"px";
                if(pos<=-(count-1)*step+30){
                    this.className = "extend-arrow extend-arrow-r";
                    that.div.children[1].className = "extend-arrow extend-arrow-lbg";
                    this.onclick = null;
                }
            }
            that.div.children[1].onclick = function (){
                if(pos+step<30){
                    pos+=step;
                    that.div.children[0].style.left = pos+"px";
                    if(pos>=30){
                        this.className = "extend-arrow extend-arrow-l";
                        that.div.children[2].className = "extend-arrow extend-arrow-rbg";
                        this.onclick = null;
                    }
                }
                that.div.children[2].onclick = func;
            }
        }
    }
}

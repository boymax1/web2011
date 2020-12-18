let inner = document.getElementsByClassName("inner-width1200");
changeInner(inner);
window.onresize = function () {
    changeInner(inner)
};
function changeInner(elements){
    let temp = "1200px";
    if(window.innerWidth<1217){
        temp="1000px";
        changeNavPadding(true);
    }else{
        changeNavPadding(false);
    }
    for (let item of elements){
        item.style.width = temp;
    }
}
function changeNavPadding(state){
    if(document.getElementsByClassName("page-nav-content")[0]){
        let pageNav = document.getElementsByClassName("page-nav-content")[0].children;
        if (state){
            for(let item of pageNav){
                item.style.padding="0 15px";
            }
        }else{
            for(let item of pageNav){
                item.style.padding="0 22px";
            }
        }
    }
}
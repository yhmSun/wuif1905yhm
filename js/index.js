window.onload = function () {
    let home = document.getElementById('home')
    home.onmouseenter = function () {
        home.style.color = '#FF991A';
    };
    home.onmouseleave = function () {
        home.style.color = '#ffffff';
    };

    //diary上方
    let diaryList=document.querySelectorAll('.diaryList>a');
    for(var i=0;i<diaryList.length;i++) {
        diaryList[i].onclick = (function (i) {
            return function () {
                for (let j = 0; j < tabList.length; j++) {
                    diaryList[j].classList.remove('hot');
                }
                diaryList[i].classList.add('hot');
            }
        })(i)
    }

    //标题显示
    let tabList = document.querySelectorAll('.tabList > li');
    tabList.forEach(function (elem,index) {
        elem.onmouseenter = function () {
            for(let i=0;i<tabList.length;i++){
                tabList[i].classList.remove('hot');
            }
            this.classList.add('hot');
        }
    })

    //轮播图下点
    let btnList = document.getElementsByClassName('btnList');
    let lis = btnList[0].getElementsByTagName('li');
    // for(let i=0;i<lis.length;i++){
    //     lis[i].onmouseenter = function () {
    //         this.style.backgroundColor = '#04b680';
    //     }
    //     lis[i].onmouseleave = function () {
    //         this.style.backgroundColor = '#ffffff';
    //     }
    // }

    //轮播图
    let current = 0, next = 0;
    let rightBtn = document.querySelector('.rightBtn');
    let leftBtn = document.querySelector('.leftBtn');
    let bannerImg = document.querySelectorAll('.bannerImg>li');
    let w = bannerImg[0].offsetWidth;
    let flag = true;

    // let rightBtn = document.querySelector('.rightBtn');
    // let bannerImg = document.querySelectorAll('.bannerImg>li');
    // rightBtn.onclick = function () {
    //     index++;
    //     if(index == bannerImg.length){
    //         index = 0;
    //     }
    //     bannerImg.forEach(function (elem) {
    //         elem.style.zIndex = 1;
    //     });
    //     bannerImg[index].style.zIndex = 999;
    // }

    // let leftBtn = document.querySelector('.leftBtn');
    // leftBtn.onclick = function () {
    //     index--;
    //     if(index < 0){
    //         index = bannerImg.length-1;
    //     }
    //     bannerImg.forEach(function (elem) {
    //         elem.style.zIndex = 1;
    //     });
    //     bannerImg[index].style.zIndex = 999;
    // }

    rightBtn.onclick = function(){
        if (!flag){
            return;
        }
        flag = false;
        next++;
        if(next == bannerImg.length){
            next = 0;
        }
        bannerImg[next].style.left = w+'px';
        lis[current].classList.remove('lag');
        lis[next].classList.add('lag');
        animate(bannerImg[current],{left:-w});
        animate(bannerImg[next],{left:0},function () {
            flag = true;
        });


        current = next;
    };
    leftBtn.onclick = function(){
        if (!flag){
            return;
        }
        flag = false;
        next--;
        if(next < 0){
            next = bannerImg.length - 1;
        }
        bannerImg[next].style.left = -w+'px';
        lis[current].classList.remove('lag');
        lis[next].classList.add('lag');
        animate(bannerImg[current],{left:w});
        animate(bannerImg[next],{left:0},function(){
            flag = true;
        });
        current = next;
    };



    //轮播移入移出
    let bannerLeft = document.querySelector('.bannerLeft');
    let t = setInterval(rightBtn.onclick,1000);
    bannerLeft.onmouseenter = function () {
        clearInterval(t);
    };
    bannerLeft.onmouseleave = function () {
        t = setInterval(rightBtn.onclick,1000);
    };
    // for(var i=0;i<lis.length;i++){
    //     lis[i].yhm = i;
    //     lis[i].onclick = function () {
    //         Array.prototype.forEach.call(lis,function (elem) {
    //             elem.classList.remove('lag');
    //         });
    //         bannerImg.forEach(function (ele) {
    //             ele.style.zIndex = 1;
    //         });
    //         this.classList.add('lag');
    //         bannerImg[this.yhm].style.zIndex = 999;
    //     }
    // }

    for (let i=0;i<lis.length;i++){
        lis[i].onclick = function () {
            if (current == i){
                return;
            }
            next = i;
            if (next > current){
                bannerImg[next].style.left = -w+'px';
                animate(bannerImg[current],{left:-w});
                animate(bannerImg[next],{left:0});
            }else{
                bannerImg[next].style.left = -w+'px';
                animate(bannerImg[current],{left:w});
                animate(bannerImg[next],{left:0});
            }

            lis[current].classList.remove('lag');
            lis[next].classList.add('lag');

            current = next;

        }
    }


    // 加载
    let viewH=window.innerHeight;
    let imgs=document.querySelectorAll('.lazyLoad');
    let positionArr=[];
    imgs.forEach(function (ele) {
        let t = ele.offsetTop;
        let parent=ele.offsetParent;
        t += parent.offsetTop;

        while (parent.nodeName.toLowerCase()!=="body") {
            parent = parent.offsetParent;
            t+=parent.offsetTop;
        }
        // console.dir(parent.nodeName.toLowerCase());
        // console.log(ele.offsetTop);
        positionArr.push(t);
    });
    // console.log(positionArr);
    window.onscroll = function () {
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        for (let i=0;i<positionArr.length;i++){
            // console.log(viewH);
            // console.log(scrolltop);
            // console.log(positionArr[i]);
            // console.log('-----');
            if (scrolltop + viewH >= positionArr[i]+50){
                if (!imgs[i].src){
                    imgs[i].src=imgs[i].getAttribute('aa');
                }

            }
        }

    }


}


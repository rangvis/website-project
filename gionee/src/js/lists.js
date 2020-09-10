var mob_data = [{
        id: 11,
        img: "https://imggn.gionee.com/images/201709/thumb_img/1333_thumb_G_1506390590934.jpg",
        title: "金立M7",
        deploy: ".01英寸超清全面屏，内置双安全加密芯片",
        price: "￥2499",
    }, {
        id: 22,
        img: "https://imggn.gionee.com/images/201709/thumb_img/1335_thumb_G_1506130536566.jpg",
        title: "大金钢2",
        deploy: "6.0英寸高清全面屏",
        price: "￥1799"
    }, {
        id: 33,
        img: "https://imggn.gionee.com/images/201711/thumb_img/1375_thumb_G_1511678649447.jpg",
        title: "金立F6",
        deploy: "5.7英寸高清全面屏，四曲面机身",
        price: "￥1399"
    }, {
        id: 44,
        img: "https://imggn.gionee.com/images/201711/thumb_img/1377_thumb_G_1511673352932.jpg",
        title: "金立金钢3",
        deploy: "5.5英寸高清全面屏，4000mAh大电量",
        price: "￥1199"
    }, {
        id: 55,
        img: "https://imggn.gionee.com/images/201711/thumb_img/1381_thumb_G_1511700918867.jpg",
        title: "金立M7 Plus",
        deploy: "6.0英寸高清全面屏",
        price: "￥2399"
    }, {
        id: 66,
        img: "https://imggn.gionee.com/images/201711/thumb_img/1383_thumb_G_1511702061752.jpg",
        title: "金立S11S",
        deploy: "四摄全面屏，更美更清晰",
        price: "￥3299"
    }, {
        id: 77,
        img: "https://imggn.gionee.com/images/201711/thumb_img/1385_thumb_G_1511702557312.jpg",
        title: "金立S11",
        deploy: "四摄全面屏，更美更清晰",
        price: "￥1899"
    }, {
        id: 88,
        img: "https://imggn.gionee.com/images/201706/thumb_img/1281_thumb_G_1496972484690.jpg",
        title: "金立S10",
        deploy: "四摄拍照,前置2000万+800万双摄,硬件级实时虚化",
        price: "￥2299"
    },
    {
        id: 99,
        img: "https://imggn.gionee.com/images/201705/thumb_img/1285_thumb_G_1495789626341.jpg",
        title: "金立S10B",
        deploy: "柔光双摄，实时虚化，3700mAh电池",
        price: "￥2199"
    }, {
        id: 1010,
        img: "https://imggn.gionee.com/images/201706/thumb_img/1301_thumb_G_1496903014131.jpg",
        title: "金立S10C1600万柔光自拍更美",
        deploy: "1600万柔光自拍更美",
        price: "￥1399"
    }, {
        id: 1111,
        img: "https://imggn.gionee.com/images/201706/thumb_img/1305_thumb_G_1497941104138.jpg",
        title: "金立F106L",
        deploy: "双卡全网通4G Volte,5英寸高清屏幕,2GB+16GB内存",
        price: "￥999"
    }, {
        id: 1212,
        img: "https://imggn.gionee.com/images/201706/thumb_img/1309_thumb_G_1498303123135.jpg",
        title: "金钢2D",
        deploy: "4000mAh电池，全网通4G VoLTE，3GB运存",
        price: "￥1299"
    }
]

// 循环遍历 数据， 然后渲染到页面中
mob_data.forEach(function(item) {
    JmobileList.innerHTML += `<li class="mob_pro" id="${item.id}"> 
        <a class="ui_pimg"> 
        <img src="${item.img}"> 
        </a> 
        <p class="ui_pname"> 
        <a class="ui_title"> ${item.title}<span class="ui_pslogan">${item.deploy}</span></a>
        </p> 
        <p class="ui_price"><span class="ui_pprice"><span>${item.price}</span></span></p>
        </li>`
})

var list = document.getElementsByTagName('li')
for (var i = 0; i < list.length; i++) {
    list[i].onclick = function() {
        open('details.html?id=' + this.getAttribute('id'))
    }
}

// 右侧返回顶部通栏 
$(document).ready(function() {
    //当点击跳转链接后，回到页面顶部位置
    $(".backTop").click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});
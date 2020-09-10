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

// (function() {
//     // 1. 获取数据;
//     var data_json = localStorage.getItem("cart");
//     // 如果不存在数据则不需要执行功能;
//     if (!data_json) return false;

//     // 2. 数据转换; JSON => 对象;
//     var data = JSON.parse(data_json);
//     console.log(data)


// })()
mob_data.forEach(function(item) {
    contain.innerHTML +=
        `
        <div class="box">
                <img src="${item.img}" alt="">
                <p class="txt">${item.title}${item.deploy}</p>
                <p class="txt">数量 : 1</p>
                <p class="txt">${item.price}</p>
            </div>
        
        `

})
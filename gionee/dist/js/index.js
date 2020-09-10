// 百度模糊搜索:
// 1. 输入框事件触发 input
// 2. 数据改变就发起请求 => 后端发起请求;
// 3. 拿到数据,渲染页面;
// 函数去抖 ; 
$(".search-list").hide()
var t = null;
$("#search_nr").on("input", function() {
    clearInterval(t);
    // 1. 获取数据;
    var search_value = this.value;
    t = setTimeout(function() {
        t = null;
        if (!search_value) {
            $(".search-list").hide()
            return false;
        }

        console.log(search_value) // 已经测试没有问题;
            // 2. 发送请求;
        ajax({
                method: "jsonp",
                url: "https://www.baidu.com/sugrec",
                data: {
                    pre: 1,
                    p: 3,
                    ie: "utf-8",
                    json: 1,
                    prod: "pc",
                    from: "pc_web",
                    sugsid: "32218,1425,31672,32139,31254,32045,32230,32299,31639",
                    wd: search_value,
                    req: 2,
                    csor: 5,
                    cb: "callback",
                    _: Date.now()
                }
            })
            .then(function(res) {
                console.log(res); //已经测试没有问题;
                var list = res.g;
                console.log(list);
                //逻辑 : 根据 list是否为空判定 search-list 的显示隐藏;
                if (list) {
                    // 让元素显示出来;
                    $(".search-list").show()
                } else {
                    // 让元素隐藏;

                    $(".search-list").hide()
                        // 如果没有数据需要渲染则隐藏掉下拉列表;
                        // return false;
                }
                // 拼接页面;
                var html = "";
                list.forEach(function(item) {
                    html += `<li>${item.q}</li>`
                })
                $(".search-list").html(html);

                console.log(html);
            })
    }, 50)
})


// swiper 轮播图
var sw = new Swiper(".swiper-container", {
    // 无限循环;
    loop: true,
    // 按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 分页器
    pagination: {
        el: '.swiper-pagination',
    },
    effect: "file",
    autoplay: true,

});


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
var d = location.search;

d = d.substring(1) // 截取的是?之后的所有字符
var arr = d.split('=');
var obj = {};
obj[arr[0]] = arr[1];
// 拿id的属性值 去数据库匹配
var res = mob_data.filter(function(item, index) {
    return item.id == obj.id
})

var sl_wapper = document.querySelector(".sl_wapper");
// 渲染页面
sl_wapper.innerHTML = render(res);

function render(res) {
    var content = ''
    res.forEach(function(item, index) {
        content += `
        <div class="wrapper">
            <div class="vi_mainShow c">
                <div class="vi_sumary">
                    <h1 class="name" id="goodName"><a href="#">${item.title}</a></h1><span id="JgoodsId" class="fn_hidden">1253</span>
                    <p class="slogan">${item.deploy}</p>
                    <div class="w3_goods_infos">
                        <div class="price">
                            <span class="ue_jstfy" style="letter-spacing: 24px;">现价</span><em class="z w3_mr">：</em><span class="price_sale"><span">${item.price}</span></span>
                        </div>
                    </div>

                    <dl class="vi_attribute">
                        <dt class="lbl"><span class="ue_jstfy" style="letter-spacing: 24px;">颜色</span><em
                                class="z">：</em></dt>
                        <dd class="cont">
                            <span class="vi_color curr dis" good_price="" title="墨玉黑">
                                <img src="${item.img}"
                                    width="35" height="35" alt="金立M6S Plus墨玉黑">
                                <b class="sel"></b>
                            </span>
                        </dd>
                    </dl>
                    <dl class="vi_attribute">
                        <dt class="lbl"><span class="ue_jstfy" style="letter-spacing: 24px;">版本</span><em
                                class="z">：</em></dt>
                        <dd class="cont">
                            <span good_price="" title="64G" class="dis curr">64G</span>
                            <span good_price="700" title="256G" class="dis">256G</span>
                        </dd>
                    </dl>

                    <dl class="vi_quantity">
                        <dt class="lbl jstfy"><span class="ue_jstfy">购买数量</span><em class="z">：</em></dt>
                        <dd class="cont">
                            <div class="ui_quantity" id="Jquantity">
                                <div class="ui_quantity_redu ui_quantity_redu_dis"></div>
                                <input type="text" class="ui_quantity_num" id="iptQuantityQum" value="1">
                                <div class="ui_quantity_add"></div>
                            </div>
                        </dd>
                    </dl>
                    <button class="add_cart"> <a href="./cart.html">加入购物车</a></button>
                </div>


                <div class="container" id="JviImgs">
                    <!-- 左侧放大镜容器 -->
                    <div class="small">
                        <!-- 贴膜 -->
                        <div class="wrap"></div>
                        <!-- 左侧放大镜图片 -->
                        <img src="${item.img}" init_src="${item.img}" width="350" height="350" alt="">
                        <!-- 小盒子 -->
                        <span class="grayBox"></span>
                    </div>
                    <!-- 左边小图 -->
                    <div class="choice-btn">
                        <li data_src="${item.img_min1}" class="item"><img src="${item.img_min1}" orial_src="${item.img_min1}" width="50" height="50" ></li>
                        <li data_src="${item.img_min2}" class="item"><img src="${item.img_min2}" orial_src="${item.img_min2}" width="50" height="50"></li>
                        <li data_src="${item.img_min3}" class="item"><img src="${item.img_min3}" orial_src="${item.img_min3}" width="50" height="50"></li>
                        <li data_src="${item.img_min4}" class="item"><img src="${item.img_min4}" orial_src="${item.img_min4}" width="50" height="50"></li>
                        <li data_src="${item.img_min5}" class="item"><img src="${item.img_min5}" orial_src="${item.img_min5}" width="50" height="50"></li>
                    </div5
                </div5
                <!-- 右边存放图片放大的容器 -->
                <div class="big">
                    <img src="${item.img}" init_src="${item.img}" alt="">
                </div>
            </div>

        </div>
        
        `
    })
    return content;
}

(function() {
    // 获取购物车 localStorage数据;
    var cart_json = localStorage.getItem("cart");
    var cart_data = cart_json ? JSON.parse(cart_json) : {};



})()


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

// 放大镜

function Magnifier() {
    // 正方形小盒子
    this.square = $(".grayBox");
    // 小盒子容器
    this.small = $(".small");
    // 小图 ;
    this.small_img = $(".small img");
    // 大盒子容器
    this.big = $(".big");
    // 大图片
    this.big_img = $(".big img");
    // 找到按钮 
    this.index = 0;
    this.btns = $(".choice-btn img");


    this.square_size = {
        width: parseInt((this.square).width()),
        height: parseInt((this.square).height()),
    }

    // 获取小盒子宽高;
    this.small_size = {
            width: this.small.width(),
            height: this.small.height(),
        }
        // 获取大容器的宽高;
    this.big_size = {
            width: parseInt((this.big).width()),
            height: parseInt((this.big).height())
        }
        // 大图片的宽高;
    this.big_img_size = {
        width: parseInt((this.big_img).width()),
        height: parseInt((this.big_img).height())
    }

    this.bindEvent();
}
Magnifier.prototype.bindEvent = function() {
    var self = this;
    // 元素显示隐藏;
    this.small.on("mouseover", function() {
        self.square.css({
            display: "block",
        })
        self.big.css({
            display: "block",
        })
    })

    this.small.on("mouseout", function() {
        self.square.css({
            display: "none",
        })
        self.big.css({
            display: "none",
        })
    })

    // 鼠标运动;
    this.small.on("mousemove", function(evt) {
        var e = evt || event;
        // 边界检测 : 先计算再赋值; 
        // 找极值; 判定边界;
        // 数据的预处理 : 
        var _left = e.offsetX - 50;

        var _top = e.offsetY - 50;
        // top 是关键字; 无法作为变量存储数据;
        if (_left < 0) {
            _left = 0;
        }
        if (_top < 0) {
            _top = 0;
        }
        var max_left = self.small_size.width - self.square_size.width;
        // console.log(self.small_size.width);
        // offset 测量家族 : 有性能问题;
        // 会导致页面的重绘;
        // 页面的回流;
        if (_left > max_left) {
            _left = max_left;
        }

        var max_top = self.small_size.height - self.square_size.height;

        if (_top > max_top) {
            _top = max_top;
        }

        self.square.css({
            left: _left,
            top: _top,
        })

        // 计算位移的百分比;
        var prop_left = (_left / max_left).toFixed(2);
        // console.log( prop_left);
        var prop_top = (_top / max_top).toFixed(2);
        // console.log(prop_left, prop_top)
        // self.big_img_size.width - self.big_size.width
        // 大盒子最大的移动距离;
        var big_box_max_left = self.big_img_size.width - self.big_size.width;
        var big_box_max_top = self.big_img_size.height - self.big_size.height;
        // 计算距离
        self.big_img.css({
            left: -big_box_max_left * prop_left,
            top: -big_box_max_top * prop_top,
        })

    })



    for (var i = 0; i < this.btns.length; i++) {
        $(this.btns[i]).index = i;
        $(this.btns[i]).mouseover(function() {
            self.index = this.index;
            self.small_img.attr("src", this.src)
            self.big_img.attr("src", this.src);
        })
    }
}

var mf = new Magnifier();
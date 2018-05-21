//平滑的滚动导航
!function () {
    var view = document.querySelector('nav')
    var controller = {
        view: null,
        aTags: null,
        initAnimation: function(){
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        init: function(view){
            this.view = view
            this.aTags = view.querySelectorAll("nav>ul>li>a")
            this.initAnimation()
            this.bindEvents()
        },
        scrollToElement:function(element){        
            let top = element.offsetTop         //获取元素到页面顶部的高度
            let currentTop = window.scrollY  //当前用户的的高度
            let targetTop = top - 80      //目标距离
            let s = targetTop - currentTop     //我们所要移动的距离
            let t = Math.abs((s / 100) * 300)         //根据距离的增长时间增加(绝对值)
            if (t > 800) { t = 800 }
            // let distance = (targetTop - currentTop )/n      我们所要移动到的距离(每次移动)                          
            var coords = { y: currentTop };
            var tween = new TWEEN.Tween(coords)
                .to({ y: targetTop }, t)
                .easing(TWEEN.Easing.Quadratic.In)
                .onUpdate(function () {
                    window.scrollTo(0, coords.y)
                })
                .start();
        },
        bindEvents: function(){
            for (let i = 0; i < this.aTags.length; i++) {
                this.aTags[i].onclick = (x) => {
                    x.preventDefault()
                    let a = x.currentTarget                 //target 指的是用户操作的元素，currentTarget指的是用户监听的元素
                    let href = a.getAttribute('href')       //只是获取到了href的值'#...'
                    let element = document.querySelector(href)    //这一行就获取到了那个值的元素
                    this.scrollToElement(element)
                }
            }
        }
    }
    controller.init.call(controller,view)
}.call()


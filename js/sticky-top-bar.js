//
!function () {
    var view = document.querySelector('#topNavBar')
    var controller = {
        view: null,
        init: function(view){
            this.view = view,
            this.bindEvents()
        },
        bindEvents: function(){
            var view = this.view
            window.addEventListener('scroll', ()=> {   //箭头函数没有this,this会像变量一样往上找
                    if (window.scrollY > 0) {
                        this.active()
                    } else {
                       this.deactive()
                    }
            })
        },
        active: function(){
            this.view.classList.add('sticky')
        },
        deactive: function(){
            this.view.classList.remove('sticky')
        }
    }
    controller.init.call(controller,view)

}.call()

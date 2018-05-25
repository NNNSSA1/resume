window.Controller = function () {
    return {
        view: null,
        model: null,
        init: function (view, model) {
            this.view = view,
                this.model = model
            this.model.init()
            this.bindEvents()
        },
        bindEvents: function () {
            var view = this.view
            window.addEventListener('scroll', () => {   //箭头函数没有this,this会像变量一样往上找
                if (window.scrollY > 0) {
                    this.active()
                } else {
                    this.deactive()
                }
            })
        },
        active: function () {
            this.view.classList.add('sticky')
        },
        deactive: function () {
            this.view.classList.remove('sticky')
        }
    }
}
!function(){
    var view = document.querySelector('nav')
    var controller = {
        view:null,
        liTags:null,
        init: function(view){
            this.view = view
            this.liTags = view.querySelectorAll('nav>ul>li')
            this.bindEvents()
        },
        bindEvents: function(){
            // let liTags = view.querySelectorAll('nav>ul>li')
            for (let i = 0; i < this.liTags.length; i++) {
               this.liTags[i].onmouseenter =  (x) => {   //target 指的是用户操作的元素，currentTarget指的是用户监听的元素
                    x.currentTarget.classList.add('active')                                        
                }
                this.liTags[i].onmouseleave =  (x) => {
                    x.currentTarget.classList.remove('active')
                }
            }
        }
    }
    controller.init.call(controller,view)

}.call()
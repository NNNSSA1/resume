!function () {
    var view = document.querySelector('#loadingPage')
    var controller = {
        view:null,
        init: function(view){
            this.view = view
            setTimeout( ()=>{
                this.active()
            }, 1000)
        },
        active: function(){
            this.view.classList.remove('active')
        }
    }
    controller.init.call(controller,view)

}.call()


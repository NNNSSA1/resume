!function () {
    var view = window.View('.message')
    var model = Model({'resourceName':"Message"})
    var controller = {
        view: null,
        messageList: null,
        form: null,
        model:null,
        init: function (view,mudel) {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageFrom')
            this.model = model
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },

        loadMessages: function () {     //加载留言
            this.model.fetch().then(
                    function (message) {
                        let array = message.map(function (item) {
                            return item.attributes
                        })
                        //获取到这个数组的所有message对象
                        array.forEach((item) => {
                            let li = document.createElement('li')
                            li.innerText = `${item.name} : ${item.content} `
                            this.messageList.appendChild(li)
                        });
                    })
        },
        bindEvents: function () {
            //监听form表单的提交事件
            this.form.addEventListener('submit', (e) => {
                //然后阻止默认事件的发生，否则form表单会自动刷新页面
                e.preventDefault()
                //拿到用户提交的内容
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myFrom = this.form
            let content = myFrom.querySelector('input[name=content]').value
            let name = myFrom.querySelector('input[name=name]').value
            //然后增加保存功能
            //然后把用户输入的内容保存到数据库中顺便提示用户保存成功
            this.model.save({'name':name,'content':content}).then(function (object) {  //这个object是存入信息的相关信息。可以用来之后调取
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name} : ${object.attributes.content} `
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myFrom.querySelector('input[name=content]').value = ""
            })
        }
    }
    controller.init.call(controller,view,model)
}.call()


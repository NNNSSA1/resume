!function () {
    var view = document.querySelector('.message')
    var moudel = {
        //获取数据
        init: function () {
            var APP_ID = 'dzoYBlV884Lbu9BjePXbbklH-gzGzoHsz'
            var APP_KEY = 'OxHLPbVlsugQj93TDDP9ylo1'
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function(){
            var query = new AV.Query('Message');
            return query.find() //Promise 对象
        },
        //新建，保存数据
        save:function(name,content){
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                'name': name,
                'content': content
            })
        }
    }
    var controller = {
        view: null,
        messageList: null,
        form: null,
        moudel:null,
        init: function (view,moudel) {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageFrom')
            this.moudel = moudel
            this.moudel.init(   )
            this.loadMessages()
            this.bindEvents()
        },

        loadMessages: function () {     //加载留言
            this.moudel.fetch().then(
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
            this.moudel.save(name,content).then(function (object) {  //这个object是存入信息的相关信息。可以用来之后调取
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name} : ${object.attributes.content} `
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myFrom.querySelector('input[name=content]').value = ""
            })
        }
    }
    controller.init.call(controller,view,moudel)
}.call()


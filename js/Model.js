window.Model = function(options){  //fetch需要一个参数
    let resourceName = options.resourceName
    return {
        init:function(){
            var APP_ID = 'dzoYBlV884Lbu9BjePXbbklH-gzGzoHsz'
            var APP_KEY = 'OxHLPbVlsugQj93TDDP9ylo1'
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch:function(){
            var query = new AV.Query(resourceName);  //闭包
            return query.find() //Promise 对象
        },
        save:function(object){
            var Message = AV.Object.extend(resourceName);
            var message = new Message();
            return message.save(object)
        }
    }
}

!function () {

    //首先找到需要滚动的特殊元素，然后给他们加上一个offset类
    let specialTags = document.querySelectorAll('[data-x]')
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
    }
    //1s后找到最近的移除
    setTimeout(function () {
        findClosetAndRemoveOffset()
    }, 1000);

    //然后滚动到了相应的就再移除
    window.addEventListener('scroll', function () {
        findClosetAndRemoveOffset()
    })



    //工具函数
    function findClosetAndRemoveOffset() {  //寻找最近的元素
        let specialTags = document.querySelectorAll('[data-x]')
        let minindex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minindex].offsetTop - window.scrollY)) {
                minindex = i
            }
        }
        //minindex就是距离窗口最近的元素
        specialTags[minindex].classList.remove('offset')
        for (let i = 0; i < specialTags.length; i++) {
            specialTags[i].classList.remove('active')
        }
        specialTags[minindex].classList.add('active')
        let id = specialTags[minindex].id
        let a = document.querySelector('a[href="#' + id + '"]')
        let li = a.parentNode
        let brotherAndMe = li.parentNode.children
        for (let i = 0; i < brotherAndMe.length; i++) {
            brotherAndMe[i].classList.remove('highlight')
        }
        li.classList.add('highlight')
    }


}.call()


var lang = document.querySelector('.nav__lang_wrapper')

lang.addEventListener('click', function(e) {
    e.preventDefault();    
    this.classList.toggle('hover')
/*     var href = this.dataset.href
    setTimeout(function() {
        var pathname = document.location.pathname
        if (pathname.indexOf('/en') != -1) {
            document.location.href = document.location.origin + '/' + pathname.slice(3)
        } else {
            document.location.href = document.location.origin + '/' + href + pathname
        }
    }, 250) */
})
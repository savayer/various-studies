// Single Responsibility Principle
// Принцип единственной отвественности

// У класс должен быть только один мотив для изменения
// Лишнее поведение перемещаем в отдельный класс

class News {
    constructor (title, text) {
        this.title = title
        this.text = text
    }

    update (title, text) {
        this.title = title
        this.text = text
    }

    /* toHTML() {
        return `
            <div class="news">
                <div class="news__title">${this.title}</div>
                <div class="news__text">${this.text}</div>
            </div>
        `
    } */
}

class NewsExport {
    constructor (news) {
        this.news = news
    }

    toHTML() {
        return `
            <div class="news">
                <div class="news__title">${this.news.title}</div>
                <div class="news__text">${this.news.text}</div>
            </div>
        `
    }
}

const news = new News('some title', 'some text')

const newsExport = new NewsExport(news)

console.log(news, newsExport.toHTML())
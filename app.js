const url = require('url')
const Koa = require('koa2')
const axios = require('axios')
const cheerio = require('cheerio')
const Router = require('koa-router')
const mongoose = require('mongoose')

const BenchMark = require('benchmark')
const bm = require('./test/bm')

const app = new Koa()
const router = new Router()
const suite = new BenchMark.Suite
mongoose.connect('mongodb://localhost/koa')
const db = mongoose.connection
db.on('error', () => {
    console.log('error')
})
db.on('open', () => {
    console.log('the mongodb is connected')
    const PeoPle = mongoose.Schema({
        name: String,
        age: Number,
        love: String,
        course: [String]
    })
    const Cat = mongoose.model('Cat', {
        name: String,
        breed: String,
        age: Number,
        master: String,
        sex: String
    }) 
    // Cat.methods.speak = function(content) {
    //     console.log(`${this.name} now speaking ${content}`)
    // }
    const Pp = mongoose.model('Pp', PeoPle)
    const p1 = new Pp({name: "a", age: 12, love: "apple", course: ["math", "english", "chinese"]})
    const p2 = new Pp({name: "b", age: 14, love: "banana", course: ["math", "english", "chinese"]})
    const p3 = new Pp({name: "c", age: 16, love: "orange", course: ["math", "english", "chinese"]})
    const p4 = new Pp({name: "d", age: 18, love: "kiwi", course: ["math", "english", "chinese"]})
    const siam = new Cat({name: 'gray', breed: 'Siam', age: 1, master: 'buleak', sex: 'male'})
    const ragdoll = new Cat({name: 'big', breed: 'Ragdoll', age: 0.5, master: 'buleak', sex: 'female'})
    const maine = new Cat({name: 'black', breed: 'Maine', age: 4, master: 'buleak', sex: 'female'})
    const norwegianForest = new Cat({name: 'write', breed: 'Norwegian Forest', age: 1, master: 'buleak', sex: 'male'})
    p1.save()
    p2.save()
    p3.save()
    p4.save()
    siam.save()
    maine.save()
    ragdoll.save()
    norwegianForest.save()
    // siam.speak()   
    Cat.find((err, data) => { console.log(data) }) 
    Cat.find({name: 'siam'}, (err,data) => {console.log(data)})
})

app.use(async (ctx, next) => {
    await next()
    ctx.status == 404 && (ctx.body = "<h1>未找到请求资源</h1>")
})

router.get('/', async (ctx, next) => {
    ctx.body = 'Hello Koa'
})

let items;
const crawler = (url, path, each) => {
    router.get(url, async (ctx, next) => {
        axios.get(path).then((val) => {
            let $ = cheerio.load(val.data);
            items = []
            each($)
        }).catch((err) => {
            console.log(`error: ${err}`)
        })
        ctx.body = items
    })
}
const eachFunction = ($) => {
    $('#topic_list .cell').each((index, value, arr) => {
        let headImg = $(value).find('.user_avatar.pull-left img').attr('src'),
            headName = $(value).find('.user_avatar.pull-left img').attr('title'),
            headTitle = $(value).find('.topic_title').attr('title');
        items.push({ headImg, headName, headTitle })
    })
}
crawler('/crawler', 'https://cnodejs.org/', eachFunction)
const vikingComic = ($) => {
    $('.contentimg>img').each((index, value, arr) => {
        let img = $(value).attr('src');
        items.push(img)
    })
}
crawler('/pirate', 'http://www.hanhuaba.com/comic/1391/30900.html', vikingComic)


let baseUrl = 'https://cnodejs.org/';
let textList;
const all = (url) => {
    axios.get(url).then(val => {
        let $ = cheerio.load(val.data);
        textList = [];
        $('.reply_area').each((index, val, arr) => {
            if (index > 2) { return }
            let content = $(val).find('.markdown-text p').text()
            textList.push(content)
        })
        return textList
    })
}
router.get('/crawlerAsync', async (ctx, next) => {
    axios.get(baseUrl).then(val => {
        let $ = cheerio.load(val.data);
        items = [];
        $('#topic_list .cell').each((index, value, arr) => {
            let href = url.resolve(baseUrl, $(value).find('.topic_title').attr('href'));
            items.push(href)
        })
        return items
    }).then(urlList => {
        axios.all([all(urlList[0]), all(urlList[1]), all(urlList[2])]).then(axios.spread((a,b) => {
            console.log('textList', a, b)
        }))
    }).catch(err => {
        console.log(`error: ${err}`)
    })
    console.log(textList)
    ctx.body = textList
})

const fibonacci = (n) => {
    if(n === 0) { return 0; }
    if(n === 1) { return 1; }
    if(n < 0) { throw new Error('n should above 0')}
    if(n > 30) { throw new Error('n should below 30')}
    if(typeof n != 'number') { throw new Error('n should be a number')}
    return fibonacci(n-1) + fibonacci(n-2);
}
router.get('/fibonacci', async (ctx, next) => {
    ctx.body = fibonacci(parseInt(ctx.query.n))
})

let num = '100'

// suite.add('+', () => {bm.init1(num)})
// .add('parseInt', () => {bm.init2(num)})
// .add('number', () => {bm.init3(num)})
// .on('cycle', (e) => {console.log(String(e.target))})
// .on('complete', function() {console.log(`Faster is ${this.filter('faster').map('name')}`)})
// .run({'async': true})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, console.log('port is 3000'))

module.exports = {
    fibonacci
}
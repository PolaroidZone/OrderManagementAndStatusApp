const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3005

mongoose.connect('mongodb://localhost/order_management',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.set('view engine', 'ejs')
app.set('/styles', express.static(__dirname +'../public/styles'))
app.set('/images', express.static(__dirname +'../public/images'))
app.use('/js', express.static(__dirname +'../public/js'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', async(req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))
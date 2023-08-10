const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const order = require('./data/order')
const app = express()
const port = 3005

mongoose.connect('mongodb://localhost/order_management')

app.set('view engine', 'ejs')
app.set('/styles', express.static(__dirname +'../public/styles'))
app.set('/images', express.static(__dirname +'../public/images'))
app.use('/js', express.static(__dirname +'../public/js'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', async(req, res) => {
    res.render('index.ejs')
})

app.post('/order', async(req, res) => {
    const order = new order({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        items: req.body.items,
    })

    try {
        await order.save()
        res.status(201).json({message: 'Order submitted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error submitting order'})
    }
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))
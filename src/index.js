const express = require('express')
const app = express()
const port = 3005

app.set('view engine', 'ejs')
app.set('routes', express.static(__dirname +'./src/routes'))
app.set('styles', express.static(__dirname +'./src/styles'))
app.set('images', express.static(__dirname +'./src/images'))

app.get('/', async(req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))
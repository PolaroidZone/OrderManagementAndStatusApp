const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set session 
app.use(session({
    secret: 'This-key-1738-#2-882bbu-pola-57f83-roid-yv2f76f',
    resave: false,
    saveUninitialized: true
  }));

//schemas
const orderSchema = require('./data/order');
const cartSchema = require('./data/cartlist');

//set up mogoose
mongoose.connect('mongodb://localhost/order_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('MongoDB connection error:', error);
});

const Order = mongoose.model('Order', orderSchema);
const CartList = mongoose.model('Cart', cartSchema);

const app = express();
const port = 3005;

app.set('view engine', 'ejs');
app.set('/styles', express.static(__dirname +'../public/styles'));
app.set('/images', express.static(__dirname +'../public/images'));
app.use('/js', express.static(__dirname +'../public/js'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', async(req, res) => {
    res.render('index.ejs');
});

app.post('/cart', async(req, res) => {
    try {
        const newCart = new CartList({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            items: req.body.items,
        })

        await newCart.save()
        req.session.email = req.body.email//create a session 
        res.status(201).json({message: 'Order submitted successfully'});
    }catch(error){
        res.status(500).json({message: 'Error submitting item to cart'});
    }
});

app.get('/cart', async(req, res) => {
    try {
        const email = req.session.email // Get email from session

        const cart = await CartList.find({ email });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart.items);
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ message: 'Error retrieving cart items' });
    }
    res.render('cart.ejs');
});

app.post('/order', async(req, res) => {
    try {
        const order = new Order({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            items: req.body.items,
        })

        await order.save()
        res.status(201).json({message: 'Order submitted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error submitting order'});
    }
});

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
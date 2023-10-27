var express = require('express');
var router = express.Router();
var Product = require('./../models/product');

/**
 * Home page
 */
router.get('/home', (req, res) => {
    res.render('home');
});

/**
 * Product List: loading all product
 */
router.get('/product-list', (req, res) => {
    console.log("Hello");
    Product.find({})
        .then(products => {
            console.log(products)
            return res.render('product-list', { products: products,title: "Hello Hello" })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});


/**
 * Go to Add Product page
 */
router.get('/add-product', (req, res) => {
    res.render('add-product');
});

/**
 * Add new Product
 */
router.post('/', (req, res) => {
    let newProduct = new Product({
        name: req.body.productName,
        category: req.body.productCategory,
        price: req.body.productPrice,
        quantity: req.body.productQuantity
    });

    newProduct.save()
        .then(doc => {
            res.redirect('/product-list')
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

/**
 * Go to Update Product page
 */
router.get('/update-product/:productId', (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('update-product', { product: product });
    })
});

/**
 * Delete product
 */
router.delete('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndDelete(productId, (err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
});

/**
 * Update product
 */
router.post('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndUpdate(
        { _id: productId },
        { $set: { name: req.body.productName, category: req.body.productCategory, price: req.body.productPrice , quantity: req.body.productQuantity } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/product-list')
        })
});

module.exports = router;

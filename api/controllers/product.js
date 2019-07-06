const Product = require('../models/product');
const mongoose = require('mongoose');

exports.products_getAllProducts = (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc.id,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            url: process.env.BASIC_URL + 'products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.products_createNewProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        productImage: process.env.BASIC_URL + req.file.path
    });
    product
        .save()
        .then(result => {
            res.status(200).json({
                message: 'Created Product Successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    productImage: result.productImage,
                    request: {
                        type: 'GET',
                        url: process.env.BASIC_URL + 'products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

};

exports.products_getProductById = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: process.env.BASIC_URL + 'products'
                    }
                });
            } else {
                res.status(404).json({
                    error: "You Entered Invalid Id"
                });
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.products_updateProductByKey = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'Product Updated Successfully',
                    request: {
                        type: 'GET',
                        url: process.env.BASIC_URL + 'products/' + doc._id
                    }
                });
            } else {
                res.status(404).json({
                    error: "You Entered Invalid Id"
                });
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.products_deleteProductById = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({
            _id: id
        })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'Product Deleted Successfully',
                    request: {
                        type: 'POST',
                        url: process.env.BASIC_URL + 'products/',
                        body: {
                            name: 'String',
                            price: 'Number'
                        }
                    }
                });
            } else {
                res.status(404).json({
                    error: "You Entered Invalid Id"
                });
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
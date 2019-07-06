const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_getAllOrders = (req, res, next) => {
    Order
        .find()
        .populate('productId', 'name price')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.productId,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: process.env.BASIC_URL + 'orders/' + doc._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_createNewOrder = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product Not Found"
                });
            }
            const order = new Order({
                quantity: req.body.quantity,
                productId: req.body.productId
            });
            order
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "Order Stored",
                        createdOrder: {
                            _id: result._id,
                            product: result.product,
                            quantity: result.quantity
                        },
                        request: {
                            type: 'GET',
                            url: process.env.BASIC_URL + 'orders/' + result._id
                        }
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_getOrderById = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            res.status(200).json({
                value: result,
                request: {
                    type: 'GET',
                    url: process.env.BASIC_URL + 'orders/' + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_deleteOrderById = (req, res, next) => {
    const id = req.params.productId;
    Order.remove({
            _id: req.params.orderId
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order Deleted Successfully',
                request: {
                    type: 'POST',
                    url: process.env.BASIC_URL + 'orders/',
                    body: {
                        productId: 'ID',
                        quantity: 'Number'
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
const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/order');

/* @GET(/orders/) */
router.get('/', checkAuth, orderController.orders_getAllOrders);

/* @POST(/orders/) */
router.post('/', checkAuth, orderController.orders_createNewOrder);

/* @GET(/orders/{:orderId}) */
router.get('/:orderId', checkAuth, orderController.orders_getOrderById);

/* @DELETE(/orders/{:orderId}) */
router.delete('/:orderId', checkAuth, orderController.orders_deleteOrderById);

module.exports = router;
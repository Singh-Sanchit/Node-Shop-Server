const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multerController = require('../controllers/multer');
const productController = require('../controllers/product');

/* @GET(/products/) */
router.get('/', productController.products_getAllProducts);

/* @POST(/products/) */
router.post('/', checkAuth, multerController.upload.single('productImage'), productController.products_createNewProduct);

/* @GET(/products/{:productId}) */
router.get('/:productId', productController.products_getProductById);

/* @PATCH(/products/{:productId}) */
router.patch('/:productId', checkAuth, productController.products_updateProductByKey);

/* @DELETE(/products/{:productId}) */
router.delete('/:productId', checkAuth, productController.products_deleteProductById);

module.exports = router;
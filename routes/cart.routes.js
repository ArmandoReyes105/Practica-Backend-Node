const router = require('express').Router(); 
const carts = require('../controllers/cart.controller'); 
const Authorize = require('../middlewares/auth.middleware');

router.get('/', Authorize('Usuario'), carts.get); 

router.post('/item', Authorize('Usuario'), carts.addToCart); 

router.put('/item', Authorize('Usuario'), carts.increaseQuantity); 

router.delete('/:item', Authorize('Usuario'), carts.decreaseQuantity); 

router.delete('/producto/:producto', Authorize('Usuario'), carts.removeFromCart); 

module.exports = router; 
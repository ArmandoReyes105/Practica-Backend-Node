const router = require('express').Router();
const pedidos = require('../controllers/pedidos.controller'); 
const Authorize = require('../middlewares/auth.middleware'); 

router.get('/', Authorize('Usuario'), pedidos.getAllByUser); 

router.post('/', Authorize('Usuario'), pedidos.post); 

module.exports = router; 
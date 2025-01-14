const { usuario, producto, pedido, carritos, carritoproducto } = require('../models'); 
const { GetEmail } = require('../services/jwttoken.service')

let self = {}; 

//GET: api/pedidos
self.getAllByUser = async function (req, res, next) {
    try{
        const email = GetEmail(req); 
        const user = await usuario.findOne({ where: {email: email }}); 

        const pedidos = await pedido.findAll({
            where: { usuarioid: user.id }, 
            include: [{
                model: producto,
                as: 'producto',
                attributes: ['id', 'titulo', 'precio', 'archivoId']
            }],
            order: [['fecha', 'DESC']]
        });
        return res.status(200).json(pedidos); 
    }catch (error){
        next(error); 
    }
}

//POST: api/pedidos
self.post = async function (req, res, next){
    try{
        console.log("------------------------")
        const email = GetEmail(req);  
        const { productoid, cantidad } = req.body;
        console.log("------------------------", productoid); 
        const user = await usuario.findOne({ where: {email: email }});
        const productDb = await producto.findByPk(productoid); 

        if (!user || !productDb){
            return res.status(404).json("Objeto no encontrado"); 
        }

        const subtotal = productDb.precio * cantidad; 

        const nuevoPedido = await pedido.create({
            usuarioid: user.id, 
            productoid,
            cantidad,
            precio: productDb.precio,
            subtotal
        });

        let carrito = await carritos.findOne({ where: { usuarioid: user.id }}); 
        if (carrito){
            let productoCarrito = await carritoproducto.findOne({
                where: {carritoid: carrito.id, productoid: productoid}
            })
            if (productoCarrito){
                await productoCarrito.destroy(); 
            }
        }

        req.bitacora("Pedido realizado", productoid); 
        return res.status(201).json(nuevoPedido); 

    }catch (error){
        next(error); 
    }
}

module.exports = self; 
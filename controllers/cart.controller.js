const { carritos, usuario, producto, carritoproducto } = require('../models'); 
const { GetEmail } = require('../services/jwttoken.service')

let self = {}; 

//GET: api/cart
self.get = async function (req, res, next) {

    try{
        const email = GetEmail(req);
        const user = await usuario.findOne({where: {email: email}});

        if (!user){
            return res.status(404).json("Usuario no encontrado"); 
        }
        
        const carritoUsuario = await carritos.findOne({
            where: { usuarioid: user.id },
            include: [{ model: producto, as: 'productos'}]
        });

        if(!carritoUsuario){
            carritoUsuario = await carritos.create({ usuarioid: user.id}); 
        }

        res.status(200).json(carritoUsuario); 

    }catch (error){
        next(error); 
    } 
}

//POST: api/cart
self.addToCart = async function (req, res, next){
    try{

        const email = GetEmail(req); 
        const { productoId} = req.body; 
        const user = await usuario.findOne({where: { email: email }}); 

        if (!user){
            return res.status(404).json("Usuario no encontrado");
        }

        let carrito = await carritos.findOne({ where: { usuarioid: user.id }}); 

        if (!carrito) {
            carrito = await carritos.create({ usuarioid: user.id }); 
        }

        let productoCarrito = await carritoproducto.findOne({
            where: { carritoid: carrito.id, productoid: productoId}
        }); 

        if (productoCarrito){
            await carritoproducto.update({ cantidad: productoCarrito.cantidad + 1}, { where: {carritoid: carrito.id, productoid: productoId}}); 
        }else{
            await carritoproducto.create({ carritoid: carrito.id, productoid: productoId, cantidad: 1 }); 
        }

        res.status(200).json("Producto agregado al carrito"); 

    } catch(error){
        next(error); 
    }
}

//PUT: api/cart/item
self.increaseQuantity = async function (req, res, next) {
    try{
        const { email, productoId } = req.body; 
        const user = await usuario.findOne({ where: { email: email } });

        console.log(email, productoId); 

        if (!user){
            return res.status(404).json("Usuario no encontrado"); 
        }

        let carrito = await carritos.findOne({ where: { usuarioid: user.id }}); 
        if (!carrito){
            return res.status(404).json("Carrito no encontrado")
        }

        let productoCarrito = await carritoproducto.findOne({
            where: { carritoid: carrito.id, productoid: productoId }
        }); 

        if (productoCarrito){
            await productoCarrito.update({ cantidad: productoCarrito.cantidad + 1}); 
            req.bitacora("Carrito, aumentar producto", productoCarrito.productoid);
            res.status(200).json("Cantidad aumentada");
        }else{
            res.status(404).json("Producto no encontrado en el carrito"); 
        }

    }catch (error){
        next(error); 
    }
}

//DELETE: api/cart/item
self.decreaseQuantity = async function(req, res, next){
    try{
        
        const email = GetEmail(req); 
        const productoId = req.params.item; 
        const user = await usuario.findOne({ where: { email: email }}); 

        if (!user){
            return res.status(404).json("Usuario no encontrado"); 
        }

        let carrito = await carritos.findOne({ where: { usuarioid: user.id }}); 
        if (!carrito){
            return res.status(404).json("Carrito no encontrado"); 
        }

        let productoCarrito = await carritoproducto.findOne({
            where: { carritoid: carrito.id, productoid: productoId }
        }); 

        if (productoCarrito){
            if (productoCarrito.cantidad > 1){
                await productoCarrito.update({ cantidad: productoCarrito.cantidad - 1}); 
                req.bitacora("Disminuir del carrito", productoCarrito.productoid); 
                res.status(200).json("Cantidad disminuida");
            }else{
                await productoCarrito.destroy(); 
                res.status(200).json("Producto eliminado del carrito"); 
            }
        }else{
            res.status(404).json("Producto no encontrado en el carrito"); 
        }
    }catch(error){
        next(error); 
    }
}

//DELETE: api/cart/producto
self.removeFromCart = async function (req, res, next){
    try {
        const email = GetEmail(req); 
        const productoId = req.params.producto; 
        const user = await usuario.findOne({ where: { email: email}}); 

        if (!user){
            return res.status(404).json("Usuario no encontrado"); 
        }

        let carrito = await carritos.findOne({ where: { usuarioid: user.id }}); 
        if (!carrito){
            return res.status(404).json("Carrito no encontrado"); 
        }

        let productoCarrito = await carritoproducto.findOne({
            where: { carritoid: carrito.id, productoid: productoId }
        }); 

        if (productoCarrito){
            await productoCarrito.destroy();
            req.bitacora("Carrito, Producto eliminado", productoCarrito.productoid); 
            res.status(200).json("Producto eliminado del carrito"); 
        }else{
            res.status(404).json("Producto no encontrado en el carrito")
        }
    }catch (error){
        next(error); 
    }
}

module.exports = self; 
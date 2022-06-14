const contenedor = require('../Contenedor/Contenedor')
const {Router} = require('express');
const router = Router();

const {productos} = new contenedor;

//Mostrar productos
router.get('/', (req, res) => {
    if(productos.length){
        res.status(200).json(productos)
    }
    res.send(`<h1>No Existen articulos cargados</h1>`)
})

//Buscar productos por ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    
    if(!isNaN(id)){
        const prod = productos.find(prod => prod.id === id);
        prod ? 
        res.status(200).json(prod) : 
        res.status(404).send({ error: "Producto no encontrado" })
    } else {
        res.status(400).json({ error: 'El ID debe ser un número!'});
    }
})

//Agregar productos
router.post('/', (req, res) => {
    const { nombre, precio, thumbnail } = req.body;
    const id = productos.length ? ((productos[productos.length - 1].id) + 1) : productos.length + 1;
    productos.push({ nombre, precio, thumbnail, id });
    res.sendStatus(201);
})

//Modificar productos por ID
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    
    if(!isNaN(id)){
        const { nombre, precio, thumbnail } = req.body;
        productos.forEach(prod => {
            if( prod.id === id ){
                prod.nombre = nombre
                prod.precio = precio
                prod.thumbnail = thumbnail
            }
        })
        res.sendStatus(201).json(productos);
    } else {
        res.status(400).json({ error: 'El ID debe ser un número!'});
    }
    
})

//Eliminar productos por ID
router.delete('/:id', (req, res) => {
    const idProd = Number(req.params.id)
    const itemIndex = productos.findIndex(({id}) => id === idProd);
    if (itemIndex >= 0) {
      productos.splice(itemIndex, 1);
      res.sendStatus(201).json(productos)
    }
});

module.exports = router;

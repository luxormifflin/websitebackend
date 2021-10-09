import Express from 'express';
import {
    queryAllProducts,
    crearProducto,
    eliminarProducto,
    editarProducto,
    consultarProducto,
} from '../../controllers/product/productControllers.js';

const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error consultando los productos');
    } else {
        res.json(result);
    }
};

rutasProducto.route('/productos').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos')
    queryAllProducts(genericCallback(res));
});

rutasProducto.route('/productos').post((req, res) => {
    crearProducto(req.body, genericCallback(res));
});

rutasProducto.route('/productos/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    consultarProducto(req.params.id, genericCallback(res));
});

rutasProducto.route('/productos/:id').patch((req, res) => {
    editarProducto(req.params.id, req.body, genericCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
    eliminarProducto(req.params.id, genericCallback(res));
});

export default rutasProducto;

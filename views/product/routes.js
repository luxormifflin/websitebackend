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
        console.log('error', err);
        res.status(500).json({error: err});
    } else {
        res.json(result);
    }
};

//productos

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
    console.log('request', req)//acá está llegando vacío al body, pero en front end el patch si llega con la info
    editarProducto(req.params.id, req.body, genericCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
    eliminarProducto(req.params.id, genericCallback(res));
});




export default rutasProducto;

// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import dotenv from 'dotenv';
import Express from 'express';
import Cors from 'cors';
import { conectarBD } from './db/db.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import rutasProducto from './views/product/routes.js';
import rutasUsuario from './views/user/routes.js';
import rutasVenta from './views/sale/routes.js';
import autorizacionEstadoUsuario from './middleware/autorizacionEstadoUsuario.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://misiontic-luxorwebsite.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-autenticacion-luxorwebsite-mintic',
    issuer: 'https://misiontic-luxorwebsite.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(autorizacionEstadoUsuario);

app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);

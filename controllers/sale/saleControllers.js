import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllSales = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').find().limit(50).toArray(callback);
};

const crearVenta = async (datosUsuario, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').insertOne(datosUsuario, callback);
};

const consultarVenta = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').findOne({ _id: new ObjectId(id) }, callback);
};

const editarVenta = async (productId, data, callback) => {
    const filtroUsuario = { _id: new ObjectId(productId) };
    const operacion = {
        $set: data,
};

    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('venta')
        .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarVenta = async (productId, callback) => {
    const filtroUsuario = { _id: new ObjectId(productId) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').deleteOne(filtroUsuario, callback);
};

export { queryAllSales, crearVenta, consultarVenta, editarVenta, eliminarVenta };

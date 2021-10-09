import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllUsers = async (callback) => {
    const baseDeDatos = getDB();
    console.log('query');
    await baseDeDatos.collection('usuario').find().limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
};

const editarUsuario = async (productId, data, callback) => {
    const filtroUsuario = { _id: new ObjectId(productId) };
    const operacion = {
        $set: data,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuario')
        .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (productId, callback) => {
    const filtroUsuario = { _id: new ObjectId(productId) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};

export { queryAllUsers, consultarUsuario, crearUsuario, editarUsuario, eliminarUsuario };

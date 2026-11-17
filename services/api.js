
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://vicecity-motors-api.vercel.app';
const TOKEN_KEY = 'token';

async function peticion(endpoint, metodo = 'GET', datos = null, requiereToken = false) {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);

        if (requiereToken && !token) {
            throw new Error('Debes iniciar sesión para continuar.');
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        if (requiereToken) {
            headers.Authorization = `Bearer ${token}`;
        }

        const configuracion = {
            method: metodo,
            headers
        };

        if (datos) {
            configuracion.body = JSON.stringify(datos);
        }

        const respuesta = await fetch(`${API_URL}${endpoint}`, configuracion);

        let resultado;

        try {
            resultado = await respuesta.json();
        } catch {
            throw new Error('El servidor devolvió una respuesta inválida.');
        }

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || resultado.error || 'Ocurrió un error en la solicitud.');
        }

        return resultado;
    } catch (error) {
        throw new Error(error.message || 'No se pudo conectar con el servidor.');
    }
}

export async function registrarUsuario(nombre, email, password) {
    const resultado = await peticion('/auth/registro', 'POST', {
        nombre,
        email,
        password
    });

    if (resultado.token) {
        await AsyncStorage.setItem(TOKEN_KEY, resultado.token);
    }

    return resultado;
}

export async function iniciarSesion(email, password) {
    const resultado = await peticion('/auth/login', 'POST', {
        email,
        password
    });

    if (resultado.token) {
        await AsyncStorage.setItem(TOKEN_KEY, resultado.token);
    }

    return resultado;
}

export async function cerrarSesion() {
    await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function obtenerToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
}

export async function obtenerVehiculos(disponibles = false) {
    const endpoint = disponibles
        ? '/vehiculos?estado=disponible'
        : '/vehiculos';

    return await peticion(endpoint, 'GET', null, true);
}

export async function obtenerVehiculo(id) {
    return await peticion(`/vehiculos/${id}`, 'GET', null, true);
}

export async function comprarVehiculo(vehiculoId) {
    return await peticion('/ventas', 'POST', {
        vehiculoId,
        metodoPago: 'transferencia'
    }, true);
}

export async function obtenerCompras() {
    return await peticion('/ventas', 'GET', null, true);
}

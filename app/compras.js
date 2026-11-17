
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { router } from 'expo-router';
import { obtenerCompras } from '../services/api';

export default function Compras() {
const [compras, setCompras] = useState([]);
const [error, setError] = useState('');

useEffect(() => {
    const cargarCompras = async () => {
    try {
        const datos = await obtenerCompras();
        const lista = Array.isArray(datos) ? datos : datos.data || [];
        setCompras(lista);
    } catch (err) {
        setError(err.message);
    }
    };

    cargarCompras();
}, []);

return (
    <ScrollView style={styles.container}>
    <Text style={styles.titulo}>VICE CITY MOTORS</Text>
    <Text style={styles.subtitulo}>Mis compras</Text>

    {error !== '' && (
        <Text style={styles.error}>{error}</Text>
    )}

    {compras.length === 0 && error === '' && (
        <Text style={styles.texto}>Todavía no tienes compras registradas.</Text>
    )}

    {compras.map(compra => (
        <View style={styles.tarjeta} key={compra.id}>
        <Text style={styles.modelo}>
            {compra.vehiculo?.marca} {compra.vehiculo?.modelo}
        </Text>

        <Text style={styles.texto}>
            Fecha: {compra.fecha}
        </Text>

        <Text style={styles.precio}>
            Monto: ${Number(compra.monto || compra.precio || 0).toLocaleString('en-US')}
        </Text>
        </View>
    ))}

    <TouchableOpacity
        style={styles.boton}
        onPress={() => router.replace('/vehiculos')}
    >
        <Text style={styles.textoBoton}>VOLVER AL CATÁLOGO</Text>
    </TouchableOpacity>
    </ScrollView>
);
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 18
},
    titulo: {
    color: '#D4AF37',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40
},
    subtitulo: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25
},
    tarjeta: {
    backgroundColor: '#202020',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15
},
    modelo: {
    color: '#D4AF37',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12
},
    texto: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 8
},
    precio: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold'
},
    error: {
    color: '#F44336',
    marginBottom: 15
},
    boton: {
    backgroundColor: '#A88725',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30
},
    textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold'
}
});

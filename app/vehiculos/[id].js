
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { obtenerVehiculo, comprarVehiculo } from '../../services/api';

export default function DetalleVehiculo() {
const { id } = useLocalSearchParams();
const [vehiculo, setVehiculo] = useState(null);
const [error, setError] = useState('');

useEffect(() => {
    const cargarDetalle = async () => {
    try {
        const datos = await obtenerVehiculo(id);
        setVehiculo(datos.data || datos);
    } catch (err) {
        setError(err.message);
    }
    };

    cargarDetalle();
}, [id]);

const confirmarCompra = () => {
    Alert.alert(
    'Confirmar compra',
    `¿Deseas comprar el ${vehiculo.marca} ${vehiculo.modelo} mediante transferencia?`,
    [
        { text: 'Cancelar', style: 'cancel' },
        {
        text: 'Confirmar',
        onPress: realizarCompra
        }
    ]
    );
};

const realizarCompra = async () => {
    try {
    await comprarVehiculo(vehiculo.id);

    Alert.alert(
        'Compra realizada',
        'Tu compra se ha procesado correctamente.',
        [{ text: 'Aceptar', onPress: () => router.replace('/vehiculos') }]
    );
    } catch (err) {
    Alert.alert('Error', err.message);
    }
};

if (error) {
    return (
    <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.volver}>Volver</Text>
        </TouchableOpacity>
    </View>
    );
}

if (!vehiculo) {
    return (
    <View style={styles.container}>
        <Text style={styles.texto}>Cargando vehículo...</Text>
    </View>
    );
}

return (
    <ScrollView style={styles.container}>
    <Text style={styles.titulo}>VICE CITY MOTORS</Text>

    <Image
        source={{ uri: vehiculo.imagen }}
        style={styles.imagen}
    />

    <Text style={styles.marca}>{vehiculo.marca}</Text>
    <Text style={styles.modelo}>{vehiculo.modelo}</Text>

    <View style={styles.detalles}>
        <Text style={styles.texto}>Año: {vehiculo.anio}</Text>
        <Text style={styles.precio}>
        Precio: ${vehiculo.precio.toLocaleString('en-US')}
        </Text>
        <Text style={styles.texto}>
        Estado: {vehiculo.estado.toUpperCase()}
        </Text>
    </View>

    {vehiculo.estado === 'disponible' && (
        <TouchableOpacity
        style={styles.botonComprar}
        onPress={confirmarCompra}
        >
        <Text style={styles.textoBoton}>COMPRAR</Text>
        </TouchableOpacity>
    )}

    <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.back()}
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
    padding: 20
},
titulo: {
    color: '#D4AF37',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 25
},
imagen: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#303030'
},
marca: {
    color: '#D4AF37',
    fontSize: 18,
    marginTop: 20
},
modelo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 5
},
detalles: {
    backgroundColor: '#202020',
    padding: 18,
    borderRadius: 10,
    marginTop: 20
},
texto: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 12
},
precio: {
    color: '#D4AF37',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 12
},
botonComprar: {
    backgroundColor: '#A88725',
    padding: 16,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center'
},
botonVolver: {
    backgroundColor: '#333333',
    padding: 16,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 30,
    alignItems: 'center'
},
textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold'
},
volver: {
    color: '#D4AF37',
    marginTop: 20
},
error: {
    color: '#F44336',
    fontSize: 16
}
});

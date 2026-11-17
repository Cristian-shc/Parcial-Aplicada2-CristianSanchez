
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import { obtenerVehiculos, cerrarSesion } from '../../services/api';
import { router } from 'expo-router';

export default function Vehiculos() {
const [vehiculos, setVehiculos] = useState([]);
const [filtro, setFiltro] = useState('todos');
const [error, setError] = useState('');

const salir = async () => {
    await cerrarSesion();
    router.replace('/login');
};
useEffect(() => {
    const cargarVehiculos = async () => {
    try {
        const datos = await obtenerVehiculos();
        const lista = Array.isArray(datos) ? datos : datos.data || [];
        setVehiculos(lista);
    } catch (err) {
        setError(err.message);
    }
    };

    cargarVehiculos();
}, []);

const vehiculosFiltrados = filtro === 'disponibles'
    ? vehiculos.filter(v => v.estado === 'disponible')
    : vehiculos;

return (
    <ScrollView style={styles.container}>
    <Text style={styles.titulo}>VICE CITY MOTORS</Text>
    <Text style={styles.subtitulo}>Catálogo de vehículos</Text>
    <TouchableOpacity
    style={styles.botonCompras}
    onPress={() => router.push('/compras')}
    >
    <Text style={styles.textoFiltro}>MIS COMPRAS</Text>
    </TouchableOpacity>

<TouchableOpacity
    style={styles.botonFiltro}
    onPress={salir}
>
    <Text style={styles.textoFiltro}>CERRAR SESIÓN</Text>
</TouchableOpacity>

    <View style={styles.filtros}>
        <TouchableOpacity
        style={[styles.botonFiltro, filtro === 'todos' && styles.activo]}
        onPress={() => setFiltro('todos')}
        >
        <Text style={styles.textoFiltro}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[styles.botonFiltro, filtro === 'disponibles' && styles.activo]}
        onPress={() => setFiltro('disponibles')}
        >
        <Text style={styles.textoFiltro}>Disponibles</Text>
        </TouchableOpacity>
    </View>

    {error !== '' && (
        <Text style={styles.error}>{error}</Text>
    )}

    {vehiculosFiltrados.map(vehiculo => (
        <TouchableOpacity
    style={styles.tarjeta}
    key={vehiculo.id}
    onPress={() => router.push(`/vehiculos/${vehiculo.id}`)}
>
        <Image
            source={{ uri: vehiculo.imagen }}
            style={styles.imagen}
        />

        <View style={styles.informacion}>
            <Text style={styles.marca}>{vehiculo.marca}</Text>
            <Text style={styles.modelo}>{vehiculo.modelo}</Text>
            <Text style={styles.detalle}>Año: {vehiculo.anio}</Text>
            <Text style={styles.precio}>
            ${vehiculo.precio.toLocaleString('en-US')}
            </Text>

            <Text style={[
            styles.estado,
            vehiculo.estado === 'disponible'
                ? styles.disponible
                : styles.vendido
            ]}>
            {vehiculo.estado.toUpperCase()}
            </Text>
                </View>
        </TouchableOpacity>
    ))}
    
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
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center'
},
    subtitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25
},
    filtros: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 12
},
    botonFiltro: {
    backgroundColor: '#292929',
    padding: 12,
    borderRadius: 8
},
    activo: {
    backgroundColor: '#A88725'
},
    textoFiltro: {
    color: '#FFFFFF',
    fontWeight: 'bold'
},
    tarjeta: {
    backgroundColor: '#202020',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden'
},
    imagen: {
    width: '100%',
    height: 180,
    backgroundColor: '#303030'
},
    informacion: {
    padding: 15
},
    marca: {
    color: '#D4AF37',
    fontSize: 15
},
    modelo: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 4
},
    detalle: {
    color: '#BBBBBB',
    marginTop: 8
},
    precio: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10
},
    estado: {
    fontWeight: 'bold',
    marginTop: 10
},
    disponible: {
    color: '#4CAF50'
},
    vendido: {
    color: '#F44336'
},
    error: {
    color: '#F44336',
    marginBottom: 15
},
    botonCompras:{
    backgroundColor: '#A88725',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
    },
});

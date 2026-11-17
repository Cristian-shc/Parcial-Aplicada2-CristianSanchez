
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { obtenerToken } from '../services/api';

export default function Index() {
const [ruta, setRuta] = useState(null);

useEffect(() => {
    const comprobarSesion = async () => {
    try {
        const token = await obtenerToken();
        setRuta(token ? '/vehiculos' : '/login');
    } catch (error) {
        setRuta('/login');
    }
    };

    comprobarSesion();
}, []);

if (ruta === null) {
    return (
    <View style={styles.container}>
        <Text style={styles.texto}>Comprobando sesión...</Text>
    </View>
    );
}

return <Redirect href={ruta} />;
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center'
},
texto: {
    color: '#D4AF37',
    fontSize: 18
}
});

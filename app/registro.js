
import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { Link } from 'expo-router';
import { registrarUsuario } from '../services/api';
export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


const registrar = async () => {
if (!nombre.trim() || !email.trim() || !password.trim()) {
    Alert.alert('Atención', 'Completa todos los campos');
    return;
}

try {
    const resultado = await registrarUsuario(
    nombre.trim(),
    email.trim(),
    password
    );

    Alert.alert(
    'Registro exitoso',
    resultado.mensaje || 'Tu cuenta fue creada correctamente'
    );
} catch (error) {
    Alert.alert('Error de registro', error.message);
}
};


return (
    <View style={styles.container}>
    <Text style={styles.logo}>VICE CITY MOTORS</Text>
    <Text style={styles.subtitle}>Crea tu cuenta</Text>

    <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#888"
        value={nombre}
        onChangeText={setNombre}
    />

    <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
    />

    <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
    />

    <TouchableOpacity style={styles.button} onPress={registrar}>
        <Text style={styles.buttonText}>CREAR CUENTA</Text>
    </TouchableOpacity>

    <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <Link href="/login" style={styles.link}>
        Inicia sesión
        </Link>
    </View>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    padding: 25
},
logo: {
    color: '#D4AF37',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12
},
subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 35
},
input: {
    backgroundColor: '#222222',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444444'
},
button: {
    backgroundColor: '#D4AF37',
    padding: 17,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
},
buttonText: {
    color: '#101010',
    fontWeight: 'bold',
    fontSize: 15
},
    loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
},
    loginText: {
    color: '#FFFFFF'
},
    link: {
    color: '#D4AF37',
    fontWeight: 'bold'
}
});

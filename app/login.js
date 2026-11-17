import { iniciarSesion } from '../services/api';
import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { Link, router } from 'expo-router';

export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const entrar = async () => {
if (!email.trim() || !password.trim()) {
    Alert.alert('Atención', 'Completa todos los campos');
    return;
}

try {
    await iniciarSesion(email.trim(), password);

    router.replace('/vehiculos');
} catch (error) {
    Alert.alert('Error de inicio de sesión', error.message);
}
};

return (
    <View style={styles.container}>
    <Text style={styles.logo}>VICE CITY MOTORS</Text>
    <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>

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

    <TouchableOpacity style={styles.button} onPress={entrar}>
        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
    </TouchableOpacity>

    <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
        <Link href="/registro" style={styles.link}>
        Regístrate
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
    registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
},
    registerText: {
    color: '#FFFFFF'
},
    link: {
    color: '#D4AF37',
    fontWeight: 'bold'
}
});

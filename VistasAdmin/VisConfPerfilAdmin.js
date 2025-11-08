import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { useRoute, useNavigation } from '@react-navigation/native'
import conexion, { auth } from '../Acceso/Firebase'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';


const VisConfPerfilAdmin = () => {

    const navigation = useNavigation();
    const [perfil, setPerfil] = useState(null);
    const user = auth.currentUser;

    // Necesario para subir a Cloudinary
    const [uploading, setUploading] = useState(false);
    const cloudName = 'dfo7xkwo9';
    const uploadPreset = 'imgParaLM';

    useEffect(() => {
        obtenerPerfilPorId();
    }, []);

    const cambiarFoto = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (result.canceled) return;

            const newImage = result.assets[0].uri;

            setUploading(true);

            const formData = new FormData();
            formData.append("file", {
                uri: newImage,
                type: "image/jpeg",
                name: `${user.uid}.jpg`,
            });

            formData.append("upload_preset", uploadPreset);
            formData.append("folder", "perfil");

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const resultCloud = await response.json();

            if (!resultCloud.secure_url) {
                Alert.alert("Error", "La imagen no se subió correctamente");
                console.log("Respuesta Cloudinary:", resultCloud);
                setUploading(false);
                return;
            }

            await conexion.collection("tblAdministrador").doc(user.uid).update({
                imgPerfil: resultCloud.secure_url
            });
            // Refresca el estado sin recargar pantalla
            setPerfil(prev => ({ ...prev, imgPerfil: resultCloud.secure_url }));
            setUploading(false);
            Alert.alert("Listo", "Tu foto de perfil ha sido actualizada ");
        } catch (error) {
            setUploading(false);
            Alert.alert("Error", "No se pudo actualizar la foto");
            console.log(error);
        }
    };

    const actualizar = (campo, valor) => {
        setPerfil({ ...perfil, [campo]: valor });
    };

    const obtenerPerfilPorId = async () => {
        try {
            const data = await conexion.collection('tblAdministrador').doc(user.uid).get();
            if (data.exists) {
                setPerfil(data.data());
            }
        } catch (error) {
            console.error("Usuario no encontrado", error);
        }
    };

    const modificarPerfil = async () => {
        if (!perfil.perNombre || !perfil.perEmpresa || !perfil.perDireccion || !perfil.perTel) {
            Alert.alert("Error", "Todos los campos son requeridos");
            return;
        }

        try {
            await conexion.collection('tblAdministrador').doc(user.uid).update({
                perNombre: perfil.perNombre,
                perEmpresa: perfil.perEmpresa,
                perDireccion: perfil.perDireccion,
                perTel: perfil.perTel
            });

            Alert.alert('Éxito', 'Perfil actualizado correctamente');
            navigation.goBack();

        } catch (err) {
            Alert.alert("Error al modificar", err.message);
        }
    };
    const insets = useSafeAreaInsets();

    // ✅ Evitar error si perfil aún no carga
    if (!perfil) {
        return (
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <ActivityIndicator size="large" color="blue" />
                <Text>Cargando perfil...</Text>
            </KeyboardAvoidingView>
        );
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
            <TouchableOpacity style={styles.contenedorFecha} onPress={() => navigation.goBack()}>
                <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')}></Image>
                <Text style={{ marginLeft: 8, fontWeight: 700 }}>regresar</Text>
            </TouchableOpacity>
            <View style={styles.contenedor}>
                <Text style={styles.textPerfil}>Cambiar perfil</Text>
                <TouchableOpacity onPress={cambiarFoto}>
                    <Avatar
                        style={styles.foto}
                        size='xlarge'
                        rounded
                        source={
                            perfil?.imgPerfil
                                ? { uri: perfil.imgPerfil }
                                : require('../assets/icons/user-temporal.png')
                        }
                    />
                </TouchableOpacity>


                <View style={{ paddingTop: '15' }}>
                    <TextInput
                        style={[styles.textBox, { fontWeight: '900' }]}
                        placeholder='Nombre'
                        placeholderTextColor='#0a0a0aff'
                        value={perfil?.perNombre}
                        onChangeText={(valor) => actualizar('perNombre', valor)}
                    />
                </View>

                <View style={{ paddingTop: '15' }}>
                    <TextInput
                        style={[styles.textBox, { fontWeight: '900' }]}
                        placeholder='Empresa'
                        placeholderTextColor='#0a0a0aff'
                        value={perfil?.perEmpresa}
                        onChangeText={(valor) => actualizar('perEmpresa', valor)}
                    />
                </View>

                <View style={{ paddingTop: '15' }}>
                    <TextInput
                        style={[styles.textBox, { fontWeight: '900' }]}
                        placeholder='Dirección'
                        placeholderTextColor='#0a0a0aff'
                        value={perfil?.perDireccion}
                        onChangeText={(valor) => actualizar('perDireccion', valor)}
                    />
                </View>

                <View style={{ paddingTop: '15' }}>
                    <TextInput
                        style={[styles.textBox, { fontWeight: '900' }]}
                        placeholder='Teléfono'
                        placeholderTextColor='#0a0a0aff'
                        keyboardType='numeric'
                        value={perfil?.perTel}
                        onChangeText={(valor) => actualizar('perTel', valor)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.guardar} onPress={modificarPerfil}>
                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: '18' }}>Guardar cambios</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default VisConfPerfilAdmin

const styles = StyleSheet.create({
    textPerfil: {
        fontSize: 18,
        fontWeight: 700,
        padding: 15,
    },

    contenedor: {
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F3F3F3',
        width: 330,
        height: 480,
        borderRadius: 30,
        padding: 15
    },

    guardar: {
        backgroundColor: '#3498db',
        borderRadius: 20,
        margin: 20,
        padding: 15,
    },

    foto: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 15
    },
    contenedorFecha: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        marginTop: 9
    },

    flechaIzquierda: {
        height: 16,
        width: 15,
        marginLeft: 5,
    },

    textBox: {
        backgroundColor: '#ffffffff',
        width: 200,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
    }
})
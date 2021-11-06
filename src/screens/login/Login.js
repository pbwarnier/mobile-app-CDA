import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Formik} from "formik";
import loginUser from "../../context/actions/loginUser";
import {GlobalContext} from "../../context/Provider";
import {color} from "react-native-reanimated";

export default function Login() {
    const {
        authDispatch,
        authState: {error, loading},
    } = useContext(GlobalContext);

    function handleSubmit(values){
        loginUser(values)(authDispatch);
    }

    return (
        <Formik
            initialValues={{email: '', password:''}}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <View style={styles.container}>
                    <Text style={styles.logo}>CANNARDIMMO</Text>
                    {error ?
                        <Text style={styles.loginError}>Vos indentifiants sont incorrects</Text>
                        :
                        null
                    }
                    <View style={styles.inputView}>
                        <TextInput
                            name='username'
                            style={styles.inputText}
                            placeholder="Email"
                            placeholderTextColor="#343a40"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            name='password'
                            placeholder="Password"
                            placeholderTextColor="#343a40"
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text onPress={handleSubmit} title="Submit" style={styles.loginText}>CONNEXION</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        alignItems: 'center',
    },

    logo: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#B2D2A4",
        marginTop: 20,
        marginBottom: 50
    },

    inputView: {
        width: "90%",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },

    inputText: {
        height: 50,
        color: "#212529",
        backgroundColor: "#fff"
    },

    forgot: {
        color: "#fff",
        fontSize: 11
    },

    loginBtn: {
        width: "80%",
        backgroundColor: "#B2D2A4",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },

    loginText: { color: "#fff" },

    loginError: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#dc3545",
        color: "#fff",
        borderRadius: 5
    }
});
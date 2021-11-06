import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from "react-native";
import { Button } from 'react-native-paper';

async function handlePress(){
    await AsyncStorage.removeItem('token')
    console.log('Token deleted')
    window.location.reload();
}

export default  function Logout(){
    return(
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={() => handlePress()}>
                Deconnexion
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop : 140,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        height: 100,
    },
});
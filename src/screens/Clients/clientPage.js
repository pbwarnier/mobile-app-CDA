import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, Linking, Platform, TouchableOpacity, Image} from 'react-native';
import {List} from 'react-native-paper';
import axiosInstance from '../../helpers/axiosInstance';

export default function Client({route, navigation}) {
    const [async, setAsync] = React.useState(false);
    const [clientData, setClientData] = React.useState([]);
    const {id} = route.params;

    //appeller depuis la page de client
    const makeCall = () => {
        let phoneNumber = '';
        // gestion de la plateforme ios et android 
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:'+clientData.phone;
        } else {
          phoneNumber = 'telprompt:'+clientData.phone;
        }
    
        Linking.openURL(phoneNumber);
    };

    // envoyer un mail depuis la page de client
    const sendMail = () => {
        let clientMail = 'mailto:'+clientData.email;
        Linking.openURL(clientMail);
    }
    
    React.useEffect(function () {
        axiosInstance
            .get('client/'+JSON.stringify(id))
            .then((res) => {
                setClientData(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [async]);
    
    const separator = () => (
        <View style={styles.separator}></View>
    )

    const openGMAP = () => {
        let URL = "https://www.google.fr/maps/search/"+clientData.adress
        Linking.openURL(URL)
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <View style = {styles.avatarContainer}>
                <Image source = {require('../../../assets/img/avatar.png')}
                style = {styles.avatar}
                />
            </View>

            <List.Section 
            style={styles.List} 
            ItemSeparatorComponent={separator}
            >
                <List.Subheader>Info du client</List.Subheader>
                <List.Item title="Nom" description={clientData.lastname+" "+clientData.firstname}/>
                <TouchableOpacity onPress={() => sendMail()}>
                    <List.Item title="Email" description={clientData.email} right={() => <List.Icon color="#B2D2A4" icon="email" />}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => makeCall()}>
                    <List.Item title="Numero de Telephone" description={clientData.phone} right={() => <List.Icon color="#B2D2A4" icon="phone"/>}/> 
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openGMAP()}>
                    <List.Item title="Adresse" description={clientData.adress} right={() => <List.Icon color="#B2D2A4" icon="home" />}/>
                </TouchableOpacity>
                <List.Item title="Note : " description={clientData.comment}></List.Item>
            </List.Section>
        </SafeAreaView>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    List: {
        padding: 10, 
    },
    avatar: {
        height: 200,
        width: 200,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 0.6,
        width: '70%',
        backgroundColor: '#B2D2A4',
        alignSelf: 'center',
    }
});
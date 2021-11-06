import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';
import axiosInstance from '../../helpers/axiosInstance';

export default function Clients({navigation}) {

    const [clientData, setClientData] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query) => (
        setSearchQuery(query)
    )
    const [sizeOfData, setSizeOfData] = useState(15);
    const clientToShow = clientData.slice(0, sizeOfData)

    useEffect(function () {
        axiosInstance
            .get('client?filter='+searchQuery)
            .then((res) => {
                setClientData(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [searchQuery]);



    const userNavigation = (userId) => (
        navigation.navigate('Client', {id: userId})
    )  

    const Item = ({id, userName, userFirstname}) => (
        <TouchableOpacity onPress={() => userNavigation(id)}>
            <View style={styles.item}>
                <Text>{userName} {userFirstname}</Text>
            </View>
        </TouchableOpacity>
    )


    const renderItem = ({item}) => (
        <Item id={item.id_clients} userName={item.lastname} userFirstname={item.firstname} />
    );

    const separator = () => (
        <View style={styles.separator}></View>
    )

    const handleScroll = () => {
        setSizeOfData(sizeOfData + 10);
        console.log(sizeOfData);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} style={styles.searchbar}/>
            <FlatList
                onEndReached={handleScroll}
                data = {clientToShow}
                renderItem = {renderItem}
                keyExtractor = {item => item.id_clients}
                ItemSeparatorComponent = {separator}
            >
            </FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        padding: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#B2D2A4',
        // borderRadius: 5,
    }, 
    separator: {
        height: 0.6,
        width: '70%',
        backgroundColor: '#B2D2A4',
        alignSelf: 'center',
    },
    searchbar: {
        margin: 20,
        borderRadius: 30,
        borderColor: '#B2D2A4',
        borderWidth: 4,
        height: 40,
    }
});
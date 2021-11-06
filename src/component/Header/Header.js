import React, { Component} from 'react';
import {View,TouchableOpacity} from 'react-native' ;
import { Appbar } from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";

export default function Header(){
    const _handleSearch = () => console.log('Searching');
    const {toggleDrawer} = useNavigation();
    return(
    <View>
        <Appbar.Header>
            <TouchableOpacity
                style={styles.button}
                onPress={toggleDrawer}
            >
                <Text>Press Here</Text>
            </TouchableOpacity>
            <Appbar.Content title="Listes des clients" subtitle="" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
        </Appbar.Header>
    </View>
    )
}   
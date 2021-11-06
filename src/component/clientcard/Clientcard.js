import React, { Component } from 'react';  
import { StyleSheet, Text, View } from 'react-native';  
import { List } from 'react-native-paper';

export default function Clientlist(props) {
    return(

        <List.Item
            title={props.firstname +" "+ props.lastname}
            description={props.email}
        />
        
        // <View style={styles.clientList}>
        //     <Text>{props.id}</Text>
        //     <Text>{props.firstname}</Text>
        //     <Text>{props.lastname}</Text>
        //     <Text>{props.email}</Text>
        // </View>
    )
}
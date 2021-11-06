import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, TouchableOpacity} from "react-native";
import {CLIENT_LIST, HOME_NAVIGATOR, PROPERTIES_LIST, PROPERTY_INFO, CLIENT, INVENTORY} from "../constants/RouteNames,js";
import Clients from "../screens/Clients";
import PropertiesList from "../screens/Properties";
import PropertyInfo from "../screens/Properties/propertyInfo";
import Inventory from "../screens/Inventories";
import Icon from "../component/Icon";
import Client from "../screens/Clients/clientPage"

const Stack = createStackNavigator();

const Home = () => {
    const {setOptions, toggleDrawer} = useNavigation();
    React.useEffect(() => {
        setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        toggleDrawer();
                    }}>
                    <Icon type="material" size={25} name="menu" />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <Text>Accueil</Text>
            ),
        });
    }, []);
    return(
        <View>
            <Text>Home page</Text>
        </View>
    );
}

export default function HomeNavigation() {
    return (
        <Stack.Navigator initialRouteName={HOME_NAVIGATOR}>
            <Stack.Screen name={HOME_NAVIGATOR} component={Home} />
            <Stack.Screen name={CLIENT_LIST} component={Clients} />
            <Stack.Screen name={PROPERTIES_LIST} component={PropertiesList} />
            <Stack.Screen name={CLIENT} component={Client} />
            <Stack.Screen name={PROPERTY_INFO} component={PropertyInfo}/>
            <Stack.Screen name={INVENTORY} component={Inventory} />
        </Stack.Navigator>
    );
}
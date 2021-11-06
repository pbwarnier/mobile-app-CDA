import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../screens/login/Login";
import {LOGIN} from "../constants/RouteNames,js";

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={LOGIN} component={Login} />
        </Stack.Navigator>
    );
}
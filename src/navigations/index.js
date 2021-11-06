import React, {useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from "./AuthNavigator";
import DrawNavigator from "./DrawerNavigator";
import {GlobalContext} from "../context/Provider";



const AppNavContainer = () => {
    // On recupére notre context dans le quel on avais mis nos state dans le provider
    const {
        authState:{isLoggedIn}
    } = useContext(GlobalContext)
    return(
        <NavigationContainer>
            {isLoggedIn ?
                <DrawNavigator />
                :
                <AuthNavigator />
            }
        </NavigationContainer>
    );
};



export default AppNavContainer;
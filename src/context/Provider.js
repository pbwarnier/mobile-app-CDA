import React, {createContext, useReducer} from 'react'
import auth from "./reducers/auth";
import authStates from "./initialstates/authStates";

// Creation du context a retourner au enfants de notre GlobalProvider
export const GlobalContext = createContext({});

const GlobalProvider=({children}) =>{
    // On crée des valeurs par défaut a nos context avec Reducer
    const [authState, authDispatch] = useReducer(auth, authStates)
    return(
        <GlobalContext.Provider value={{authState, authDispatch}} >
            {children}
        </GlobalContext.Provider>
    );
}
export default GlobalProvider;
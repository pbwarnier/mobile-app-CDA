import React from 'react';
import { Alert, TouchableOpacity, SafeAreaView, Text, View} from 'react-native';
import logoutUser from '../../context/actions/logoutUser';
import styles from './styles';
import Icon from "../../component/Icon";
import Container from "../../component/Container";
import {CLIENT_LIST, HOME_NAVIGATOR, PROPERTIES_LIST} from "../../constants/RouteNames,js";

export default function  SideMenu({navigation, authDispatch}){
  // Une fonction qui lance une alert pour confirmer la deconnexion et qui ensuite appel la fonction de deconnexion
  const handleLogout = () => {
    navigation.toggleDrawer();
    Alert.alert('Deconnexion !', 'êtes vous sur de vouloir vous déconnecter ?', [
      {
        text: 'Annuler',
        onPress: () => {},
      },

      {
        text: 'Oui',
        onPress: () => {
          logoutUser()(authDispatch);
        },
      },
    ]);
  };
  // On crée un tableau avec les item de notre menu drawer
  const menuItems = [
    {
      icon: <Icon type="material" size={17} name="home" />,
      name: 'Accueil',
      onPress: () => {
        navigation.navigate(HOME_NAVIGATOR);
      }
      },
    {
      icon: <Icon type="material" size={17} name="person" />,
      name: 'Liste de clients',
      onPress: () => {
        navigation.navigate(CLIENT_LIST);
      }
    },
    {
      icon: <Icon type="material" size={17} name="apartment" />,
      name: 'Liste des propriétés',
      onPress: () => {
        navigation.navigate(PROPERTIES_LIST);
      }
    },
    {
      icon: <Icon type="material" size={17} name="logout" />,
      name: 'Logout',
      onPress: handleLogout,
    },
  ];
  // Ensuite dans notre return on map notre tableau des item de menu
  return (
      <SafeAreaView>
        <Container>
          <View style={{paddingHorizontal: 30}}>
            {menuItems.map(({name, icon, onPress}) => (
                <TouchableOpacity onPress={onPress} key={name} style={styles.item}>
                  <View style={styles.icon}>{icon}</View>
                  <Text style={styles.itemText}>{name}</Text>
                </TouchableOpacity>
            ))}
          </View>
        </Container>
      </SafeAreaView>
  );
}

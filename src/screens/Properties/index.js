import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import { Button, Card, Title, Divider } from 'react-native-paper';
import axiosInstance from '../../helpers/axiosInstance';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOGIN_FAIL, LOGIN_SUCCESS} from "../../constants/actionsTypes";
import {navigation} from "@react-navigation/native";
import Icon from "../../component/Icon";
import {PROPERTY_INFO} from "../../constants/RouteNames,js";

export default function PropertiesList({navigation}){
	const [async, setAsync] = useState(false);
	const [propertyData, setPropertyData] = useState([]);

	useEffect(function(){
		axiosInstance
			.get('property')
			.then((property) => {
				setPropertyData(property.data)
			})
			.catch((error) => {
				console.log(error)
			});
	}, [async,setAsync]);

	return (
		<ScrollView>
			<View style={styles.container}>
				{propertyData.map(({id_properties, name, reference, img, price, type, city, zip_code}) => (
				<View>
					<Card style={styles.card}>
						<Card.Cover source={{ uri :img }} />
						<Card.Content style={{ padding: 10 }}>
							<Title>{name}</Title>
							<Text style={ styles.textGrey }>Référence : {reference}</Text>
							<View style={styles.item}>
								<View><Icon type="material" size={15} name="room" /></View>
								<Text style={ styles.textGrey }>{city} {zip_code}</Text>
							</View>
						</Card.Content>
						<Divider />
						<View style={{ padding: 10 }}>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
								{ price }€
								{ type == 'location' ? '/mois HC' : null }
							</Text>
						</View>
						<View style={{ padding: 10 }}>
							<Button color="#B2D2A4" mode="contained" onPress={() => {navigation.navigate(PROPERTY_INFO, {id: id_properties});}}>
								Consulter annonce
							</Button>
						</View>
					</Card>
				</View>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
  	margin: 5,
  	width: 300,
  	borderWidth: 1,
    borderColor: "#20232a",
  },

  textGrey: {
  	color: "grey"
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
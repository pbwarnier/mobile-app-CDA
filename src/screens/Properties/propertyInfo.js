import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import axiosInstance from '../../helpers/axiosInstance';
import { Button, Card, Title, Divider } from 'react-native-paper';
import Icon from "../../component/Icon";
import { navigation } from "@react-navigation/native";
import {CLIENT} from '../../constants/RouteNames,js'
import {INVENTORY} from "../../constants/RouteNames,js";

export default function PropertyInfo({route, navigation}){
	const { id } = route.params;
	const [propertyData, setPropertyData] = useState([]);

	useEffect(function(){
		axiosInstance
			.get('property/'+id)
			.then((property) => {
				setPropertyData(property.data)
			})
			.catch((error) => {
				console.log(error)
			});
	}, []);

	
	return (
		<ScrollView>
			<Card style={styles.card}>
				<Card.Cover source={{ uri :propertyData.img }} />
				<Card.Content style={{ padding: 10 }}>
					<Title>{propertyData.name}</Title>
					<View style={styles.label}>
						<Text>Référence : </Text><Text style={{ color: 'grey', fontWeight: 'bold' }}>{propertyData.reference}</Text>
					</View>
					<View>
						<View style={styles.label}>
							<Text>{ propertyData.type == 'location' ? 'Propriétaire' : 'Vendeur' } : </Text>
							<Text style={styles.item} onPress={() => navigation.navigate(CLIENT, {id: propertyData.id_clients})}>{propertyData.firstname} {propertyData.lastname}</Text>
						</View>
					</View>
					<View>
						<View style={styles.label}>
							<View><Icon type="material" size={16} name="room" /></View>
							<Text>Localisation</Text>
						</View>
						<View>
							<Text style={ styles.textGrey }>
								{propertyData.adress}, {propertyData.zip_code} {propertyData.city} ({propertyData.country})
							</Text>
						</View>
					</View>
					<View>
						<View style={styles.label}>
							<Text>Déscriptif du bien :</Text>
						</View>
						<View style={styles.flexible}>
							<View style={styles.item}><Text>{propertyData.area} m²</Text></View>
							<View style={styles.item}><Text>{propertyData.nb_room} pièce(s)</Text></View>
							<View style={styles.item}><Text>{propertyData.type}</Text></View>
							{ propertyData.furniture ? <View style={styles.item}><Text>Meublé</Text></View> : null }
							{ propertyData.garage ? <View style={styles.item}><Text>Parking/Garage privé</Text></View> : null }
							{ propertyData.garden ? <View style={styles.item}><Text>Jardin</Text></View> : null }
						</View>
						<View style={styles.label}>
							<Text style={ styles.textGrey}>{propertyData.description}</Text>
						</View>
					</View>
				</Card.Content>
				<Divider />
				<Card.Content style={{ padding: 10 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
						{ propertyData.price }€
						{ propertyData.type == 'location' ? ' /mois HC' : null }
					</Text>
					{ propertyData.type == 'location'
						? <Text style={{ fontWeight: 'bold' }}>Charges : {propertyData.rental_expenses}€ /mois</Text>
						: null }
					<View style={styles.buttonGroup}>
						<Button color="#B2D2A4" mode="outlined" onPress={() => console.log('Pressed')}>{ propertyData.type == 'location' ? 'Louer ce bien' : 'Vendre ce bien' }</Button>
						{ propertyData.type == 'location' ? <Button color="#B2D2A4" mode="outlined" onPress={() => {navigation.navigate(INVENTORY, {id: id});}}>Etat des lieux</Button> : null }
						
					</View>
				</Card.Content>
			</Card>
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

  buttonGroup: {
  	marginTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },

  flexible: {
  	flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  card: { margin: 5 },

  textGrey: { color: "grey" },

  label: {
  	marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  item: {
  	padding: 5,
  	backgroundColor: "#D8D8D8",
  	borderRadius: 5,
  	margin: 2
  }
});
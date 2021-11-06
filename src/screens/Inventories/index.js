import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axiosInstance from '../../helpers/axiosInstance';
import { navigation } from "@react-navigation/native";

export default function Inventory({route}){
	const { id } = route.params;

	return (
		<View>{ id }</View>
	);
}
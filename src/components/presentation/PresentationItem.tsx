import React, {useEffect, useState} from 'react';
import {TextInput, Image, ScrollView, FlatList, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const PresentationItem = ({item, it,  index, scrollX, currentIndex}:any) => {
	return(
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={item.image} style={styles.image}/> 
			</View>
			<View style={styles.labelContainer}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>
					{item.description}
				</Text>
			</View>
		</View>
	)
}
export default PresentationItem;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		backgroundColor:'white',
		width:width
	},
	labelContainer:{
		flex:.3,
		//backgroundColor:'blue',
		//padding:10,
	},
	footerContainer:{
		backgroundColor:'red',
		paddingVertical:50,
	},
	imageContainer:{
		flex:.7,
		justifyContent:'center',
		//backgroundColor:'red',
		alignItems:'center',
	},
	image:{
		justifyContent:'center',
		//width:width/2,
		resizeMode:'contain',	
		width:'100%',
		height:'100%',
	},
	title:{
		textAlign:'center',
		color:'blue',
		fontWeight:'bold',
		fontSize:28,
		marginBottom:10,
		
	},
	description:{
		color:'gray',
		textAlign:'center',
		paddingHorizontal:64,

	}
})
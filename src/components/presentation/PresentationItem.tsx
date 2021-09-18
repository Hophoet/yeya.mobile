import React from 'react';
import { Image, Text, View, StyleSheet, Dimensions} from 'react-native'
import {colors} from '../../assets/colors/main'

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
		justifyContent:'center',
		backgroundColor:'white',
		width:width
	},
	labelContainer:{
		flex:.3,
		// backgroundColor:'blue',
		//padding:10,
	},
	footerContainer:{
		// backgroundColor:'red',
		paddingVertical:50,
	},
	imageContainer:{
		flex:.7,
		justifyContent:'center',
		// backgroundColor:'blue',
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
		color:colors.main,
		fontWeight:'bold',
		fontSize:28,
		marginBottom:10,
		
	},
	description:{
		color:'gray',
		flex:1,
		textAlign:'center',
		paddingHorizontal:40,

	}
})

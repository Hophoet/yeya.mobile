import React, {useState} from 'react'
import {StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../assets/colors/main'

const ActionButtonsItem = ({item, width, height, navigate}:any) => {
  const [isFavorite, toggleFavorite] = useState(true);


	return(
		<View style={[styles.container]}>
			<TouchableOpacity
				style={styles.buttonContainer}	
				onPress={()=>{
					if(item.action){
						item.action();
					}
				}}
			>
			<View style={styles.row1}>
				<TouchableOpacity style={styles.iconButton}>
					<Icon name={item.icon} color='white' size={30}/>
				</TouchableOpacity>
			</View>
			<View style={styles.row2}>
				<Text style={styles.title}>{item.title}</Text>
			</View>
			<View style={styles.row3}>
					<Icon name='arrow-forward' color='black' size={30}/>
			</View>
			</TouchableOpacity>
		</View>
	)
}

export default ActionButtonsItem;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		backgroundColor:'white',
	},
	buttonContainer:{
		flexDirection:'row',

	},
	row1:{

		// backgroundColor:'aqua',
		justifyContent:'center',
		alignItems:'center',
	},
	row2:{
		flex:1,
		// backgroundColor:'red',
		justifyContent:'center',
		paddingHorizontal:20,

	},
	row3:{
		
		justifyContent:'center',
		alignItems:'center',
		// backgroundColor:'green',
	},
	iconButton:{
		backgroundColor:colors.main,
		width:width/8,
		height:width/8,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:5,
	},
	title:{
		fontSize:15,
	}

	})

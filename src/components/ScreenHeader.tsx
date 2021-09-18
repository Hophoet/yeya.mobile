import React from 'react'
import { Text, StyleSheet, View, Dimensions} from 'react-native'


type Props = {
	title:string,
	description?:string
}

const ScreenHeader = ({title, description}:Props) => {
	return(
		<View style={styles.container}>
			<View style={styles.row1}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerTitle}>{title}</Text>
				</View>
				<View style={styles.naContainer}>
					<Text style={styles.description}>{description}</Text>
				</View>
			</View>
		</View>
	)
}

export default ScreenHeader;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		//backgroundColor:'red',
		// height:width/8,
		// backgroundColor:'red',
		paddingHorizontal:20,
	},
	headerContainer:{
		// backgroundColor:'red',
		// paddingHorizontal:20,
		// paddingBottom:10,
		borderBottomWidth:StyleSheet.hairlineWidth,
		// borderBottomColor:'black',
		// marginBottom:10,
  },
   headerTitle:{
		color:'black',
		fontSize:30,
		fontWeight:'bold',
		paddingVertical:10,
	},
	description:{
		color:'gray',
	},
	row1:{
		paddingVertical:10,
		// backgroundColor:'red',
	},
	})

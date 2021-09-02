import React,{useEffect} from 'react';
import {View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from '../../assets/colors/main'

const ProfileHeader = (
		{
			title,
			isOnline,
			description,
			firstAction,
		}:any) => {

    useEffect(() => {
    }, [])

    return(
        <View style={styles.container}>
			<View style={styles.row1}>
				<TouchableOpacity
					onPress={firstAction}	
				>
					<Icon name='arrow-back' color={'white'} size={25}/>
				</TouchableOpacity>
			</View>
			<View style={styles.row2}>
				<Text style={styles.title}>Peter Page</Text>
			</View>
			<View style={styles.row3}>
			</View>
        </View>
    );
}

export default ProfileHeader;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
		backgroundColor:colors.main,
		flexDirection:'row',
		height:width/7,
		elevation:10,
		justifyContent:'space-between',
		paddingHorizontal:20,
	
    },
	row1:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		// backgroundColor:'blue',
	},
	row2:{
		paddingHorizontal:10,
		alignItems:'center',
		justifyContent:'center',
		// backgroundColor:'green',
	},
	row2Row2:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
	},
	row3:{
		justifyContent:'center',
		alignItems:'center',

	},
	textInput:{
		paddingHorizontal:10,
		fontSize:12,
	},
	title:{
		color:'white',
		fontSize:20,
		fontWeight:'bold',
	},
	dot:{
		marginHorizontal:5,
		backgroundColor:colors.main,
		width:8,
		height:8,
		borderRadius:90,
	},
	online:{
		marginHorizontal:5,
		fontSize:12,
		color:'gray',
	},
	row3Content:{
		backgroundColor:colors.main,
		height:width/9,
		width:width/9,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:90,
	},
	letter:{
		color:'white',
		fontSize:20,
	}
})

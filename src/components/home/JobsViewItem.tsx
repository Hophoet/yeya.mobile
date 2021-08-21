
import React, {useState} from 'react'
import {Image, StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../assets/colors/main'
import moment from 'moment';

const JobsViewItem = ({item, width, height, navigate}:any) => {
  const [isFavorite, toggleFavorite] = useState(true);

	const getDate = () => {
		const created_at_timestamp = Math.floor(new Date(item.created_at).valueOf()/1000);
		const date:string = moment.unix(created_at_timestamp).fromNow() //.format('ll')
		return date;
	}

	return(
		<View style={[styles.container]}>
			<View style={styles.row1}>
				<View style={styles.row1Row1}>
					<Text style={styles.emoji}>📅</Text>
				</View>
			</View>
			<View style={styles.row2}>
					<Text numberOfLines={2} style={styles.title}>{item.title} title rest</Text>
					<Text>
						{ item.price &&
						<Text style={styles.price}>XOF {item.price} </Text>
						}
						{ (item.city )&&`- ${item.city.name}, ${item.city.country}`}</Text>
			</View>
			<View style={styles.row3}>
				<View style={styles.row3Column1}>
					<TouchableOpacity style={styles.favoriteButton}>
						<Icon size={30} name='heart-outline' color='gray'/>
					</TouchableOpacity>
				</View>
				<View style={styles.row3Column2}>
					<Text style={styles.date}>{getDate()}</Text>
				</View>
			</View>
		</View>
	)
}

export default JobsViewItem;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		backgroundColor:'white',
		elevation:3,
		flexDirection:'row',
		marginHorizontal:20,
		marginVertical:10,
		borderRadius:10,
		padding:10,
		minHeight:width/4,
	},
	row1:{
		flex:1,
		flexDirection:'row',
		//backgroundColor:'aqua',
		justifyContent:'center',
		alignItems:'center',
	},
	row1Row1:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
	},
	row2:{
		flex:2,
		justifyContent:'center'

	},
	row3:{
		paddingBottom:10,
		justifyContent:'space-between'
	},
	row4:{
		flexDirection:'row',
		justifyContent:'space-between',
	},
	row3Column1:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
	},
	title:{
		fontWeight:'bold',
		fontSize:20,
	},
	price:{
		fontWeight:'bold',
	},
	emoji:{
		fontSize:30,
	},
	favoriteButton:{
		//backgroundColor:'red',
	}
	})

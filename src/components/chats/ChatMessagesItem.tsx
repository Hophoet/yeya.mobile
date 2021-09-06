
import React, {useState} from 'react'
import {Image, StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../assets/colors/main'
import moment from 'moment';
import { create } from 'react-test-renderer';

const ChatMessagesItem = ({item, authUser, width, height, navigate}:any) => {
  const [isFavorite, toggleFavorite] = useState(true);

	const getSender = () =>{
		if(item){
			return item.sender;
		}
	}
	const getReceiver = () => {
		if(item){
			return item.receiver;
		}
	}

	const getDate = () => {
		let created_at = item && item.created_at
		const created_at_timestamp = Math.floor(new Date(created_at).valueOf()/1000);
		const date:string = moment.unix(created_at_timestamp).fromNow() //.format('lll')
		return date;
	}

	const sender:any = getSender();
	const receiver:any = getReceiver();

	return(
		<View style={styles.container}>
			<View 
				style={[styles.contentContainer,
					( (authUser && authUser.id) == (sender && sender.id) )
					?{alignSelf:'flex-end'}
					:{alignSelf:'flex-start'},
					( (authUser && authUser.id) == (sender && sender.id) )
					?styles.ownerMessageRadius
					:styles.notOwnerMessageRadius,
					( (authUser && authUser.id) == (sender && sender.id) )
					?{backgroundColor:colors.main}
					:{backgroundColor:'white'}
					]}>
						{ item.image &&
							<View 
								style={styles.commandProductImageContainer}
								>
								<Image
									style={styles.commandProductImage}
									resizeMode='cover'
									source={item.image}
								/>
							</View>
						}
					<Text 
						numberOfLines={2}
						style={[
						( (authUser && authUser.id) == (sender && sender.id) )
						?styles.notSenderText
						:styles.senderText]}>{(item && item.text)?item.text:'message'}</Text>
					<View style={styles.dateContainer}>
						{ item.read &&
						<Icon name='checkmark-done' 
							color={
								( (authUser && authUser.id) == (sender && sender.id) )
								?'white'
								:'black'} size={12}/>
						}
						<Text style={[
							( (authUser && authUser.id) == (sender && sender.id) )
							?styles.notSenderDate
							:styles.senderDate]}>{getDate()}</Text>
						
					</View>
			</View>
			
		</View>
	)
}

export default ChatMessagesItem;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
		paddingVertical:10,
    },
	contentContainer:{
		padding:20,
		maxWidth:width/1.2,
		maxHeight:width/1.5,
	},
	ownerMessageRadius:{
		elevation:5,
		borderTopRightRadius:10,
		borderTopLeftRadius:10,
		borderBottomLeftRadius:10,
		marginRight:10,
	},
	notOwnerMessageRadius:{
		elevation:5,
		borderTopRightRadius:10,
		//borderTopLeftRadius:10,
		borderBottomRightRadius:10,
		borderBottomLeftRadius:10,
		marginLeft:10,
	},
	senderText:{
		color:'black',
	},
	notSenderText:{
		color:'white',
	},
	senderDate:{
		fontSize:10,
		opacity:.8,
		color:'gray',
		paddingHorizontal:10,
		
	},
	notSenderDate:{
		fontSize:10,
		opacity:.8,
		paddingHorizontal:10,
		color:'white',
		
	},
	commandProductImageContainer:{
		flex:1,
		paddingVertical:10,
		//backgroundColor:'red',
		alignItems:'center',
		justifyContent:'center',
	},
	commandProductImage:{
		//width:width/3,
		padding:10,
		borderRadius:10,
		height:width/2.5,//'100%',//width/3,
		width:width/2,//width/3,
		marginVertical:10,
	},
	dateContainer:{
		flexDirection:'row'

	},
})

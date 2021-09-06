import React,{useEffect} from 'react';
import {Image, Text, View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const ChatUserItem = ({item, authUser, navigateTo}:any) => {

    useEffect(() => {
	}, [])

	const getChatUser = () =>{
		if( 
			(item.user1 && item.user1.id) == (authUser && authUser.id)
			){
			return item.user2
		}
		return item.user1
	}

	const getLastMessage = () =>{
		if(item && item.messages && item.messages.length>0){
			const lastMessage:any = item.messages[ item.messages.length - 1];
			return lastMessage
		}
	}

	const getUserProfileUrl = () => {
		let chatUser:any = getChatUser();
		if(chatUser && chatUser.image && chatUser.image.url){
			return chatUser.image.url;
		}
	}

	const _getNewMessagesCount = () => {
		let newMessagesCount = 0;
		let messages = item.messages;
		if(messages){
			for(let message of messages){
				if(!message.read && 
					(message.sender && authUser && message.receiver.id == authUser.id)
				){
					newMessagesCount++;
				}
			}
		}
		return newMessagesCount;
	}


	const chatUser:any = getChatUser();
	const lastMessage:any = getLastMessage();
	const lastMessagesCount:number = _getNewMessagesCount();
	
	//console.log(getChatUser())
	//console.log(getLastMessage());
	//console.log(getUserProfileUrl());
	//console.log(_getNewMessagesCount())
    return(
        <TouchableOpacity 
			activeOpacity={.5}
			onPress={()=>{
				if(navigateTo){
					navigateTo('ChatDetail', {'chat':item});
				}
			}}
			style={styles.container}>
			<View style={styles.row1}>
				<View style={styles.userIconContainer}>
				{ getUserProfileUrl()
					?<Image style={styles.image} source={{uri:getUserProfileUrl()}}/>
					:<Icon style={styles.icon} name={'person'} color='gray' size={30}/>
				}
				</View>
			</View>
			<View style={styles.row2}>
				<Text style={styles.username}>
					{(chatUser && chatUser.email)?chatUser.email:'email'}
				</Text>
				<Text 
					numberOfLines={1.4} 
					style={[styles.message,
					( (typeof getLastMessage()) == 'object'
						&&
					!getLastMessage().read 
					&&(getLastMessage().receiver && getLastMessage().receiver.id == authUser.id))
					?{ fontWeight:'bold'}
					:{opacity:.5}
				]}>{
				(lastMessage && lastMessage.text)
					? lastMessage.text
					:' '}</Text>
			</View>
			<View style={styles.row3}>
				{ (lastMessagesCount > 0) &&
				<View style={styles.counterContainer}>
					<Text style={styles.counterLabel}>{lastMessagesCount}</Text>
				</View>
				}
			</View>
        </TouchableOpacity>
    );

    
}

export default ChatUserItem;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
		//flex:1,
		flexDirection:'row',
		paddingVertical:10,
		//backgroundColor:'red',

    },
	row1:{
		flexDirection:'row',
		//backgroundColor:'red',
		// flex:2,
		alignItems:'center',
	},
	row2:{
		flex:1,
		//backgroundColor:'blue',
		paddingHorizontal:10,
		justifyContent:'center',

	},
	row3:{
		//backgroundColor:'blue',
		alignContent:'center',
		justifyContent:'center',
	},
	icon:{
	},
	username:{
		fontSize:17,
		color:'black',
		fontWeight:'bold',
	},
	message:{
		color:'black',
	},
	userIconContainer:{
		backgroundColor:'#1111',
		borderRadius:width/2,
		width:width/7,
		height:width/7,
		justifyContent:'center',
		alignItems:'center',
	},
	image:{
		width:width/7,
		height:width/7,
		borderRadius:width/2,
	},
	counterContainer:{
		backgroundColor:'#F00A',
		borderRadius:width,
		width:width/20,
		height:width/20,
		padding:5,
		justifyContent:'center',
		alignItems:'center',
	},
	counterLabel:{
		color:'white',
		fontSize:10,
		fontWeight:'bold'
	}
})

import React, {createRef} from 'react';
import { TextInput, FlatList, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import MainHeader from '../../components/MainHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatMessageItem from '../../components/chats/ChatMessagesItem'
import {senderChatMessage, getChatConversation, readChatConversationMessages} from '../../backend/requests/chat';
import {SendChatMessageType, GetChatConversationType, ReadChatConversationMessagesType} from '../../backend/requests/types';
import { colors } from '../../assets/colors/main'


type Props = {
	route:any,
	navigation:any,
	authUser:any,
	authUserToken:string,
}
type State = {
	chat:any,
	message:string,
	messageSending:boolean,
}

class ChatDetail extends React.Component<Props, State> {
	chat:any;
    chatScrollRef:any;
	_isMounted:boolean;
	messagesListener:any;
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		this.chatScrollRef = createRef();

		// chat conversation messages listener 

		// Set the state
		this.state = {
			messageSending:false,
			message:'',
			chat:this.props.route.params && this.props.route.params.chat
		};
 	}


	_getNewMessagesCount = () => {
		let newMessagesCount = 0;
		const authUser = this.props.authUser;
		let conversation:any = this.state.chat;
		let messages = conversation.messages;
		for(let message of messages){
			if(!message.read && 
				(message.sender && authUser && message.receiver.id == authUser.id)
			){
				newMessagesCount++;
			}
		}
		return newMessagesCount;
	}


	_messagesListener = () => {
		// console.log('message listener start')
		this.messagesListener = setInterval(() => {
			// console.log('message listener call')
		}, 18000)

	}

	back = () => {
		console.log('back press');
		this.props.navigation.goBack();	
	}
	save = () => {

	}


	getChatUser = () =>{
		const chat:any = this.state.chat;
		const authUser:any = this.props.authUser;

		if( 
			(chat && chat.user1 && chat.user1.id) == (authUser && authUser.id)
			){
			return chat.user2
		}
		return chat.user1
	}
	getChatMessages = () =>{
		const chat:any = this.state.chat;

		if( 
			(chat && chat.messages)
			){
			return chat.messages
		}
		return []
	}

   _customNav = () => {
	   const chatUser:any = this.getChatUser();
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				firstAction={this.back}	
				iconLabel={(chatUser && chatUser.email)?chatUser.email:'icon label'}
				secondAction={this.save}
			/>
          ),


        });

    }

	navigateTo = (screen:string, data:any={}) => {
		this.props.navigation.navigate(screen, data);
	}

	_getChatConversation = () =>{
		const chat = this.state.chat;
		const authUserToken = this.props.authUserToken;
		const authUser = this.props.authUser;
		const chatUser = this.getChatUser();
		if( authUser && authUser && chat){
			const data:GetChatConversationType = {
				authToken:authUserToken,
				conversationId:chat.id,
			}
			getChatConversation(data)
			.then((response:any) => {
				if(this._isMounted){
					console.log('chat getted')
					this.setState({chat:response.data})
					this._handleMessageList();
					// console.log(response.data)
					// console.log('chat conversations')
					// console.log(this.state.chatConversations)
					//console.log(response.data);
				}
			})
			.catch(function (error) {
				if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
				} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
				}
				console.log(error.config);
			});
		}
	}
	_readChatConversationMessages = () => {
		const authUserToken = this.props.authUserToken;
		const authUser = this.props.authUser;
		const chat = this.state.chat;
		// read the chat conversation only if the user
		// is authenticated and the chat state object exists
		// and there are new unread messages
		if(authUser 
			&& authUser 
			&& chat
			&& this._getNewMessagesCount()){

			// console.log('chat will be read')
			const data:ReadChatConversationMessagesType = {
				authToken:authUserToken,
				conversationId:chat.id
			}
			readChatConversationMessages(data)
			.then((response:any) => {
				if(this._isMounted){
					// console.log(response.data)
					// update tab bar badge
					//console.log(response.data);
				}
			})
			.catch(function (error) {
				if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
				} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
				}
				console.log(error.config);
			});
		}
		else{
			// console.log('chat will not be read')
		}
	}
	


	_sendMessage = () =>{
		let message:string = this.state.message
		const authUserToken = this.props.authUserToken;
		const authUser = this.props.authUser;
		const chatUser = this.getChatUser();
		if( authUser 
			&& authUser 
			&& chatUser 
			&& message
			&& !this.state.messageSending){
			const data:SendChatMessageType = {
				authToken:authUserToken,
				receiverId:chatUser.id,
				text:message
			}
			// 
			this.setState({messageSending:true})
			senderChatMessage(data)
			.then((response:any) => {
				if(this._isMounted){
					this.setState({messageSending:false})
					this.setState({message:''})
					// console.log(response.data)
					// get the new conversation
					this._getChatConversation();
					// console.log('chat conversations')
					// console.log(this.state.chatConversations)
					//console.log(response.data);
				}
			})
			.catch( (error:any) => {
				if(this._isMounted){
					this.setState({messageSending:false})
				}
				if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
				} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
				}
				console.log(error.config);
			});
		}
	}


	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._customNav();
		this._readChatConversationMessages();
		this._handleMessageList();
		this._messagesListener();
	}
	
	componentWillUnmount(){
		// Set tje component mount state to true
		this._isMounted = false;
		// console.log('message listener clear')
		clearInterval(this.messagesListener);
	}

	_handleMessageList = () => {
		if(this.chatScrollRef.current){				
			if(this.chatScrollRef.current._listRef){
				if(this.chatScrollRef.current._listRef._scrollRef){
					if(this.chatScrollRef.current._listRef._scrollRef.scrollToEnd){
						//console.log('scroll to end');
						//console.log(this.chatScrollRef.current._listRef._scrollRef.scrollToEnd);
						this.chatScrollRef.current.scrollToEnd({animating:true});
						this.chatScrollRef
						.current
						.scrollToEnd({})
					}
				}

			}
		}
	}

	render() {
		// console.log(this.getChatMessages().length)
		// console.log(this.chatScrollRef)
		const ITEM_HEIGHT = (width/1.5) + 10;
		
		return (
			<View style={styles.container}>
				<View style={styles.row1}>
					<FlatList
						ref={this.chatScrollRef}
						data={this.getChatMessages()}
						keyExtractor={(item)=>item.id.toString()}
						/*
						getItemLayout={(data, index) => (
								{
									length:ITEM_HEIGHT, 
									offset:ITEM_HEIGHT * index,
									index
								}
							)}
						*/
						renderItem={({item, index})=>(
							<ChatMessageItem
								item={item}
								navigateTo={this.navigateTo}
								authUser={this.props.authUser}
							/>
						)
						}

					/>
				</View>
				<View style={styles.row2}>
					<View style={styles.formContainer}>
						<View style={styles.textInputContainer}>

							<TextInput
								value={this.state.message}
								maxLength={250}
								style={styles.textInput}
								onChangeText={(message)=>this.setState({message})}
								onSubmitEditing={this._sendMessage}
								placeholder='Enter votre message'
							/>
						</View>
						<TouchableOpacity
							onPress={this._sendMessage}
							// onPress={this._flat}
							style={styles.iconButtonContainer}
							activeOpacity={.5}
						>
							<Icon color={colors.main} name='send' size={30} />
						</TouchableOpacity>

					</View>
				</View>
			</View>
		);
	}
}



// Map dispath function from redux to the component props
const mapDispatchToProps = (dispatch:any) => {
	return {
	  dispatch: (action:any) => {
		dispatch(action);
	  },
	};
  };
  
// Map the redux global state to the component props
const mapStateToProps = (state:any) => {
return {
	authUserToken: state.authUserToken,
	authUser:state.authUser
};
};

// Export the component by connecting the maps to the component
export default connect(mapStateToProps, mapDispatchToProps)(ChatDetail);

const {width, height} = Dimensions.get('window');
// Set styles
const styles = StyleSheet.create({
	container: {
    	flex: 1,
		backgroundColor:'white',
		paddingHorizontal:10,
  	},
  	row1:{
		//backgroundColor:'red',
		flex:1,
		borderRadius:30,
		//marginHorizontal:10,
  	},
	row2:{
		//backgroundColor:'red',
		paddingHorizontal:20,

	},
	formContainer:{
		// backgroundColor:'red',
		flexDirection:'row',
	},
	textInputContainer:{
		flex:1,
		paddingVertical:5,
		paddingHorizontal:10,
	},
	iconButtonContainer:{
		// backgroundColor:'green',
		justifyContent:'center',
		alignItems:'center',
		paddingHorizontal:10,
	}

});

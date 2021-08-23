import React from 'react';
import {StatusBar, FlatList, Text, View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import ChatUserItem from '../../components/chats/ChatUserItem';
import {getUserChatConversations} from '../../backend/requests/chat'
import {GetUserChatConversationType} from '../../backend/requests/types';
import BorderButton from '../../components/CButton';

type Props = {
	navigation:any,
	authUserToken:string,
	authUser:any,
}

type State = {
	chatConversations:any[]
}

class Chat extends React.Component<Props, State> {
	_isMounted:boolean;
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		// Set the state
		this.state = {
			chatConversations:[]
		};
 	}

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._getUserChatConversations()
		// Add event listener, when the the component on focus
		this.props.navigation.addListener('focus', (e:any) => {
			// make products request to get data, like avaible products for the user
			if(this._isMounted){
				// request to get the products on the screen focus
				this._getUserChatConversations();
			}
		});

	}

	_getNewMessagesCount = () => {
		let newMessagesCount = 0;
		const authUser = this.props.authUser;
		let conversations:any[] = this.state.chatConversations;
		for(let conversation of conversations){
			let messages = conversation.messages;
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

	_getDateTimeStamp = (dateString:string)=>{
		// console.log(dateString)
		const created_at_timestamp = Math.floor(new Date(dateString).valueOf()/1000);
		return created_at_timestamp;
	}

	sortConversations =(conversations:any[])=> {
		if(conversations){
			let sorted_conversations = conversations.sort((conversation1, conversation2)=> {
				// console.log(conversation1)
				let c1Ts = this._getDateTimeStamp(conversation1.last_updated_at);
				let c2Ts = this._getDateTimeStamp(conversation2.last_updated_at);
				if(c2Ts > c1Ts){
					return 4;
				}
				else if(c2Ts < c1Ts){
					return -4;
				}
				else {
					return 0;
				}
			})
			return sorted_conversations;
		}
		return conversations;
	}

	// Method to get the products categories
	_getUserChatConversations = () => {
		const authUserToken = this.props.authUserToken;
		const authUser = this.props.authUser;
		if(authUser && authUser){
			const data:GetUserChatConversationType = {
				authToken:authUserToken
			}
			getUserChatConversations(data)
			.then((response:any) => {
				if(this._isMounted){
					let conversations:any[] = this.sortConversations(response.data)
					this.setState({chatConversations:conversations});


					// update tab bar badge
					let newMessagesCount = this._getNewMessagesCount()
					if(newMessagesCount){
						this.props.navigation.setOptions({tabBarBadge:newMessagesCount.toString()})
					}
					else{
						this.props.navigation.setOptions({tabBarBadge:null})

					}
					// console.log('chat conversations')
					// console.log(this.state.chatConversations)
					//console.log(response.data);
				}
			})
			.catch( (error:any) => {
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
	
	componentWillUnmount(){
		// Set tje component mount state to true
		this._isMounted = false;
	}


	navigateTo = (screen:string, data:any) => {
		this.props.navigation.navigate(
			screen,
			data
		);

	}
	_userAuthenticated = () =>{
		if(
			this.props.authUser 
			&& this.props.authUserToken
		){
			return true;
		}

	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor='black' />
				<View style={styles.row1}>
						<View style={styles.headerContainer}>
							<Text style={styles.headerTitle}>Boite de réception</Text>
						</View>
						{ !this._userAuthenticated() &&
						<View style={styles.naContainer}>
							<Text style={styles.naTitle}>Connectez-vous pour consulter les messages</Text>
							<Text style={styles.naDescription}>Une fois votre connexion effectuée, les messages de vos clients apparaitrons ici.</Text>
							<BorderButton
								buttonStyle={{alignSelf:'flex-start'}}
								label='Connexion'
								onPress={()=>{
									this.props.navigation.navigate('SignIn')
								}}
							/>
						</View>
						}
						{ (this._userAuthenticated() 
							&& this.state.chatConversations 
							&& this.state.chatConversations.length == 0) &&
						<View style={styles.naContainer}>
							<Text style={styles.naDescription}>
							Une fois vos produits commandé, les messages de vos clients apparaitrons ici.</Text>
						</View>
						}
				</View>

				<View style={styles.row2}>
					{ this._userAuthenticated() &&
					<FlatList
						showsVerticalScrollIndicator={false}
						data={this.state.chatConversations}
						keyExtractor={(item)=>item.id.toString()}
						renderItem={({item, index})=>(
							<ChatUserItem
								item={item}
								authUser={this.props.authUser}
								navigateTo={this.navigateTo}
							/>
						)
						}
					/>
					}
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
export default connect(mapStateToProps, mapDispatchToProps)(Chat);


const {width, height} = Dimensions.get('window');
// Set styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor:'white',
	paddingHorizontal:20,
  },
  row1:{
	paddingVertical:10,
  },
  row2:{
	  flex:1,

  },
	headerContainer:{
		//backgroundColor:'red',
		// paddingHorizontal:20,
		paddingBottom:10,
		borderBottomWidth:StyleSheet.hairlineWidth,
		borderBottomColor:'black',
		marginBottom:10,
  },
   headerTitle:{
		fontSize:30,
		fontWeight:'bold',
		paddingVertical:10,
	},
	headerDescription:{
		 
	},
	naTitle:{
		fontSize:20,
		fontWeight:'bold',
		// paddingVertical:10,

	},
	naDescription:{
		opacity:.5
	},
});

import React, {createRef} from 'react';
import { Text, ScrollView, TextInput, FlatList, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import MainHeader from '../../components/MainHeader';
import JobDetailBottomButton from '../../components/buttons/JobDetailBottomButton';
import { toggleJobFavorite } from '../../backend/requests/job'
import { ToggleJobFavoriteRequestType } from '../../backend/requests/types'
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
	job:any,
	isUserFavorite:boolean,
}

class JobDetail extends React.Component<Props, State> {

	chat:any;
	_isMounted:boolean;
	messagesListener:any;
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;

		// chat conversation messages listener 

		// Set the state
		this.state = {
			job: this.props.route.params && this.props.route.params.job,
			isUserFavorite:true,
		};
 	}


   _customNav = () => {
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				firstAction={this.props.navigation.goBack}	
				iconLabel={''}
				secondAction={()=>{}}
			/>
          ),


        });

    }

	// Method to get the products categories
	_toggleJobFavorite = () => {
		let data:ToggleJobFavoriteRequestType = {
			authToken:this.props.authUserToken,
			jobId:this.state.job.id
		}
		toggleJobFavorite(data)
		.then((response:any) => {
			//console.log(response.data)
			console.log('toggle favorite request done....')
			this.setState({isUserFavorite:!this.state.isUserFavorite})
		})
		.catch( (error:any)=>  {
			if(error.response) {
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


	navigateTo = (screen:string, data:any={}) => {
		this.props.navigation.navigate(screen, data);
	}

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._customNav();
		this.setState({isUserFavorite:this._isUserFavorite()})
	}
	
	_isUserFavorite = () => {
		let job = this.state.job
		if(job){
			let user_ids = job.favorite_users_ids
			let authUser = this.props.authUser
			if (user_ids && authUser){
				//console.log(user_ids, authUser)
				for(let user_id of user_ids){
					//console.log(user_id, authUser.id)
					if(user_id == authUser.id){
						return true
					}
				}
			}
		}
		return false
	}

	componentWillUnmount(){
		// Set tje component mount state to true
		this._isMounted = false;
		// console.log('message listener clear')
	}

	render() {
		// console.log(this.getChatMessages().length)
		// console.log(this.chatScrollRef)
		const ITEM_HEIGHT = (width/1.5) + 10;
		
		return (
			<View style={styles.container}>
				<View style={styles.row1}>
					<View style={styles.row1Row1}>
						<Text style={styles.title}>{this.state.job && this.state.job.title}</Text>
					</View>
					<View style={styles.row1Row2}>
						<Text style={styles.price}>XOF {this.state.job && this.state.job.price}</Text>
						<Text style={styles.location}> / {this.state.job && this.state.job.city && this.state.job.city.name} - {this.state.job && this.state.job.city && this.state.job.city.country} </Text>
					</View>
				</View>
				{/* <View style={styles.row2}>
					<TouchableOpacity 
						onPress={()=>{}}
						style={styles.favoriteButton}>
						<Icon size={40} name={this._isUserFavorite()?'heart':'heart-outline'} color='red'/>
					</TouchableOpacity>
				</View> */}
				<View style={styles.row3}>
					<View style={styles.descriptionContainer}>
						<ScrollView
							showsVerticalScrollIndicator={false}	
						>
							<Text style={styles.description}>{this.state.job && this.state.job.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque tenetur voluptatibus modi adipisci praesentium laborum, distinctio deleniti esse minus expedita quae doloribus quaerat. Quo commodi cumque nisi nulla deleniti placeat. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore quod voluptatibus earum asperiores, repellendus voluptate porro, nam magnam animi labore, cum deserunt quidem eligendi. Praesentium nisi minus consequatur consequuntur at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis perferendis dignissimos ab eaque consectetur aspernatur, quis sint modi minima temporibus ut ipsam accusantium fuga vitae architecto libero illo et voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, pariatur deserunt. Alias voluptatum quae, consectetur cumque hic natus, omnis similique reprehenderit velit assumenda ullam sint modi debitis asperiores architecto adipisci. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, recusandae laudantium expedita culpa molestias pariatur praesentium cum eaque incidunt provident veniam voluptates sequi, commodi ut facilis officiis quae, ab dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa mollitia deleniti nulla nihil, perferendis architecto omnis numquam aspernatur neque nemo harum earum porro quisquam minima fuga quo dignissimos? Animi, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam, molestiae saepe sunt praesentium ipsum laboriosam libero nisi perferendis fugit illo error provident ex atque. Quos voluptate pariatur ducimus quae? </Text>
						</ScrollView>
					</View>
				</View>
				<JobDetailBottomButton
					isUserFavorite={this.state.isUserFavorite}	
					toggleJobFavorite={this._toggleJobFavorite}
				/>
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
export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);

const {width, height} = Dimensions.get('window');
// Set styles
const styles = StyleSheet.create({
	container: {
    	flex: 1,
		backgroundColor:'white',
  	},
  	row1:{
		// backgroundColor:'red',
		//flex:1,
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		//marginHorizontal:10,
  	},
	row3:{ //backgroundColor:'red',
		flex:5,
	},
	row2:{
		justifyContent:'center',
		alignItems:'center',
		marginVertical:20,

	},
	favoriteButton:{
		// backgroundColor:'blue'
	},
	row1Row2:{
		flexDirection:'row',
	},
	title:{
		fontSize:20,
		fontWeight:'bold',
	},
	descriptionContainer:{
		backgroundColor:'white',
		flex:1,
		elevation:5,
		marginHorizontal:50,
		paddingBottom:100,
		//borderRadius:20,
		borderTopEndRadius:20,
		borderTopLeftRadius:20,
		padding:20,
	}

});

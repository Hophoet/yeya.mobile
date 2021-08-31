import React, {createRef} from 'react';
import { Text, ScrollView, Alert, TextInput, FlatList, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import MainHeader from '../../components/MainHeader';
import JobDetailBottomButton from '../../components/buttons/JobDetailBottomButton';
import { toggleJobFavorite, deleteJob } from '../../backend/requests/job'
import { ToggleJobFavoriteRequestType, DeleteJobType } from '../../backend/requests/types'
import Icon from 'react-native-vector-icons/Ionicons';
import ChatMessageItem from '../../components/chats/ChatMessagesItem'
import ProposalModal from '../../components/modals/Proposal'
import Toast from '../../components/toasts'
import {senderChatMessage, getChatConversation, readChatConversationMessages} from '../../backend/requests/chat';
import {SendChatMessageType, GetChatConversationType, ReadChatConversationMessagesType} from '../../backend/requests/types';
import { colors } from '../../assets/colors/main'
import { createProposal } from '../../backend/requests/job'
import { CreateProposalType } from '../../backend/requests/types'


type Props = {
	route:any,
	navigation:any,
	authUser:any,
	authUserToken:string,
}
type State = {
	job:any,
	isUserFavorite:boolean,
	requestIsLoading:boolean,
	proposalModalIsVisible:boolean,
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
			requestIsLoading:false,
			proposalModalIsVisible:false,
			job: this.props.route.params && this.props.route.params.job,
			isUserFavorite:true,
		};
 	}

    _createProposal = (text:string) => {
      let job = this.state.job
      let authUserToken = this.props.authUserToken
      if (job 
		&& authUserToken 
		&& text
		&& !this.state.requestIsLoading
		){
        this.setState({requestIsLoading:true})
		let data:CreateProposalType = {
          	authToken:authUserToken,
			jobId:job.id,
			text:text,
		}
		createProposal(data)
		.then((response:any) => {
			if(this._isMounted){
				this.setState({requestIsLoading:false})
				Toast._show_bottom_toast("Vous avez postuler à cette tache avec succes");	
				this.toggleProposalModal()
			}
		})
		.catch((error:any) => {
			if(this._isMounted){
				this.setState({requestIsLoading:false})
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					let errorData = error.response.data;
					console.log(errorData)
					if(errorData.code == 'proposal/already-apply'){
						Toast._show_bottom_toast("Vous avez déja postuler à cette tache");	
					}
					else if(errorData.code == 'auth/email-and-password-required'){
						Toast._show_bottom_toast("Entrer votre email et mot de passe pour continuer");	

					}
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
			}
		});

      }
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

	onDeleteJob = () =>{
		Alert.alert(
			'Suppression',
			'Voulez-vous vraiment supprimer cette tache ?',
			[
				{	
					text: 'Non',
					onPress: () => {},
					style: 'cancel'
				},
				{
					text:'Oui',
					onPress: () => this._deleteJob()
				}
			],
			{ cancelable:false}
		);
	}
	// Method to delete job
	_deleteJob = () => {
		let job = this.state.job
		let authUserToken = this.props.authUserToken
		if (job && authUserToken){

		let data:DeleteJobType = {
			authToken:this.props.authUserToken,
			id:job.id
		}
		deleteJob(data)
		.then((response:any) => {
			Toast._show_bottom_toast('Tache supprimée avec succes');
			this.props.navigation.goBack()
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
	_isJobOwner = () => {
		let job = this.state.job
		if(job){
			let job_user = job.user
			let authUser = this.props.authUser
			if(job_user && authUser){
				// console.log(job_user.id, authUser.id)
				if(job_user.id == authUser.id){
					return true
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


	toggleProposalModal = () => {
		this.setState({proposalModalIsVisible:!this.state.proposalModalIsVisible})
	}

	render() {
		// console.log(this.getChatMessages().length)
		// console.log(this.chatScrollRef)
		const ITEM_HEIGHT = (width/1.5) + 10;
		
		return (
			<View style={styles.container}>
				<ProposalModal
					modalIsVisible={this.state.proposalModalIsVisible}
					requestIsLoading={this.state.requestIsLoading}
					toggleModal={this.toggleProposalModal}
					navigateBack={this.props.navigation.goBack}
					submitInput={(value:any)=> { 
						if(value.text){
							this._createProposal(value.text)
						}
					}}
				/>
				<View style={styles.row1}>
					<View style={styles.row1Row1}>
						<Text style={styles.title}>{this.state.job && this.state.job.title}</Text>
					</View>
					<View style={styles.row1Row2}>
						<Text style={styles.price}>XOF {this.state.job && this.state.job.price}</Text>
						<Text style={styles.location}> / {this.state.job && this.state.job.city && this.state.job.city.name} - {this.state.job && this.state.job.city && this.state.job.city.country} </Text>
					</View>
				</View>
				<View style={styles.row3}>
					<View style={styles.descriptionContainer}>
						<ScrollView
							showsVerticalScrollIndicator={false}	
						>
							<Text style={styles.description}>{this.state.job && this.state.job.description} 
							</Text>
						</ScrollView>
					</View>
				</View>
				<JobDetailBottomButton
					isJobOwner={this._isJobOwner()}	
					toggleProposalModal={this.toggleProposalModal}
					job={this.state.job}
					deleteJob={this.onDeleteJob}
					navigateTo={this.navigateTo}
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
	},
	description:{
		fontSize:20,
	}

});

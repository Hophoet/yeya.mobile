
import React from 'react';
import { FlatList, ActivityIndicator,  StatusBar, View, StyleSheet, Dimensions} from 'react-native'
import { getUserJobsProposalsAndConversations } from '../../backend/requests/job'
import { GetUserJobsProposalsAndConversationsType } from '../../backend/requests/types'
import ProposalsListViewItem from '../../components/proposal/ProposalsListViewItem';
import { colors } from '../../assets/colors/main'
import  {SET_PROPOSALS} from '../../redux/store/actions'
import ScreenHeader from '../../components/ScreenHeader'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	dispatch:Function,
	proposals:any[],
}

type State = {
	requestIsLoading:boolean,
	jobs:any[],
}

class ProposalsListView extends React.Component<Props, State> {

	_isMounted:boolean;
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		// Set the state
		this.state = {
			requestIsLoading:false,
			jobs: this.props.proposals
		};
 	}

	// Method to get the products categories
	_getJobsProposals = () => {
		const authUserToken = this.props.authUserToken;
		this.setState({requestIsLoading:true})
		let data:GetUserJobsProposalsAndConversationsType = {
			authToken:this.props.authUserToken
		}
		getUserJobsProposalsAndConversations(data)
		.then((response:any) => {
			if(this._isMounted){
				//console.log(response.data)
				this.setState({jobs:response.data});
				this.setState({requestIsLoading:false})
				//console.log(response.data);
				let setProposalsAction = {type:SET_PROPOSALS, value:response.data}
				this.props.dispatch(setProposalsAction)
			}
		})
		.catch( (error:any)=>  {
			if(this._isMounted){
				this.setState({requestIsLoading:false})
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

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._getJobsProposals()
		// Add event listener , before the component dismiss
		this.props.navigation.addListener('focus', (e:any) => {
			// make products request to get data, like avaible products for the user
			if(this._isMounted){
				// request to get the products on the screen focus
				this._getJobsProposals()
			}
		});

	}

	navigateToSignUp = ()=>{
		this.props.navigation.navigate('SignUp')
	}
 	navigateToSendPasswordResetCode = ()=>{
		this.props.navigation.navigate('SendPasswordResetCode')
	}

	navigateToHome = ()=>{
		this.props.navigation.navigate('App')
	}


	_renderActivityIndicator = () => {
		if(this.state.requestIsLoading){
			return (
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator size={'large'} color='gray'/>
				</View>
			)
		}
	}


	render(){
		return(
			<View style={styles.container}>
                <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
				<ScreenHeader
					title='Postulations de vos taches'	
					description='Ici vous avez vos taches et leurs et leur postulation'	
				/>
				<View style={styles.row3}>
					<FlatList
						data={this.state.jobs}
						onRefresh={this._getJobsProposals}
						refreshing={this.state.requestIsLoading}
						showsVerticalScrollIndicator={false}
						renderItem={({item, index}:any) => <ProposalsListViewItem
							getJobs={this._getJobsProposals}
							navigateTo={this.props.navigation.navigate}
							item={item}	
						/>}
						ItemSeparatorComponent={()=><View style={styles.itemsSeparator}/>}
						keyExtractor={(item)=>{
							return (item  && item.job && item.job.id) }}
					/>
				</View>
			</View>
		)
	}

}
//maps with the state global
const mapDispatchToProps = (dispatch:any) => {
    return {
        dispatch: (action:any) => {dispatch(action)}
    }
}

const mapStateToProps = (state:any) => {
    return {
        authUserToken:state.authUserToken,
        authUser:state.authUser,
        proposals:state.proposals,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProposalsListView)

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white',
		//backgroundColor:'#6C63FF'
	},
	headerTitle:{
		fontSize:20,
		fontWeight:'bold',
	},
	headerDescription:{
		color:'gray',
		fontSize:14,
	},
	row1:{
		flexDirection:'row',
		paddingHorizontal:20,
		//backgroundColor:'red',
		alignItems:'center',
		flex:1,
	},
	row1Row1:{
		flex:3,
		//backgroundColor:'red',
	},
	row1Row2:{
		flex:1,
		//backgroundColor:'blue',
		alignItems:'center',
	},
	row2:{
		flex:1,
		paddingHorizontal:20,
		//backgroundColor:'red',
		justifyContent:'center',

	},
	row2Content:{
		flexDirection:'row',
	},
	row3:{
		flex:6,
	},
	selectedButton:{
		backgroundColor:'#2387',
		marginRight:20,
		paddingVertical:10,
		paddingHorizontal:20,
		borderRadius:10,
	},
	unSelectedButton:{
		backgroundColor:'#1111',
		marginRight:20,
		paddingVertical:10,
		paddingHorizontal:20,
		borderRadius:10,
	},
	selectedButtonLabel:{
		color:'white',
	},
	unSelectedButtonLabel:{
		color:'gray',
	},
	itemsSeparator:{
		paddingVertical:10,
	},
	activityIndicatorContainer:{
		justifyContent:'center',
		alignItems:'center',
	}


})

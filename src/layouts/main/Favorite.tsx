
import React from 'react';
import { FlatList, ActivityIndicator,  StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import MainHeader from '../../components/MainHeader';
import Toast from '../../components/toasts'
import { mailFormatIsValid } from '../../utils/mail'
import { signIn } from '../../backend/requests/auth'
import { SignInRequestType } from '../../backend/requests/types'
import CButton from '../../components/CButton';
import JobsViewItem from '../../components/home/JobsViewItem';
import CTextInput from '../../components/CTextInput';
import { colors } from '../../assets/colors/main'
import Icon from "react-native-vector-icons/Ionicons";
import { getUserFavorite } from '../../backend/requests/job'
import { GetUserFavoriteJobsRequestType } from '../../backend/requests/types'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	dispatch:any
}

type State = {
	requestIsLoading:boolean,
	selectedFilter:any,
	jobs:any[],
}

class Favorite extends React.Component<Props, State> {

	_isMounted:boolean;
	email:string = '';
	password:string = '';
	filters:any[] = []
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		this.filters = [
			{id:2, name:'Most Revelant'},
			{id:3, name:'Most Recent'},
		]
		// Set the state
		this.state = {
			requestIsLoading:false,
			selectedFilter:this.filters[0],
			jobs:[
			]

		};
 	}

	// Method to get the products categories
	_getUserFavoriteJobs = () => {
		const authUserToken = this.props.authUserToken;
		this.setState({requestIsLoading:true})
		let data:GetUserFavoriteJobsRequestType = {
			authToken:this.props.authUserToken
		}
		getUserFavorite(data)
		.then((response:any) => {
			if(this._isMounted){
				console.log(response.data)
				this.setState({jobs:response.data});
				this.setState({requestIsLoading:false})
				//console.log(response.data);
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

	navigateTo = (screen:any, data:any) => {
		this.props.navigation.navigate(
			screen,
			data
		);

	}



	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._getUserFavoriteJobs()
		// Add event listener , before the component dismiss
		this.props.navigation.addListener('focus', (e:any) => {
			// make products request to get data, like avaible products for the user
			if(this._isMounted){
				// request to get the products on the screen focus
				this._getUserFavoriteJobs()
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
				<StatusBar 
					hidden={false}
					barStyle={'dark-content'}
					backgroundColor={'white'}
				/>
				<View style={styles.row1}>
					<View style={styles.row1Row1}>
						<Text style={styles.headerTitle}>Favoris</Text>
						<Text style={styles.headerDescription}>Collecter les traveaux que vous souhaitez revoir plus tard en cliquant sur le coeur</Text>
					</View>
				</View>
				<View style={styles.row2}>
					<FlatList
						onRefresh={this._getUserFavoriteJobs}
						refreshing={this.state.requestIsLoading}
						data={this.state.jobs}
						showsVerticalScrollIndicator={false}
						renderItem={({item, index}:any) => <JobsViewItem
							item={item}	
							navigate={this.navigateTo}
							fromFavorite={true}
							getUserFavoriteJobs={this._getUserFavoriteJobs}
						/>}
						ItemSeparatorComponent={()=><View style={styles.itemsSeparator}/>}
						keyExtractor={(item)=>item.id.toString()}
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
        authUser:state.authUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorite)

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white',
		//backgroundColor:'#6C63FF'
	},
	headerTitle:{
		fontSize:35,
		fontWeight:'bold',
	},
	headerDescription:{
		color:'gray',
		fontSize:14,
	},
	row1:{
		flexDirection:'row',
		//backgroundColor:'red',
		paddingHorizontal:20,
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
		flex:6,
	},
	unSelectedButtonLabel:{
		color:'gray',
	},
	itemsSeparator:{
		paddingVertical:10,
	}


})

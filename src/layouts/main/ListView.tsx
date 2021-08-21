
import React from 'react';
import { FlatList, ActivityIndicator,  StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import MainHeader from '../../components/MainHeader';
import Toast from '../../components/toasts'
import { mailFormatIsValid } from '../../utils/mail'
import { getJobs } from '../../backend/requests/job'
import { GetJobsRequestType } from '../../backend/requests/types'
import CButton from '../../components/CButton';
import JobsViewItem from '../../components/home/JobsViewItem';
import CTextInput from '../../components/CTextInput';
import { colors } from '../../assets/colors/main'
import Icon from "react-native-vector-icons/Ionicons";
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

class ListView extends React.Component<Props, State> {

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
		this.email = ''
		this.password = ''
 	}

	// Method to get the products categories
	_getJobs = () => {
		const authUserToken = this.props.authUserToken;
		this.setState({requestIsLoading:true})
		let data:GetJobsRequestType = {
			authToken:'lksdfjldfjlsdf'
		}
		getJobs(data)
		.then((response:any) => {
			if(this._isMounted){
				//console.log(response.data)
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

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._getJobs()
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
						<Text style={styles.headerTitle}>Creer/Trouver du jobs</Text>
						<Text style={styles.headerDescription}>Plus de 12K. jobs disponible</Text>
					</View>
					<View style={styles.row1Row2}>
						<Icon name='search' size={25} color='gray'/>
					</View>
				</View>
				<View style={styles.row2}>
					<View style={styles.row2Content}>

					{
						this.filters.map((item, index)=> (
							<TouchableOpacity 
								onPress={()=> this.setState({selectedFilter:item})}
								key={index.toString()} 
								style={(this.state.selectedFilter.id == item.id)
									?styles.selectedButton
									:styles.unSelectedButton}>
								<Text 
									style={(this.state.selectedFilter.id == item.id)
										?styles.selectedButtonLabel
										:styles.unSelectedButtonLabel}>{item.name}</Text>
							</TouchableOpacity>
						))
					}
					</View>
				</View>
				<View style={styles.row3}>
					{this._renderActivityIndicator()}
					<FlatList
						data={this.state.jobs}
						onRefresh={this._getJobs}
						refreshing={this.state.requestIsLoading}
						showsVerticalScrollIndicator={false}
						renderItem={({item, index}:any) => <JobsViewItem
							item={item}	
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
export default connect(mapStateToProps, mapDispatchToProps)(ListView)

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

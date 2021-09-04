
import React from 'react';
import { FlatList, TextInput, ActivityIndicator,  StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IconButton from '../../components/buttons/IconButton'
import  {SET_JOBS} from '../../redux/store/actions'
import  {searchQuery, sortByMostPopular, sortByMostRecent} from '../../utils/filters'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	jobs:any[],
	dispatch:Function
}

type State = {
	requestIsLoading:boolean,
	selectedFilter:any,
	searchQuery:any,
	jobs:any[],
	baseJobs:any[],
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
			{id:3, code:'mr', name:'Plus Récentes'},
			{id:2, code:'mp', name:'Plus Visités'},
		]
		// Set the state
		this.state = {
			searchQuery:'',
			requestIsLoading:false,
			selectedFilter:null,
			jobs:this.props.jobs?this.props.jobs:[],
			baseJobs:this.props.jobs?this.props.jobs:[]
		};
 	}

	// Method to get the products categories
	_getJobs = () => {
		const authUserToken = this.props.authUserToken;
		this.setState({requestIsLoading:true})
		let data:GetJobsRequestType = {
			authToken:this.props.authUserToken
		}
		getJobs(data)
		.then((response:any) => {
			if(this._isMounted){
				//console.log(response.data)
				this.setState({jobs:response.data});
				this._sort()
				this.setState({baseJobs:response.data});
				this.setState({requestIsLoading:false})
				let setJobsAction = {type:SET_JOBS, value:response.data}
				this.props.dispatch(setJobsAction)
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

	// Search method base on the local api search algorith to search products
	_searchQuery = (query:string) => {
		this.setState({searchQuery:query})
		if(query){
			let jobs = [...this.state.jobs];	
			let baseJobs = [...this.state.baseJobs];
			// Get the search jobs with the search algo function
			let gettedJobs = searchQuery(jobs, baseJobs,  query);
			// Set the search products found
			this.setState({jobs:gettedJobs});
		}
	}

	_sortByMostRecent = () => {
		let jobs = [...this.state.jobs];	
		let sortedJobs:any[] = sortByMostRecent(jobs)
		this.setState({jobs:sortedJobs});
	}

	_sortByMostPopular = () => {
		let jobs = [...this.state.jobs];	
		let sortedJobs:any[] = sortByMostPopular(jobs)
		this.setState({jobs:sortedJobs});
	}
	_sort = () => {
		if(this.state.selectedFilter){
			if(this.state.selectedFilter.code == 'mr'){
				this._sortByMostRecent()
			}
			else if(this.state.selectedFilter.code == 'mp'){
				this._sortByMostPopular()
			}
		}
	}
	
	_clearQuerySearch = () => {
		this.setState({searchQuery:''})
		this.setState({jobs:this.state.baseJobs})
	}

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._getJobs()
		// Add event listener , before the component dismiss
		this.props.navigation.addListener('focus', (e:any) => {
			// make products request to get data, like avaible products for the user
			if(this._isMounted){
				// request to get the products on the screen focus
				this._getJobs()
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
	navigateToMapView = () => {
		this.props.navigation.navigate('MapView')
	}

	navigateTo = (screen:any, data:any) => {
		this.props.navigation.navigate(
			screen,
			data
		);

	}

	_renderRefreshButton = () =>  {
		if(this.state.jobs.length == 0 && !this.state.requestIsLoading){
			return (
				<View style={styles.refreshButtonContainer}>
					<TouchableOpacity
						onPress={this._getJobs}	
						style={styles.refreshButton}
					>
						<EvilIcons name='redo' size={60} color={colors.main}/>
					</TouchableOpacity>
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
						{/* <Text style={styles.headerTitle}>Creer/Trouver du jobs</Text> */}
						<Icon name='search' size={30} color='gray'/>
					</View>
					<View style={styles.row1Row2}>
						<TextInput
							value={this.state.searchQuery}
							style={styles.textInput}
							onChangeText={this._searchQuery}
							placeholder='Quelle tache cherchez vous?'
						/>
						{ (this.state.searchQuery)? 
							<TouchableOpacity
								onPress={this._clearQuerySearch}	
							>
								<Icon name='close' size={25} color='gray'/>
							</TouchableOpacity>
							:null
						}
					</View>
				</View>
				<View style={styles.row2}>
					<View style={styles.row2Content}>

					{
						this.filters.map((item, index)=> (
							<TouchableOpacity 
								onPress={()=> {
									if(item.code == (this.state.selectedFilter && this.state.selectedFilter.code)){
										this.setState({selectedFilter:null})	
										this.setState({jobs:this.state.baseJobs})
									}
									else{
										this.setState({selectedFilter:item})
										if(item.code && item.code == 'mp'){
											this._sortByMostPopular()
										}
										else if(item.code && item.code == 'mr'){
											this._sortByMostRecent()
										}
									}
								}}
								key={index.toString()} 
								style={(this.state.selectedFilter && this.state.selectedFilter.id == item.id)
									?styles.selectedButton
									:styles.unSelectedButton}>
								<Text 
									style={(this.state.selectedFilter && this.state.selectedFilter.id == item.id)
										?styles.selectedButtonLabel
										:styles.unSelectedButtonLabel}>{item.name}</Text>
							</TouchableOpacity>
						))
					}
					</View>
				</View>
				<View style={styles.row3}>
					<FlatList
						data={this.state.jobs}
						onRefresh={this._getJobs}
						refreshing={this.state.requestIsLoading}
						showsVerticalScrollIndicator={false}
						renderItem={({item, index}:any) => <JobsViewItem
							navigate={this.navigateTo}
							getJobs={this._getJobs}
							item={item}	
						/>}
						ItemSeparatorComponent={()=><View style={styles.itemsSeparator}/>}
						keyExtractor={(item)=>item.id.toString()}
					/>
					{
						this._renderRefreshButton()
					}
				</View>
				<View style={styles.footerContainer}>
					<View style={styles.footerButtonContainer}>
						<IconButton
							onPress={this.navigateToMapView}
							icon='location'
						/>
					</View>
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
        jobs:state.jobs,
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
		justifyContent:'center',
		// backgroundColor:'red',
		alignItems:'center',
		flex:1,
	},
	row1Row1:{
		// flex:1,
		// backgroundColor:'red',
	},
	row1Row2:{
		flex:3,
		flexDirection:'row',
		// backgroundColor:'blue',
		alignItems:'center',
	},
	textInput:{
		flex:1,
	},
	row2:{
		flex:1,
		paddingHorizontal:20,
		// backgroundColor:'red',
		justifyContent:'center',

	},
	row2Content:{
		flexDirection:'row',
	},
	row3:{
		flex:9,
	},
	selectedButton:{
		backgroundColor: colors.main,
		marginRight:20,
		paddingVertical:10,
		paddingHorizontal:20,
		borderRadius:5,
	},
	unSelectedButton:{
		backgroundColor:'#1111',
		marginRight:20,
		paddingVertical:10,
		paddingHorizontal:20,
		borderRadius:5,
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
	},
	footerContainer:{
		position: "absolute",
		bottom: 5,
		left: 0,
		right: 0,
		paddingVertical: 10,
		//backgroundColor:'yellow',
	},
	footerButtonContainer:{
		alignItems:'flex-end',
		paddingHorizontal:10,
		//   backgroundColor:'red',
		
	},
	refreshButtonContainer:{
		flex:1,
		alignItems:'center',
		// justifyContent:'',
	},
	refreshButton:{
		// backgroundColor:'red',
		justifyContent:'center',
		alignItems:'center',

	}


})

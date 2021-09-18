
import React from 'react';
import { FlatList, BackHandler, TextInput, ActivityIndicator,  StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import { getJobs } from '../../backend/requests/job'
import { getCategories } from '../../backend/requests/category'
import { GetJobsRequestType, GetCategoriesType } from '../../backend/requests/types'
import JobsViewItem from '../../components/home/JobsViewItem';
import { colors } from '../../assets/colors/main'
import Icon from "react-native-vector-icons/Ionicons";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IconButton from '../../components/buttons/IconButton'
import  {SET_JOBS, SET_CATEGORIES} from '../../redux/store/actions'
import  {searchQuery, sortByMostPopular, sortByMostRecent, sortJobsByCategories} from '../../utils/filters'
import Categories from '../../components/category/Categories'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	jobs:any[],
	categories:any[],
	selectCategory:any,
	dispatch:Function
}

type State = {
	requestIsLoading:boolean,
	selectedFilter:any,
	searchQuery:any,
	selectedCategories: any[],
	jobs:any[],
	baseJobs:any[],
  	categories:any[],
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
			{id:2, code:'mp', name:'Plus Visitées'},
		]
		// Set the state
		this.state = {
			searchQuery:'',
			requestIsLoading:false,
			selectedFilter:null,
		  	selectedCategories:[],
			jobs:this.props.jobs?this.props.jobs:[],
			baseJobs:this.props.jobs?this.props.jobs:[],
        	categories: this.props.categories?this.props.categories:[],
		};
 	}

	 _getCategories = () => {
     let authUserToken = this.props.authUserToken
     if(authUserToken){
        let data: GetCategoriesType = {
            authToken:authUserToken
        }
        getCategories(data)
        .then((response:any) => {
          if(this._isMounted){
            // console.log('categories') 
            this.setState({categories:response.data})
            let setCategoriesAction = {type:SET_CATEGORIES, value:response.data}
            this.props.dispatch(setCategoriesAction)
            // console.log(response.data) 
          }
        }
        )
        .catch((error:any)=> {
          console.log(error);
        })
     }
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
		this._getCategories()
		// Add event listener , before the component dismiss
		this.props.navigation.addListener('focus', (e:any) => {
			// make products request to get data, like avaible products for the user
			if(this._isMounted){
				// request to get the products on the screen focus
				this._getJobs()
				this._getCategories()
			}
		});
		this._exitListener()

	}

	componentWillUnmount(){
		this._isMounted = false;

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

	selectCategory = (category:any) => {
		let selectedCategories = [...this.state.selectedCategories];
		let categoryExists = selectedCategories.find(item=>item.id==category.id)
		if(categoryExists){
			//console.log('category removed')
			selectedCategories = selectedCategories.filter(item=>item.id!=category.id)
		}	
		else{
			//console.log('category added')
			selectedCategories.push(category)
		}
		
		this.setState(state => {
			return {selectedCategories};
		});
		// console.log('-------------------')
		// selectedCategories.map(c => {
		// 	console.log(c.id)
		// })
		// console.log('-------------------')
		//console.log(selectedCategories.length)
		//console.log(this.state.selectedCategories.length)
		this._sortJobsByCategories(selectedCategories);
	}

	// sort jobs by categories
	_sortJobsByCategories  = (selectedCategories: any[]) => {
		let jobs = [...this.state.jobs];	
		let baseJobs = [...this.state.baseJobs];
		// Get the search jobs with the search algo function
		let sortedJobs = sortJobsByCategories(jobs, baseJobs, selectedCategories)
		if(sortedJobs.length == 0 && selectedCategories.length == 0){
			this.setState({jobs:baseJobs});
		}
		else{
			// Set the sorted jobs by categories found
			this.setState({jobs:sortedJobs});
			
		}
	}

	_exitListener = () => {
		this.props.navigation.addListener('beforeRemove', (e:any) => {
			// Check if the event type is the device back press
			if(e.data.action.type == 'GO_BACK'){
				// Diseable the default action for the event
				e.preventDefault();
				// Exit the app if the user is authenticated
				BackHandler.exitApp();
			}
		});
	}


	render(){
		return(
			<View style={styles.container}>
                <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
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
					<View style={styles.row2Row1}>
						<Categories 
							categories={this.state.categories}
							selectCategory={this.selectCategory}
						/>
					</View>
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
		categories: state.categories
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
		// backgroundColor:'yellow',
		alignItems:'center',
	},
	textInput:{
		flex:1,
	},
	row2:{
		flex:1.5,
		paddingHorizontal:20,
		// backgroundColor:'blue',
		justifyContent:'center',

	},
	row2Row1:{
		// flex:1,
		// backgroundColor:'gray',
		// alignItems:'center',
		// justifyContent:'center',
	},
	row2Content:{
		flexDirection:'row',
		// flex:1,
		// backgroundColor:'yellow',
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

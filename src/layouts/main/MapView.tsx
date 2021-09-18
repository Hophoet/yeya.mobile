import React from 'react';
import {StatusBar, Dimensions, Animated, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { getJobs } from '../../backend/requests/job'
import { GetJobsRequestType } from '../../backend/requests/types'
import JobsMapItem from '../../components/home/JobsMapItem'
import IconButton from '../../components/buttons/IconButton'
import  {SET_JOBS} from '../../redux/store/actions'
import moment from 'moment';
import { colors } from '../../assets/colors/main';
import  {sortByMostRecent} from '../../utils/filters'

type Props = {
	navigation:any,
	authUserToken:string,
	dispatch:Function,
	authUser:any,
	jobs:any[],
}
type State = {
	region:any,
	jobs:any[],
	requestIsLoading:boolean,
}


class Map extends React.Component<Props, State> {
	animation:any;
	map:any;
	_isMounted:boolean;
	index:number;
	regionTimeout?:any;
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this.index = 0;
    	this.animation = new Animated.Value(0);
		this._isMounted = false;
		//
		this.state = {
			requestIsLoading:false,
			  region: {
				latitude: 33.7866,
				longitude: -118.2987,
				latitudeDelta: 0.04864195044303443,
				longitudeDelta: 0.040142817690068,
			  },
			  jobs:this.props.jobs?this.props.jobs:[],
			};
		}

	getDate = (created_at:string) => {
		const created_at_timestamp = Math.floor(new Date(created_at).valueOf()/1000);
		const date:string = moment.unix(created_at_timestamp).fromNow() //.format('ll')
		return date;
	}

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._getJobs()
		this.animation.addListener(({ value }:any) => {
			if(this.state.jobs.length > 0){
				let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
				if (index >= this.state.jobs.length) {
				  index = this.state.jobs.length - 1;
				}
				if (index <= 0) {
				  index = 0;
				}
		  
				clearTimeout(this.regionTimeout);
				this.regionTimeout = setTimeout(() => {
				  if (this.index !== index) {
					this.index = index;
					if(this.state.jobs[index] 
						&& this.state.jobs[index].geolocation
						&& this.state.jobs[index].geolocation.latitude
						&& this.state.jobs[index].geolocation.longitude
						){
						const { latitude, longitude } = this.state.jobs[index].geolocation;
						// if(latitude && longitude){
							this.map.animateToRegion(
							{
								latitude,
								longitude,
								latitudeDelta: this.state.region.latitudeDelta,
								longitudeDelta: this.state.region.longitudeDelta,
							},
							350
							);
						// }
					}
				  }
				}, 10);
			}
		  });

		 
		// Add event listener, when the the component on focus
		this.props.navigation.addListener('focus', (e:any) => {
			// make products request to get data, like avaible products for the user
			if(this._isMounted){
				// request to get the products on the screen focus
				this._getJobs()
			}
		});

	}
	
	componentWillUnmount(){
		// Set tje component mount state to true
		this._isMounted = false;
	}

	navigateTo = (screen:any, data:any) => {
		this.props.navigation.navigate(
			screen,
			data
		);
	}
	navigateToListView = () => {
		this.props.navigation.navigate('ListView')
	}

	_isUserFavorite = (item:any) => {
		let user_ids = item.favorite_users_ids
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
		return false
	}

	_sort = () => {
		this._sortByMostRecent()
	}
	

	_sortByMostRecent = () => {
		let jobs = [...this.state.jobs];	
		if(jobs){
			let sortedJobs:any[] = sortByMostRecent(jobs)
			this.setState({jobs:sortedJobs});
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
				//console.log(response.data[3])
				this.setState({jobs:response.data});
				this._sort()
				this.setState({requestIsLoading:false})
				let setJobsAction = {type:SET_JOBS, value:response.data}
				this.props.dispatch(setJobsAction)
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


	render() {
		const interpolations = this.state.jobs.map((marker, index) => {
			const inputRange = [
			  (index - 1) * CARD_WIDTH,
			  index * CARD_WIDTH,
			  (index + 1) * CARD_WIDTH,
			];
			const scale = this.animation.interpolate({
			  inputRange,
			  outputRange: [1, 2.5, 1],
			  extrapolate: "clamp",
			});
			const opacity = this.animation.interpolate({
			  inputRange,
			  outputRange: [0.35, 1, 0.35],
			  extrapolate: "clamp",
			});
			return { scale, opacity };
		  });	




		//console.log(this.props.authUser.store);
		let userStoreGeolocation = this.props.authUser && this.props.authUser.store && this.props.authUser.store.geolocation;
		//console.log(userStoreGeolocation);
		return (
			<View style={styles.container}>
                <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
				<MapView
					provider={PROVIDER_GOOGLE}
					ref={(map) => (this.map = map)}
					initialRegion={this.state.region}
					style={styles.mapContainer}
				>

				{
					this.state.jobs.map((marker, index) => {
						const scaleStyle = {
						transform: [
							{
							scale: interpolations[index].scale,
							},
						],
						};
						const opacityStyle = {
						opacity: interpolations[index].opacity,
						};
						let geolocation = marker.geolocation
						if(geolocation 
							&& geolocation.latitude 
							&& geolocation.longitude){

						//console.log(marker.images[0].url);
						return (
							<MapView.Marker 
								style={styles.markerContainer} 
								title={`${(marker.price)?marker.price:''} - ${marker.title} `}
								key={index} 
								coordinate={
									{
										latitude:geolocation.latitude,
										longitude:geolocation.longitude,
									}
								}>
								 <Animated.View style={[styles.markerWrap, false && opacityStyle]}>
									{ true &&
									<Animated.View style={[styles.ring, scaleStyle]} />
									}
									<View style={styles.marker} />
								</Animated.View>
							</MapView.Marker>
						);
						}
					})
				}


				</MapView>

				<View style={styles.footerContainer}>
					<View style={styles.footerButtonContainer}>
						<IconButton
							onPress={this.navigateToListView}
							icon='list'
						/>
					</View>
				<Animated.ScrollView
					  horizontal
					  scrollEventThrottle={1}
					  showsHorizontalScrollIndicator={false}
					  snapToInterval={CARD_WIDTH}
					  onScroll={Animated.event(
						[
						  {
							nativeEvent: {
							  contentOffset: {
								x: this.animation,
							  },
							},
						  },
						],
						{ useNativeDriver: true }
					  )}
					  style={styles.scrollView}
					  contentContainerStyle={styles.endPadding}
					>
				  {this.state.jobs.map((item, index) => (
					 <JobsMapItem
					 	key={index.toString()}
						navigate={this.navigateTo}
					 	index={index}
						getJobs={this._getJobs}
						item={item}
					 />
				  ))}
        	</Animated.ScrollView>
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
	authUser: state.authUser,
	jobs: state.jobs
};
};

// Export the component by connecting the maps to the component
export default connect(mapStateToProps, mapDispatchToProps)(Map);

const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = width / 5;
const CARD_WIDTH = width/2;

// Set styles
const styles = StyleSheet.create({
  	container: {
		flex:1,

 	},
  	mapContainer: {
		flex:1,
	   justifyContent: 'flex-end',
	   alignItems: 'center',
 	},
	map: {
	   ...StyleSheet.absoluteFillObject,
    },
	footerContainer:{
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    paddingVertical: 10,
	//backgroundColor:'yellow',
	},
	scrollView: {
    paddingVertical: 10,
	//backgroundColor:'blue',
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
	borderRadius:10,
    elevation: 2,
    backgroundColor: "#FFF",
    margin: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",

  },
  imageContainer:{
    flex: 3,
  },
  textContent: {
    flex: 1,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 10,
    height: 10,
	margin:30,
    borderRadius: 4,
    backgroundColor: 'white',//"rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: colors.main, 
    position: "absolute",
    borderWidth: 1,
    borderColor: colors.second,
  },
  markerContainer:{
	//backgroundColor:'yellow',
	justifyContent:'center',
	alignItems:'center',

 },
 buttonsContainer:{
	//backgroundColor:'red',
	justifyContent:'center',
	alignItems:'center',
	paddingVertical:10,
},
 button:{
	backgroundColor:'black',
	paddingVertical:10,
	paddingHorizontal:20,
	borderRadius:5,
	flexDirection:'row',

 },
 buttonLabel:{
	color:'white',
	fontSize:16,
},
  footerButtonContainer:{
	  alignItems:'flex-end',
	  paddingHorizontal:10,
	//   backgroundColor:'red',
	  
  },
});

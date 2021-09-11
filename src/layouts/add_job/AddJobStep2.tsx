import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; 

import { bgLinearGradient, sideBarLinearGradient} from '../../assets/colors/main';
import Icon from "react-native-vector-icons/Ionicons";
import {connect} from 'react-redux';
import StepHeader from '../../components/StepHeader';
import CButton from '../../components/CButton';
import Toast from '../../components/toasts';
import {getGeolocation} from '../../utils/geolocation'
import { createJob } from '../../backend/requests/job'
import { CreateJobType, Geolocation } from '../../backend/requests/types'

type Props ={
  navigation:any,
  job:any,
  authUser:any,
  authUserToken:string,
  route:any
}

type State = {
  region:any,
  requestIsLoading:boolean,
  locationIsLoading:boolean,
}

class AddJobStep2 extends React.Component<Props, State>{
  phoneInput:any;
	map:any;
	_isMounted:boolean;
	job:any;
  geolocation:any;
  constructor(props:Props){
    super(props);
		// Set the component mount state to false
		this._isMounted = false;
    
    this.state = {
        requestIsLoading:false,
        locationIsLoading:false,
			  region: {
				latitude: 6.131944,
				longitude: 1.222778,
				latitudeDelta: 0.04864195044303443,
				longitudeDelta: 0.040142817690068,
			  }

    }
    this.job = this.props.route.params.job
    this.geolocation = {
				latitude: 33.7866,
				longitude: -118.2987,
    }

  }


  _continue = (data:any) => {
      this.props.navigation.navigate(
          'AddJobStep3',
          data)
        // Toast._show_bottom_toast('Entrer un numéro valide')
  }
  componentDidMount(){
		// Enable the component mount state
		this._isMounted = true;
    this.props.navigation.setOptions({
      header: () => (
        <StepHeader 
          size={3}
          step={2}
        />
      ),
    });
  }
	 _getGeolocation = () => {
        	this.setState({locationIsLoading:true})
			getGeolocation()
			.then((position:any) => {
					let region = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: 0.04864195044303443,
						longitudeDelta: 0.040142817690068,
					}					
						this.setState({region:region});
					this.map.animateToRegion(
					  {
						latitude:region.latitude,
						longitude:region.longitude,
						latitudeDelta: this.state.region.latitudeDelta,
						longitudeDelta: this.state.region.longitudeDelta,
					  },
					  350
					);
        			this.setState({locationIsLoading:false})
          this.geolocation = {
						latitude:region.latitude,
						longitude:region.longitude,
          }
			}
			)
			.catch((error:any)=> {
        		this.setState({locationIsLoading:false})
				console.log('geolocation request error');
				console.log(error);

			})
    }


    _createJob = () => {
      let job = this.job
      let geolocation = this.geolocation
      let authUserToken = this.props.authUserToken
      if (job 
			&& geolocation 
			&& authUserToken
			&& ! this.state.requestIsLoading
			&& ! this.state.locationIsLoading
			){
        this.setState({requestIsLoading:true})

				let data:CreateJobType = {
          authToken:authUserToken,
					title:job.title,
					description:job.description,
          categoryId:job.categoryId,
          cityId:job.cityId,
					price:job.price,
					geolocation:geolocation,
				}
				createJob(data)
				.then((response:any) => {
					if(this._isMounted){
            this.setState({requestIsLoading:false})
						Toast._show_bottom_toast("votre tache a éta creé avec success");	
						//console.log(response.data)
						let token = response.data.token && response.data.token.value
						let user = response.data.user
            this.props.navigation.navigate(
                'AddJobStep3',
                data)
					}
				})
				.catch(error => {
					if(this._isMounted){
            			this.setState({requestIsLoading:false})
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if (error.response) {
						  // The request was made and the server responded with a status code
						  // that falls out of the range of 2xx
						  console.log(error.response.data);
						  let errorData = error.response.data;
						  if(errorData.code == 'auth/username-and-password-required'){
								Toast._show_bottom_toast("Entrer votre nom d'utlisateur et mot de passe pour continuer");	
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



  render(){
    console.log(this.job)


  return (
      <View style={styles.container}>
      <View style={styles.row1}>
        <Text style={styles.title}>Localiser le lieu de la realisation de votre tache</Text>
      </View>
      <View style={styles.row2}>
				<MapView
					provider={PROVIDER_GOOGLE}
					ref={(map) => (this.map = map)}
					initialRegion={this.state.region}
					style={styles.mapContainer}
				>
							<Marker 
                draggable
								style={styles.markerContainer} 
								title={`Votre localisation`}
								coordinate={
									{
										latitude:this.state.region.latitude,
										longitude:this.state.region.longitude,
									}
								}>
							</Marker>
				</MapView>

      </View>
      <View style={styles.row3}>
        <CButton
          onPress={this._getGeolocation}
          loading={this.state.locationIsLoading}
          label='Localiser le lieu actuel'
        />
        { this.geolocation &&
        <CButton
          onPress={this._createJob}
          loading={this.state.requestIsLoading}
          label='Enregistrer'
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
export default connect(mapStateToProps, mapDispatchToProps)(AddJobStep2);


const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container:{
		flex:1,
    backgroundColor:'white'
	},
  title:{
    fontWeight:'bold',
    fontSize:20,
  },
  row1:{
    justifyContent:'center',
    paddingHorizontal:20, 
    paddingBottom:20,
  },
  row2:{
    flex:1,
  },
  mapContainer: {
		flex:1,
	   justifyContent: 'flex-end',
	   alignItems: 'center',
 	},
  markerContainer:{
	//backgroundColor:'yellow',
	justifyContent:'center',
	alignItems:'center',

 },
  marker: {
    width: 10,
    height: 10,
	  margin:30,
    borderRadius: 4,
    backgroundColor: 'black'
  },
	row3:{
    position: "absolute",
    flexDirection:'row',
    bottom: 5,
    left: 0,
    right: 0,
    paddingVertical: 10,
    alignItems:'flex-end',
    justifyContent:'space-around'
    // alignItems:'center'
	//backgroundColor:'yellow',
	},
})

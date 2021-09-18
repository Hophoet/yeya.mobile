import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; 

import {connect} from 'react-redux';
import StepHeader from '../../components/StepHeader';
import CButton from '../../components/CButton';
import Toast from '../../components/toasts';
import {getGeolocation} from '../../utils/geolocation'
import { updateJob } from '../../backend/requests/job'
import { UpdateJobType } from '../../backend/requests/types'
import {colors} from '../../assets/colors/main'

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

class UpdateJobStep2 extends React.Component<Props, State>{
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
    this.geolocation = this.props.route.params.job && this.props.route.params.job.geolocation && {
      latitude:this.props.route.params.job.geolocation.latitude,
      longitude:this.props.route.params.job.geolocation.longitude,
    } 
  }


  _continue = (data:any) => {
      this.props.navigation.navigate(
          'UpdateJobStep3',
          data)
        // Toast._show_bottom_toast('Entrer un numéro valide')
  }

  initilizeMap = () => {
    if(this.geolocation 
      && this.geolocation.latitude 
      && this.geolocation.longitude){
					this.map.animateToRegion(
					  {
						latitude:this.geolocation.latitude,
						longitude:this.geolocation.longitude,
						latitudeDelta: this.state.region.latitudeDelta,
						longitudeDelta: this.state.region.longitudeDelta,
					  },
					  350
					);

    }

  }
  componentDidMount(){
		// Enable the component mount state
    setTimeout(this.initilizeMap, 3000)
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
          // this._continue({
          //   job:{
          //     ...this.job,
          //     geolocation:{
          //       latitude: region.latitude,
          //       longitude: region.longitude
          //     }
          //   }
          // })
			}
			)
			.catch((error:any)=> {
        this.setState({locationIsLoading:false})
				console.log(error);

			})
    }


    _updateJob = () => {
      let job = this.job
      let geolocation = this.geolocation
      let authUserToken = this.props.authUserToken
      // console.log(job, geolocation, authUserToken)
      if (job 
          && geolocation 
          && job
          && ! this.state.requestIsLoading
          && ! this.state.locationIsLoading
          ){
        this.setState({requestIsLoading:true})

				let data:UpdateJobType = {
          id:job.id,
          authToken:authUserToken,
					title:job.title,
					description:job.description,
          categoryId:job.categoryId,
          cityId:job.cityId,
					price:job.price,
					geolocation:geolocation,
				}
				updateJob(data)
				.then((response:any) => {
					if(this._isMounted){
            this.setState({requestIsLoading:false})
						Toast._show_bottom_toast("votre tache a été mise à jour avec success");	
						//console.log(response.data)
						let token = response.data.token && response.data.token.value
						let user = response.data.user
            this.props.navigation.navigate(
                'UpdateJobStep3',
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

  return (
      <View style={styles.container}>
        <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
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
          label='Localiser le lieu actuel'
          loading={this.state.locationIsLoading}
        />
        { this.geolocation &&
        <CButton
          onPress={this._updateJob}
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateJobStep2);


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

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
import StepHeader from '../../components/StepHeader';
import CButton from '../../components/CButton';
import Toast from '../../components/toasts';
import {getGeolocation} from '../../utils/geolocation'

type Props ={
  navigation:any,
  job:any,
  route:any
}

type State = {
  region:any,
}

class AddJobStep2 extends React.Component<Props, State>{
  phoneInput:any;
	map:any;
	job:any;
  constructor(props:Props){
    super(props);
    this.state = {
			  region: {
				latitude: 33.7866,
				longitude: -118.2987,
				latitudeDelta: 0.04864195044303443,
				longitudeDelta: 0.040142817690068,
			  }

    }
    this.job = this.props.route.params.job
  }


  _continue = (data:any) => {
      this.props.navigation.navigate(
          'AddJobStep3',
          data)
        // Toast._show_bottom_toast('Entrer un numéro valide')
  }
  componentDidMount(){
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
          this._continue({
            job:{
              ...this.job,
              geolocation:{
                latitude: region.latitude,
                longitude: region.longitude
              }
            }
          })
			}
			)
			.catch((error:any)=> {
				console.log('geolocation request error');
				console.log(error);

			})
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
          label='Localiser le lieu actuel'
        />
      </View>

      </View>
  );
          }

}
export default AddJobStep2;


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
    bottom: 5,
    left: 0,
    right: 0,
    paddingVertical: 10,
    alignItems:'center'
	//backgroundColor:'yellow',
	},
})

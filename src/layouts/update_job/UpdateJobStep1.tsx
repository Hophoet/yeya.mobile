import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";

import { bgLinearGradient, sideBarLinearGradient} from '../../assets/colors/main';
import Icon from "react-native-vector-icons/Ionicons";
import StepHeader from '../../components/StepHeader';
import CTextInput from '../../components/CTextInput';
import CButton from '../../components/CButton';
import Toast from '../../components/toasts';
import { TextInput } from "react-native-gesture-handler";
import {  getCategories } from '../../backend/requests/category'
import {  getCities } from '../../backend/requests/city'
import {  GetCategoriesType, GetCitiesType } from '../../backend/requests/types'
import CategoryPickerModal from '../../components/modals/CategoryPickerModa'
import CityPickerModal from '../../components/modals/CityPickerModal'
import {connect} from 'react-redux';

type Props ={
  navigation:any,
  authUser:any,
  authUserToken:string,
  route:any,
}

type State = {
  title:string,
  price:number,
  cities:any[],
  categories:any[],
  description:string,
  categoryId:string,
  cityId:string,
  city:any,
  category:any,
  geolocation:any,
  
}

class UpdateJobStep1 extends React.Component<Props, State>{

  job:any;
  category:any;
  city:any;
  constructor(props:Props){
    super(props);
    this.state = {
        title: this.props.route.params.job && this.props.route.params.job.title,
        price: this.props.route.params.job && this.props.route.params.job.price,
        description: this.props.route.params.job && this.props.route.params.job.description,
        city: this.props.route.params.job && this.props.route.params.job.city,
        category: this.props.route.params.job && this.props.route.params.job.category,
        cityId: this.props.route.params.job && this.props.route.params.job.city && this.props.route.params.job.city.id,
        categoryId: this.props.route.params.job && this.props.route.params.job.category && this.props.route.params.job.category.id,
        geolocation: this.props.route.params.job && this.props.route.params.job.geolocation ,
        cities:[],
        categories:[]

    }
    this.job = this.props.route.params.job
  }




	 _getCities = () => {
     let authUserToken = this.props.authUserToken
     if(authUserToken){
        let data: GetCitiesType = {
            authToken:authUserToken
        }
        getCities(data)
        .then((response:any) => {
          console.log('cities') 
          this.setState({cities:response.data})
          // console.log(response.data) 
        }
        )
        .catch((error:any)=> {
          console.log(error);

        })
     }
    }

	 _getCategories = () => {
     let authUserToken = this.props.authUserToken
     if(authUserToken){
        let data: GetCategoriesType = {
            authToken:authUserToken
        }
        getCategories(data)
        .then((response:any) => {
          console.log('categories') 
          this.setState({categories:response.data})
          // console.log(response.data) 
        }
        )
        .catch((error:any)=> {
          console.log(error);

        })
     }
    }




  _continue = () => {
      if(
        this.state.title 
        && this.state.description 
        && this.state.price
        && this.state.cityId
        && this.state.categoryId
        ){
        this.props.navigation.navigate(
            'UpdateJobStep2',
            {
              'job':{
                id:this.job.id,
                title:this.state.title,
                price:this.state.price,
                cityId:this.state.cityId,
                categoryId:this.state.categoryId,
                description:this.state.description,
                geolocation:this.state.geolocation,

              }
            })
      }
      else if(!this.state.title){
          Toast._show_bottom_toast('Ajouter le title de votre tache')
      }
      else if(!this.state.price){
          Toast._show_bottom_toast('Ajouter le prix de votre tache')
      }
      else if(!this.state.description){
          Toast._show_bottom_toast('Ajouter la description de votre tache')
      }
      else if(!this.state.categoryId){
          Toast._show_bottom_toast('Ajouter la category de votre tache')
      }
      else if(!this.state.cityId){
          Toast._show_bottom_toast('Ajouter votre ville residence')
      }
  }
  componentDidMount(){
    this.props.navigation.setOptions({
      header: () => (
        <StepHeader 
          size={3}
          step={1}
        />
      ),
    });
    this._getCategories()
    this._getCities()
  }
    _setCategory = (category:any) => {
        this.setState({categoryId:category.id})
    }
    _setCity = (city:any) => {
        this.setState({cityId:city.id})
    }

  render(){
    console.log(this.job)


  return (
      <View style={styles.container}>
      <View style={styles.row1}>
        <Text style={styles.title}>Renseigner les informations sur votre tache</Text>
      </View>
      <View style={styles.row2}>
          <ScrollView
            showsVerticalScrollIndicator={false} 
          >
              <View style={styles.textInputContainer}>
              <CTextInput
                  textInputProps={{
                      value:this.state.title
                  }}
                onChangeText={(title:string)=>this.setState({title})}
                placeholder='Title de votre tache' 
              />
              </View>
              <View style={styles.textInputContainer}>
                <CTextInput
                  textInputProps={{
                      multiline:true,
                      maxLength:1000,
                      value:this.state.price.toString(),
                      keyboardType:'numeric'
                    }}
                  onChangeText={(price:string)=>this.setState({price:parseInt(price)})}
                  placeholder='Prix de votre tache' 
                />
              </View>
              <View style={styles.textInputContainer}>
                <CTextInput
                  placeholder='Decriver votre tache' 
                  onChangeText={(description:string)=>this.setState({description})}
                  textInputProps={{
                    value:this.state.description,
                    multiline:true,
                    maxLength:1000,
                  }
                  }
                  
                />
              </View>
              <View style={styles.textInputContainer}>
                  <CategoryPickerModal
                      categories={this.state.categories}
                      setProductCategory={this._setCategory}
                      category={this.state.category}
                  />
              </View>
              <View style={styles.textInputContainer}>
                  <CityPickerModal
                      cities={this.state.cities}
                      setCity={this._setCity}
                      city={this.state.city}
                  />
              </View>
            <View style={styles.buttonContainer}>
                <CButton
                  onPress={this._continue}
                  label='Continer' 
                />
              </View>
          </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateJobStep1);


const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container:{
		flex:1,
    backgroundColor:'white',
	},
  row1:{
    justifyContent:'center',
    paddingHorizontal:20, 
    paddingBottom:20,
  },
  row2:{
    flex:1,
  },
  textInputContainer:{
    marginBottom:20,
    paddingHorizontal:20, 
  },
  buttonContainer:{
    alignItems:'flex-end',
    paddingHorizontal:20, 
    paddingBottom:30,
    paddingTop:20,
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
  }
})

import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  StatusBar,
  Text,
} from "react-native";

import StepHeader from '../../components/StepHeader';
import {connect} from 'react-redux';
import CTextInput from '../../components/CTextInput';
import CButton from '../../components/CButton';
import Toast from '../../components/toasts';
import {  getCategories } from '../../backend/requests/category'
import {  getCities } from '../../backend/requests/city'
import {  GetCategoriesType, GetCitiesType } from '../../backend/requests/types'
import CategoryPickerModal from '../../components/modals/CategoryPickerModa'
import  {SET_CATEGORIES, SET_CITIES} from '../../redux/store/actions'
import CityPickerModal from '../../components/modals/CityPickerModal'
import { colors } from '../../assets/colors/main'

type Props ={
  authUser:any,
  authUserToken:string,
  categories:any[],
  cities:any[],
  navigation:any,
  dispatch:Function,
}

type State = {
  cities:any[],
  categories:any[],
  
}

class AddJobStep1 extends React.Component<Props, State>{

	_isMounted:boolean;
  title:string;
  price:number;
  description:string;
  categoryId:string;
  cityId:string;
  categories:any[];
  cities:any[];
  constructor(props:Props){
    super(props);
		this._isMounted = false;
    this.state = {
        cities:this.props.cities?this.props.cities:[],
        categories: this.props.categories?this.props.categories:[],
    }
    this.title = ''
    this.price = 0
    this.description = ''
    this.cityId = ''
    this.categoryId = ''
    this.categories = []
    this.cities = []
  }




	 _getCities = () => {
     let authUserToken = this.props.authUserToken
     if(authUserToken){
        let data: GetCitiesType = {
            authToken:authUserToken
        }
        getCities(data)
        .then((response:any) => {
          // console.log('cities') 
          if(this._isMounted){
            this.setState({cities:response.data})
            let setCitiesAction = {type:SET_CITIES, value:response.data}
            this.props.dispatch(setCitiesAction)
            // console.log(response.data) 
          }
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



  _continue = () => {
      if(
        this.title 
        && this.description 
        && this.price
        && this.cityId
        && this.categoryId
        ){
        this.props.navigation.navigate(
            'AddJobStep2',
            {
              'job':{
                title:this.title,
                price:this.price,
                cityId:this.cityId,
                categoryId:this.categoryId,
                description:this.description
              }
            })
      }
      else if(!this.title){
          Toast._show_bottom_toast('Ajouter le title de votre tache')
      }
      else if(!this.price){
          Toast._show_bottom_toast('Ajouter le prix de votre tache')
      }
      else if(!this.description){
          Toast._show_bottom_toast('Ajouter la description de votre tache')
      }
      else if(!this.categoryId){
          Toast._show_bottom_toast('Ajouter la category de votre tache')
      }
      else if(!this.cityId){
          Toast._show_bottom_toast('Ajouter votre ville residence')
      }
  }
  componentDidMount(){
		this._isMounted = true;
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
		this.props.navigation.addListener('focus', (e:any) => {
			// make products request to get data, like avaible products for the user
			if(this._isMounted){
				// request to get the products on the screen focus
        this._getCategories()
        this._getCities()
			}
		});
  }

  componentWillUnmount(){
		this._isMounted = false;

  }
    _setCategory = (category:any) => {
        this.categoryId = category.id;
    }
    _setCity = (city:any) => {
        this.cityId = city.id;
    }

  render(){


  return (
      <View style={styles.container}>
        <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
      <View style={styles.row1}>
        <Text style={styles.title}>Renseigner les informations sur votre tache</Text>
      </View>
      <View style={styles.row2}>
          <ScrollView
            showsVerticalScrollIndicator={false} 
          >
              <View style={styles.textInputContainer}>
              <CTextInput
                onChangeText={(text:string)=>this.title=text}
                placeholder='Title de votre tache' 
              />
              </View>
              <View style={styles.textInputContainer}>
                <CTextInput
                  textInputProps={{
                      multiline:true,
                      maxLength:1000,
                      keyboardType:'numeric'
                    }}
                  onChangeText={(text:string)=>this.price= parseInt(text)}
                  placeholder='Prix de votre tache' 
                />
              </View>
              <View style={styles.textInputContainer}>
                <CTextInput
                  placeholder='Decriver votre tache' 
                  onChangeText={(text:string)=>this.description=text}
                  textInputProps={{
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
                      category={null}
                  />
              </View>
              <View style={styles.textInputContainer}>
                  <CityPickerModal
                      cities={this.state.cities}
                      setCity={this._setCity}
                      city={null}
                  />
              </View>
            <View style={styles.buttonContainer}>
                <CButton
                  onPress={this._continue}
                  label='Continuer' 
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
	authUser:state.authUser,
  categories: state.categories,
  cities: state.cities,
};
};

// Export the component by connecting the maps to the component
export default connect(mapStateToProps, mapDispatchToProps)(AddJobStep1);

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

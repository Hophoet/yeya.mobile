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

type Props ={
  navigation:any,
  route:any,
}

type State = {
  title:string,
  price:number,
  description:string,
  categoryId:string,
  cityId:string,
  geolocation:any,
  
}

class UpdateJobStep1 extends React.Component<Props, State>{

  job:any;
  constructor(props:Props){
    super(props);
    this.state = {
        title: this.props.route.params.job && this.props.route.params.job.title,
        price: this.props.route.params.job && this.props.route.params.job.price,
        description: this.props.route.params.job && this.props.route.params.job.description,
        cityId: this.props.route.params.job && this.props.route.params.job.city && this.props.route.params.job.city.id,
        categoryId: this.props.route.params.job && this.props.route.params.job.category && this.props.route.params.job.category.id,
        geolocation: this.props.route.params.job && this.props.route.params.job.geolocation ,

    }
    this.job = this.props.route.params.job
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
                <CTextInput
                  textInputProps={{
                    value:this.state.categoryId
                    }}
                  onChangeText={(categoryId:string)=>this.setState({categoryId})}
                  placeholder='Category de votre tache' 
                />
              </View>
              <View style={styles.textInputContainer}>
                <CTextInput
                  textInputProps={{
                    value:this.state.cityId
                    }}
                  onChangeText={(cityId:string)=>this.setState({cityId})}
                  placeholder='Ville de residence' 
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
export default UpdateJobStep1;


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

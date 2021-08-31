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
  navigation:any
}

type State = {
  
}

class AddJobStep1 extends React.Component<Props, State>{

  title:string;
  price:number;
  description:string;
  categoryId:string;
  cityId:string;
  constructor(props:Props){
    super(props);
    this.state = {
        value:'',

    }
    this.title = ''
    this.price = 0
    this.description = ''
    this.cityId = ''
    this.categoryId = ''
  }



  setValue = (value:string)=>this.setState({value});



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


  return (
      <View style={styles.container}>
      <View style={styles.row1}>
        <Text style={styles.title}>Ajouter les informations sur votre tache</Text>
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
                <CTextInput
                  textInputProps={{
                    }}
                  onChangeText={(text:string)=>this.categoryId= text}
                  placeholder='Category de votre tache' 
                />
              </View>
              <View style={styles.textInputContainer}>
                <CTextInput
                  textInputProps={{
                    }}
                  onChangeText={(text:string)=>this.cityId= text}
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
export default AddJobStep1;


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

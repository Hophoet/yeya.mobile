import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  Text,
} from "react-native";

import { colors} from '../../assets/colors/main';
import Icon from "react-native-vector-icons/Ionicons";
import StepHeader from '../../components/StepHeader';

type Props ={
  navigation:any,
  route:any
}

type State = {
}

class AddJobStep3 extends React.Component<Props, State>{
  constructor(props:Props){
    super(props);
    this.state = {
        value:'',
        job:this.props.route.params.job,

    }
  }



  setValue = (value:string)=>this.setState({value});


  _continue = () => {
      this.props.navigation.navigate(
          'AddJobStep3',
          {
          })
  }
  componentDidMount(){
    this.props.navigation.setOptions({
      header: () => (
        <StepHeader 
          size={3}
          step={3}
        />
      ),
    });
  }

  render(){
    return (
        <View style={styles.container}>
          <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
          <View style={styles.row1}>
            <Icon name='checkbox-outline' size={40} color={colors.main}/>
            <Text style={styles.message}>Votre tache a été ajoutée avec succes et totalement disponible</Text>
          </View>

        </View>
    );
  }
}
export default AddJobStep3;


const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container:{
		flex:1,
    backgroundColor:'white',
	},
  row1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  message:{
    fontSize:20,
    paddingHorizontal:30,
    textAlign:'center',
  }
})

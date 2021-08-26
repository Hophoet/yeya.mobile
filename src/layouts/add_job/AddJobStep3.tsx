import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";

import { bgLinearGradient, sideBarLinearGradient} from '../../assets/colors/main';
import Icon from "react-native-vector-icons/Ionicons";
import StepHeader from '../../components/StepHeader';
import Toast from '../../components/toasts';

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
    console.log('JOB DATA')
    console.log(this.state.job)
    return (
        <View style={styles.container}>
          <View style={styles.row1}>
            <Text>Votre tache a été ajoutée avec succes et disponible</Text>
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
	},
})

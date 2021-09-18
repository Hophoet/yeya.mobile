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

class UpdateJobStep3 extends React.Component<Props, State>{
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
		// Add event listener , before the component dismiss
		this.props.navigation.addListener('beforeRemove', (e:any) => {
			// Check if the event type is the device back press
			if(e.data.action.type == 'GO_BACK'){
				// Diseable the default action for the event
				e.preventDefault();
        // Navigate the user to the auth screen
        this.props.navigation.navigate('Main');
			}
		});
    this.props.navigation.setOptions({
      header: () => (
        <StepHeader 
          size={3}
          step={3}
        />
      ),
    });
    setTimeout(()=> {
      this.props.navigation.navigate(
        'Main'
      )
    }, 3000)
  }

  render(){
    return (
        <View style={styles.container}>
          <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
          <View style={styles.row1}>
            <Icon name='checkbox-outline' size={40} color={colors.main}/>
            <Text style={styles.message}>Votre tache a été mise à jour avec succes</Text>
          </View>

        </View>
    );
  }
}
export default UpdateJobStep3;


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

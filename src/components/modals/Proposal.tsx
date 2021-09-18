import React, { PureComponent } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/colors/main'

type Props = {
  toggleModal?:Function,
  navigateBack?:any,
  submitInput:any,
  textInputProps?:any,
  modalStyle?:any,
  dialogStyle?:any,
  placeholderTextColor?:string,
  animationType?:any,
  modalIsVisible:boolean,
  requestIsLoading:boolean,
}

type State = {
  text:string,
  openning:boolean,

}

class Proposal extends PureComponent<Props, State>{
  constructor(props:Props){
    super(props);
    this.state = { 
		openning: true,
		text:'',
	};
  }

  handleOnRequestClose = () => {
    this.setState({ text: '' });
  };

  handleOnKeyPress = () => {
    this.setState({ openning: false });
  };



  handleOnChangeText = (text:string) => {
    this.setState({ text, openning: false });
  };

  close = () => {
    this.setState({text:''})
    if(this.props.toggleModal){
      this.props.toggleModal()
    }
  }


  handleOnCloseDialog = () => {
    if(this.props.toggleModal){
      this.props.toggleModal();
      this.props.navigateBack();
        this.setState({ 
        openning: true,
        text:'',
      });
    }
  };

  handleSubmit = () => {
    if(this.state.text){
      this.props.submitInput({
        text:this.state.text
      });
    }
  };


  render(){
    return(
      <Modal
        statusBarTranslucent={true}
        animationType={'fade'}
        transparent={true}
        visible={this.props.modalIsVisible}
        >
        <View style={[styles.container]}  >
          <TouchableOpacity 
			disabled={true}
			style={styles.container} activeOpacity={1} onPress={()=>{}}>
			  <ScrollView style={styles.scrollViewContainer}>
            <View style={[styles.modal_container, ]} >
              <View style={styles.modal_body} >
				{ this.props.requestIsLoading &&
				<View style={styles.activityIndicatorContainer}>
					<ActivityIndicator size='large' color='gray' />
				</View>
				}
                <Text style={styles.title_modal}>Postuler à la tache</Text>
                <Text style={styles.title_modal}>
				</Text>
                <View style={styles.textInputContainer}>
                    <View style={styles.textInputHeader}>
                      <Icon name='chatbox-outline' size={30} color='gray'/>	
                      <Text style={[styles.textInputLabel]}>Laisser votre message de postulation</Text>
                    </View>
                    <TextInput 
                        ref='messageRef'
                        style={styles.textInput}
                        autoCorrect={true}
                        autoFocus={true}
                        autoCapitalize={'none'}
                        clearButtonMode={'never'}
                        clearTextOnFocus={false}
                        onKeyPress={this.handleOnKeyPress}
                        underlineColorAndroid='transparent'
                        multiline={true}
                        placeholder={'votre message'}
                        placeholderTextColor={'black'}
                        onChangeText={this.handleOnChangeText}
                        value={this.state.text}
                        maxLength={1000}
                    />
                  </View>
              </View>
              <View style={styles.btn_container}>
                <TouchableOpacity  
                  style={styles.button}
                  onPress={this.close}
				>
                  <Text style={styles.buttonLabel}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                  style={styles.button}
                  onPress={this.handleSubmit}
				>
                  <Text style={styles.buttonLabel}>Postuler</Text>
                </TouchableOpacity>
              </View>
            </View>
		  	  </ScrollView>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollViewContainer:{
	marginTop:50,
 },
  container:{
    flex:1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android:{
        backgroundColor: '#0005',
        // backgroundColor:'blue',
      }
    }),
  },
  modal_container:{
    ...Platform.select({
      ios: {
        backgroundColor:'#E3E6E7',
        borderRadius: 10,
        minWidth: 300,
      },
      android: {
        backgroundColor:'#fff',
        // backgroundColor:'red',
        padding:10,
        elevation: 24,
        minWidth: width/1.4,
        minHeight: width/1.3,
        maxWidth: width/1.4,
        borderRadius: 5,
      },
    }),
  },
  modal_body:{
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        // backgroundColor:'green',
        // backgroundColor:'green',
        flex:1,
      },
    }),
  },
  title_modal:{
    fontWeight: 'bold',
    fontSize: 20,
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign:'center',
        marginBottom: 5,
      },
      android: {
        textAlign:'left',
      },
    }),
  },
  message_modal:{
    fontSize: 16,
    ...Platform.select({
      ios: {
        textAlign:'center',
        marginBottom: 10,
      },
      android: {
        textAlign:'left',
        marginTop: 20
      },
    }),
  },
  textInput:{
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      android: {
        fontSize: 16,
        marginTop: 8,
        // borderBottomWidth: 1,
      },
    }),
  },
  btn_container:{
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#B0B0B0',
        backgroundColor:'red',
        maxHeight: 48,
      },
      android:{
        // backgroundColor:'blue',
        marginTop:10,
      }
    }),
  },
  button:{
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android:{
        flex: 1,
        backgroundColor:colors.main,
        padding:15,
        marginHorizontal:5,
        justifyContent:'center',
        alignItems:'center',
		    borderRadius:5,
      }
    }),
  },
  buttonLabel:{
    color:'white',
    // fontSize:18,
  },
  quantityContainer:{
	//backgroundColor:'red',
	flexDirection:'row',
	alignItems:'center',
  },
  quantityButton:{
	justifyContent:'center',
	alignItems:'center',
	//paddingVertical:10,
	paddingHorizontal:5,
  },
  quantityLabel:{
	fontSize:30,
	fontWeight:'bold',
  },
  activityIndicatorContainer:{
	alignSelf:'center',
  },
  disabledButton:{
    opacity:.3
  },
  textInputContainer:{
    //   backgroundColor:'red',
      marginVertical:5,
  },
  textInputLabel:{
    //   opacity:.5,
    paddingHorizontal:10,
  },
  emptyStockContainer:{
    paddingVertical:10,
  },
  emptyStockButton:{
      flexDirection:'row',
      borderWidth:StyleSheet.hairlineWidth,
      borderColor:'black',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
      padding:20,
  },
  emptyStockButtonLabel:{

  },
  textInputHeader:{
    flexDirection:'row',
    alignItems:'center',
  }
  
  
});
export default Proposal;

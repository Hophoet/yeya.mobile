

import React from 'react';
import { ActivityIndicator,  StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

import MainHeader from '../../components/MainHeader';
import Toast from '../../components/toasts'
import { mailFormatIsValid } from '../../utils/mail'
import CButton from '../../components/CButton';
import CTextInput from '../../components/CTextInput';
import { colors } from '../../assets/colors/main'
import { connect } from 'react-redux'
import { sendPasswordResetCode } from '../../backend/requests/auth'
import { SendPasswordResetCodeRequestType, SignUpRequestType } from '../../backend/requests/types'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	dispatch:any
}

type State = {
	requestIsLoading:boolean,
}

class ResetPassword extends React.Component<Props, State> {

	_isMounted:boolean;
	email:string = '';
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		// Set the state
		this.state = {
			requestIsLoading:false
		};
		this.email = ''
 	}

   _customNavHeader = () => {
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				title="Mot de passe oublié"
				description="Entrer votre email pour que vous puisions vous envoyer le code de verification pour restorer votre compte"
				// firstAction={()=>{}}	
				navigateTo={()=> {}}
			/>
		  ),
        });

    }

	onSubmit = () => {
		if(this.email){
			if(mailFormatIsValid(this.email)){
				// can send code 
				this.setState({requestIsLoading:true})
				this._sendPasswordResetCode()

			}
			else if(!mailFormatIsValid(this.email)){
				Toast._show_bottom_toast('Entrer un email valide');
			}
		}
		else if (!this.email){
			Toast._show_bottom_toast('Entrer votre adresse email');
		}
	}

    // send  method 
    _sendPasswordResetCode = () => {
        // Check if loging request is loading already or not
        if(!this.state.requestIsLoading
			&& this.email
			){     
            	// Start the loading
            	this.setState({requestIsLoading:true})
				let data:SendPasswordResetCodeRequestType = {
					email:this.email
				}
				sendPasswordResetCode(data)
				.then((response:any) => {
					if(this._isMounted){
            			this.setState({requestIsLoading:false})
						this.navigateToVerifyPasswordResetCode(
							{
								email:this.email,
								correctCode:'39384'
							}
						)
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
        

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._customNavHeader();
	}

	navigateToSignIn = ()=>{
		this.props.navigation.navigate('SignIn')
	}
 	navigateToVerifyPasswordResetCode = (data:any)=>{
		this.props.navigation.navigate('VerifyPasswordResetCode', data)
	}



	render(){
		return(
			<View style={styles.container}>
				<StatusBar 
					hidden={false}
					barStyle={'dark-content'}
					backgroundColor={'white'}
				/>
				<ScrollView
					style={styles.contentContainer}
				>
					{ this.state.requestIsLoading &&
					<View style={styles.activityIndicatorContainer}>
						<ActivityIndicator size={'large'} color={colors.main} />
					</View>
					}
					<View style={styles.row1}>
						<View style={styles.textInputsContainer}>
							<View style={styles.textInputContainer}>
								<CTextInput
									textInputProps={{keyboardType:'email-address'}}
									autoFocus={true}
									icon='mail'	
									onChangeText={(text:string)=>this.email=text}
									onSubmitEditing={()=>this.onSubmit}
									placeholder='Address-email'
								/>
							</View>
						</View>
						<TouchableOpacity 
							onPress={this.navigateToSignIn}
							style={styles.forgotPasswordButton}>
							<Text style={styles.forgotPasswordButtonLabel}>Vous-vous rappeler de votre mot de passe</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row2}>
						<CButton 
							textStyle={{color:'white'}}
							onPress={this.onSubmit}	
							iconPosition='right'
							label='Envoyer'
						/>

					</View>
					<View style={styles.row3}>
					</View>
				</ScrollView>
			</View>
		)
	}

}
//maps with the state global
const mapDispatchToProps = (dispatch:any) => {
    return {
        dispatch: (action:any) => {dispatch(action)}
    }
}

const mapStateToProps = (state:any) => {
    return {
        authUserToken:state.authUserToken,
        authUser:state.authUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white',
		//backgroundColor:'#6C63FF'
	},
	row1Title:{
		fontSize:20,
		fontWeight:'bold',
		color:'black',
		// alignSelf:'center',
	},
	contentContainer:{
		flex:1,
		backgroundColor:'white',
		paddingHorizontal:20,
	},
	row1:{
		flex:4,
		paddingTop:20,
		//backgroundColor:'red',
		// justifyContent:'center',
		// justifyContent:'center',
		// margin:30,
	},
	row2:{
		flex:3,
		//backgroundColor:'gray',
		justifyContent:'center',
	},
	row3:{
		flex:1,
		//backgroundColor:'gray',
		alignItems:'center',
		justifyContent:'center',
	},
	textInputContainer:{
		paddingBottom:10,
	},
	
	button:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'red',
		padding:10,
		borderRadius:width/2,
		marginHorizontal:width/10,
	},
	formBottomContainer:{
		//paddingVertical:10,
		justifyContent:'center'
		
	},
	formBottomFirstLabel:{
		color:'black',	
		fontWeight:'bold',
		textTransform:'uppercase',
	},
	formBottomFirstButton:{
		flexDirection:'row',
		alignItems:'center',
	},
	footerLabel:{
		color:'white',
	},
	footerLabelRight:{
		fontWeight:'bold',
		fontSize:15,
	},
	textInputsContainer:{
		//paddingBottom:20,
	},
	signUpButton:{
		//backgroundColor:'red',
		alignItems:'flex-end',
		justifyContent:'center',
		paddingVertical:20,
	},
	forgotPasswordButton:{
		alignItems:'flex-end',
		justifyContent:'center',
		paddingBottom:20,
	},
	activityIncatorContainer:{

	}

})

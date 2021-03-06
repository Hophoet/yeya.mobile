
import React from 'react';
import { ActivityIndicator,  StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import MainHeader from '../../components/MainHeader';
import Toast from '../../components/toasts'
import { mailFormatIsValid } from '../../utils/mail'
import { signIn } from '../../backend/requests/auth'
import { SignInRequestType } from '../../backend/requests/types'
import CButton from '../../components/CButton';
import CTextInput from '../../components/CTextInput';
import { colors } from '../../assets/colors/main'
import { connect } from 'react-redux'
import  {SET_AUTH_USER_TOKEN, SET_AUTH_USER} from '../../redux/store/actions'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	dispatch:Function
}

type State = {
	requestIsLoading:boolean,
}

class SignIn extends React.Component<Props, State> {

	_isMounted:boolean;
	email:string = '';
	password:string = '';
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		// Set the state
		this.state = {
			requestIsLoading:false
		};
		this.email = ''
		this.password = ''
 	}

   _customNavHeader = () => {
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				title="Bienvenue"
				description="On est heureux de vous voir, vous pouvez continuer votre connexion pour poster vos taches ou retrouver des taches à réaliser"
				// firstAction={()=>{}}	
				firstAction={this.props.navigation.goBack}	
				navigateTo={()=> {}}
			/>
		  ),
        });
    }

	onSubmit = () => {
		if(this.email && this.password){
			if(mailFormatIsValid(this.email)){
				// can sign in
				this._signIn()

			}
			else if(!mailFormatIsValid(this.email)){
				Toast._show_bottom_toast('Entrer un email valide');
			}
		}
		else if (!this.email){
			Toast._show_bottom_toast('Entrer votre adresse email');
		}
		else if (!this.password){
			Toast._show_bottom_toast('Entrer votre mot de passe');
		}
	}

    // User login method 
    _signIn = () => {
        // Check if loging request is loading already or not
        if(!this.state.requestIsLoading
			&& this.email
			&& this.password){     
            	// Start the loading
            	this.setState({requestIsLoading:true})

				let data:SignInRequestType = {
					email:this.email,
					password:this.password
				}
				signIn(data)
				.then((response:any) => {
					if(this._isMounted){
            			this.setState({requestIsLoading:false})
						Toast._show_bottom_toast("Connexion avec success");	
						//console.log(response.data)
						let token = response.data.token && response.data.token.value
						let user = response.data.user
						// console.log(token, user)
						let authUserTokenAction = {type:SET_AUTH_USER_TOKEN, value:token}
						let authUserAction = {type:SET_AUTH_USER, value:user}
						this.props.dispatch(authUserTokenAction)
						this.props.dispatch(authUserAction)
						this.props.navigation.navigate('Loader',{});
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
						  if(errorData.detail == 'LOGIN_BAD_CREDENTIALS'){
								Toast._show_bottom_toast("email ou mot de passe incorrecte");	
						  }
						  else if(errorData.code == 'auth/username-and-password-required'){
								Toast._show_bottom_toast("Entrer votre nom d'utlisateur et mot de passe pour continuer");	
						  }
						  else if(errorData.code == 'auth/email-and-password-required'){
							 Toast._show_bottom_toast("Entrer votre email et mot de passe pour continuer");	

						  }
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

	navigateToSignUp = ()=>{
		this.props.navigation.navigate('SignUp')
	}
 	navigateToSendPasswordResetCode = ()=>{
		this.props.navigation.navigate('SendPasswordResetCode')
	}

	navigateToHome = ()=>{
		this.props.navigation.navigate('App')
	}


	render(){
		return(
			<View style={styles.container}>
                <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
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
									onSubmitEditing={this.onSubmit}
									placeholder='Address-email'
								/>
							</View>
							<View style={styles.textInputContainer}>
								<CTextInput
									icon='lock-closed'	
									password
									focus={true}
									onSubmitEditing={this.onSubmit}
									onChangeText={(text:string)=>this.password=text}
									placeholder='Mot de passe'
								/>
							</View>
						</View>
						<TouchableOpacity 
							onPress={this.navigateToSendPasswordResetCode}
							style={styles.forgotPasswordButton}>
							<Text style={styles.forgotPasswordButtonLabel}>Mot de passe oublié ?</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row2}>
						<CButton 
							textStyle={{color:'white'}}
							onPress={this.onSubmit}	
							iconPosition='right'
							label='Connexion'
						/>

					</View>
					<View style={styles.row3}>
						<TouchableOpacity
							style={styles.signUpButton}	
							onPress={this.navigateToSignUp}
						>
							<Text style={styles.signUpButtonLabel}>Vous n'avez pas de compte yeya ?</Text>
						</TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

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
		backgroundColor:'white',
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

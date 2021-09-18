import React from 'react';
import { ActivityIndicator,  StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import MainHeader from '../../components/MainHeader';
import Toast from '../../components/toasts'
import { mailFormatIsValid } from '../../utils/mail'
import CButton from '../../components/CButton';
import CTextInput from '../../components/CTextInput';
import { signUp } from '../../backend/requests/auth'
import { SignUpRequestType } from '../../backend/requests/types'
import { colors } from '../../assets/colors/main'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	dispatch:any
}

type State = {
	requestIsLoading:boolean,
}

class SignUp extends React.Component<Props, State> {

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
				title="Creer un compte"
				description="On est heureux de vous voir, vous pouvez continuer votre inscription pour poster vos taches ou retrouver des taches a faire"
				firstAction={this.props.navigation.goBack}	
				// firstAction={()=>{}}	
				navigateTo={()=> {}}
			/>
		  ),
        });
    }

	onSubmit = () => {
		if(this.email && this.password){
			if(mailFormatIsValid(this.email)
				&& 	this.password.trim().length >=5
			){
				// can register
				this._signUp()
			}
			else if(!mailFormatIsValid(this.email)){
				Toast._show_bottom_toast('Entrer un email valide');
			}
			else if(this.password.trim().length < 5){
				Toast._show_bottom_toast('Entrer un mot de passe plus fort');
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
    _signUp = () => {
        // Check if loging request is loading already or not
        if(!this.state.requestIsLoading
			&& this.email
			&& this.password){     
            	// Start the loading
            	this.setState({requestIsLoading:true})

				let data:SignUpRequestType = {
					email:this.email,
					password:this.password
				}
				signUp(data)
				.then((response:any) => {
					if(this._isMounted){
            			this.setState({requestIsLoading:false})
						Toast._show_bottom_toast("Inscription reussie avec success, veuiller vous connectez");	
						this.navigateToSign()
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
						  if(errorData.detail == 'REGISTER_USER_ALREADY_EXISTS'){
								Toast._show_bottom_toast("votre email est déja utilisé");	
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

	navigateToSign = ()=>{
		this.props.navigation.navigate('SignIn')
	}
 	navigateToResetPassword = ()=>{
		this.props.navigation.navigate('ResetPassword')
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
									onSubmitEditing={()=>this.onSubmit}
									placeholder='Address-email'
								/>
							</View>
							<View style={styles.textInputContainer}>
								<CTextInput
									icon='lock-closed'	
									password
									focus={true}
									onSubmitEditing={()=>this.onSubmit}
									onChangeText={(text:string)=>this.password=text}
									placeholder='Mot de passe'
								/>
							</View>
						</View>
						<TouchableOpacity style={styles.termsButton}>
							<Text style={styles.termsButtonLabel}>J'accepte les <Text style={styles.link}>Terms et conditions</Text> d'utilisation</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row2}>
						<CButton 
							textStyle={{color:'white'}}
							onPress={this.onSubmit}	
							iconPosition='right'
							label="S'inscrire"
						/>

					</View>
					<View style={styles.row3}>
						<TouchableOpacity
							style={styles.signUpButton}	
							onPress={this.navigateToSign}
						>
							<Text style={styles.signUpButtonLabel}>Vous avez déja pas de compte yeya ?</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

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
	termsButton:{
		//alignItems:'flex-end',
		justifyContent:'center',
		paddingBottom:20,
	},
	activityIncatorContainer:{

	},
	link:{
		color: colors.main,
	}

})



import React from 'react';
import { ActivityIndicator,  StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import MainHeader from '../../components/MainHeader';
import Toast from '../../components/toasts'
import CButton from '../../components/CButton';
import CTextInput from '../../components/CTextInput';
import { colors } from '../../assets/colors/main'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	route:any,
	authUser: any,
	authUserToken:string,
	dispatch:any
}

type State = {
	requestIsLoading:boolean,
}

class VerifyPasswordResetCode extends React.Component<Props, State> {

	_isMounted:boolean;
	code:string = '';
	correctCode:string = '';
	password:string = '';
	email:string = '';
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		// Set the state
		this.state = {
			requestIsLoading:false
		};
		this.code = ''
      	this.correctCode = this.props.route.params.correctCode
      	this.email = this.props.route.params.email
 	}

   _customNavHeader = () => {
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				title="Verification de votre identité"
				description="Entrer le code envoyer a votre email pour confirmer votre identité"
				// firstAction={()=>{}}	
				navigateTo={()=> {}}
			/>
		  ),
        });
    }

	onSubmit = () => {
		if(this.code){
			if(parseInt(this.code)){
				if(this.code == this.correctCode){
					// can send code 
					this.setState({requestIsLoading:true})
					this.navigateToSetNewPassword({
						'code':this.code,
						'email':this.email
					})
				}
				else{
					Toast._show_bottom_toast('Votre code de verification est incorrecte');

				}
			}
			else {
				Toast._show_bottom_toast('Entrer votre valide code de verification');
			}
		}
		else if (!this.code){
			Toast._show_bottom_toast('Entrer le code verification envoyer à votre email');
		}
	}

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._customNavHeader();
	}

 	navigateToSetNewPassword = (data:any)=>{
		this.props.navigation.navigate('SetNewPassword', data)
	}

	navigateToHome = ()=>{
		this.props.navigation.navigate('App')
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
									textInputProps={{keyboardType:'numeric'}}
									autoFocus={true}
									onChangeText={(text:string)=>this.code=text}
									onSubmitEditing={()=>this.onSubmit}
									placeholder='Code de verification'
								/>
							</View>
						</View>
						<TouchableOpacity 
							onPress={this.navigateToSignIn}
							style={styles.forgotPasswordButton}>
							<Text style={styles.forgotPasswordButtonLabel}>Vous n'avez pas reçu de code après 30 seconds ?</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row2}>
						<CButton 
							textStyle={{color:'white'}}
							onPress={this.onSubmit}	
							iconPosition='right'
							label='Verifier'
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
export default connect(mapStateToProps, mapDispatchToProps)(VerifyPasswordResetCode)

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

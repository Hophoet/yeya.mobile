
import React, {useState} from 'react';
import {ImageBackground, StatusBar, ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

import MainHeader from '../../components/MainHeader';
import AuthNavHeader from '../../components/AuthNavHeader';
import CButton from '../../components/CButton';
import CTextInput from '../../components/CTextInput';
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

class SignIn extends React.Component<Props, State> {

	_isMounted:boolean;
	message:string = '';
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		// Set the state
		this.state = {
			requestIsLoading:false
		};
 	}

   _customNavHeader = () => {
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				title="Connectez-vous"
				description="améliorer l'application en nous laissant votre message l'application en nous laissant votre message"
				// firstAction={()=>{}}	
				navigateTo={()=> {}}
			/>
          ),
        });

    }

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._customNavHeader();
	}

	navigateToSignUp = ()=>{
		this.props.navigation.navigate('SignUp')
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
				<StatusBar 
					hidden={false}
					backgroundColor={'black'}
				/>
				<View
					style={styles.contentContainer}
				>
					<View style={styles.row1}>
						<View style={styles.textInputsContainer}>
							<View style={styles.textInputContainer}>
								<CTextInput
									icon='mail'	
									placeholder='Email'
								/>
							</View>
							<View style={styles.textInputContainer}>
								<CTextInput
									icon='lock-closed'	
									placeholder='Password'
								/>
							</View>
						</View>
					</View>
					<View style={styles.row2}>
						<CButton 
							textStyle={{color:'white'}}
							onPress={this.navigateToHome}	
							iconPosition='right'
							label='Connexion'
						/>
						<TouchableOpacity
							style={styles.signUpButton}	
						>
							<Text style={styles.signUpButtonLabel}>Vous n'avez pas de compte yeya ?</Text>
						</TouchableOpacity>

					</View>
					<View style={styles.row3}>
						<TouchableOpacity>
							<Text>Vous n'avez pas de compte yeya ?</Text>
						</TouchableOpacity>
					</View>
				</View>
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
		paddingVertical:10,
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
		paddingBottom:20,
	},
	signUpButton:{
		//backgroundColor:'red',
		alignItems:'flex-end',
		justifyContent:'center',
		paddingVertical:10,
	}

})

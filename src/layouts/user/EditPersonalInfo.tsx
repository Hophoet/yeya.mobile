import React from 'react';
import {ActivityIndicator, ScrollView, TextInput, StatusBar, Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MainHeader from '../../components/MainHeader';
import { updateUserPersonalInfos} from '../../backend/requests/auth';
import toasts from '../../components/toasts'
import  {SET_AUTH_USER} from '../../redux/store/actions'

// props type
type Props = {
	authUser:any,
	navigation:any,
	authUserToken:string,
	dispatch:any
}

// state type
type State = {
	firstName:string,
	about:string,
	lastName:string,
	email:string,
	phoneNumber:string,
	isLoading:boolean,
	usernameError:string,
	emailError:string,

}

class EditPersonalInfo extends React.Component<Props, State>{

	_isMounted: boolean;
	constructor(props:Props) {
		super(props);
		// Set the component mount state to false
		this._isMounted = false;
		// Set the state
		this.state = {
			about : this.props.authUser && this.props.authUser.about,
			firstName : this.props.authUser && this.props.authUser.first_name,
			lastName : this.props.authUser && this.props.authUser.last_name,
			email : this.props.authUser && this.props.authUser.email,
			phoneNumber : this.props.authUser && this.props.authUser.phone_number,
			isLoading: false,
			usernameError:'',
			emailError:'',
		};
 	}

	back = () => {
		this.props.navigation.goBack();
	}
	save = () => {
		this._updateUserPersonalInfos();
	}
	navigateTo = (screen:any) => {
		this.props.navigation.navigate(screen,{})
	}
	

   _customNav = () => {
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				title='Mèttre à jour les informations personnelles'
				description='Remplisser les champs'
				firstAction={this.back}	
				secondAction={this.save}	
				secondActionLabel='Enrégister'
				navigateTo={this.navigateTo}
			/>
          ),


        });

    }

	_validateFields = () => {
		if(this.state.firstName 
			&& this.state.lastName 
			&& this.state.email 
			&& this.state.about 
			&& this.state.phoneNumber){
			return true;
		}
		else if(!this.state.firstName){
            toasts._show_bottom_toast("Entrer votre prenoms");
		}
		else if(!this.state.lastName){
            toasts._show_bottom_toast("Entrer votre nom");
		}
		else if(!this.state.about){
            toasts._show_bottom_toast("A propos de vous");
		}
		else if(!this.state.email){
            toasts._show_bottom_toast("Entrer votre email");
		}
		else if(!this.state.phoneNumber){
            toasts._show_bottom_toast("Entrer votre phone number");
		}
		return false;
	}

	_updateUserPersonalInfos = () => {
		if(this.props.authUserToken){
			if(this._validateFields()){
				let infos = {
					'about':this.state.about,
					'firstName':this.state.firstName,
					'lastName':this.state.lastName,
					'email':this.state.email,
					'phoneNumber':this.state.phoneNumber
				}
				if(this._isMounted){
					this.setState({isLoading:true})
				}
				updateUserPersonalInfos(this.props.authUserToken, infos)
				.then((response:any)=> {
					let user = response.data
					if(this._isMounted){
						this.setState({isLoading:false});
            			toasts._show_bottom_toast("Profile mise à jour avec success!");
						let authUserAction = {type:SET_AUTH_USER, value:user};
						this.props.dispatch(authUserAction);
						this.props.navigation.goBack();
						
					}
				})
				.catch((error:any) => {
					if(this._isMounted){
						this.setState({isLoading:false})
						//
					}
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						let errorData = error.response.data;
						if(errorData){
							if(errorData.code == 'user/username-already-used'){
								this.setState({usernameError:"nom d'utilisateur déja utilisé"})
            					toasts._show_bottom_toast("votre nouveau nom d'utilisateur est déja utilisé");
							}
							else if(errorData.code == 'user/email-already-used'){
								this.setState({emailError:"email déja utilisé"})
            					toasts._show_bottom_toast("votre nouveau email est déja utilisé");
							}
						}
						console.log(error.response.status);
						console.log(error.response.headers);
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
				});
			}	


		}
	}

	componentDidMount() { 
		// Enable the component mount state
		this._isMounted = true;
		this._customNav();
	}
	
	componentWillUnmount(){
		// Set tje component mount state to true
		this._isMounted = false;
	}

	_renderLoadingIndicator = () => {
		if(this.state.isLoading){
			return(
				<View style={styles.loadingIndicatorContainer}>
					<ActivityIndicator size='small' color='gray'/>
				</View>
			)
		}
	}


	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor='black' />
				<ScrollView>
					<View style={styles.row1}>
						<View style={styles.textInputContainer}>
							<Text style={styles.textInputLabel}>Prénom</Text>
							<TextInput 
								value={this.state.firstName} 
								onChangeText={firstName=>this.setState({firstName})}
								style={styles.textInput}
							/>
						</View>
						<View style={styles.textInputContainer}>
							<Text style={styles.textInputLabel}>Nom de famille</Text>
							<TextInput 
								value={this.state.lastName} 
								onChangeText={lastName=>this.setState({lastName})}
								style={styles.textInput}
							/>
						</View>
						<View style={styles.textInputContainer}>
							<Text style={styles.textInputLabel}>A propos de vous</Text>
							<TextInput 
								multiline={true}
								maxLength={100}
								value={this.state.about} 
								onChangeText={about=>this.setState({about})}
								style={styles.textInput}
							/>
						</View>
						<View style={styles.textInputContainer}>
							<Text style={styles.textInputLabel}>Adresse e-mail</Text>
							{ (this.state.emailError)
								?<Text style={styles.errorLabel}>{this.state.emailError}</Text>
								:null
							}
							<TextInput 
								value={this.state.email} 
								style={[styles.textInput,
									(this.state.emailError)
									?{borderBottomColor:'red', borderBottomWidth:1}
									:{}
								
								]}
								onChangeText={email=>{
									if(this.state.emailError){
										this.setState({emailError:''})
									}
									this.setState({email})
								
								}}
							/>
						</View>
						<View style={styles.textInputContainer}>
							<Text style={styles.textInputLabel}>Numéro de telephone operationel</Text>
							<TextInput 
								value={this.state.phoneNumber} 
								onChangeText={phoneNumber=>this.setState({phoneNumber})}
								style={[styles.textInput,
								
								]}
								/>
							
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}



// Map dispath function from redux to the component props
const mapDispatchToProps = (dispatch:any) => {
	return {
	  dispatch: (action:any) => {
		dispatch(action);
	  },
	};
  };
  
// Map the redux global state to the component props
const mapStateToProps = (state:any) => {
return {
	authUserToken: state.authUserToken,
	authUser:state.authUser
};
};

// Export the component by connecting the maps to the component
export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalInfo);

// Set styles
const styles = StyleSheet.create({
	container: {
    	flex: 1,
		backgroundColor:'white',
  	},
  	row1:{
		flex:1,
		paddingHorizontal:20,
		paddingVertical:20,
  	},
	textInputContainer:{

	},
	textInput:{
		borderBottomWidth:StyleSheet.hairlineWidth,
		borderBottomColor:'gray',
		marginBottom:20,
	},
	textInputLabel:{
		opacity:.5,

	},
	loadingIndicatorContainer:{
		justifyContent:'center',
		alignItems:'center',
	},
	errorLabel:{
		color:'red',
		opacity:.5,
		fontSize:12
	}

});

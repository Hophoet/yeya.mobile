import React from 'react';
import { ScrollView, ActivityIndicator, Dimensions, StatusBar, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import MainHeader from '../../components/MainHeader';
import toasts from '../../components/toasts'
import CTextInput from '../../components/CTextInput';
import CButton from '../../components/CButton';
import {  SendUserMessageType} from '../../backend/requests/types'
import { sendUserMessage} from '../../backend/requests/message'
import { colors } from '../../assets/colors/main'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	dispatch:any
	
}

type State = {
	requestIsLoading:boolean,
}

class ImproveApp extends React.Component<Props, State> {

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

	back = () => {
		this.props.navigation.goBack();
	}

	navigateTo = (screen:any) => {
		this.props.navigation.navigate(screen,{})
	}


	_fieldIsValie = () => {
		if(this.message.trim()){
			return true;
		}
		else {
			toasts._show_bottom_toast("entrer votre message");
		}
	}


	_sendUserMessage = () => {
		let authUser = this.props.authUser;
		let authUserToken = this.props.authUserToken;
		if(
			authUser 
			&& authUserToken
			&& this._fieldIsValie()
			&& (!this.state.requestIsLoading)
		){
			let data: SendUserMessageType = {
				text:this.message,
				authToken:authUserToken,
			}
			this.setState({requestIsLoading:true});
			sendUserMessage(data)
			.then((response:any)=>{
				if(this._isMounted){
					this.setState({requestIsLoading:false});
					toasts._show_bottom_toast("message envoyé avec success");
					this.props.navigation.navigate('ImproveAppDone')
				}
			})
			.catch((error:any) => {
				if(this._isMounted){
					//
					this.setState({requestIsLoading:false});
					toasts._show_bottom_toast("envoie echouée, veuillez essayer!");
				}
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
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
	

   _customNav = () => {
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				title="Améliorer l'application"
				description="améliorer l'application en nous laissant votre message"
				firstAction={this.back}	
				navigateTo={this.navigateTo}
			/>
          ),
        });

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

	getAccountAmount = () => {
		const authUser = this.props.authUser;
		if(authUser && this.props.authUserToken){
			let amount = 0;
			if(authUser.account && authUser.account.amount > 0){
				amount = authUser.account.amount;
			}
			return amount;
		}
		return 0;
	}

	onSubmit = () => {
		this._sendUserMessage()
	}

	render() {
		return (
			<View style={styles.container}>
                <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
				<ScrollView>
				<View style={styles.row1}>
					{ this.state.requestIsLoading &&
					<View style={styles.activityIndicatorContainer}>
						<ActivityIndicator color={colors.main} size='large'/>
					</View>
					}
					<CTextInput
						last={true}
						first={true}
						textInputProps={{
							multiline:true,
							maxLength:1000,
						}
						}
						autoFocus={true}
						onChangeText={(message:string) => this.message = message}
						label={"dit-nous comment nous pourons vous améliorez l'application"}	
						placeholder="laissez-nous votre message"
					/>
				</View>
				<View style={styles.row3}>
						<CButton
							disabled={this.state.requestIsLoading}
							onPress={this._sendUserMessage}
							label={"Envoyer"}		
							// labelStyle={styles.labelStyle}
						/>
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
export default connect(mapStateToProps, mapDispatchToProps)(ImproveApp);

const {width, height} = Dimensions.get('window');
// Set styles
const styles = StyleSheet.create({
	container: {
    	flex: 1,
		backgroundColor:'white',
  	},
  	row1:{
		paddingHorizontal:20,
		marginVertical:20,
  	},
	row2:{
		paddingHorizontal:20,
	},
	row3:{
		paddingHorizontal:20,
		paddingVertical:20,
	},
	textInput:{
		flex:1,
		fontSize:30,
		fontWeight:'bold',
		alignSelf:'center',
		paddingVertical:20,
		
	},
	textInputContainer:{
		flexDirection:'row',
		//elevation:10,
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:10,
		paddingHorizontal:20,
		alignSelf:'center',
		marginRight:width/4,
		borderColor:'gray',
		borderWidth:StyleSheet.hairlineWidth

	},
	device:{
		fontSize:30,
		opacity:.5,
		margin:5,
	},
	actionContainer:{
		backgroundColor:'white',
		padding:15,
		borderRadius:5,
		//elevation:10,
		justifyContent:'center',
		alignItems:'center',
		marginRight:width/4,
		borderColor:'gray',
		borderWidth:StyleSheet.hairlineWidth
	},
	actionLabel:{
		color:'gray',
		//fontWeight:'bold',
		fontSize:18,
	},
	activityIndicatorContainer:{
		//backgroundColor:'red',
		justifyContent:'center',
		alignItems:'center',
		paddingVertical:10,
		
	},
});

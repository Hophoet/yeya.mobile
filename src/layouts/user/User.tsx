import React from 'react'
import { Image, Alert, Dimensions, FlatList, StyleSheet, StatusBar, View, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { colors } from '../../assets/colors/main'
import ProfileHeader from '../../components/user/ProfileHeader';
import ActionButtonsItem from '../../components/user/ActionButtonsItem';
import Icon from 'react-native-vector-icons/Ionicons'
import UserProfileImagePicker from '../../components/UserProfileImagePicker';
import {SET_AUTH_USER, SET_AUTH_USER_TOKEN, CLEAN} from '../../redux/store/actions';
import {setUserProfile } from '../../backend/requests/auth';
import {SetUserProfileImageType } from '../../backend/requests/types';
import Toast from '../../components/toasts';

type Prop = {
  authUser:any,
  authUserToken:string,
  navigation:any,
  dispatch:any,


}

type State = {
	imageUpdateIsLoading:boolean,

}

class  User extends React.Component<Prop,State> { 

	_isMounted:boolean;
	profileActions:any[];
    constructor(props:Prop){
        super(props);
		this._isMounted = false;
		//state
        this.state = {
			imageUpdateIsLoading: false
        }
		this.profileActions = [
			{id:5, icon:'trending-up', title:"Ameliorer l'application", action:this._navigateToImproveApp},
			{id:4, icon:'log-out-outline', title:'Se Deconnecter', action:this.onLogout},
		]
    }

	goTo = (screen:string) => {
		this.props.navigation.navigate(screen);

	}

	componentWillUnmount(){
		//clean up
		this._isMounted = false;
	}

   _customNav = () => {
        this.props.navigation.setOptions({
          header: () => (
            <ProfileHeader 
				// firstAction={this.closeAuth}	
				// firstActionIcon='close'
			/>
          ),
        });
    }

	_navigateToImproveApp = () => {
		this.props.navigation.navigate('ImproveApp')
	}
	_navigateToEdit = () => {
		this.props.navigation.navigate('EditPersonalInfo')
	}

	onLogout = () =>{
		Alert.alert(
			'Deconnexion',
			'Voulez vous vraiment vous deconnecter?',
			[
				{	
					text: 'Non',
					onPress: () => {},
					style: 'cancel'
				},
				{
					text:'Oui',
					onPress: () => this._logout()
				}
			],
			{ cancelable:false}
		);
	}

	_logout = () => {
		console.log('logout')
		let auth_user_action = { 
			type:SET_AUTH_USER, 
			value:null
		}
		let auth_user_token_action = { 
			type:SET_AUTH_USER_TOKEN, 
			value:''
		}
		let clean_action = { 
			type:CLEAN,
			value:null
		}
		this.props.dispatch(auth_user_action)
		this.props.dispatch(auth_user_token_action)
		this.props.dispatch(clean_action)
		this.props.navigation.navigate('Loader');
		Toast._show_bottom_toast('Déconnexion avec succès');
		console.log('user logout')

	}

	componentDidMount(){
		// Set the component state 
		this._isMounted = true;
		// this._customNav();
		// Add event listener to exit the back when the user press the device back button 
		this.props.navigation.addListener('beforeRemove', (e:any) => {
			//exit the app when the back button is press
			if(e.data.action.type == 'GO_BACK'){
		 		// e.preventDefault();
				// // exit the app if the presentation was read
				// BackHandler.exitApp();
			}
		 });
	
	}

	_getUserLabel = () => {
		let authUser = this.props.authUser
		if(authUser 
			&& authUser.email
			&& authUser.email.length > 3){
			return authUser.email[0]	
		}
	}
	_setUserProfile = (image:any) => {
		this.setState({imageUpdateIsLoading:true});
		const authUserToken = this.props.authUserToken	
		let data:SetUserProfileImageType = {
			authToken:authUserToken,
			image:image
		}
		setUserProfile(data)
		.then((response:any) => {
			if(this._isMounted){
				this.setState({imageUpdateIsLoading:false});
				let action = { 
					type:SET_AUTH_USER, 
					value:response.data.user
				}
				this.props.dispatch(action)
				console.log('update user profile')
			}
		})
		.catch((error:any) => {
			if(this._isMounted){
				this.setState({imageUpdateIsLoading:false});
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

	

	onImagePicked = (image:any) => {
		// console.log('image', image)
		if(image){
			if(this._isMounted){
				this._setUserProfile(image);
			}
		}
	}


 
    //components rending method

    render(){
		let authUser = this.props.authUser
		let image = authUser && authUser.image && authUser.image.url
        return(
            <View style={styles.container}>
                <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
				<View style={styles.row1}>
					<View style={styles.row1Column1}>
						<TouchableOpacity style={styles.userCircle}>
								{/* <Image style={styles.image} source={{uri:authUser.image.url}}/> */}
								<UserProfileImagePicker 
									imageUpdateIsLoading={this.state.imageUpdateIsLoading}
									image={image} 
									onImagePicked={this.onImagePicked}/>
						</TouchableOpacity>
					</View>
					<View style={styles.row1Column2}>
						<Text style={styles.username}>{authUser && authUser.email}</Text>
						{ ( authUser && (authUser.last_name || authUser.first_name)) &&
						<Text style={styles.email}>{authUser.first_name} {authUser.last_name}</Text>
						}
					</View>
				</View>
				<View style={styles.row2}>
					<TouchableOpacity 
						onPress={this._navigateToEdit}	
						style={styles.editButton}>
						<Icon name='pencil' color='white' size={20}/>
					</TouchableOpacity>
					<View style={styles.aboutContainer}>
						<Text style={styles.aboutLabel}>A propos de moi</Text>
						<Text style={styles.aboutDescription}>{( authUser && authUser.about)? authUser.about: '_'}</Text>
					</View>
					<View style={styles.actionsContainer}>
						{/* <Text style={styles.actionsTitle}>SETTINGS</Text> */}
						<FlatList
							data={this.profileActions}
							keyExtractor={(item) =>item.id.toString()}
							ItemSeparatorComponent={() =><View style={styles.actionButtonSeparator}/>}
							renderItem={({item,index}) => (
								<ActionButtonsItem item={item}/>
							)}
						/>

					</View>
				</View>
			</View>
				)
			}


}

//maps with the state global
const mapDispatchToProps = (dispatch:Function) => {
    return {
        dispatch: (action:any) => {dispatch(action)}
    }
}
const mapStateToProps = (state:any) => {
    return {
		authUserToken:state.authUserToken,
		authUser:state.authUser,
		presentationRead:state.presentationRead
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

const {width, height} = Dimensions.get('window');

//set screen styles
const styles = StyleSheet.create({
    container:{
        flex:1,
		backgroundColor:'white',
     
    },
	row1:{
		flex:1,
		flexDirection:'row',
		paddingHorizontal:20,
		backgroundColor:colors.main,
	},
	row1Column1:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	row1Column2:{
		flex:3,
		paddingLeft:20,
		// backgroundColor:'green',
		justifyContent:'center',
	},
	row2:{
		flex:3,
	},
	userCircle:{
		width:width/4.5,
		height:width/4.5,
		backgroundColor:'#111b',
		borderRadius:90,
		justifyContent:'center',
		alignItems:'center',
	},
	image:{
		width:width/4.5,
		height:width/4.5,
		backgroundColor:'#111b',
		borderRadius:90,
		justifyContent:'center',
		alignItems:'center',
	},
	userLetter:{
		fontSize:40,
		color:'white',
		textTransform:'uppercase'
	},
	username:{
		color:'white',
		fontSize:30,
	},
	email:{
		color:'white',
	},
	editButton:{
		backgroundColor:colors.main,
		alignSelf:'flex-end',
		width:width/7,
		height:width/7,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:90,
		top:- width/14,
		elevation:10,
		marginRight:20,
	},
	aboutLabel:{
		fontSize:12,
	},
	aboutContainer:{
		// backgroundColor:'red',
		paddingHorizontal:20,
		paddingBottom:20,
	},
	actionButtonSeparator:{
		padding:20,
	},
	actionsTitle:{
		fontSize:12,
		paddingVertical:20,
	},
	actionsContainer:{
		paddingHorizontal:20,
	}

})

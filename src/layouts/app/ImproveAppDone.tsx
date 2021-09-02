import React from 'react';
import { ScrollView, ActivityIndicator, Dimensions, TextInput, StatusBar, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import MainHeader from '../../components/MainHeader';
import toasts from '../../components/toasts'
import CTextInput from '../../components/CTextInput';
import CButton from '../../components/CButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets/colors/main'

type Props = {
	navigation:any,
	authUser: any,
	authUserToken:string,
	dispatch:any
	
}

type State = {
	requestIsLoading:boolean,
}

class ImproveAppDone extends React.Component<Props, State> {

	_isMounted:boolean;
	message?:string;
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
		this.props.navigation.navigate('Profile');
	}

	navigateTo = (screen:any) => {
		this.props.navigation.navigate(screen,{})
	}


	

   _customNav = () => {
        this.props.navigation.setOptions({
          header: () => (
            <MainHeader 
				firstAction={this.back}	
				firstActionIcon={'close'}	
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


	render() {
		let authUser = this.props.authUser
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor='black' />

				<View style={styles.row1}>
					<Ionicons 
						size={width/6}
						name='mail-unread-outline' 
						color={colors.main} />
					<Text style={styles.message}>
						<Text style={styles.username}>{(authUser)?authUser.username:''}</Text>	
						, Merci pour votre participation à m'amélioration de l'application</Text>
				</View>
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
export default connect(mapStateToProps, mapDispatchToProps)(ImproveAppDone);

const {width, height} = Dimensions.get('window');
// Set styles
const styles = StyleSheet.create({
	container: {
    	flex: 1,
		backgroundColor:'white',
  	},
  	row1:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		paddingHorizontal:10,
		marginVertical:20,
  	},
	row2:{
		paddingHorizontal:10,
	},
	row3:{
		paddingHorizontal:10,
		paddingVertical:20,
	},
	textInput:{
		flex:1,
		fontSize:30,
		fontWeight:'bold',
		alignSelf:'center',
		paddingVertical:20,
		
	},
	username:{
		fontWeight:'bold',
	},
	textInputContainer:{
		flexDirection:'row',
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
		paddingVertical:10,
		marginRight:width/4,
		
	},
	message:{
		fontSize:18,
		paddingHorizontal:20,
		color:'gray',
		textAlign:'center',
	}
});

import React from 'react'
import {StyleSheet, StatusBar, View} from 'react-native'
import {NavigationActions} from '@react-navigation/compat'
import { connect } from 'react-redux'


type Prop = {
	authUserToken:string,
	authUser:any,
	navigation:any,
	presentationRead:boolean,
}

type State = {

}

// Loading screen component
class Loader extends React.Component<Prop, State>{
    constructor(props:Prop){
        super(props);
    }
	// method to dynamic navigation to the authentification or the app home screen
	_actionManager = async () => {
		// method for navigation, depends on the user state(authentificated or not)
		if(this.props.authUserToken && this.props.authUser){
			// Navigation to the app home screen because the user exists
			this.props.navigation.navigate(
				'Main',
				{},
				NavigationActions.navigate({
					routeName:'Home'
				})
			);
		}
		else{
			// Navigation to the authentification sigin because the user not exists(not yet authentificated)
			this.props.navigation.navigate(
				'Auth', 
				{},
				NavigationActions.navigate({
					routeName:'SignIn'
				})
			);
		}
	}
	componentDidMount(){
		this.props.navigation.addListener('focus', (e:Event) => {
			//call the component navigation handler on every component focus state
			this._actionManager();
		});
	}
    render(){
        return (
            <View style={styles.container}>
				<StatusBar backgroundColor='white' />
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
        authUser:state.authUser,
		presentationRead:state.presentationRead
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
		backgroundColor:'white',

	},
})

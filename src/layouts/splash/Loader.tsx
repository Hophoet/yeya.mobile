import React from 'react'
import {Text, Image, Dimensions, StyleSheet, StatusBar, View} from 'react-native'
import {NavigationActions} from '@react-navigation/compat'
import { connect } from 'react-redux'
import { colors } from '../../assets/colors/main'


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
  	texts:any[string];
    constructor(props:Prop){
        super(props);
		this.texts = [
			'Trouver des taches à réaliser',
			'Votre nouvelle application Togolaise',
			"Yeya signifie c'est ca ",
			'Poster vos taches, pour trouver la personne idéale pour sa réalisation',
		]
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
		let randomText = this.texts[Math.floor(Math.random() * this.texts.length)];
        return (
            <View style={styles.container}>
                <StatusBar  barStyle='light-content' backgroundColor={colors.main}/>
				<Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
				<Text style={styles.title}>Yeya</Text>
				<Text style={styles.description}>{randomText}</Text>
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


const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
		backgroundColor:'white',

	},
	title:{
		textAlign:'center',
		fontSize:20,
		fontWeight:'bold',
		color:colors.main,
	},
	description:{
		textAlign:'center',
	},
	logo:{
		width:width/4,
		height:width/4,
	}
})

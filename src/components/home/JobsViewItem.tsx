
import React from 'react'
import {Image, StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import { toggleJobFavorite } from '../../backend/requests/job'
import { ToggleJobFavoriteRequestType } from '../../backend/requests/types'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	navigate:any,
	authUser: any,
	item: any,
	authUserToken:string,
	getUserFavoriteJobs?:Function,
	getJobs?:Function,
	dispatch:any
}

type State = {
	isFavorite:boolean,
}

class JobsViewItem  extends React.Component<Props, State>{
	constructor(props:Props){
		super(props)
		this.state = {
			isFavorite:this._isUserFavorite()
		}
	}



	_isUserFavorite = () => {
		let user_ids = this.props.item.favorite_users_ids
		let authUser = this.props.authUser
		if (user_ids && authUser){
			//console.log(user_ids, authUser)
			for(let user_id of user_ids){
				//console.log(user_id, authUser.id)
				if(user_id == authUser.id){
					return true
				}
			}
		}
		return false
	}

	getDate = () => {
		const created_at_timestamp = Math.floor(new Date(this.props.item.created_at).valueOf()/1000);
		const date:string = moment.unix(created_at_timestamp).fromNow() //.format('ll')
		return date;
	}

	// Method to get the products categories
	_toggleJobFavorite = () => {
		let data:ToggleJobFavoriteRequestType = {
			authToken:this.props.authUserToken,
			jobId:this.props.item.id
		}
		toggleJobFavorite(data)
		.then((response:any) => {
			//console.log(response.data)
			//this.setState({isFavorite:!this.state.isFavorite})
			if(this.props.getUserFavoriteJobs){
				this.props.getUserFavoriteJobs()
			}
			else if(this.props.getJobs){
				this.props.getJobs()
			}
		})
		.catch( (error:any)=>  {
			if(error.response) {
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




	render() {

		let item = this.props.item
		//console.log(authUser, authUserToken)
		// console.log(item.favorite_users_ids)
		return(
			<View style={[styles.container]}>
				<View style={styles.row1}>
					<View style={styles.row1Row1}>
						<Image resizeMode='center' style={styles.image} source={require('../../assets/images/job4.png')} />
					</View>
				</View>
				<TouchableOpacity 
				
					onPress={()=>{
						if(this.props.navigate){
							this.props.navigate('JobDetail', {'job':item})
						}
					}}	
				style={styles.row2}>
						<Text numberOfLines={2} style={styles.title}>{item.title}</Text>
						<Text>
							{ item.price &&
							<Text style={styles.price}>XOF {item.price} </Text>
							}
							{ (item.city )&&`- ${item.city.name}, ${item.city.country}`}</Text>
				</TouchableOpacity>
				<View style={styles.row3}>
					<View style={styles.row3Column1}>
						<TouchableOpacity 
							onPress={this._toggleJobFavorite}
							style={styles.favoriteButton}>
							<Icon size={30} name={this._isUserFavorite()?'heart':'heart-outline'} color='red'/>
						</TouchableOpacity>
					</View>
					<View style={styles.row3Column2}>
						<Text style={styles.date}>{this.getDate()}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(JobsViewItem)

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		backgroundColor:'white',
		elevation:3,
		flexDirection:'row',
		marginHorizontal:20,
		marginVertical:10,
		borderRadius: 5,
		padding:10,
		minHeight:width/4,
	},
	row1:{
		flex:1,
		// backgroundColor:'aqua',
		justifyContent:'center',
		alignItems:'center',
	},
	row1Row1:{
		flex:1,
	},
	row2:{
		flex:1,
		justifyContent:'center'

	},
	row3:{
		paddingBottom:10,
		justifyContent:'space-between'
	},
	row4:{
		flexDirection:'row',
		justifyContent:'space-between',
	},
	row3Column1:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
	},
	title:{
		fontWeight:'bold',
		fontSize:20,
	},
	price:{
		fontWeight:'bold',
	},
	emoji:{
		fontSize:30,
	},
	favoriteButton:{
		//backgroundColor:'red',
	},
	image:{
		flex:1,
		width: 160,
		height: 120,
		// backgroundColor:'red',

	}
	})

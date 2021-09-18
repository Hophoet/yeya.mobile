
import React from 'react'
import {StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import { connect } from 'react-redux'
import { toggleJobFavorite } from '../../backend/requests/job'
import { ToggleJobFavoriteRequestType } from '../../backend/requests/types'

type Props = {
	navigation?:any,
	navigate?:any,
	authUser: any,
	item: any,
	index: any,
	authUserToken:string,
	toggleJobFavorite:boolean,
	getJobs?:Function,
	dispatch:any
}

type State = {
}

class JobsMapItem  extends React.Component<Props, State>{
	constructor(props:Props){
		super(props)
		this.state = {
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
			if(this.props.getJobs){
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


 
	getDate = () => {
		const created_at_timestamp = Math.floor(new Date(this.props.item.created_at).valueOf()/1000);
		const date:string = moment.unix(created_at_timestamp).fromNow() //.format('ll')
		return date;
	}


	render() {

		let item = this.props.item
		let index = this.props.index
		return(
			<View key={index.toString()} style={styles.card} >
				<View style={styles.cardRow1}>
				<View style={styles.cardRow1Row1}>
					<TouchableOpacity
						style={styles.cardTitleContainer}
						onPress={()=>{
							this.props.navigate('JobDetail', {'job':item})
						}}	
					>
						<Text numberOfLines={2} style={styles.cardTitle}>{item.title}</Text>
					</TouchableOpacity>
					{ item.price &&
					<Text numberOfLines={1} style={styles.cardPrice}>XOF{item.price}</Text>
					}
				</View>
				{ item.city &&
					<View style={styles.cardRow1Row2}>
						<Icon size={15} name='location' color='gray' />
						<Text>{ (item.city )&&`- ${item.city.name}, ${item.city.country}`}</Text>
					</View>
				}
				</View>
				<View style={styles.cardRow2}>
					<View style={styles.cardRow2Row1}>
						<Icon size={15} name='calendar' color='gray' />
						<Text numberOfLines={1} style={styles.cardDate}>{this.getDate()}</Text>
					</View>
					<View style={styles.cardRow2Row2}>
						<TouchableOpacity
							onPress={this._toggleJobFavorite}	
						>
							<Icon size={20} name={this._isUserFavorite()?'heart':'heart-outline'} color='red'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(JobsMapItem)

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = width / 3.3;
const CARD_WIDTH = width/2;
const styles = StyleSheet.create({
  card: {
    padding: 10,
	borderRadius: 5,
    elevation: 2,
    backgroundColor: "#FFF",
    margin: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",

	},
	cardTitleContainer: {
		flex:1,
		marginRight:10,
	},
	cardTitle: {
		//fontSize: ,
		fontSize:20,
		fontWeight: "bold",
	},
	cardPrice: {
		fontSize: 17,
		fontWeight:'bold',
		color: "#444",
	},
	cardRow1:{
		flex:1,
		//backgroundColor:'red',
	},
	cardRow1Row1:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
	},
	cardRow1Row2:{
		flexDirection:'row',
	},
	cardRow2:{
		flex:1,
		flexDirection:'row',
		//backgroundColor:'blue',
		//justifyContent:'center',
	},
	cardDate:{
		fontSize:10,
		marginLeft:5,
	},
	cardRow2Row1:{
		flex:1,
		alignItems:'center',
		flexDirection:'row'
	},
	cardRow2Row2:{
		justifyContent:'center',
		alignItems:'center',
	}
	})

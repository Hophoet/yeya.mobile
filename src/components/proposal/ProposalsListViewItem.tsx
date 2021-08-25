
import React, {useState} from 'react'
import {Image, FlatList, StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../assets/colors/main'
import moment from 'moment';
import { toggleJobFavorite } from '../../backend/requests/job'
import { ToggleJobFavoriteRequestType } from '../../backend/requests/types'
import ProposalItem from '../../components/proposal/ProposalsItem'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	navigateTo:Function,
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

class ProposalsListViewItem  extends React.Component<Props, State>{
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
		let created_at = this.props.item && this.props.item.job && this.props.item.job.created_at
		const created_at_timestamp = Math.floor(new Date(created_at).valueOf()/1000);
		const date:string = moment.unix(created_at_timestamp).fromNow()//.format('ll')
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
		let job = item && item.job
		let proposals_conversations:any[] = item.proposals_conversations
		// console.log(proposals_conversations)
		// console.log(item.job)
		//console.log(authUser, authUserToken)
		return(
			<View style={[styles.container]}>
				<View style={styles.jobContainer}>

					<View style={styles.row1}>
						<View style={styles.row1Row1}>
							<Text style={styles.emoji}>📅</Text>
						</View>
					</View>
					<TouchableOpacity 
					
						onPress={()=>{
							if(this.props.navigateTo){
								this.props.navigateTo('JobDetail', {'job':job})
							}
						}}	
							style={styles.row2}>
							<Text numberOfLines={2} style={styles.title}>{job.title}</Text>
							<Text>
								{ job.price &&
								<Text style={styles.price}>XOF {job.price} </Text>
								}
								{ (job.city )&&`- ${job.city.name}, ${job.city.country}`}</Text>
					</TouchableOpacity>
					<View style={styles.row3}>
						<View style={styles.row3Column1}>
						</View>
						<View style={styles.row3Column2}>
							<Text style={styles.date}>{this.getDate()}</Text>
						</View>
					</View>
				</View>
				<View style={styles.row3}>
					<FlatList
						data={proposals_conversations}
						// onRefresh={this._getJobsProposals}
						// refreshing={this.state.requestIsLoading}
						showsVerticalScrollIndicator={false}
						renderItem={({item, index}:any) => <ProposalItem
							navigateTo={this.props.navigateTo}
							item={item}	
						/>}
						ItemSeparatorComponent={()=><View style={styles.itemsSeparator}/>}
						keyExtractor={(item)=>{
							return (item  && item.conversation && item.conversation.id) }}
					/>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProposalsListViewItem)

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
		marginHorizontal:20,
	},
	jobContainer:{
		backgroundColor:'white',
		// elevation:3,
		flexDirection:'row',
		marginVertical:10,
		borderRadius:10,
		padding:10,
		borderBottomWidth:StyleSheet.hairlineWidth,
		borderBottomColor:'gray'
		// minHeight:width/4,

	},
	row1:{
		flex:1,
		flexDirection:'row',
		//backgroundColor:'aqua',
		justifyContent:'center',
		alignItems:'center',
	},
	row1Row1:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
	},
	row2:{
		flex:2,
		justifyContent:'center'

	},
	row3:{
		paddingLeft:20,
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
	itemsSeparator:{
		paddingVertical:10,
	},
	})

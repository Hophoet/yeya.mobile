
import React, {useState} from 'react'
import {Image, StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../assets/colors/main'
import moment from 'moment';
import { toggleJobFavorite } from '../../backend/requests/job'
import { ToggleJobFavoriteRequestType } from '../../backend/requests/types'
import { connect } from 'react-redux'

type Props = {
	navigation:any,
	authUser: any,
	navigateTo:any,
	item: any,
	authUserToken:string,
	dispatch:any
}

type State = {
}

class ProposalsItem  extends React.Component<Props, State>{
	constructor(props:Props){
		super(props)
		this.state = {
		}
	}


	getDate = () => {
		const created_at_timestamp = Math.floor(new Date(this.props.item.created_at).valueOf()/1000);
		const date:string = moment.unix(created_at_timestamp).fromNow() //.format('ll')
		return date;
	}


	getConversationUser = () => {
		let item = this.props.item
		let conversation = item && item.conversation
		let authUser = this.props.authUser
		if( conversation && authUser){
			let user1 = conversation.user1
			let user2 = conversation.user2
			if(authUser.id == (user1 && user1.id)){
				return user2 
			}
			else if(authUser.id == (user2 && user2.id)){
				return user1
			} 
		}
	}


	render() {

		let item = this.props.item
		let proposal = item && item.proposal
		let conversation = item && item.conversation
		let conversationUser = this.getConversationUser()
		return(
			<View style={[styles.container]}>
				<TouchableOpacity 
					onPress={()=> {
						if(this.props.navigateTo){
							this.props.navigateTo('ChatDetail', {'chat':conversation});
						}
					}}	
					style={styles.row1}>
					<View>
						{ (conversationUser &&  conversationUser.image)
						?<Image 
							style={styles.image}
							source={conversationUser.image.url}/>
						:<View style={styles.userIcon}>
							<Icon color='white' name='person' size={13} />
						</View>
						}	
					</View>
					<Text style={styles.username}>{conversationUser && conversationUser.email}</Text>
				</TouchableOpacity>
				<View style={styles.row2}>
					<Text style={styles.proposalText}>{proposal && proposal.text}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProposalsItem)

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
	container:{
	},
	row1:{
		flexDirection:'row',
		alignItems:'center',
	},
	image:{
		width:width/15,
		height:width/15,
		borderRadius:100,
	},
	userIcon:{
		width:width/15,
		height:width/15,
		justifyContent:'center',
		alignItems:'center',
		// padding:10,
		borderRadius:100,
		backgroundColor:colors.main,
	},
	username:{
		fontWeight:'bold',
		paddingHorizontal:10,
	}
	})

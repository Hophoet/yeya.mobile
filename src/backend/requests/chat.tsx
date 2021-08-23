import {
	axios,
	GET_USER_CHAT_CONVERSATIONS_URL,
	HOST,
	SEND_CHAT_MESSAGE_URL,
	GET_CHAT_CONVERSATION_URL,
} from './setup';
import {
	SendChatMessageType,
	GetUserChatConversationType,
	GetChatConversationType,
	ReadChatConversationMessagesType,
} from './types';


function senderChatMessage(data:SendChatMessageType){
	return new Promise( (resolve, reject) => {
		axios({
			url: SEND_CHAT_MESSAGE_URL,
			method: 'POST',
			data:{
				receiver_id:data.receiverId,
				text:data.text
			},
			headers:{
				Authorization:`Bearer ${data.authToken}`
			}
		})
		.then((response:any) => {
			resolve(response);
		})
		.catch((error:any) => {
			reject(error);
		})

	})
}

function readChatConversationMessages(data:ReadChatConversationMessagesType){
	const READ_CHAT_CONVERSATION_MESSAGES_URL = `${HOST}/api/v1/chat/conversation/${data.conversationId}/read-messages`;
	return new Promise( (resolve, reject) => {
		axios({
			url: READ_CHAT_CONVERSATION_MESSAGES_URL,
			method: 'POST',
			data:{
			},
			headers:{
				Authorization:`Bearer ${data.authToken}`
			}
		})
		.then((response:any) => {
			resolve(response);
		})
		.catch((error:any) => {
			reject(error);
		})
	})
}

function getUserChatConversations(data:GetUserChatConversationType){
	return new Promise( (resolve, reject) => {
		axios.get(
			GET_USER_CHAT_CONVERSATIONS_URL,
			{
				headers:{
					Authorization:`Bearer ${data.authToken}`
				}
			}
		)
		.then((response:any) => {
			resolve(response);
		})
		.catch((error:any) => {
			reject(error);
		})

	})
}

function getChatConversation(data:GetChatConversationType){
	return new Promise( (resolve, reject) => {
		let formData = new FormData();
		formData.append('conversation_id', data.conversationId.toString());
		axios({
			url: `${GET_CHAT_CONVERSATION_URL}/${data.conversationId}`,
			method: 'GET',
			headers:{
				Authorization:`Bearer ${data.authToken}`
			}
		})
		.then((response:any) => {
			resolve(response);
		})
		.catch((error:any) => {
			reject(error);
		})

	})
}


export {
	senderChatMessage,
	getUserChatConversations,
	getChatConversation,
	readChatConversationMessages,
}

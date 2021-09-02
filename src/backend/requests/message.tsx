import {
    axios,
    SEND_USER_MESSAGE_URL
}

from './setup';

import { SendUserMessageType} from './types'

function sendUserMessage(data:SendUserMessageType){
	return new Promise( (resolve, reject) => {
		axios({
			url: SEND_USER_MESSAGE_URL,
			method: 'POST',
			data:{
				text:data.text,
			},
				headers:{
					'Authorization':`Token ${data.authToken}`	
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
    sendUserMessage
}
import {
	axios,
	SIGN_IN_URL,
	SIGN_UP_URL,
	SEND_PASSWORD_RESET_CODE_URL,
	VERIFIY_PASSWORD_RESET_CODE_URL
} from './setup';

import { 
	SendPasswordResetCodeRequestType,
	SignInRequestType,
	SignUpRequestType,
	VerifyPasswordResetCodeRequestType

} from './types';

function signUp(data:SignUpRequestType){
	let _data = JSON.stringify({
		email:data.email,
		password:data.password
	})

	return new Promise( (resolve, reject) => {
		axios.post(
			SIGN_UP_URL,
			_data,
			{
				headers:{
					'Content-Type': 'application/json', 
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

function signIn(data:SignInRequestType){
	let formData = new FormData();
	formData.append('username', data.email);
	formData.append('password', data.password);

	return new Promise( (resolve, reject) => {
		axios({
			url: SIGN_IN_URL,
			method: 'POST',
			data: formData,
			headers:{
				Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
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

function sendPasswordResetCode(data:SendPasswordResetCodeRequestType){
	return new Promise( (resolve, reject) => {
		axios.post(
			SEND_PASSWORD_RESET_CODE_URL,
			{
					email:data.email
			},
			{
				headers:{
					'Content-Type': 'application/json', 
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

function verifyPasswordResetCode(data:VerifyPasswordResetCodeRequestType){
	return new Promise( (resolve, reject) => {
		axios.post(
			VERIFIY_PASSWORD_RESET_CODE_URL,
			{
					email:data.email,
					password:data.password,
					code:data.code,
			},
			{
				headers:{
					'Content-Type': 'application/json', 
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

export {
	signIn,
	signUp,
	sendPasswordResetCode,
	verifyPasswordResetCode,
}

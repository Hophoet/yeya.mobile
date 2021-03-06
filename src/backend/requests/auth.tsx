import {
	axios,
	SIGN_IN_URL,
	SET_USER_PROFILE_URL,
	UPDATE_USER_PERSONAL_INFOS_URL,
	SIGN_UP_URL,
	SEND_PASSWORD_RESET_CODE_URL,
	VERIFIY_PASSWORD_RESET_CODE_URL
} from './setup';

import { 
	SendPasswordResetCodeRequestType,
	SetUserProfileImageType,
	SignInRequestType,
	SignUpRequestType,
	UpdateUserInfos,
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

function updateUserPersonalInfos(authToken:string, infos:UpdateUserInfos){
	let formData = new FormData();
	formData.append('first_name', infos.firstName);
	formData.append('last_name', infos.lastName);
	formData.append('phone_number', infos.phoneNumber);
	formData.append('about', infos.about);
	return new Promise( (resolve, reject) => {
		axios({
			url: UPDATE_USER_PERSONAL_INFOS_URL,
			method: 'PUT',
			data: {
				first_name: infos.firstName,
				last_name: infos.lastName,
				phone_number: infos.phoneNumber,
				about: infos.about,
			},
			headers:{
				'Authorization':`Bearer ${authToken}`
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

function setUserProfile(data:SetUserProfileImageType){
	let formData = new FormData();
	formData.append(
		'image',
		{
			uri:data.image,
			type:'image/jpeg',
			name:'defaultname.jpg'
		}
	)
	return new Promise( (resolve, reject) => {
		axios({
			url: SET_USER_PROFILE_URL,
			method: 'POST',
			data: formData,
			headers:{
				Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
				'Authorization':`Bearer ${data.authToken}`
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
	signIn,
	signUp,
	sendPasswordResetCode,
	setUserProfile,
	verifyPasswordResetCode,
	updateUserPersonalInfos,
}

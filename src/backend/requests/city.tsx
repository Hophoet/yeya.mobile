import {
	axios,
	GET_CITIES_URL,
} from './setup';

import { 
	GetCitiesType,
} from './types';


function getCities(data:GetCitiesType){
	return new Promise( (resolve, reject) => {
		axios({
			url: GET_CITIES_URL,
			method: 'GET',
			data:{},
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
	getCities
}

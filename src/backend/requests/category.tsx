import {
	axios,
	GET_CATEGORIES_URL,

} from './setup';

import { 
	GetCategoriesType,

} from './types';


function getCategories(data:GetCategoriesType){
	return new Promise( (resolve, reject) => {
		axios({
			url: GET_CATEGORIES_URL,
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
	getCategories
}

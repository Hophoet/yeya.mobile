import {
	axios,
	GET_JOBS_URL,
	TOGGLE_JOB_FAVORITE_URL,
	GET_FAVORITE_JOBS_URL,
} from './setup';

import { 
	GetJobsRequestType,
	GetUserFavoriteJobsRequestType,
	ToggleJobFavoriteRequestType,

} from './types';


function getJobs(data:GetJobsRequestType){
	let authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOWI5NWQyM2UtYjQ5ZS00ZjZiLWIxODYtMGRlZTRkYzY5YThiIiwiYXVkIjoiZmFzdGFwaS11c2VyczphdXRoIiwiZXhwIjoxNjMyNTc2NjI4fQ.0WIoEf9dkGcL8QpILKIU9NJVCwk28gR4tbn7rOElfdM'
	return new Promise( (resolve, reject) => {
		axios({
			url: GET_JOBS_URL,
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

function getUserFavorite(data:GetUserFavoriteJobsRequestType){
	let authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTNlZDgyY2MtZmE4Ny00ZWQwLWIwNDktMDczOTU0Yzg3NjIxIiwiYXVkIjoiZmFzdGFwaS11c2VyczphdXRoIiwiZXhwIjoxNjMyNTgxNjMzfQ.Bj-jOMHM3ajKwN2HucwphS8v8m0tfBq2svWDbS9IiUk'
	return new Promise( (resolve, reject) => {
		axios({
			url: GET_FAVORITE_JOBS_URL,
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

function toggleJobFavorite(data:ToggleJobFavoriteRequestType){
	let authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTNlZDgyY2MtZmE4Ny00ZWQwLWIwNDktMDczOTU0Yzg3NjIxIiwiYXVkIjoiZmFzdGFwaS11c2VyczphdXRoIiwiZXhwIjoxNjMyNTgxNjMzfQ.Bj-jOMHM3ajKwN2HucwphS8v8m0tfBq2svWDbS9IiUk'
	return new Promise( (resolve, reject) => {
		axios({
			url: TOGGLE_JOB_FAVORITE_URL,
			method: 'POST',
			data:{
				'job_id':data.jobId	
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

export {
	getJobs,
	getUserFavorite,
	toggleJobFavorite
}

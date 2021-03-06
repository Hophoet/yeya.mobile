import {
	axios,
	GET_JOBS_URL,
	TOGGLE_JOB_FAVORITE_URL,
	GET_FAVORITE_JOBS_URL,
	GET_JOBS_PROPOSALS_AND_CONVERSATIONS_URL,
	CREATE_JOB_URL,
	UPDATE_JOB_URL,
	CREATE_PROPOSAL_URL,
	HOST,

} from './setup';

import { 
	GetJobsRequestType,
	GetUserFavoriteJobsRequestType,
	ToggleJobFavoriteRequestType,
	GetUserJobsProposalsAndConversationsType,
	CreateJobType,
	UpdateJobType,
	DeleteJobType,
	CreateProposalType,

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

function getUserJobsProposalsAndConversations(data:GetUserJobsProposalsAndConversations){
	return new Promise( (resolve, reject) => {
		axios({
			url: GET_JOBS_PROPOSALS_AND_CONVERSATIONS_URL,
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

function createJob(data:CreateJobType){
	return new Promise( (resolve, reject) => {
		axios({
			url: CREATE_JOB_URL,
			method: 'POST',
			data:{
				'title':data.title,
				'description':data.description,
				'price':data.price,
				'city_id':data.cityId,
				'category_id':data.categoryId,
				'geolocation':data.geolocation,
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
function updateJob(data:UpdateJobType){
	return new Promise( (resolve, reject) => {
		console.log(data)
		axios({
			url: UPDATE_JOB_URL,
			method: 'PUT',
			data:{
				'id':data.id,
				'title':data.title,
				'description':data.description,
				'price':data.price,
				'city_id': data.cityId,
				'category_id': data.categoryId,
				'geolocation':data.geolocation,
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

function deleteJob(data:DeleteJobType){
	return new Promise( (resolve, reject) => {
		axios({
			url: `${HOST}/api/v1/job/${data.id}/delete`,
			method: 'DELETE',
			data:{
				'id':data.id,
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

function createProposal(data:CreateProposalType){
	return new Promise( (resolve, reject) => {
		console.log(data)
		axios({
			url: CREATE_PROPOSAL_URL,
			method: 'POST',
			data:{
				'job_id':data.jobId,
				'text':data.text,
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
	toggleJobFavorite,
	createJob,
	updateJob,
	deleteJob,
	getUserJobsProposalsAndConversations,
	createProposal
}

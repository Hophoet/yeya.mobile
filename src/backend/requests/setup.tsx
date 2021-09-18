import axios from 'axios';

// const HOST ='http://127.0.0.1:8000';
const HOST ='https://yeyaapi.herokuapp.com';

// Authentication urls 
const SIGN_UP_URL = `${HOST}/auth/register`;
const SIGN_IN_URL = `${HOST}/auth/jwt/login`;
const SEND_PASSWORD_RESET_CODE_URL = `${HOST}/user/reset-password`;
const VERIFIY_PASSWORD_RESET_CODE_URL = `${HOST}/user/verify-password-reset`;
const UPDATE_USER_PERSONAL_INFOS_URL = `${HOST}/api/v1/user/update`;
const SET_USER_PROFILE_URL = `${HOST}/api/v1/user/set-image`;

// job
const GET_JOBS_URL = `${HOST}/api/v1/jobs`;
const GET_FAVORITE_JOBS_URL = `${HOST}/api/v1/user/favorite-jobs`;
const TOGGLE_JOB_FAVORITE_URL = `${HOST}/api/v1/job/toggle-favorite`;
const CREATE_JOB_URL = `${HOST}/api/v1/job/create`;
const UPDATE_JOB_URL = `${HOST}/api/v1/job/update`;
const CREATE_PROPOSAL_URL = `${HOST}/api/v1/proposal/create`;

// Chat
const SEND_CHAT_MESSAGE_URL = `${HOST}/api/v1/chat/send-message`;
const GET_USER_CHAT_CONVERSATIONS_URL = `${HOST}/api/v1/chat/user/conversations`;
const GET_CHAT_CONVERSATION_URL = `${HOST}/api/v1/chat/conversation`;

// categories
const GET_CATEGORIES_URL = `${HOST}/api/v1/categories`;

// cities
const GET_CITIES_URL = `${HOST}/api/v1/cities`;

//
const GET_JOBS_PROPOSALS_AND_CONVERSATIONS_URL = `${HOST}/api/v1/jobs-with-proposals-conversation`;
const SEND_USER_MESSAGE_URL = `${HOST}/api/v1/improvement/send-message`;
const GET_USER_INFOS_URL = `${HOST}/api/v1/user/infos`;

export {
	HOST,
	axios,
	SIGN_IN_URL,
	SIGN_UP_URL,
	GET_JOBS_URL,
	GET_FAVORITE_JOBS_URL,
	SEND_PASSWORD_RESET_CODE_URL,
	VERIFIY_PASSWORD_RESET_CODE_URL,
	TOGGLE_JOB_FAVORITE_URL,
	SEND_CHAT_MESSAGE_URL,
	GET_USER_CHAT_CONVERSATIONS_URL,
	GET_CHAT_CONVERSATION_URL,
	GET_JOBS_PROPOSALS_AND_CONVERSATIONS_URL,
	CREATE_JOB_URL,
	UPDATE_JOB_URL,
	CREATE_PROPOSAL_URL,
	GET_CITIES_URL,
	GET_CATEGORIES_URL,
	SEND_USER_MESSAGE_URL,
	GET_USER_INFOS_URL,
	SET_USER_PROFILE_URL,
	UPDATE_USER_PERSONAL_INFOS_URL,
};

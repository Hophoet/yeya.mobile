import axios from 'axios';

const HOST ='http://127.0.0.1:8000';//'https://byiapi.herokuapp.com';

// Authentication urls 
const SIGN_UP_URL = `${HOST}/auth/register`;
const SIGN_IN_URL = `${HOST}/auth/jwt/login`;
const SEND_PASSWORD_RESET_CODE_URL = `${HOST}/user/reset-password`;
const VERIFIY_PASSWORD_RESET_CODE_URL = `${HOST}/user/verify-password-reset`;

// job
const GET_JOBS_URL = `${HOST}/api/v1/jobs`;
const GET_FAVORITE_JOBS_URL = `${HOST}/api/v1/user/favorite-jobs`;
const TOGGLE_JOB_FAVORITE_URL = `${HOST}/api/v1/job/toggle-favorite`;

// Chat
const SEND_CHAT_MESSAGE_URL = `${HOST}/api/v1/chat/send-message`;
const GET_USER_CHAT_CONVERSATIONS_URL = `${HOST}/api/v1/chat/user/conversations`;
const GET_CHAT_CONVERSATION_URL = `${HOST}/api/v1/chat/conversation`;

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
};

import axios from 'axios';

const HOST ='http://127.0.0.1:8000';//'https://byiapi.herokuapp.com';

// Authentication urls 
const SIGN_UP_URL = `${HOST}/auth/register`;
const SIGN_IN_URL = `${HOST}/auth/jwt/login`;
const SEND_PASSWORD_RESET_CODE_URL = `${HOST}/user/reset-password`;
const VERIFIY_PASSWORD_RESET_CODE_URL = `${HOST}/user/verify-password-reset`;


export {
	axios,
	SIGN_IN_URL,
	SIGN_UP_URL,
	SEND_PASSWORD_RESET_CODE_URL,
	VERIFIY_PASSWORD_RESET_CODE_URL
};

import {
		CLEAN, 
		SET_AUTH_USER_TOKEN,
		SET_AUTH_USER,
		SET_CATEGORIES,
		SET_CHATS,
		SET_CITIES,
		SET_JOBS,
		SET_PROPOSALS,
		SET_FAVORITES,
		
} from '../actions';

const intialState:any = {
	jobs:[],
	categories:[],
	cities:[],
	proposals:[],
	favorites:[],
	chats:[],
	presentationRead:false,

};


const reducer = (state = intialState, action:any) => {
  let newState:any;
  switch (action.type) {

    case SET_AUTH_USER_TOKEN:
		const authUserToken:any = action.value;
		newState = {
			...state,
			authUserToken:authUserToken,
		};
		return newState;

    case SET_AUTH_USER:
		const authUser:any = action.value;
		newState = {
			...state,
			authUser: authUser,
		};
		return newState;

    case SET_JOBS:
		const jobs:any[] = action.value;
		// console.log(state)
		newState = {
			...state,
			jobs: jobs,
		};
		return newState;

    case SET_CHATS:
		const chats:any[] = action.value;
		newState = {
			...state,
			chats: chats,
		};
		return newState;

    case SET_CATEGORIES:
		const categories:any[] = action.value;
		newState = {
			...state,
			categories: categories,
		};
		return newState;

    case SET_CITIES:
		const cities:any[] = action.value;
		newState = {
			...state,
			cities: cities,
		};
		return newState;

    case SET_PROPOSALS:
		const proposals:any[] = action.value;
		newState = {
			...state,
			proposals: proposals,
		};
		return newState;

    case SET_FAVORITES:
		const favorites:any[] = action.value;
		newState = {
			...state,
			favorites: favorites,
		};
		return newState;

	case CLEAN:
		newState = {}
		return newState
		
    default:
		return state;
  }
};
export default reducer;

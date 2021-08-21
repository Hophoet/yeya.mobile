// sign in
type SignInRequestType = {
	email:string
	password:string
}

// sign up
type SignUpRequestType = {
	email:string
	password:string
}

// password reset
type SendPasswordResetCodeRequestType = {
	email:string
}

// password reset
type VerifyPasswordResetCodeRequestType = {
	email:string
	code:string
	password:string
}

// get jobs
type GetJobsRequestType = {
	authToken?:string
}

// get jobs
type GetUserFavoriteJobsRequestType = {
	authToken?:string
}

export type {
	SignInRequestType,
	SignUpRequestType,
	SendPasswordResetCodeRequestType,
	VerifyPasswordResetCodeRequestType,
	GetJobsRequestType,
	GetUserFavoriteJobsRequestType,
}

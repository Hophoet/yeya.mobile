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

// get jobs
type ToggleJobFavoriteRequestType = {
	authToken:string,
	jobId:string,
}

// chat
type SendChatMessageType =  {
	receiverId:number,
	text:string,
	authToken:string,
}
type GetUserChatConversationType =  {
	authToken:string,
}


type GetChatConversationType =  {
	authToken:string,
	conversationId:number
}

type ReadChatConversationMessagesType =  {
	authToken:string,
	conversationId:number
}

type SendUserMessageType =  {
	authToken:string,
	text:string
}


export type {
	SignInRequestType,
	SignUpRequestType,
	SendPasswordResetCodeRequestType,
	VerifyPasswordResetCodeRequestType,
	GetJobsRequestType,
	GetUserFavoriteJobsRequestType,
	ToggleJobFavoriteRequestType,
	SendChatMessageType,
	ReadChatConversationMessagesType,
	GetChatConversationType,
	SendUserMessageType,
	GetUserChatConversationType
}

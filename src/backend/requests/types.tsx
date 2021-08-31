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

type GetUserJobsProposalsAndConversationsType =  {
	authToken:string
}

type Geolocation =  {
	latitude:number,
	longitude:number
}

type CreateJobType =  {
	authToken:string,
	title:string,
	description:string,
	price:number,
	cityId:string,
	categoryId:string,
	geolocation?:Geolocation
}

type UpdateJobType =  {
	authToken:string,
	id:string,
	title:string,
	description:string,
	price:number,
	cityId:string,
	categoryId:string,
	geolocation?:Geolocation
}

type DeleteJobType =  {
	authToken:string,
	id:string
}

type CreateProposalType =  {
	authToken:string,
	jobId:string,
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
	GetUserChatConversationType,
	GetUserJobsProposalsAndConversationsType,
	CreateJobType,
	UpdateJobType,
	Geolocation,
	DeleteJobType,
	CreateProposalType,
}

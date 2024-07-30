import { ActionTypes } from "../constants/ActionTypes"

export const setUserAuthenticate = (status: any) => {
    return {
        type: ActionTypes.IS_USER_AUTHENTICATE,
        payload: status
    }
}

export const setAuthToken = (token: string | null) => {
    return {
        type: ActionTypes.AUTH_TOKEN,
        payload: token
    }
}

export const setUserId = (userId: any) => {
    return {
        type: ActionTypes.USER_ID,
        payload: userId
    }
}
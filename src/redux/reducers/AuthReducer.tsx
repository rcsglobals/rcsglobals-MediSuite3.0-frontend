import { ActionTypes } from "../constants/ActionTypes";

const initialState: any = {
    isUserAuthenticate: false,
    authToken: '',
    userId: ''
}

export const AuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.IS_USER_AUTHENTICATE:
            return {
                ...state,
                isUserAuthenticate: action.payload
            }

        case ActionTypes.AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload
            }

        case ActionTypes.USER_ID:
            return {
                ...state,
                userId: action.payload
            }

        default:
            return state;
    }
}

export default AuthReducer;
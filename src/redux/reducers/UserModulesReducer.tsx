import { ActionTypes } from "../constants/ActionTypes";

const initialState: any = {
    userModules: [],
    userMenu: []
}

export const UserModuleReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.AUTHENTICATED_USER_MODULES:
            return {
                ...state,
                userModules: action.payload
            }
        case ActionTypes.USER_MENU:
            return {
                ...state,
                userMenu: action.payload
            }

        default:
            return state;
    }
}

export default UserModuleReducer;
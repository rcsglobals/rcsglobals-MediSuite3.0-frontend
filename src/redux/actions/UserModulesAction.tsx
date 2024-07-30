import { ActionTypes } from "../constants/ActionTypes"

export const setUserModules = (modules: number[]) => {
    return {
        type: ActionTypes.AUTHENTICATED_USER_MODULES,
        payload: modules
    }
}

export const setUserMenu = (menu: any) => {
    return {
        type: ActionTypes.USER_MENU,
        payload: menu
    }
}
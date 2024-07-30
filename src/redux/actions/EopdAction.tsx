import { ActionTypes } from "../constants/ActionTypes";

export const setDignosisDetail = (opdNo: any, updates: any) => {
    return {
        type: ActionTypes.SET_DIAGNOSIS_INFO,
        payload: { opdNo, updates }
    }
}
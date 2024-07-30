import { ActionTypes } from "../constants/ActionTypes";

export const clearSelectedDoctorsData = () => {
    return {
        type: ActionTypes.CLEAR_SELECTED_DOCTOR_DATA,
    }
}

export const clearBillingData = () => {
    return {
        type: ActionTypes.CLEAR_BILLING_DATA,
    }
}

export const setSelectedDoctor = (doctorData: any) => {
    return {
        type: ActionTypes.SELECTED_DOCTOR,
        payload: doctorData
    }
}

export const removeSelectedDoctor = (doctorId: any) => {
    return {
        type: ActionTypes.REMOVE_SELECTED_DOCTOR,
        payload: doctorId
    }
}

export const setPatientDetail = (patientDetail: any) => {
    return {
        type: ActionTypes.SET_PATIENT_DETAIL,
        payload: patientDetail
    }
}

export const setOpdDiscountData = (discountData: any) => {
    return {
        type: ActionTypes.SET_OPD_DISCOUNT_DATA,
        payload: discountData
    }
}

export const setBillingData = (billingData: any) => {
    return {
        type: ActionTypes.SET_BILLING_DATA,
        payload: billingData
    }
}
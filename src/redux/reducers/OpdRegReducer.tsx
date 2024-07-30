import { ActionTypes } from "../constants/ActionTypes";

const initialState: any = {
    selectedDoctor: [],
    patientDetails: {},
    opdDiscountData: {
        patientType: 'General',
        serviceDiscount: 0,
        totalBill: 0,
        billAfterDiscount: 0
    },
    // billingData: {
    //     patient_id: "",
    //     unit_id: 0,
    //     doctor_id: 0,
    //     JR_Id: 0,
    //     JR_deptId: 0,
    //     bill_type: "CA",
    //     //bill_discount: 0,
    //     remarks: "",
    //     //discount_remark: "",
    //     //discount_reason_id: 0,
    //     //OPDDiscountID: 0,
    //     service_unit_price: 0,
    //     service_discount: 0,
    //     specialization_id: 0,
    //     //hod_doc_id: null,
    //     pay_mode: "",
    //     payment_type: "BP",
    //     paid_amount: 0,
    //     patient_category_id: 0,
    //     partner_id: null,
    //     camp_id: null
    billingData: {
        patient_id: "",
        unit_id: 0, // set in OPDReg.tsx
        doctor_id: 0,
        JR_Id: 0,
        JR_deptId: 0,
        bill_type: "CA",
        //bill_discount: 0,
        remarks: "",
        //discount_remark: "",
        //discount_reason_id: 0,
        //OPDDiscountID: 0,
        service_unit_price: 0, //total price of all grids after discount
        service_discount: 0,  // total dicount on all grid
        specialization_id: 0, // set in OPDReg.tsx
        //hod_doc_id: null,
        pay_mode: "",
        payment_type: "BP",
        paid_amount: 0,
        patient_category_id: 0, // set in OPDReg.tsx
        partner_id: null, // set in OPDReg.tsx according to patient_category_id(General(1), TPA(2), Camp(5))
        camp_id: null, // set in OPDReg.tsx
        con_service_unit_price: 0,
        con_service_discount: 0,
        con_total_price: 0,
        reg_service_unit_price: 0,
        reg_service_discount: 0,
        reg_total_price: 0
    }
}

export const OpdRegReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case ActionTypes.CLEAR_SELECTED_DOCTOR_DATA:
            return {
                ...state,
                selectedDoctor: []
            }

        case ActionTypes.CLEAR_BILLING_DATA:
            return {
                ...state,
                billingData: initialState.billingData
            }

        case ActionTypes.SELECTED_DOCTOR:
            return {
                ...state,
                selectedDoctor: [
                    ...state.selectedDoctor,
                    action.payload
                ]
            }

        case ActionTypes.REMOVE_SELECTED_DOCTOR:
            return {
                ...state,
                selectedDoctor: state.selectedDoctor.filter((doctor: any) => doctor.doctor_id !== action.payload)
            }

        case ActionTypes.SET_PATIENT_DETAIL:
            return {
                ...state,
                patientDetails: action.payload

            }
        case ActionTypes.SET_OPD_DISCOUNT_DATA:
            return {
                ...state,
                opdDiscountData: {
                    ...state.opdDiscountData,
                    ...action.payload
                }
            };

        case ActionTypes.SET_BILLING_DATA:
            return {
                ...state,
                billingData: {
                    ...state.billingData,
                    ...action.payload
                }
            };

        default:
            return state;
    }
}

export default OpdRegReducer;

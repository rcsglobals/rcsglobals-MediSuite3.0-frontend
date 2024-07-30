import axios from "axios";

export const GetDoctors = async() => {

    try {
        const response = await axios.get('http://localhost:34553/api/Accounts/GetDoctors');
        return response;

    } catch (error: any) {
        console.error('GetDoctors Error', error.response?.data || error.message);
    }
}

export const InvOrderSer = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/his_patient/GetServiceInvestigation?hospitalId=${props.hospitalId}&patientCategoryId=${props.patientCategoryId}&campId=${props.campId}&partnerId=${props.partnerId}&isSRLDiagnosis=${props.isSRLDiagnosis}&opdDiscountId=${props.opdDiscountId}`);
        return response;

    } catch (error: any) {
        console.error('InvOrderSer Error', error.response?.data || error.message);
    }
}

export const ProOrderSer = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/his_patient/GetServiceProcedure?hospitalId=${props.hospitalId}&patientCategoryId=${props.patientCategoryId}&campId=${props.campId}&partnerId=${props.partnerId}&isSRLDiagnosis=${props.isSRLDiagnosis}&opdDiscountId=${props.opdDiscountId}`);
        return response;

    } catch (error: any) {
        console.error('ProOrderSer Error', error.response?.data || error.message);
    }
}
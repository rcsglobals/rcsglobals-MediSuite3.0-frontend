import axios from 'axios';

export const RefferedByService = async () => {
    try {
        let res = await axios.get('http://localhost:34553/api/Accounts/GetdocmasterType');
        return res;

    } catch (err: any) {
        console.log("RefferedByService error", err);
    }
}

export const RefferedByDataService = async (props: any) => {

    const EmployeeTypeId: any = props;

    try {
        let res = await axios.get(`http://localhost:34553/api/Accounts/GetRefdoctor?EmployeeTypeId=${EmployeeTypeId}`);
        return res;

    } catch (err: any) {
        console.log("DiscountService error", err);
    }
}

export const PatientTypeService = async () => {

    try {
        let res = await axios.get('http://localhost:34553/api/Accounts/his_Patient_ctaegory_Info');
        return res;

    } catch (err: any) {
        console.log("PatientTypeService error", err);
    }
}


export const PatientTypeOptionsService = async (props: any) => {

    const PatientType: any = props;

    try {
        let res = await axios.get(`http://localhost:34553/api/Accounts/his_Partner_Info?PatientType=${PatientType}`);
        return res;

    } catch (err: any) {
        console.log("PatientTypeOptionsService error", err);
    }
}

export const CampOptionsService = async () => {

    try {
        let res = await axios.get('http://localhost:34553/api/Accounts/his_Camps_Info');
        return res;

    } catch (err: any) {
        console.log("CampOptionsService error", err);
    }
}

export const DiscountService = async () => {

    try {
        let res = await axios.get('http://localhost:34553/api/Accounts/opd_discount_Info');
        return res;

    } catch (err: any) {
        console.log("DiscountService error", err);
    }
}
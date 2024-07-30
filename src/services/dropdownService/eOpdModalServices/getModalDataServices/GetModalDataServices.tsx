import axios from "axios";

export const CcModalGetData = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/ChiefComplaint?OPDNo=${props}`);
        return response;

    } catch (error: any) {
        console.error('CcModalGetData Error', error.response?.data || error.message);
    }
}

export const GpeModalGetData = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/GPE?OPDNo=${props}`);
        return response;

    } catch (error: any) {
        console.error('GpeModalGetData Error', error.response?.data || error.message);
    }
}

export const SysExamGetData = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/SystemExamination?OPDNo=${props}`);
        return response;

    } catch (error: any) {
        console.error('SysExamGetData Error', error.response?.data || error.message);
    }
}

export const ProvDiagData = async () => {

    try {
        const response = await axios.get('http://localhost:34553/api/Accounts/GetDiagnoses');
        return response;

    } catch (error: any) {
        console.error('ProvDiagData Error', error.response?.data || error.message);
    }
}

export const ProvDiagGetData = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/GetProvisionalDiagnosis?OPDNo=${props}`);
        return response;

    } catch (error: any) {
        console.error('ProvDiagGetData Error', error.response?.data || error.message);
    }
}

export const TtPlanGetData = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/GetTTPLAN?OPDNo=${props}`);
        return response;

    } catch (error: any) {
        console.error('TtPlanGetData Error', error.response?.data || error.message);
    }
}

export const InvestigationGetData = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/INVESTIGATION?OPDNo=${props}`);
        return response;

    } catch (error: any) {
        console.error('InvestigationGetData Error', error.response?.data || error.message);
    }
}

export const PharmaGetData = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/PHARMA?OPDNo=${props}`);
        return response;

    } catch (error: any) {
        console.error('PharmaGetData Error', error.response?.data || error.message);
    }
}

export const GetDosesFrequency = async() => {

    try {
        const response = await axios.get('http://localhost:34553/api/Accounts/DosageFrequency');
        return response;

    } catch (error: any) {
        console.error('GetDosesFrequency Error', error.response?.data || error.message);
    }
}

export const CheckUomForBilling = async() => {

    try {
        const response = await axios.get('http://localhost:34553/api/Accounts/CheckUomforBilling');
        return response;

    } catch (error: any) {
        console.error('CheckUomForBilling Error', error.response?.data || error.message);
    }
}

export const FollowUpGetData = async(props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/FOLLOWUP?OPDNo=${props}`);
        return response;

    } catch (error: any) {
        console.error('FollowUpGetData Error', error.response?.data || error.message);
    }
}
import axios from 'axios';

export const PfrService = async () => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }
        const response = await axios.get('http://localhost:34553/api/Accounts/get_patient_Info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error: any) {
        console.error('PfrService API Failed', error.response?.data || error.message);
    }
}

export const GetPatientOpds = async (patientId: any) => {

    try {
        let res = await axios.get(`http://localhost:34553/api/Accounts/SelectAllProvision?patientId=${patientId}`);
        return res;
    } catch (err: any) {
        console.log("GetPatientOpds error", err);
    }
    
}

export const GetFilledDiagosisOpd = async () => {

    try {
        let res = await axios.get(`http://localhost:34553/api/his_patient/GetOPDNoFromDiagnosis`);
        return res;
    } catch (err: any) {
        console.log("GetFilledDiagosisOpd error", err);
    }
    
}
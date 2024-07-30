import axios from 'axios';

export const OpdBillHospitalDetailsSer = async (props: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }
        const response = await axios.get(`http://localhost:34553/api/BillingDetails/HospitalBillHeader?BillNo=${props}&BillingGroup=OPD&BillType=CA`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error: any) {
        console.error('OpdBillHospitalDetailsSer API Failed', error.response?.data || error.message);
    }
}

export const OpdBillGetPatientDetailsSer = async (props: any) => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }
        const response = await axios.get(`http://localhost:34553/api/BillingDetails/PatientInfoForBill?billNo=${props}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;

    } catch (error: any) {
        console.error('OpdBillGetPatientDetailsSer API Failed', error.response?.data || error.message);
    }
}

export const OpdBillInfoDetailsSer = async (props: any) => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }
        const response = await axios.get(`http://localhost:34553/api/BillingDetails/SelectBillingsDetailsApprove?billNo=${props}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;

    } catch (error: any) {
        console.error('OpdBillInfoDetailsSer API Failed', error.response?.data || error.message);
    }
}
import axios from 'axios';

export const OpdGetPatientDetailsSer = async (props: any) => {
    const opdNo: any = props;
    try {

        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        let res = await axios.get(`http://localhost:34553/api/Accounts/GetOpdBillingPatientByid?OpdNumber=${opdNo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (err: any) {
        console.log("OpdGetPatientDetailsSer error", err);
    }
}

export const OpdGetDiagDetailsSer = async (props: any) => {
    const opdNo: any = props;
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        let res = await axios.get(`http://localhost:34553/api/Accounts/GetOpdPrintDetails?opdNo=${opdNo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (err: any) {
        console.log("OpdGetDiagDetailsSer error", err);
    }
}

export const GetRefferedOpdNoSer = async (props: any) => {
    const opdNo: any = props;
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        let res = await axios.get(`http://localhost:34553/api/Accounts/GetOpdReferredInfo?prevOpdRegistrationNo=${opdNo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (err: any) {
        console.log("OpdGetDiagDetailsSer error", err);
    }
}
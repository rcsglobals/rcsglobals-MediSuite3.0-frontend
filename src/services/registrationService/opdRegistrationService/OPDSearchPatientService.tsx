import axios from 'axios';

export const OPDSearchPatientService = async (props: any) => {
    const patientinfo: any = props;

    try {
        const response: any = await axios.get(`http://localhost:34553/api/his_patient/Patient/?patientinfo=${patientinfo}`);
        return response;

    } catch (err: any) {
        console.log("OPDSearchPatientService error", err);
    }
}
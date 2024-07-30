import axios from 'axios';

export const OPDPatientDetailsService = async (props: any) => {

    const patient_id: any = props;

    try {
        const response: any = await axios.get(`http://localhost:34553/api/his_patient/PatientId?Patient_id=${patient_id}`);
        return response;

    } catch (err: any) {
        console.log("OPDPatientDetailsService error", err);
    }
}

export const AdharCardUpdationService = async (patientId: any, aadharValue: any) => {
    try {
        const response: any = await axios.patch(`http://localhost:34553/api/his_patient/UpdatePatient/${patientId}`, {
            AdharNo :  aadharValue
        });
        return response;
    } catch (err: any) {
        console.error("AdharCardUpdationService error", err);
        if(err.response.status === 512){
            window.alert("Enter valid aadhar number");
        }
    }
}

export const CheckOpdValidDaysService = async (props: any) => {

    const { patient_id, doctor_id }: any = props;

    try {
        const response: any = await axios.get(`http://localhost:34553/api/Accounts/CheckOPDValidDays?PatientId=${patient_id}&DoctorId=${doctor_id}`);
        return response;

    } catch (err: any) {
        console.log("CheckOpdValidDaysService error", err);
    }
}
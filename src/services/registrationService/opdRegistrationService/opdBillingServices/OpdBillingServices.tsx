import axios from 'axios';

export const PaymentModesService = async () => {
    try {
        const response = await axios.get('http://localhost:34553/api/Accounts/Getpaymode');
        return response.data;

    } catch (error: any) {
        throw new Error(`PaymentModesService error: ${error.message}`);
    }
}

export const GetJRService = async (props: any) => {
    try {
        const response = await axios.get(`http://localhost:34553/api/his_patient/GetJuniorSchedulesByDoctorId?drId=${props.doctorId}`);
        return response;

    } catch (error: any) {
        throw new Error(`GetJRService error: ${error.message}`);
    }
}

export const OPDUserVerificationService = async (props: any) => {
    try {
        const response = await axios.get(`http://localhost:34553/api/his_patient/VerifyPassword?username=${props.username}&password=${props.password}`);
        return response;

    } catch (error: any) {
        throw new Error(`OPDUserVerificationService error: ${error.message}`);
    }
}

export const OpdFinalBillingService = async (props: any) => {

    const createBilldObjects = (props: any) => {
        let billingObjects = [];

        if (props.flag === 1 && props.selectedDoctor.length >= 0) { // only con 
            billingObjects = props.selectedDoctor.map((doctor: any) => (
                {
                    service_unit_price: props?.billingData?.con_total_price,
                    item_flag: "CON",
                    doctor_id:  props.billingData.doctor_id,
                    specialization_id: props?.billingData?.specialization_id,
                    service_discount: props?.billingData?.con_service_discount,
                    UnitId: props.billingData.unit_id
                }
            ));
        }
        else if (props.flag === 0 && props.selectedDoctor.length >= 0) { // reg & con
            billingObjects = props.selectedDoctor.map((doctor: any) => (
                {   
                    service_unit_price: props?.billingData?.con_total_price,
                    item_flag: "CON",
                    doctor_id:  props.billingData.doctor_id,
                    specialization_id: props?.billingData?.specialization_id,
                    service_discount: props?.billingData?.con_service_discount,
                    UnitId: props.billingData.unit_id
                }
            ));
            billingObjects.push({
                service_unit_price: props.billingData.reg_total_price,
                item_flag: "REG",
                doctor_id: props.billingData.doctor_id,
                specialization_id: props?.billingData?.specialization_id,
                service_discount: props?.billingData?.reg_service_discount,
                UnitId: props.billingData.unit_id
            });
        }
        return billingObjects;
    }

    const bodyData = {
        Reg: {
            patient_id: props.billingData.patient_id
        },
        Regd: {
            unit_id: props.billingData.unit_id,
            doctor_id: props.billingData.doctor_id,
            JR_Id: props.billingData.JR_Id,
            JR_deptId: props.billingData.JR_deptId,
            opd_type: props?.page === 'RefferedPatient' ? 'R' : null
        },
        Bill: {
            bill_type: props.billingData.bill_type,
            remarks: props?.page === 'RefferedPatient' ? 'Reffered OPD' : (props?.billingData?.remarks),
            partner_id: props.billingData.partner_id,
            camp_id: props.billingData.camp_id,
            patient_category_id : props.billingData.patient_category_id,
        },
        Billd: createBilldObjects(props),
        Pp: {
            paid_amount: props.billingData.paid_amount,
            pay_mode: props.billingData.pay_mode
        }
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }
    const response = await axios.post('http://localhost:34553/api/his_patient/RegisterOPD',
        bodyData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
};

export const RefferedOPDInsertionService = async (props: any) => {

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:34553/api/his_patient/RefferedOPDInsertion',
            props,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response;

    } catch (error: any) {
        throw new Error(`RefferedOPDInsertionService error: ${error?.message}`);
    }
};

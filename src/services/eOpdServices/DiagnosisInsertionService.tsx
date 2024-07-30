import axios from 'axios';

export const DiagnosisInsertionService2 = async (diagnosisData: any) => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            diagnosisData.history.push('/login');
            return;
        }

        const getBodyData = (stageId: number, diagnosisData: any) => {
            switch (stageId) {
                case 1:
                    return {
                        ObjProvisional: {
                            OPDNo: diagnosisData.opdNo,
                            patient_id: diagnosisData.PatientId,
                            observations: diagnosisData.Observations
                        }
                    };
                case 2:
                    return {
                        ObjProvisional: {
                            OPDNo: diagnosisData.opdNo,
                            patient_id: diagnosisData.PatientId
                        },
                        ObjVital: {
                            patient_id: diagnosisData.PatientId,
                            height: diagnosisData.Observations?.Height,
                            weight: diagnosisData.Observations?.Weight,
                            bp: diagnosisData.Observations?.BP,
                            hr: diagnosisData.Observations?.HR,
                            temperature: diagnosisData.Observations?.Temperature,
                            sPo2: diagnosisData.Observations?.SPo2,
                            rr: diagnosisData.Observations?.RR,
                            rbs: diagnosisData.Observations?.RBS
                        }
                    };
                case 3:
                    return {
                        ObjProvisional: {
                            OPDNo: diagnosisData.opdNo,
                            patient_id: diagnosisData.PatientId
                        },
                        ObjExamination: {
                            patient_id: diagnosisData.PatientId,
                            cns: diagnosisData.Observations?.cnsRadio === "Yes" ? (diagnosisData.Observations?.cns) : null,
                            cns_n: diagnosisData.Observations?.cnsRadio === "No" ? "NAD" : null,
                            S1S2Heard: diagnosisData.Observations?.cvs_S1S2Heard,
                            Murmur: diagnosisData.Observations?.cvs_Murmur,
                            PAExam: diagnosisData.Observations?.pa_exam,
                            Tenderness: diagnosisData.Observations?.pa_exam_TENDERNESS,
                            Hepatospleenomegaly: diagnosisData.Observations?.pa_exam_HEPATOSPLEENOMEGALY,
                            VesicularBreathSounds: diagnosisData.Observations?.rs_Vesicular,
                            BronchialBreathing: diagnosisData.Observations?.rs_Bronchial,
                            CrepsRhonchi: diagnosisData.Observations?.rs_Creps
                        }
                    };
                case 4:
                    return {
                        ObjProvisional: {
                            OPDNo: diagnosisData.opdNo,
                            patient_id: diagnosisData.PatientId,
                            observations: diagnosisData.Observations
                        }
                    };
                case 5:
                    return {
                        ObjProvisional: {
                            OPDNo: diagnosisData.opdNo,
                            patient_id: diagnosisData.PatientId,
                            observations: diagnosisData.Observations
                        }
                    };
                case 6:
                    return {
                        ObjProvisional: {
                            OPDNo: diagnosisData.opdNo,
                            patient_id: diagnosisData.PatientId,
                            observations: diagnosisData?.Observations
                        },
                        ObjBill: {
                            patient_id: diagnosisData.PatientId,
                            hospital_id: 1,
                            biiling_group: "OPD",
                            patient_category_id: diagnosisData.PatientCategoryId,
                            cancelled: false
                        },
                        ObjBillDetail: diagnosisData.GridObjects?.map((item: any) => ({
                            specialization_id: diagnosisData.SpecializationId,
                            service_category_map_id: item.serviceCategoryMapId,
                            // doctor_id: diagnosisData.DoctorId
                            doctor_id: item.DoctorId,
                            IsPaymentApproved: false
                        })),
                        ObjPayment: {
                            paid_amount: diagnosisData.GridObjects?.reduce((total: number, item: any) => total + parseFloat(item.serviceUnitPrice || 0), 0)
                        },
                        // ObjReport: [
                        //     {},
                        //     {}
                        // ]
                        ObjReport: Array.from({ length: diagnosisData.GridObjects?.length || 0 }, () => ({}))
                    };
                case 7:
                    return {
                        ObjProvisional: {
                            OPDNo: diagnosisData.opdNo,
                            patient_id: diagnosisData.PatientId,
                            observations: diagnosisData?.Observations
                        },
                        ObjMedicine: {
                            IndentFor: "A",
                            Remarks: ''
                        },
                        ObjMedDetails: diagnosisData.GridObjects?.map((item: any) => ({
                            item_group_name: "Medicine",
                            item_code: item.item_code,
                            item_name: item.item_name,
                            // qty: item.ml_qty === null ? item.TABQty : 1,
                            qty:  item.isUomIdmatched === true ? 1 : (item.doseVal)*(parseInt(item.for_days.split(" ")[0])),
                            service_unit_price: item.service_unit_price,
                            service_discount: 0, // fix
                            doctor_id: diagnosisData.DoctorId,
                            medicine_requisition_request_detail_id: null, // fix
                            dose: item.dose,
                            ml_qty: item.ml_qty,
                            for_days: item.for_days,
                            remarks: item.Remarks,
                            issued_qty: null // fix
                        }))
                    };
                case 8:
                    return {
                        ObjProvisional: {
                            OPDNo: diagnosisData.opdNo,
                            patient_id: diagnosisData.PatientId,
                            observations: diagnosisData.Observations
                        }
                    };
                default:
                    console.error(`No body data found for stageId ${stageId}`);
                    return null;
            }
        };

        // Get the body data for the current stageId
        const bodyData = getBodyData(diagnosisData.stageId, diagnosisData);
        if (!bodyData) {
            console.error(`No valid body data for stageId ${diagnosisData.stageId}`);
            return;
        }

        const response = await axios.post(`http://localhost:34553/api/Accounts/EOPDRegistration?StageId=${diagnosisData.stageId}`,
            bodyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response;

    } catch (error: any) {
        console.error('DiagnosisInsertionService2 Failed', error.response?.data || error.message, error);
    }
};

export const GetFilledStageIds = async(opdNo: any) => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response = await axios.get(`http://localhost:34553/api/his_patient/CheckStagePresent?OPDNo=${opdNo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;

    } catch (error: any) {
        console.error('GetFilledStageIds Error', error.response?.data || error.message);
    }
}


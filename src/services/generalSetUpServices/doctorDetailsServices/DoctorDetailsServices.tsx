import axios from "axios";

// Doctor Details Initial Screen
export const GetDoctorType = async () => {
    try {
        const getDoctorTypeRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetDoctorType');
        return getDoctorTypeRes;
    } catch (err: any) {
        console.log("GetDoctorType err", err);
    }
}

export const GetDepartments = async () => {
    try {
        const getDepartmentsRes: any = await axios.get('http://localhost:34553/api/Accounts/HiS_DEPARTMENT_Info');
        return getDepartmentsRes;
    } catch (err: any) {
        console.log("GetDepartments err", err);
    }
}

export const GetDoctorDetails = async (props: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        let apiUrl = `http://localhost:34553/api/GeneralSetup/GetDoctorDetails?DoctorType=${encodeURIComponent(props?.docType)}&DepartmentName=${encodeURIComponent(props?.deptType)}`;

        if (props?.docName) {
            apiUrl += `&DoctorName=${encodeURIComponent(props?.docName)}`;
        }

        const res = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res;
    } catch (err: any) {
        console.log("GetDoctorDetails error", err);
    }
};

// Add Doctor Modal Services

export const GetSpecializations = async () => {
    try {
        const getSpecilaizationsRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetSpeclization');
        return getSpecilaizationsRes;
    } catch (err: any) {
        console.log("GetSpecializations err", err);
    }
}

export const AddNewDoctor = async (doctorData: any) => {

    const getBodyData = () => {
        return {
            DoctorName: doctorData.DoctorName,
            DoctorTypeId: doctorData.DoctorTypeId,
            DoctorCategory: doctorData.DoctorCategory,
            UniqueEmpID: doctorData.UniqueEmpID,
            ContactNo: doctorData.ContactNo,
            DepartmentIds: doctorData.DepartmentIds,
            // Specializations: doctorData.Specializations?.map((item: any) => ([{
            //     specialization_id: item.specialization_id,
            //     consultation_fee: item.consultation_fee,
            //     consultation_fee_E: item.consultation_fee_E,
            // }]))
            Specializations: doctorData.Specializations
        };
    }


    const bodyData: any = getBodyData();
    if (!bodyData) {
        console.error(`No valid body data for stageId`);
        return;
    }

    try {
        const response = await axios.post(`http://localhost:34553/api/GeneralSetup/AddNewDoctor?UserId=2162`, bodyData);
        return response;

    } catch (error: any) {
        console.log(`AddNewDoctor error: ${error?.message}`);
    }
}

// Doctor Cut Modal
export const SetDoctorCut = async (doctorCutData: any) => {

    try {
        const response = await axios.post('http://localhost:34553/api/GeneralSetup/DoctorCutCharge', doctorCutData);
        return response;

    } catch (error: any) {
        throw new Error(`AddNewRole error: ${error?.message}`);
    }
};

// Edit Doctor Modal

export const UpdateDoctorDetailsService = async (props: any) => {
    const userId = localStorage.getItem('userId');
    try {
        const response: any = await axios.put(`http://localhost:34553/api/GeneralSetup/UpdateDoctor?UserId=${userId}&DrId=${props?.doctor_id}`, props?.doctorData);
        return response;
    } catch (err: any) {
        console.error("UpdateDoctorDetailsService error", err);
        throw err;
    }
}
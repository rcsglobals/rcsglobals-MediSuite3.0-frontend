import axios from "axios";

export const DepartmentDropdownService = async () => {

    try {
        const response = await axios.get('http://localhost:34553/api/Accounts/HiS_DEPARTMENT_Info');
        return response;

    } catch (err: any) {
        console.log("DepartmentDropdownService error", err);
    }
}

export const SpecializationDropdownService = async (props: any) => {

    const dept_id = props;

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/His_Specialization?dept_id=${dept_id}`);
        return response.data;

    } catch (err: any) {
        console.log("SpecializationDropdownService error", err);
    }
}

export const UnitDropdownService = async (selectedDepartment: any, selectedSplnId: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/GetUnitDetails?dept_id=${selectedDepartment}&specialization_id=${selectedSplnId}`);
        return response.data;

    } catch (err: any) {
        console.log("UnitDropdownService error", err);
    }
}
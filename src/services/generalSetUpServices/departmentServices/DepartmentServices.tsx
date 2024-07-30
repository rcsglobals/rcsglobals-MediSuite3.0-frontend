import axios from "axios";

export const GetDepartmentsInfo = async () => {
    try {
        const getDepartmentsInfoRes: any = await axios.get('http://localhost:34553/api/Accounts/HiS_DEPARTMENT_Info');
        return getDepartmentsInfoRes;
    } catch (err: any) {
        console.log("GetDepartmentsInfo err", err);
    }
}

export const UpdateDepartmentTimeSlot = async (deptData: any) => {

    try {
        const response = await axios.patch('http://localhost:34553/api/GeneralSetup/UpdateDepartmentTimeSlot',
            {
                dept_name: deptData.deptName,
                appointment_time_slot: deptData.timeSlot,
                status: deptData.status,
                dept_id: deptData.dept_id
            }
        );
        return response;

    } catch (error: any) {
        throw new Error(`AssignMenuByRole error: ${error?.message}`);
    }
}
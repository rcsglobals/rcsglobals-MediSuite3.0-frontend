import axios from "axios";

// User Management Initial Screen
export const GetUserByStatus = async (status: any) => {
    try {
        const getUserByStatusRes: any = await axios.get(`http://localhost:34553/api/GeneralSetup/GetUserByStatus?status=${status}`);
        return getUserByStatusRes;
    } catch (err: any) {
        console.log("GetUserByStatus err", err);
    }
}

export const GetAllUserRoles = async () => {
    try {
        const getAllUserRolesRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetRoles');
        return getAllUserRolesRes;
    } catch (err: any) {
        console.log("GetAllUserRoles err", err);
    }
}

export const GetUsersCountSer = async () => {
    try {
        const getUsersCountSerRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetAllUserCount');
        return getUsersCountSerRes;
    } catch (err: any) {
        console.log("GetUsersCountSer err", err);
    }
}

export const UpdateUserStatus = async (userId: any, status: any, RoleId: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        let apiUrl = `http://localhost:34553/api/GeneralSetup/UpdateStatus?userId=${encodeURIComponent(userId)}&newStatus=${encodeURIComponent(status)}`;

        if (RoleId) {
            apiUrl += `&RoleId=${encodeURIComponent(RoleId)}`;
        }
        const res = await axios.put(apiUrl);

        return res;
    } catch (err: any) {
        console.log("UpdateUserStatus error", err);
    }
};

// Search
export const GetSearchedUsersSer = async (serachText: any) => {
    try {
        const getSearchedUsersSerRes: any = await axios.get(`http://localhost:34553/api/GeneralSetup/GetUserDetails?SearchText=${serachText}`);
        return getSearchedUsersSerRes;
    } catch (err: any) {
        console.log("GetSearchedUsersSer err", err);
    }
}

// UpdateUserInfoModal Services
export const UpdateUserInfoService = async (props: any) => {
    try {
        const response: any = await axios.patch(`http://localhost:34553/api/GeneralSetup/UpdateUser?userId=${props?.userId}`, props?.userData);
        return response;
    } catch (err: any) {
        console.error("UpdateUserInfoService error", err);
        throw err;
    }
}

/* New User Register Service */
// UserRegisterModal Service
export const NewUserRegisterSer = async (empId: any) => {

    try {
        const response = await axios.post(`http://localhost:34553/api/GeneralSetup/AddMasterUser?UniqueEmpId=${empId}`);
        return response;

    } catch (error: any) {
        if (error.response?.data?.message === 'This user already exists.') {
            window.alert("User Already Registered..")
        }
        throw new Error(`NewUserRegisterSer error: ${error?.message}`);
    }
}

export const GetHrmsUserDetails = async (empId: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/GeneralSetup/GetHRMSEMPDetails?UniqueEmpId=${empId}`);
        return response;

    } catch (error: any) {
        console.log("catch called")
        throw new Error(`GetHrmaUserDetails error: ${error?.message}`);
    }
}
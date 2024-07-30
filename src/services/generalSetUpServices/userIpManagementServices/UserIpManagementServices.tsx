import axios from "axios";

export const GetAssignIpUsers = async () => {
    try {
        const getAssignIpUsersRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetAssignIP');
        return getAssignIpUsersRes;
    } catch (err: any) {
        console.log("GetAssignIpUsers err", err);
    }
}

export const GetSearchUserIp = async (username: any) => {
    try {
        const getSearchUserIpRes: any = await axios.get(`http://localhost:34553/api/GeneralSetup/GetIPByUsername?Username=${username}`);
        return getSearchUserIpRes;
    } catch (err: any) {
        console.log("GetSearchUserIp err", err);
    }
}

// EditUserIpModal Services
export const GetAllWards = async () => {
    try {
        const getAllWardsRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetAllDeparmentIP');
        return getAllWardsRes;
    } catch (err: any) {
        console.log("GetAllWards err", err);
    }
}

export const UpdateEditUserService = async (props: any) => {
    const { id, userData } = props;
    try {
        const response: any = await axios.patch(`http://localhost:34553/api/GeneralSetup/UpdateUserIP?id=${id}`, {
            IP_Address: userData.IP_Address,
            DeptGroupId: userData.DeptGroupId,
            Status: userData.Status
        });
        return response;
    } catch (err: any) {
        console.error("UpdateEditUserService error", err);
    }
}

// AssignIpModal Services
export const GetUserNamesSer = async () => {
    try {
        const getUserNameRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetMasterUser');
        return getUserNameRes;
    } catch (err: any) {
        console.log("GetUserNamesSer err", err);
    }
}

export const AssignUserIpService = async (props: any) => {

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:34553/api/GeneralSetup/AssignUserIP',
            {
                UserId: props.userId,
                IP_Address: props.ipAddress,
                DeptGroupId: props.deptId,
                Status: props.status
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response;

    } catch (error: any) {
        throw new Error(`AssignUserIpService error: ${error?.message}`);
    }
}
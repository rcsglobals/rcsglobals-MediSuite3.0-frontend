import axios from "axios";

// Manage User Roles Initial Screen
export const GetAllUserRoles = async () => {
    try {
        const getAllUserRolesRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetRoles?UserFlag=A');
        return getAllUserRolesRes;
    } catch (err: any) {
        console.log("GetAllUserRoles err", err);
    }
}

export const GetActiveModules = async () => {
    try {
        const getActiveModulesRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetActiveModules');
        return getActiveModulesRes;
    } catch (err: any) {
        console.log("GetActiveModules err", err);
    }
}

// Search
export const GetModuleByName = async (roleName: any) => {
    try {
        const getModuleByNameRes: any = await axios.get(`http://localhost:34553/api/GeneralSetup/GetRoleByName?Name=${roleName}`);
        return getModuleByNameRes;
    } catch (err: any) {
        console.log("GetModuleByName err", err);
    }
}

// MenuDetailModal Services
export const GetMenuByModuleId = async (props: any) => {
    try {
        const getMenusRes: any = await axios.get(`http://localhost:34553/api/GeneralSetup/GetMenusByModuleId?moduleId=${props[0]?.moduleId}&roleId=${props[0]?.roleId}`);
        return getMenusRes;
    } catch (err: any) {
        console.log("GetMenuByModuleId err", err);
    }
}

export const AssignMenuByRole = async (props: any) => {

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:34553/api/GeneralSetup/AssignRoleByMenu',
            props,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;

    } catch (error: any) {
        throw new Error(`AssignMenuByRole error: ${error?.message}`);
    }
};

export const RemoveMenuByRole = async (roleMenuId: any) => {

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    try {
        const response = await axios.post(`http://localhost:34553/api/GeneralSetup/RemoveRoleByMenu?RoleMenuId=${roleMenuId}`
            // ,
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // } 
        );
        return response;

    } catch (error: any) {
        throw new Error(`RemoveMenuByRole error: ${error?.message}`);
    }
};

// Not in use
export const DeleteMenuByModuleId = async (roleId: any) => {
    try {
        const deleteMenuRes = await axios.delete(`http://localhost:34553/api/GeneralSetup/DeactiveRole?RoleId=${roleId}`);
        return deleteMenuRes;
    } catch (err) {
        console.log("DeleteMenuByModuleId err", err);
    }
}

// AddNewRoleModal Services
export const AddNewRole = async (roleName: any) => {

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:34553/api/GeneralSetup/CreateRole',
            { role_name: roleName },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;

    } catch (error: any) {
        throw new Error(`AddNewRole error: ${error?.message}`);
    }
};

// EditRoleModal Services
export const EditRoleService = async (roleId: any, role_name: any, status: any) => {
    try {
        const response: any = await axios.patch(`http://localhost:34553/api/GeneralSetup/UpdateRoleStatus?RoleId=${roleId}`, {
            role_name: role_name,
            status: status
        });
        return response;
    } catch (err: any) {
        console.error("EditRoleService error", err);
    }
}
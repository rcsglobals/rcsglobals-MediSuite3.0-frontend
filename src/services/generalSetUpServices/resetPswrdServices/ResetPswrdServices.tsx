import axios from "axios";

// Reset Password Locations Dropdown
export const GetLocations = async () => {
    try {
        const getLocationsRes: any = await axios.get('http://localhost:34553/api/GeneralSetup/GetLocation');
        return getLocationsRes;
    } catch (err: any) {
        console.log("GetLocations err", err);
    }
}

export const GetSearchedUser = async (props: any) => {
    try {
        const getSearchedUserRes: any = await axios.get(`http://localhost:34553/api/GeneralSetup/GetUserByLocation?LocationId=${props?.locationId}&Username=${props?.serchText}`);
        return getSearchedUserRes;
    } catch (err: any) {
        console.log("GetSearchedUser err", err);
    }
}

// ResetPaswrdModal Service
export const UpdateUserPasswordService = async (userId: any, password: any) => {
    try {
        const response: any = await axios.patch('http://localhost:34553/api/GeneralSetup/UpdatePassword', {
            userId: userId,
            password: password
        });
        return response;
    } catch (err: any) {
        console.error("UpdateUserPasswordService error", err);
    }
}
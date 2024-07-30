import axios from "axios";

export const DoctorAvailableService = async (props: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/GetDoctorsAvailableForOPDNew?DeptID=${props.DeptID}&SpecID=${props.SpecID}&UnitId=${props.UnitId}&partnerId=${props.partnerId}&IsApplyEmergencyCharge=${props.IsApplyEmergencyCharge}&CampId=${props.CampId}&OPDDiscountID=${props.OPDDiscountID}&DoctorId=0`);
        return response;

    } catch (err: any) {
        console.log("DoctorAvailableService error", err);
    }
}
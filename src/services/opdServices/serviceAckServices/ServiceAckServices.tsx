import axios from "axios";

export const GetServiceAckUsersList = async (props: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const { fromDate, toDate, search } = props;

        let apiUrl = `http://localhost:34553/api/BillingManager/GetServiceAcknowledgeList?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}`;

        if (search) {
            apiUrl += `&search=${encodeURIComponent(search)}`;
        }

        const res = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res;
    } catch (err: any) {
        console.log("GetServiceAckUsersList error", err);
    }
};

export const ApproveUserService = async (billingDetailId: any) => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response = await axios.patch(`http://localhost:34553/api/BillingManager/ApproveServicePayment`,
            billingDetailId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response;
    } catch (err: any) {
        console.error("ApproveUserService error", err);
    }
};

export const CancelUserService = async (billingDetailId: any) => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }
        const response: any = await axios.patch(`http://localhost:34553/api/BillingManager/CancelServicePayment`,
            billingDetailId,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response;
    } catch (err: any) {
        console.error("CancelUserService error", err);
    }
}
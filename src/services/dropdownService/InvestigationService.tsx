import axios from 'axios';

const InvestigationService = async(props: any) => {

    const service = props;

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/GetFilteredServices?servicename=${service}`);
        return response;

    } catch (error: any) {
        console.error('API Failed', error.response?.data || error.message);
    }
}

export default InvestigationService;
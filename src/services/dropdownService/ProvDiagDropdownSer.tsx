import axios from 'axios';

const ProvDiagDropdownSer = async() => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/GetDiagnoses`);
        return response;

    } catch (error: any) {
        console.error('ProvDiagDropdownSer Error', error.response?.data || error.message);
    }
}

export default ProvDiagDropdownSer;
import axios from 'axios';

const PharmaDropdownSer = async(props: any) => {

    const medicine = props;

    try {
        const response = await axios.get(`http://localhost:34553/api/Pharma/GetPharmaItems?medicine=${medicine}`);
        return response;

    } catch (error: any) {
        console.error('API Failed', error.response?.data || error.message);
    }
}

export default PharmaDropdownSer;
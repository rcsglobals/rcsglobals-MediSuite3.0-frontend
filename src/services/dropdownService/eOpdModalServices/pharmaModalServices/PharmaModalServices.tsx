import axios from 'axios';

export const GetMedicinesSer = async() => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Pharma/GetPharmaItems`);
        return response;

    } catch (error: any) {
        console.error('GetMedicinesSer Error', error.response?.data || error.message);
    }
}
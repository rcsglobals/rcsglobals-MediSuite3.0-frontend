import axios from 'axios';

const UserModuleIdService = async (props: any, history: any) => {
    const userId = localStorage.getItem('userId');

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            history.push('/login');
            return;
        }

        const response = await axios.get(`http://localhost:34553/api/his_user/Module?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            props.setUserModules(response.data);
        }

    } catch (error: any) {
        console.error('API Failed', error.response?.data || error.message);

        if (error.response?.status === 401) {
            localStorage.clear();
            history.push('/login');
        }
    }
}

export default UserModuleIdService;
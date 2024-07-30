import axios from 'axios';

const UserMenuService = async (props: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response = await axios.get(`http://localhost:34553/api/his_user/MenuNamesByUserId`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if(response.status === 200){
            props.setUserMenu(response.data);
        }

    } catch (error: any) {
        console.error('UserMenuService API Failed', error.response?.data || error.message);
    }
};

export default UserMenuService;
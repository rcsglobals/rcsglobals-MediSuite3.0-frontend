import axios from 'axios';

const LoginService = async (props: any, userData: any, history: any) => {
  const { username, password } = userData;
  try {
    const response = await axios.post('http://localhost:34553/api/his_user/Login', {
      username: username,
      password: password,
    });

    if (response.status === 200) {
      props.setUserAuthenticate(true);
      props.setAuthToken(response.data.token);
      props.setUserId(response.data.userId)
      localStorage.setItem('isAuthenticated', "true");
      localStorage.setItem('authToken',response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', username);
      history.push('/dashboard');
    }else if (response.status === 401) {
      console.log('Unauthorized or Session Expired');
      localStorage.setItem('isAuthenticated', "false");
      localStorage.setItem('authToken','');
      localStorage.setItem('userId', '');
      localStorage.setItem('username', '');
      props.setUserAuthenticate(false);
      history.push('/login');
    } else {
      console.error('Login Failed with status code:', response.status);
    }
  } catch (error: any) {
    console.error('Login Failed', error.response?.data || error.message);
    if(error.response?.data?.message === 'Invalid credentials'){
      window.alert("Invalid Credentials..")
    }
  }
};

export default LoginService;
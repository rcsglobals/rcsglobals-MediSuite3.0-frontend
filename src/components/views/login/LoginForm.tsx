import { useState, useEffect } from 'react';
import {
  LeftContainer,
  LoginBtn,
  LoginFormContainer,
  MainContainer,
  MainHeading,
  NormalText,
  RightContainer,
  ShowPasswordContainer,
  ShowPasswordText,
  StyledLabel,
  StyledTextField,
} from './LoginForm.styles';
import bgImage from '../../images/BgImage.png';
import bgImageMb from '../../images/BgImageMb.png';
import RCSLogo from '../../images/RCSLogo.png';
import RCSLogoMb from '../../images/RCSLogoMb.png';
import LoginService from '../../../services/loginService/LoginService';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserAuthenticate, setAuthToken, setUserId } from '../../../redux/actions/AuthAction';
import { setUserModules } from '../../../redux/actions/UserModulesAction';
import Checkbox from '@mui/material/Checkbox';
import { UserRegisterModal } from '../modals/generalSetUp/userManagement/UserRegisterModal';

const LoginForm = (props: any) => {
  const history: any = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<any>(false);
  const isMobile = useMediaQuery({ maxWidth: 420 });

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      props.setUserAuthenticate(true);
    }
  }, []);

  const handleLoginClick = async () => {
    LoginService(props, userData, history);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleLoginClick();
    }
  };

  const handleShowPassword = (e: any) => {
    setShowPassword(!showPassword);
  }

  const handleClick = () => {
    setShowModal(true);
  }

  return (
    <MainContainer>
      <LeftContainer backgroundimage={bgImage} backgroundimagemb={bgImageMb}>
        {isMobile ? <img alt="" src={RCSLogoMb} /> : <img alt="" src={RCSLogo} />}
      </LeftContainer>
      <RightContainer>
        <MainHeading>LOGIN</MainHeading>
        <NormalText>Enter your Username and Password for Login</NormalText>
        <LoginFormContainer>
          <StyledLabel>Username</StyledLabel>
          <StyledTextField
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            fullWidth
            placeholder="Enter your name here"
          />
          <StyledLabel>Password</StyledLabel>
          <StyledTextField
            type={showPassword ? "text" : "password"}
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            fullWidth
            placeholder="Password"
            onKeyPress={handleKeyPress}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ShowPasswordContainer>
              <Checkbox style={{ fontSize: '0px' }} checked={showPassword} onChange={(e) => handleShowPassword(e)} />
              <ShowPasswordText style={{ padding: '10px 5px 10px 0px' }}>Show Password</ShowPasswordText>
            </ShowPasswordContainer>
            <div style={{ display: 'flex', fontSize: '13px', color: 'black', fontWeight: '600' }}>Don't have a Login Id?
              <div onClick={handleClick} style={{ color: '#4074c1', cursor: 'pointer', paddingLeft: '5px', fontSize: '13px' }}>Click here</div>
              {
                showModal && <UserRegisterModal showModal={showModal} setShowModal={setShowModal} />
              }
            </div>
          </div>
          <LoginBtn onClick={handleLoginClick}>Login</LoginBtn>
        </LoginFormContainer>
      </RightContainer>
    </MainContainer>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setUserAuthenticate: (status: boolean) => dispatch(setUserAuthenticate(status)),
  setAuthToken: (token: string) => dispatch(setAuthToken(token)),
  setUserModules: (userModules: number[]) => dispatch(setUserModules(userModules)),
  setUserId: (userId: number) => dispatch(setUserId(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

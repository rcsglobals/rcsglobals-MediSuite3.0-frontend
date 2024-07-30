import React, { useState, useEffect } from 'react';
import { MainContainer, LeftContainer, MiddleContainer, RightContainer, LoginBtn } from '../navbar/Navbar.styles';
import RCSLogoSm from '../../images/RCSLogoSm.png';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUserAuthenticate, setAuthToken, setUserId } from '../../../redux/actions/AuthAction';
import Dropdown from '../dropdown/Dropdown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MobileDropdown from '../dropdown/MobileDropdown';
import { setUserModules, setUserMenu } from '../../../redux/actions/UserModulesAction';
import UserModuleIdService from '../../../services/userService/UserModuleIdService';
import UserMenuService from '../../../services/userService/UserMenuService';

const Navbar = (props: any) => {
    const history: any = useHistory();
    const [currScreen, setCurrScreen] = useState<'mobile' | 'laptop'>('laptop');
    const [isMenuClick, setIsMenuClick] = useState<boolean>(false);

    useEffect(() => {
        UserModuleIdService(props, history);
        UserMenuService(props);
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1240) {
                setCurrScreen('mobile');
            } else {
                setCurrScreen('laptop');
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLoginClick = () => {
        if (!props.isUserAuthenticate) {
            // history.push('/login');
        } else {
            localStorage.clear();
            props.setUserAuthenticate(false);
            props.setAuthToken('');
            props.setUserId('');
            history.push('/login');
        }
    }

    const handleMenuClick = () => {
        setIsMenuClick(!isMenuClick);
    };

    const handleCloseClick = () => {
        setIsMenuClick(false);
    }

    return (
        <>
            <MainContainer currScreen={currScreen}>
                {
                    window.innerWidth > 1240 &&
                    <LeftContainer style={{ padding: '0px 10px' }}>
                        <img height="50" alt="" src={RCSLogoSm} />
                    </LeftContainer>
                }
                {
                    currScreen === 'laptop' ? (
                        <MiddleContainer>
                            <Dropdown setIsMenuClick={setIsMenuClick}/>
                        </MiddleContainer>
                    ) : (
                        currScreen === 'mobile' && (
                            <>
                                {!isMenuClick ? (
                                    <MenuIcon style={{ position: 'relative', cursor: 'pointer', padding: '0px 20px' }} onClick={handleMenuClick} />
                                ) : (
                                    <div>
                                        <CloseIcon style={{ position: 'relative', cursor: 'pointer', padding: '0px 20px' }} onClick={handleCloseClick} />
                                        <MobileDropdown setIsMenuClick={setIsMenuClick}/>
                                    </div>
                                )}
                            </>
                        )
                    )
                }
                <RightContainer>
                    {/* <AccountCircleIcon fontSize='large' style={{ color: 'grey', padding: '0px 20px', fontSize: '3.1875rem' }} /> */}
                    <LoginBtn onClick={handleLoginClick}>
                        {props.isUserAuthenticate ? 'Logout' : 'Login'}
                    </LoginBtn>
                </RightContainer>
            </MainContainer>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    isUserAuthenticate: state?.AuthenticationInfo?.isUserAuthenticate
});

const mapDispatchToProps = (dispatch: any) => ({
    setUserAuthenticate: (status: boolean) => dispatch(setUserAuthenticate(status)),
    setAuthToken: (token: string) => dispatch(setAuthToken(token)),
    setUserId: (userId: number) => dispatch(setUserId(userId)),
    setUserModules: (moduleIds: number[]) => dispatch(setUserModules(moduleIds)),
    setUserMenu: (menu: any) => dispatch(setUserMenu(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
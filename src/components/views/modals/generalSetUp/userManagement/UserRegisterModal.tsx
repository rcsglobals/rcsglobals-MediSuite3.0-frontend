import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { InfoText, RegisterBtn, MainHeading, RegBtnContainer, SearchContainer, SearchBtn, StyledLabel, StyledTextField, UserDetailMainCont, UserDetailCont, CompanyName, UserImage, Username, IdAndDept } from './UserRegisterModal.styles';
import { GetHrmsUserDetails, NewUserRegisterSer } from '../../../../../services/generalSetUpServices/userManagementServices/UserManagementServices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  minHeight: 350,
  bgcolor: 'background.paper',
  outline: 'none',
  padding: '10px 20px 10px 20px',
  borderRadius: '5px'
};

export const UserRegisterModal = (props: any) => {
  const { showModal, setShowModal } = props;

  const [empId, setEmpId] = useState<any>(null);
  const [showUserDetails, setShowUserDetails] = useState<any>(false);
  const [userDetails, setUserDetails] = useState<any>([]);

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowModal(false);
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setEmpId(value);
  };

  const handleSearchClick = async (uqEmpId: any) => {
    try {
      const res: any = uqEmpId !== null && await GetHrmsUserDetails(uqEmpId);
      if (res?.status === 200) {
        setUserDetails(res?.data[0]);
      } else if (res?.status === 204) {
        window.alert("Employee ID not exist in HRMS...");
      } else {
        console.log("Something Wrong...");
        window.alert("Something Wrong...");
      }
    } catch (err: any) {
      console.log("GetHrmsUserDetails api err", err);
    }
    if (uqEmpId !== null && userDetails?.uniqueEmpId != null) {
      setShowUserDetails(true);
    } else {
      uqEmpId === null && window.alert("Please enter employee ID");
    }
  }

  const handleKeyPress = (e: any, empId: any) => {
    if (e.key === 'Enter') {
      handleSearchClick(empId);
    }
  };

  const handleRegisterClick = async (e: any) => {
    try {
      const res: any = await NewUserRegisterSer(empId);
      if (res?.status === 200) {
        window.alert("New user registered successfully :)");
        setShowUserDetails(false);
        setShowModal(false);
      }
    } catch (err: any) {
      console.log("NewUserRegisterSer api err", err);
    }
  };

  const handleBackClick = () => {
    setShowUserDetails(false);
  }

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MainHeading> User Registration</MainHeading>
          {!showUserDetails ?
            <>
              <InfoText>Copy your employee code from HRMS/E-planet login and write below mentioned text box to Register</InfoText>
              <StyledLabel>Enter your Employee Id</StyledLabel>
              <StyledTextField
                placeholder='Enter your Employee Code'
                type="text"
                name="roleName"
                value={empId}
                onChange={handleInputChange}
                fullWidth
                onKeyPress={(e: any) => handleKeyPress(e, empId)}
              />
            </> :
            <UserDetailMainCont>
              <UserDetailCont>
                <CompanyName>{userDetails?.companyName}</CompanyName>
                <UserImage>
                  {(userDetails.image !== null) ?
                    <img height='100px' width='100px' style={{ borderRadius: '100%' }} src={`data:image/jpeg;base64,${userDetails.image}`} />
                    :
                    <AccountCircleIcon style={{ fontSize: '80px', color: '#80808082' }} />
                  }
                </UserImage>
                <Username>{userDetails.firstName}</Username>
                <IdAndDept>{userDetails.uniqueEmpId}</IdAndDept>
                <IdAndDept style={{ fontSize: '15px', color: 'black', fontWeight: '400', textAlign: 'center', padding: '5px' }}>{userDetails?.departmentName}</IdAndDept>
              </UserDetailCont>
            </UserDetailMainCont>
          }
          {!showUserDetails ?
            <SearchContainer>
              <SearchBtn onClick={() => handleSearchClick(empId)}>Search</SearchBtn>
            </SearchContainer> :
            <RegBtnContainer>
              <RegisterBtn onClick={() => handleRegisterClick(empId)}>Register</RegisterBtn>
              <RegisterBtn onClick={() => handleBackClick()}>Back</RegisterBtn>
            </RegBtnContainer>
          }
        </Box>
      </Modal>
    </div>
  );
}
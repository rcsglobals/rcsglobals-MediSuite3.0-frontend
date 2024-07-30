import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, DataContainer, LoginBtn, MainHeading, RadioBtnsContainer, StyledLabel, StyledTextField } from './UpdateUserInfoModal.styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { UpdateUserInfoService } from '../../../../../services/generalSetUpServices/userManagementServices/UserManagementServices';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 1,
};

const SelectRole = (props: any) => {
    const { userRoles, selectedRole, setUserInfo } = props;
    const [userRole, setUserRole] = useState<any>(selectedRole);

    const handleChange = (e: any) => {
        const selectedRoleName: any = e?.target?.value;
        if (selectedRoleName !== '') {
            const selectedRoleVal: any = userRoles.find((role: any) => role.roleName === selectedRoleName);
            if (selectedRoleVal) {
                const selectedRoleId = selectedRoleVal?.roleId;
                setUserInfo((prevData: any) => ({
                    ...prevData,
                    roleName: selectedRoleName,
                    roleId: selectedRoleId
                }));
                setUserRole(selectedRoleName);
            }
        }
    }

    return (
        <FormControl
            sx={{
                m: 1, minWidth: 120, backgroundColor: 'white', color: 'white', margin: '0px', borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'grey',
                    },
                    '&:hover fieldset': {
                        borderColor: 'Grey',
                    },
                },
                '& .MuiFormLabel-root': {
                    fontSize: '13px',
                    '&.Mui-focused': {
                        color: 'grey'
                    },
                },
                '& .css-1mlvn36-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
                    fontSize: '13px'
                }
            }}
            size="small"
        >
            <InputLabel required={true} id="demo-select-small-label">Select</InputLabel>
            <Select
                sx={{
                    '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                        padding: '5px'
                    },
                    '& .css-bp4fj4-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
                        borderRadius: '20px'
                    }
                }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Select"
                value={userRole}
                onChange={(e: any) => handleChange(e)}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 48 * 4.5 + 8,
                        }
                    }
                }}
            >
                {userRoles?.map((data: any, index: any) => (
                    <MenuItem sx={{ fontSize: '11px' }} key={index} value={data.roleName}>{data.roleName}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default function UpdateUserInfoModal(props: any) {
    const { showModal, setShowModal, userId, selectedUser, userRoles, userData } = props;

    const [userInfo, setUserInfo] = useState<any>({
        username: userData.username,
        fullname: userData.fullname,
        phoneNo: userData.phoneNo,
        email: userData.email,
        roleName: userData.roleName,
        status: userData.status,
        roleId: userData.roleId
    });

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserInfo((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmitClick = async () => {
        try {
            const res: any = await UpdateUserInfoService({ userId: userId, userData: { username: userInfo.username, fullname: userInfo.fullname, phoneNo: userInfo.phoneNo, email: userInfo.email, status: userInfo.status, role_id: userInfo.roleId } });
            if (res?.status === 200) {
                setShowModal(false);
            }
        } catch (err: any) {
            console.log("UpdateUserStatus api err", err);
        }
    }


    if (userId !== selectedUser) return null;

    return (
        <div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    '&. .css-1k4hvgc': {
                        borderColor: 'transparent'
                    }
                }}
            >
                <Box sx={style}>
                    <MainHeading>Update User Info</MainHeading>
                    <div style={{ margin: '15px' }}>
                        <DataContainer>
                            <Container>
                                <StyledLabel>Username</StyledLabel>
                                <StyledTextField name="username" value={userInfo.username} onChange={handleChange} />
                            </Container>
                            <Container>
                                <StyledLabel>FullName</StyledLabel>
                                <StyledTextField name="fullname" value={userInfo.fullname} onChange={handleChange} />
                            </Container>
                            <Container>
                                <StyledLabel>Contact No</StyledLabel>
                                <StyledTextField name="phoneNo" value={userInfo.phoneNo} onChange={handleChange} />
                            </Container>
                            <Container>
                                <StyledLabel>Email</StyledLabel>
                                <StyledTextField type='email' name="email" value={userInfo.email} onChange={handleChange} />
                            </Container>
                            <Container>
                                <StyledLabel>Role</StyledLabel>
                                <SelectRole userRoles={userRoles} setUserInfo={setUserInfo} selectedRole={userData.roleName} />
                            </Container>
                            <Container>
                                <StyledLabel>Status</StyledLabel>
                                <RadioBtnsContainer>
                                    <input
                                        style={{ marginRight: '5px', alignItems: 'center', accentColor: '#0d839252' }}
                                        type="radio"
                                        checked={userInfo?.status === 'A'}
                                        name="status"
                                        value="A"
                                        onChange={handleChange}
                                    /> Active
                                    <input
                                        style={{ marginRight: '5px', accentColor: '#0d839252' }}
                                        type="radio"
                                        checked={userInfo?.status === 'I'}
                                        name="status"
                                        value="I"
                                        onChange={handleChange}
                                    /> InActive
                                </RadioBtnsContainer>
                            </Container>
                        </DataContainer>
                    </div>
                    <LoginBtn onClick={handleSubmitClick}>Submit</LoginBtn>
                </Box>
            </Modal>
        </div>
    );
}

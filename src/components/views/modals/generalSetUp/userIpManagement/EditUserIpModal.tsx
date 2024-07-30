import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, DataContainer, LoginBtn, MainHeading, RadioBtnsContainer, StyledLabel, StyledTextField } from './EditUserIpModal.styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { GetAllWards, UpdateEditUserService } from '../../../../../services/generalSetUpServices/userIpManagementServices/UserIpManagementServices';

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
    const { ipWards, deptName, setUserInfo } = props;
    const [userDept, setUserDept] = useState<any>(deptName);

    const handleChange = (e: any) => {
        const selectedDept: any = e?.target?.value;
        if (selectedDept !== '') {
            const selectedDeptVal: any = ipWards?.find((dept: any) => dept.ward_name === selectedDept);
            if (selectedDeptVal) {
                const selectedDeptId = selectedDeptVal?.ward_id;
                setUserInfo((prevData: any) => ({
                    ...prevData,
                    department_Name: selectedDept,
                    deptId: selectedDeptId
                }));
                setUserDept(selectedDept);
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
                value={userDept}
                onChange={(e: any) => handleChange(e)}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 48 * 4.5 + 8,
                        }
                    }
                }}
            >
                {ipWards?.map((data: any, index: any) => (
                    <MenuItem sx={{ fontSize: '11px' }} key={index} value={data.ward_name}>{data.ward_name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default function EditUserIpModal(props: any) {

    const { id, userId, selectedRawId, userData, showModal, setShowModal } = props;

    const [ipWards, setIpWards] = useState<any>([]);
    const [userInfo, setUserInfo] = useState<any>({
        username: userData.username,
        department_Name: userData.department_Name,
        iP_Address: userData.iP_Address,
        status: userData.status,
        ward_name: userData.ward_name,
        deptId: null
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetAllWards();
                setIpWards(res?.data);
                let idObj: any = (res?.data).find((w: any) => w.ward_name === userData.ward_name);
                let id: any = idObj.ward_id;
                setUserInfo((prevData: any) => ({
                    ...prevData,
                    deptId: id
                }));
            } catch (err: any) {
                console.log("GetAllDepartments api err", err);
            }
        }
        if (userId === selectedRawId) {
            getData();
        }
    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserInfo((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleSubmitClick = async () => {
        try {
            const res: any = await UpdateEditUserService({ id: id, userData: { IP_Address: userInfo.iP_Address, DeptGroupId: userInfo.deptId, Status: userInfo.status } });
            if (res?.status === 200) {
                window.alert("User IP Updated Successfully :)");
                setShowModal(false);
            }
        } catch (err: any) {
            console.log("UpdateUserStatus api err", err);
        }
    }

    if (userId !== selectedRawId) return null;

    return (
        <div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>Edit User</MainHeading>
                    <div style={{ margin: '15px' }}>
                        <DataContainer>
                            <Container>
                                <StyledLabel>Username</StyledLabel>
                                <StyledTextField InputProps={{ readOnly: true }} name="username" value={userInfo.username} />
                            </Container>
                            <Container>
                                <StyledLabel>Ward Name</StyledLabel>
                                <SelectRole ipWards={ipWards} setUserInfo={setUserInfo} deptName={userData.ward_name} />
                            </Container>
                            <Container>
                                <StyledLabel>IP Address</StyledLabel>
                                <StyledTextField name="iP_Address" value={userInfo.iP_Address} onChange={handleChange} />
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
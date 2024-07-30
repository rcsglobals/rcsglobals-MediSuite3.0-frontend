import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { AssignUserIpService, GetAllWards, GetUserNamesSer } from '../../../../../services/generalSetUpServices/userIpManagementServices/UserIpManagementServices';
import { Container, DataContainer, LoginBtn, MainHeading, RadioBtnsContainer, StyledLabel, StyledTextField } from './AssignIpModal.styles';

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
    const { dropdown, options, handleUserName, handleDeptName } = props;
    const [selectedVal, setSelectedVal] = useState('');

    const handleChange = (e: any) => {
        const selectedValue = e.target.value;
        setSelectedVal(selectedValue);

        if (dropdown === 'usernames') {
            handleUserName(e);
        } else if (dropdown === 'departmentNames') {
            handleDeptName(e);
        }
    };

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
            <InputLabel required id="demo-select-small-label">Select</InputLabel>
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
                value={selectedVal}
                onChange={handleChange}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 48 * 4.5 + 8,
                        }
                    }
                }}
            >
                {options?.map((data: any, index: number) => (
                    dropdown === 'usernames' ?
                        <MenuItem sx={{ fontSize: '11px' }} key={index} value={data.username}>{data.username}</MenuItem> :
                        dropdown === 'departmentNames' &&
                        <MenuItem sx={{ fontSize: '11px' }} key={index} value={data.ward_name}>{data.ward_name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default function AssignIpModal(props: any) {

    const { showAssignIpModal, setShowAssignIpModal } = props;
    const [ipDepartments, setIpDepartments] = useState<any>([]);
    const [usernames, setUsernames] = useState<any>([]);
    const [ipInfo, setIpInfo] = useState<any>({
        username: '',
        userId: null,
        dept: '',
        deptId: null,
        ipAddress: '',
        status: ''
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const deptRes = await GetAllWards();
                setIpDepartments(deptRes?.data);
            } catch (err) {
                console.log("GetAllWards api error", err);
            }

            try {
                const userRes = await GetUserNamesSer();
                setUsernames(userRes?.data);
            } catch (err) {
                console.log("GetUserNamesSer api error", err);
            }
        };
        getData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setIpInfo((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleUserName = (event: any) => {
        const selectedUsername = event.target.value;
        const selectedUserVal = usernames.find((user: any) => user.username === selectedUsername);

        if (selectedUserVal) {
            setIpInfo((prevState: any) => ({
                ...prevState,
                username: selectedUsername,
                userId: selectedUserVal.userId
            }));
        }
    }

    const handleDeptName = (event: any) => {
        const selectedDeptName = event.target.value;
        const selectedDeptVal = ipDepartments.find((dept: any) => dept.ward_name === selectedDeptName);

        if (selectedDeptVal) {
            setIpInfo((prevState: any) => ({
                ...prevState,
                dept: selectedDeptName,
                deptId: selectedDeptVal.ward_id
            }));
        }
    }

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowAssignIpModal(false);
    };

    const handleSubmitClick = async () => {
        try {
            const res: any = await AssignUserIpService(ipInfo);
            if (res?.status === 200) {
                window.alert("IP Assign Successfully :)");
                setShowAssignIpModal(false);
            }
        } catch (err: any) {
            console.log("UpdateUserStatus api err", err);
        }
    }

    return (
        <div>
            <Modal
                open={showAssignIpModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>Assign IP</MainHeading>
                    <div style={{ margin: '15px' }}>
                        <DataContainer>
                            <Container>
                                <StyledLabel>Username</StyledLabel>
                                <SelectRole dropdown='usernames' options={usernames} handleUserName={handleUserName} handleDeptName={handleDeptName} />
                            </Container>
                            <Container>
                                <StyledLabel>Department Name</StyledLabel>
                                <SelectRole dropdown='departmentNames' options={ipDepartments} handleUserName={handleUserName} handleDeptName={handleDeptName} />
                            </Container>
                            <Container>
                                <StyledLabel>IP Address</StyledLabel>
                                <StyledTextField name="ipAddress" value={ipInfo.ipAddress} onChange={handleChange} />
                            </Container>
                            <Container>
                                <StyledLabel>Status</StyledLabel>
                                <RadioBtnsContainer>
                                    <input
                                        style={{ marginRight: '5px', alignItems: 'center', accentColor: '#0d839252' }}
                                        type="radio"
                                        checked={ipInfo.status === 'A'}
                                        name="status"
                                        value="A"
                                        onChange={handleChange}
                                    /> Active
                                    <input
                                        style={{ marginRight: '5px', accentColor: '#0d839252' }}
                                        type="radio"
                                        checked={ipInfo.status === 'I'}
                                        name="status"
                                        value="I"
                                        onChange={handleChange}
                                    /> Inactive
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
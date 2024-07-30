import { useState, useEffect } from 'react';
import { GetAllUserRoles, GetSearchedUsersSer, GetUserByStatus, GetUsersCountSer, UpdateUserStatus } from '../../../../../services/generalSetUpServices/userManagementServices/UserManagementServices';
import { ActionBtns, ActiveUserLink, Btns, BtnsContainer, CardContainer, Fullname, Heading, LeftContainer, MainContainer, MainHeadingCont, RightContainer, RightSubContainer, SearchContainer, UserDataRaw, Username } from './UserManagement.styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import UpdateUserInfoModal from '../../../modals/generalSetUp/userManagement/UpdateUserInfoModal';
import SearchBar from '../../../../common/search/SearchBar';
import Paper from '@mui/material/Paper';

const SelectRole = (props: any) => {

    const { userRoles, setSelectedModuleId, userId } = props;

    const handleChange = (e: any) => {
        const selectedModuleName: any = e?.target?.value;
        if (selectedModuleName !== '') {
            const selectedModuleVal: any = userRoles.find((role: any) => role.roleName === selectedModuleName);
            if (selectedModuleVal) {
                const selectedModuleId = selectedModuleVal?.roleId;
                setSelectedModuleId(
                    { moduleId: selectedModuleId, userId: userId }
                )
            }
        }
    }

    return (
        <>
            <FormControl
                sx={{
                    m: 1, minWidth: 120, backgroundColor: 'white', color: 'white', margin: '0px', borderRadius: '20px', padding: '5px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'grey',
                        },
                        '&:hover fieldset': {
                            borderColor: 'Grey',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#40b4c1',
                            borderRadius: '20px'
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
                        <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.roleName}>{data.roleName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default function UserManagement() {
    const [users, setUsers] = useState<any>([]);
    const [currUserType, setCurrUserType] = useState<any>('A');
    const [userRoles, setUserRoles] = useState<any>([]);
    const [selectedUser, setSelectedUser] = useState<any>({
        active: false,
        userId: null
    });
    const [reloadData, setReloadData] = useState<any>(false);
    const [selectedModuleId, setSelectedModuleId] = useState<any>([]);
    const [showModal, setShowModal] = useState<any>(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<any>([]);
    const [userCount, setUserCount] = useState<any>({});

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetUserByStatus(currUserType);
                setUsers(res?.data?.users);
                setFilteredUsers(res?.data?.users);
                setReloadData(false);
            } catch (err: any) {
                console.log("GetUserByStatus api err", err);
            }

            try {
                const res: any = await GetAllUserRoles();
                setUserRoles(res?.data);
            } catch (err: any) {
                console.log("GetAllUserRoles api err", err);
            }

            try {
                const res: any = await GetUsersCountSer();
                setUserCount(res?.data);
            } catch (err: any) {
                console.log("GetUsersCountSer api err", err);
            }
        }
        getData();
    }, [reloadData])

    const handleBtnClick = async (status: any) => {
        setCurrUserType(status);
        try {
            const res: any = await GetUserByStatus(status);
            setUsers(res?.data?.users);
            setFilteredUsers(res?.data?.users);
        } catch (err: any) {
            console.log("GetUserByStatus api err", err);
        }
    }

    const handleActiveClick = async (userId: any, status: any) => {
        setSelectedUser({
            active: true,
            userId: userId
        });
    }

    const handleSubmitClick = async (userId: any, status: any) => {
        try {
            const res: any = await UpdateUserStatus(userId, status, null);
            if (res?.status === 200) {
                window.alert("User status updated successfully...");
                setReloadData(true);
            }
        } catch (err: any) {
            console.log("UpdateUserStatus api err", err);
        }
    }

    const handleCancelClick = async (userId: any, status: any) => {
        try {
            const res: any = await UpdateUserStatus(userId, status, selectedModuleId?.moduleId);
            if (res?.status === 200) {
                window.alert("User status updated successfully...");
                setReloadData(true);
            }
        } catch (err: any) {
            console.log("UpdateUserStatus api err", err);
        }
    }

    const handleEditClick = async (userId: any, status: any) => {
        setShowModal(true);
        setSelectedUser({
            active: false,
            userId: userId
        });
    }

    const handleUpdateClick = async (userId: any, status: any) => {
        try {
            const res: any = await UpdateUserStatus(userId, status, null);
            if (res?.status === 200) {
                window.alert("User status updated successfully...");
                setReloadData(true);
            }
        } catch (err: any) {
            console.log("UpdateUserStatus api err", err);
        }
    }

    const handleSearchChange = async (e: any) => {
        const value = e?.target?.value;
        setSearchValue(value);
        if (value.trim() === '') {
            setFilteredUsers(users); // Show all data when search is empty
        } else {
            try {
                const res: any = await GetSearchedUsersSer(value);
                setFilteredUsers(res?.data); // Show filtered data
            } catch (err: any) {
                console.log("GetSearchedUsersSer api err", err);
            }
        }
    }

    return (
        <MainContainer>
            <LeftContainer>
                <div style={{ width: '100%', minWidth: '150px' }}>
                    <ActionBtns currUserType={currUserType} onClick={() => handleBtnClick('P')} style={{ backgroundColor: currUserType === 'P' ? '#40b4c1' : '#89828252', color: currUserType === 'P' ? 'white' : 'black' }}>Pending<span style={{ borderRadius: '10px', padding: '2px 5px', backgroundColor: '#80808085', margin: '0px 10px', fontWeight: '500' }}>{userCount.pendingCount}</span></ActionBtns>
                    <ActionBtns currUserType={currUserType} onClick={() => handleBtnClick('A')} style={{ backgroundColor: currUserType === 'A' ? '#40b4c1' : '#89828252', color: currUserType === 'A' ? 'white' : 'black' }}>Active<span style={{ borderRadius: '10px', padding: '2px 5px', backgroundColor: '#80808085', margin: '0px 10px', fontWeight: '500' }}>{userCount.activeCount}</span></ActionBtns>
                    <ActionBtns currUserType={currUserType} onClick={() => handleBtnClick('I')} style={{ backgroundColor: currUserType === 'I' ? '#40b4c1' : '#89828252', color: currUserType === 'I' ? 'white' : 'black' }}>Inactive<span style={{ borderRadius: '10px', padding: '2px 5px', backgroundColor: '#80808085', margin: '0px 10px', fontWeight: '500' }}>{userCount.inactiveCount}</span></ActionBtns>
                </div>
            </LeftContainer>
            <RightContainer>
                <MainHeadingCont>
                    <Heading>User Management</Heading>
                    <div style={{ textAlign: 'right' }}>
                        <SearchContainer>
                            <SearchBar page='userManagement' searchValue={searchValue} handleSearchChange={handleSearchChange} />
                        </SearchContainer>
                    </div>
                </MainHeadingCont>
                <RightSubContainer>
                    {filteredUsers?.map((item: any, index: any) => (
                        <Paper elevation={5}>
                            <CardContainer key={index}>
                                <UserDataRaw>
                                    <Username>{item.username}</Username>
                                    <Fullname>{item.fullname || ""}</Fullname>
                                </UserDataRaw>
                                <div style={{ textAlign: 'right', padding: '0px 5px' }}>{item.user_id}</div>
                                {currUserType === 'P' &&
                                    <div>
                                        <ActiveUserLink onClick={() => handleActiveClick(item.user_id, 'A')}>
                                            <span style={{ borderBottom: '1px solid green' }}>Activate User</span>
                                        </ActiveUserLink>
                                        {
                                            (selectedUser.active && selectedUser.userId === item.user_id) &&
                                            <div style={{ paddingTop: '5px' }}>
                                                <SelectRole userRoles={userRoles} setSelectedModuleId={setSelectedModuleId} userId={item.user_id} />
                                            </div>
                                        }
                                    </div>
                                }
                                <div>
                                    <BtnsContainer>
                                        {
                                            (selectedUser.active && selectedUser.userId === item.user_id && currUserType === 'P') &&
                                            <Btns style={{ color: '#40b4c1', margin: '0px 10px' }} onClick={() => handleSubmitClick(item.user_id, 'A')}>Submit</Btns>
                                        }
                                        {
                                            currUserType === 'P' &&
                                            <Btns style={{ color: 'red' }} onClick={() => handleCancelClick(item.user_id, 'I')}>Cancel</Btns>
                                        }
                                    </BtnsContainer>
                                    {
                                        currUserType === 'A' &&
                                        (
                                            <>
                                                <Btns style={{ color: 'red', padding: '5px', textAlign: 'right' }} onClick={() => handleEditClick(item.user_id, 'I')}>Edit</Btns>
                                                {
                                                    showModal &&
                                                    <UpdateUserInfoModal userData={{ username: item.username, fullname: item.fullname, phoneNo: item.phoneNo, email: item.email, roleName: item.role_name, status: item.status, roleId: item.role_id }} showModal={showModal} setShowModal={setShowModal} userId={item.user_id} selectedUser={selectedUser.userId} userRoles={userRoles} />
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        currUserType === 'I' &&
                                        <Btns style={{ color: 'red', padding: '5px', textAlign: 'right' }} onClick={() => handleUpdateClick(item.user_id, 'A')}>Update</Btns>
                                    }
                                </div>
                            </CardContainer>
                        </Paper>
                    ))}
                </RightSubContainer>
            </RightContainer>
        </MainContainer>
    );
}
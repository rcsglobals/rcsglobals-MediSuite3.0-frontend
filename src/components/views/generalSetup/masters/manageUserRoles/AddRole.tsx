import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetActiveModules, GetAllUserRoles, GetModuleByName } from '../../../../../services/generalSetUpServices/manageUserRolesServices/ManageUserRoleSercices';
import UserRoleMgmtImg from '../../../../images/ManageUsersIcon.png';
import { TableCellData } from './AddRole.styles';
import SearchBar from '../../../../common/search/SearchBar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuDetailsModal } from '../../../modals/generalSetUp/manageUserRoles/MenuDetailsModal';
import AddIcon from '@mui/icons-material/Add';
import AddNewRoleModal from '../../../modals/generalSetUp/manageUserRoles/AddNewRoleModal';
import EditRoleModal from '../../../modals/generalSetUp/manageUserRoles/EditRoleModal';

const SelectModule = (props: any) => {

    const { activeModules, setSelectedModuleId, roleId } = props;

    const handleChange = (e: any) => {
        const selectedModuleName: any = e?.target?.value;
        if (selectedModuleName !== '') {
            const selectedModuleVal: any = activeModules.find((module: any) => module.moduleName === selectedModuleName);
            if (selectedModuleVal) {
                const selectedModuleId = selectedModuleVal?.moduleId;
                setSelectedModuleId((prevData: any) => [
                    ...prevData,
                    { moduleId: selectedModuleId, roleId: roleId }
                ])
            }
        }
    }

    return (
        <>
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
                    {activeModules?.map((data: any, index: any) => (
                        <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.moduleName}>{data.moduleName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default function AddRole() {
    const [allUserRoles, setAllUsersRoles] = useState<any>([]);
    const [activeModules, setActiveModules] = useState<any>([]);
    const [showModal, setShowModal] = useState<any>(false);
    const [selectedRawId, setSelectedRawId] = useState<any>(null); // set on click on manageMenu click nd use for show the modal for particular raw.
    const [selectedRoleId, setSelectedRoleId] = useState<any>(null); // set on checkbox click nd use for edit or delete the selected role
    const [selectedModuleId, setSelectedModuleId] = useState<any>([]); // set on select the module from dpdwn nd use for see the related menus in pop over
    const [showAddRole, setShowAddRole] = useState(false);
    const [showEditRole, setShowEditRole] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredUserRoles, setFilteredUserRoles] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetAllUserRoles();
                setAllUsersRoles(res?.data);
                setFilteredUserRoles(res?.data); // Initialize filtered roles
            } catch (err: any) {
                console.log("getAllUserRoles api err", err);
            }

            try {
                const res: any = await GetActiveModules();
                setActiveModules(res?.data);
            } catch (err: any) {
                console.log("getActiveModules api err", err);
            }
        }
        getData();
    }, [])

    const handleEditRole = async (selectedRoleId: any) => {
        setSelectedRawId(selectedRoleId);
        setSelectedRoleId(selectedRoleId);
        setShowEditRole(true);
    }

    const handleAddRoleIconClick = () => {
        setShowAddRole(true);
    }

    const handleSearchChange = async (e: any) => {
        const value = e?.target?.value;
        setSearchValue(value);
        if (value.trim() === '') {
            setFilteredUserRoles(allUserRoles); // Show all data when search is empty
        } else {
            try {
                const res: any = await GetModuleByName(value);
                setFilteredUserRoles(res?.data); // Show filtered data
            } catch (err: any) {
                console.log("getModuleByName api err", err);
            }
        }
    };

    const handleManageMenu = (roleId: any) => {
        setSelectedRawId(roleId);
        let filteredObjects: any = selectedModuleId?.filter((obj: any) => obj.roleId === roleId);
        if (filteredObjects[0]?.roleId === roleId) {
            setShowModal(true);
        } else {
            window?.alert("please select module");
        }
    }

    return (
        <div style={{ padding: '10px', backgroundColor: '#e0e0e05e' }}>
            <div style={{ border: '1px solid transparent', height: '', backgroundColor: '#55c79c', padding: '0px 10px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={UserRoleMgmtImg} height='40px' />
                    <div style={{ fontSize: '25px', fontWeight: '700', color: 'white', padding: '0px 10px' }}>Manage User Roles</div>
                </div>
                <SearchBar page='addRole' searchValue={searchValue} handleSearchChange={handleSearchChange} />
            </div>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                <div style={{ border: '1px solid transparent', width: '4.5vw', minWidth: '60px', height: 'calc(100vh - 25vh)', backgroundColor: '#55c79c', padding: '10px 0px', textAlign: 'center' }}>
                </div>
                <div style={{ marginLeft: '2%', flexGrow: 1, paddingTop: '5px' }}>
                    <div style={{ position: 'relative', float: 'right', display: 'flex', textAlign: 'center', alignItems: 'center', padding: '3px 20px 3px 10px', minWidth: '100px', fontSize: '13px', borderRadius: '20px', cursor: 'pointer', backgroundColor: '#566f82', color: 'white', width: 'fit-content', margin: '5px 3% 10px 3%' }} onClick={() => handleAddRoleIconClick()}>
                        <AddIcon fontSize='small' sx={{ width: '15px', height: '15px', padding: '5px' }} /> Add Role
                    </div>
                    {
                        showAddRole && <AddNewRoleModal showAddRole={showAddRole} setShowAddRole={setShowAddRole} />
                    }
                    <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 30vh)' }}>
                        <Table sx={{ minWidth: 650, overflowX: 'auto' }} stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '15px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '10%' }}>S.No</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '15px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '30%' }}>Role Name</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '20%' }}>Select Module</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '10%' }}>Status</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '10%' }}>Edit</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '20%' }}>View Menu</TableCellData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUserRoles?.map((row: any, index: any) => (
                                    (<TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: '0px', width: '100%' }}
                                    >
                                        <TableCellData align="center" style={{ padding: '0px', width: '10%' }}>
                                            {index + 1}
                                        </TableCellData>
                                        <TableCellData style={{ fontSize: '13px', width: '30%' }} align="center">{row.roleName}</TableCellData>
                                        <TableCellData style={{ width: '20%' }} align="center">
                                            <SelectModule activeModules={activeModules} setSelectedModuleId={setSelectedModuleId} roleId={row.roleId} />
                                        </TableCellData>
                                        <TableCellData style={{ minWidth: '100px', padding: '0px 20px', width: '10%' }} align="center"><div style={{ padding: '5px', backgroundColor: '#28a745', borderRadius: '20px', color: 'white' }}>{row.status === 'A' ? 'Active' : 'InActive'}</div></TableCellData>
                                        <TableCellData style={{ minWidth: '100px', padding: '0px 20px', width: '10%' }} align="center">
                                            <div style={{ padding: '5px', backgroundColor: '#566f82', borderRadius: '20px', color: 'white', cursor: 'pointer' }} onClick={() => handleEditRole(row.roleId)}>Edit</div>
                                            {
                                                showEditRole && <EditRoleModal roleId={row?.roleId} selectedRawId={selectedRawId} showEditRole={showEditRole} setShowEditRole={setShowEditRole} selectedRoleId={selectedRoleId} />
                                            }
                                        </TableCellData>
                                        <TableCellData style={{ padding: '0px 30px 0px 7%', width: '20%', minWidth: '180px' }} align="center">
                                            <div style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#840e779e', color: 'white' }} onClick={() => handleManageMenu(row.roleId)}>Manage Menu</div>
                                            {
                                                showModal && <MenuDetailsModal selectedModuleId={selectedModuleId} roleId={row?.roleId} selectedRawId={selectedRawId} showModal={showModal} setShowModal={setShowModal} />
                                            }
                                        </TableCellData>
                                    </TableRow>)
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}
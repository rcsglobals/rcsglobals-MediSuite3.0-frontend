import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserRoleMgmtImg from '../../../../images/ManageUsersIcon.png';
import SearchBar from '../../../../common/search/SearchBar';
import { TableCellData } from './UserIpMgmt.styles';
import { GetAssignIpUsers, GetSearchUserIp } from '../../../../../services/generalSetUpServices/userIpManagementServices/UserIpManagementServices';
import EditUserIpModal from '../../../modals/generalSetUp/userIpManagement/EditUserIpModal';
import AssignIpModal from '../../../modals/generalSetUp/userIpManagement/AssignIpModal';

export default function UserIpManagement() {
    const [assignIpUsers, setAssignIpUsers] = useState<any>([]);
    const [selectedRawId, setSelectedRawId] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showAssignIpModal, setShowAssignIpModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredUserRoles, setFilteredUserRoles] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetAssignIpUsers();
                setAssignIpUsers(res?.data);
                setFilteredUserRoles(res?.data); // Initialize filtered roles
            } catch (err: any) {
                console.log("GetAssignIpUsers api err", err);
            }
        }
        getData();
    }, [])

    const handleEditRole = async (userId: any) => {
        setSelectedRawId(userId);
        setShowModal(true);
    }

    const handleAssignIpClick = () => {
        setShowAssignIpModal(true);
    }

    const handleSearchChange = async (e: any) => {
        const value = e?.target?.value;
        setSearchValue(value);
        if (value.trim() === '') {
            setFilteredUserRoles(assignIpUsers); // Show all data when search is empty
        } else {
            try {
                const res: any = await GetSearchUserIp(value);
                setFilteredUserRoles(res?.data); // Show filtered data
            } catch (err: any) {
                console.log("GetSearchUserIp api err", err);
            }
        }
    };

    return (
        <div style={{ padding: '10px', backgroundColor: '#e0e0e05e' }}>
            <div style={{ border: '1px solid transparent', height: '', backgroundColor: '#55c79c', padding: '0px 10px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={UserRoleMgmtImg} height='40px' />
                    <div style={{ fontSize: '25px', fontWeight: '700', color: 'white', padding: '0px 10px' }}>User IP Management</div>
                </div>
                <SearchBar page='userIpManagement' searchValue={searchValue} handleSearchChange={handleSearchChange} />
            </div>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                <div style={{ border: '1px solid transparent', width: '4.5vw', minWidth: '60px', height: 'calc(100vh - 25vh)', backgroundColor: '#55c79c', padding: '10px 0px', textAlign: 'center' }}>
                </div>
                <div style={{ marginLeft: '2%', flexGrow: 1, paddingTop: '5px' }}>
                    <div style={{ position: 'relative', float: 'right', display: 'flex', textAlign: 'center', alignItems: 'center', padding: '5px 20px', fontSize: '13px', borderRadius: '20px', cursor: 'pointer', backgroundColor: '#566f82', color: 'white', width: 'fit-content', margin: '5px 3% 10px 3%' }} onClick={() => handleAssignIpClick()}>
                        Assign IP
                    </div>
                    {
                        showAssignIpModal && <AssignIpModal showAssignIpModal={showAssignIpModal} setShowAssignIpModal={setShowAssignIpModal} />
                    }
                    <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 30vh)', maxWidth: '90vw' }}>
                        <Table sx={{ minWidth: 650, overflowX: 'auto' }} stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '15px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>S.No</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '15px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Employee Name</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Department Name</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Ward Name</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Floor</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Username</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>IP Address</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Status</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Edit</TableCellData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUserRoles?.map((row: any, index: any) => (
                                    (<TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: '0px', width: '100%' }}
                                    >
                                        <TableCellData style={{ padding: '0px' }} align="center">{index + 1}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.empName}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.department_Name}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.ward_name}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.floor_name}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.username}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.iP_Address}</TableCellData>
                                        <TableCellData style={{ padding: '0px' }} align="center">{row.status}</TableCellData>
                                        <TableCellData style={{ minWidth: '50px', padding: '2px 20px' }} align="center">
                                            <div style={{ padding: '5px', backgroundColor: '#566f82', borderRadius: '20px', color: 'white', cursor: 'pointer' }} onClick={() => handleEditRole(row.userId)}>Edit</div>
                                            {
                                                showModal && <EditUserIpModal id={row?.id} userId={row?.userId} selectedRawId={selectedRawId} userData={{ username: row.username, department_Name: row.department_Name, iP_Address: row.iP_Address, status: row.status, ward_name: row.ward_name }} showModal={showModal} setShowModal={setShowModal} />
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
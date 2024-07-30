import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { AssignMenuByRole, GetMenuByModuleId, RemoveMenuByRole } from '../../../../../services/generalSetUpServices/manageUserRolesServices/ManageUserRoleSercices';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    maxHeight: '90vh',
    overflowY: 'auto'
};

export const MenuDetailsModal = (props: any) => {
    const { showModal, setShowModal, roleId, selectedRawId, selectedModuleId } = props;
    const [menus, setMenus] = useState<any>({});
    const [assignedMenuGrp, setAssignedMenuGrp] = useState<any>('M');
    const [unAssignedMenuGrp, setUnAssignedMenuGrp] = useState<any>('');
    const [reloadData, setReloadData] = useState<any>(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetMenuByModuleId(selectedModuleId?.filter((obj: any) => obj.roleId === roleId));
                setMenus(res?.data);
                setReloadData(false);
            } catch (err: any) {
                console.log("GetMenuByModuleId API error", err);
            }
        };

        if (roleId === selectedRawId) {
            getData();
        }
    }, [roleId, selectedRawId, reloadData]);

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleAssignedMenu = async (roleMenuId: any) => {
        try {
            const res: any = await RemoveMenuByRole(roleMenuId);
            if (res?.status === 200) {
                window.alert("Menu removed successfully :)");
                setReloadData(true);
            } else {
                window.alert("Some pblm occured")
            }
        } catch (err: any) {
            console.log("Error in RemoveMenuByRole", err);
        }
    };

    const handleUnAssignedMenu = async (menuIds: any, roleId: any) => {
        try {
            const res: any = await AssignMenuByRole({ menuIds, roleId });
            if (res?.status === 200) {
                window.alert("Menu assigned successfully :)");
                setReloadData(true);
            } else {
                window.alert("Some pblm occured")
            }
        } catch (err: any) {
            console.log("Error in AssignMenuByRole", err);
        }
    };

    const handleAssignedMenuGrp = (menuGrp: any) => {
        setAssignedMenuGrp(menuGrp);
    }

    const handleUnAssignedMenuGrp = (menuGrp: any) => {
        setUnAssignedMenuGrp(menuGrp);
    }

    if (roleId !== selectedRawId) return null;

    return (
        <div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseIcon onClick={handleClose} style={{ cursor: 'pointer', float: 'right' }} />
                    <div style={{ padding: '20px' }}>
                        <div style={{ backgroundColor: '#e0e0e057', padding: '10px' }}>
                            <div style={{ color: 'grey', fontSize: '15px', fontWeight: '500' }}>Assigned Menus</div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ padding: '5px 10px', backgroundColor: assignedMenuGrp === 'M' ? '#40b4c1' : '#566f82', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '13px', margin: '5px' }} onClick={() => handleAssignedMenuGrp('M')}>Masters</div>
                                <div style={{ padding: '5px 10px', backgroundColor: assignedMenuGrp === 'T' ? '#40b4c1' : '#566f82', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '13px', margin: '5px' }} onClick={() => handleAssignedMenuGrp('T')}>Transactions</div>
                                <div style={{ padding: '5px 10px', backgroundColor: assignedMenuGrp === 'R' ? '#40b4c1' : '#566f82', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '13px', margin: '5px' }} onClick={() => handleAssignedMenuGrp('R')}>Reports</div>
                            </div>
                            <div style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', maxHeight: '300px', overflowY: 'auto' }}>
                                {menus?.assignedMenus?.length > 0 ? (
                                    menus.assignedMenus.map((item: any, index: any) => (
                                        item?.menuGroup === assignedMenuGrp && (<div key={index} style={{ padding: '3px 8px 3px 5px', fontSize: '13px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#973131', color: 'white', display: 'flex', alignItems: 'center', width: 'fit-content', margin: '5px' }} onClick={() => handleAssignedMenu(item?.roleMenuId)}>
                                            <ClearIcon fontSize='small' sx={{ width: '15px', height: '15px' }} />
                                            {item?.menuName}
                                        </div>)
                                    ))
                                ) : (
                                    <div>No assigned menus</div>
                                )}
                            </div>
                            <div style={{ color: 'grey', fontSize: '15px', fontWeight: '500' }}>Unassigned Menus</div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ padding: '5px 10px', backgroundColor: unAssignedMenuGrp === 'M' ? '#40b4c1' : '#566f82', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '13px', margin: '5px' }} onClick={() => handleUnAssignedMenuGrp('M')}>Masters</div>
                                <div style={{ padding: '5px 10px', backgroundColor: unAssignedMenuGrp === 'T' ? '#40b4c1' : '#566f82', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '13px', margin: '5px' }} onClick={() => handleUnAssignedMenuGrp('T')}>Transactions</div>
                                <div style={{ padding: '5px 10px', backgroundColor: unAssignedMenuGrp === 'R' ? '#40b4c1' : '#566f82', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '13px', margin: '5px' }} onClick={() => handleUnAssignedMenuGrp('R')}>Reports</div>
                            </div>
                            <div style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', maxHeight: '300px', overflowY: 'auto' }}>
                                {menus?.unassignedMenus?.length > 0 ? (
                                    menus.unassignedMenus.map((item: any, index: any) => (
                                        item?.menuStage === unAssignedMenuGrp && (<div key={index} style={{ padding: '3px 8px 3px 5px', fontSize: '13px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#134f07e3', color: 'white', display: 'flex', alignItems: 'center', width: 'fit-content', margin: '5px' }} onClick={() => handleUnAssignedMenu([item?.menuId], roleId)}>
                                            <AddIcon fontSize='small' sx={{ width: '15px', height: '15px' }} />
                                            {item?.menuName}
                                        </div>)
                                    ))
                                ) : (
                                    <div>No assigned menus</div>
                                )}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};
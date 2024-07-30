import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { ApproveUserService, CancelUserService } from '../../../services/opdServices/serviceAckServices/ServiceAckServices';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px 15px',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

export default function ServiceAckActionModal(props: any) {
    const [selectedBillingIds, setSelectedBillingIds] = useState<number[]>([]);

    const { serviceData, setIsDataChange, selectedRowReceiptNo, openModal, setOpenModal } = props;

    const handleClose = (e: any) => {
        e.stopPropagation();
        setOpenModal(false);
    };

    // const handleCloseClick = (e: any) => {
    //     e.stopPropagation();
    //     setOpenModal(false);
    // }

    const handleApprovedClick = async (selectedBillingIds: any) => {
        let res: any = await ApproveUserService(selectedBillingIds);
        if (res?.status === 200) {
            window.alert("Your Service Successfully Approved :)");
            setSelectedBillingIds([]);
            setOpenModal(false);
            setIsDataChange(true);
        } else {
            window.alert("Some Problem Occured");
        }
    }
    const handleCancelClick = async (selectedBillingIds: any) => {
        let res: any = await CancelUserService(selectedBillingIds);
        if (res?.status === 200) {
            window.alert("Your Service Successfully Cancel :)");
            setSelectedBillingIds([]);
            setOpenModal(false);
            setIsDataChange(true);
        } else {
            window.alert("Some Problem Occured");
        }
    }

    const handleCheckboxChange = (index: number) => {
        setSelectedBillingIds((prevSelectedRows) => {
            if (prevSelectedRows.includes(index)) {
                return prevSelectedRows.filter((row) => row !== index);
            } else {
                return [...prevSelectedRows, index];
            }
        });
    };

    if (serviceData.ReceiptNo !== selectedRowReceiptNo) return null;

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    '& .css-f6r2a3': {
                        border: 'none !important'
                    }
                }}
            >
                <Box sx={style}>
                    {/* <CloseIcon onClick={handleCloseClick} style={{ cursor: 'pointer', float: 'right' }} /> */}
                    {(serviceData?.Services).length > 0 ?
                        <><table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#566f82', color: 'white' }}>
                                    <th style={{ padding: '5px 10px', fontWeight: '400', fontSize: '13px' }}>Select</th>
                                    <th style={{ padding: '5px 10px', fontWeight: '400', fontSize: '13px' }}>Service Name</th>
                                    <th style={{ padding: '5px 10px', fontWeight: '400', fontSize: '13px' }}>Service Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(serviceData.Services).map((item: any, index: any) => (
                                    <tr>
                                        <td style={{ padding: '5px', fontSize: '13px', textAlign: 'center' }}>
                                            <input
                                                type='checkbox'
                                                checked={selectedBillingIds.includes(item.billingDetailId)}
                                                onChange={() => handleCheckboxChange(item.billingDetailId)}
                                            />
                                        </td>
                                        <td style={{ padding: '5px', fontSize: '13px', textAlign: 'center' }}>{item.service}</td>
                                        <td style={{ padding: '5px', fontSize: '13px', textAlign: 'center' }}>{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            {/* <div style={{ fontSize: '13px' }}>{`Acked By : ${serviceData.ActionedBy}`}</div> */}
                        </>
                        :
                        <tbody><tr><td>No Data Found</td></tr></tbody>
                    }
                    <div style={{ padding: '5px', fontSize: '13px', display: 'flex' }}>
                        <div style={{ padding: '5px 8px', cursor: 'pointer', backgroundColor: '#840e779e', color: 'white', textAlign: 'center', margin: '0px 5px' }} onClick={() => handleApprovedClick(selectedBillingIds)}>Approved</div>
                        <div style={{ padding: '5px 8px', cursor: 'pointer', backgroundColor: '#840e779e', color: 'white', textAlign: 'center', margin: '0px 5px' }} onClick={() => handleCancelClick(selectedBillingIds)}>Cancel</div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
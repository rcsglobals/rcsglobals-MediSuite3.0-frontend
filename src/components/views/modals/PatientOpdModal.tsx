import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { GetPatientOpds } from '../../../services/eOpdServices/PfrService';
import { FormatDate } from '../../../utils/FormatDate';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px 15px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

export default function PatientOpdModal(props: any) {

    const { rowData, selectedOpdNo, showOpds, setShowOpds } = props;
    const [opdData, setOpdData] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            let res: any = await GetPatientOpds(rowData?.patientId);
            if (res?.status === 200) {
                setOpdData(res?.data);
            }
        }
        if (rowData?.opdNo === selectedOpdNo) {
            getData();
        }
    }, [])

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowOpds(false);
    };

    const handleCloseClick = (e: any) => {
        e.stopPropagation();
        setShowOpds(false);
    }

    const handleOpdPrint = (opdNo: any, doctor_name: any, opd_type: any) => {
        const windowFeatures = "left=100,top=100,width=620,height=580";
        const url = `/opdPrint?opdNo=${encodeURIComponent(opdNo)}&doctor_name=${encodeURIComponent(doctor_name)}&opd_type=${encodeURIComponent(opd_type)}`;
        window.open(url, "popup", windowFeatures);
    }

    if (rowData.opdNo !== selectedOpdNo) return null;

    return (
        <div>
            <Modal
                open={showOpds}
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
                    <CloseIcon onClick={handleCloseClick} style={{ cursor: 'pointer', float: 'right' }} />
                    {(opdData?.diagnoses) ? <><table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#566f82', color: 'white' }}>
                                <th style={{ padding: '5px 10px', fontWeight: '400', fontSize: '13px' }}>S.No</th>
                                <th style={{ padding: '5px 10px', fontWeight: '400', fontSize: '13px' }}>OPD No</th>
                                <th style={{ padding: '5px 10px', fontWeight: '400', fontSize: '13px' }}>Created OPD Date</th>
                                <th style={{ padding: '5px 10px', fontWeight: '400', fontSize: '13px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(opdData?.diagnoses).map((item: any, index: any) => (
                                <tr key={item?.opdNo}>
                                    <td style={{ padding: '5px', fontSize: '13px', textAlign: 'center' }}>{index + 1}</td>
                                    <td style={{ padding: '5px', fontSize: '13px', textAlign: 'center' }}>{item.opdNo}</td>
                                    <td style={{ padding: '5px', fontSize: '13px', textAlign: 'center' }}>{FormatDate(item?.opdDate)}</td>
                                    <td style={{ padding: '5px', fontSize: '13px' }}>
                                        <div style={{ padding: '3px 8px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#840e779e', color: 'white', textAlign: 'center' }} onClick={() => handleOpdPrint(item?.opdNo, rowData?.doctorName, rowData?.opdType)}>Print</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table><div style={{ fontSize: '13px' }}>{`Total OPD's : ${opdData?.totalCount}`}</div></> :
                        <tbody><tr><td>No Data Found</td></tr></tbody>
                    }
                </Box>
            </Modal>
        </div>
    );
}
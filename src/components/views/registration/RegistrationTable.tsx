import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { OPDSearchPatientService } from '../../../services/registrationService/opdRegistrationService/OPDSearchPatientService';
import { useHistory } from 'react-router-dom';
import { FormatDate } from '../../../utils/FormatDate';
import { TableCellData } from './RegistrationTable.styles';

interface Data {
    id: number;
    s_no: number;
    action: string;
    patient_id: number;
    edit_patient_reg_date: string;
    // family_members: string;
    name: number;
    father_name: string;
    contact_number: number;
}

function createData(
    id: number,
    s_no: number,
    action: string,
    patient_id: number,
    edit_patient_reg_date: string,
    // family_members: string,
    name: number,
    father_name: string,
    contact_number: number
): Data {
    return {
        id,
        s_no,
        action,
        patient_id,
        edit_patient_reg_date,
        // family_members,
        name,
        father_name,
        contact_number
    };
}

const style = {
    top: '50%',
    left: '50%',
    width: '60%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute' as 'absolute',
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'auto',
};

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 's_no',
        numeric: false,
        disablePadding: true,
        label: 'S.No',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: true,
        label: 'Action',
    },
    {
        id: 'patient_id',
        numeric: true,
        disablePadding: false,
        label: 'Patient Id',
    },
    {
        id: 'edit_patient_reg_date',
        numeric: false,
        disablePadding: false,
        label: 'Registration Date',
    },
    // {
    //     id: 'family_members',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Family Members',
    // },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Patient Name',
    },
    {
        id: 'father_name',
        numeric: true,
        disablePadding: false,
        label: 'Father Name',
    },
    {
        id: 'contact_number',
        numeric: true,
        disablePadding: false,
        label: 'Contact Number',
    }
];

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCellData
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        style={{ backgroundColor: '#40c18e', color: 'white', textAlign: 'center' }}
                    >
                        {headCell.label}
                    </TableCellData>
                ))}
            </TableRow>
        </TableHead>
    );
}

const RegistrationTable = (props: any) => {

    const [selected, setSelected] = useState<readonly number[]>([]);
    const [rows, setRows] = useState<any>([]);
    const history: any = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const opdSearchPatientServiceRes: any = await OPDSearchPatientService(props.serachCritiria);
                const mappedData = opdSearchPatientServiceRes.data.map((item: any, index: number) =>
                    createData(
                        index + 1,
                        item.s_no,
                        item.action,
                        item.patient_id,
                        item.registration_date,
                        // item.family_member,
                        item.first_name,
                        item.father_spouse_name,
                        item.phone_no
                    )
                );
                setRows(mappedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleCloseIconClick = () => {
        props.setShowTable(false);
    }

    const handleSelectClick = (patientId: any) => {
        const isUseAuthorized: any = Object.values(props?.userMenu).some((value: any) => value?.uiRoute == '/opdRegistration/:patientId');
        isUseAuthorized && history.push(`/opdRegistration/${patientId}`);
        //  isUseAuthorized && history.push('/opdRegistration', { patientId: patientId });
    }


    return (
        <>
            <Modal open={true} onClose={() => props.setShowTable(false)} >
                <Box sx={style}>
                    <Paper>
                        <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                            <CloseIcon onClick={handleCloseIconClick} style={{ cursor: 'pointer', float: 'right', padding: '5px' }} />
                        </div>
                        <TableContainer sx={{ maxHeight: 400 }}>
                            <Table
                                sx={{ minWidth: 350 }}
                                aria-labelledby="tableTitle"
                                stickyHeader
                            >
                                <EnhancedTableHead />
                                <TableBody>
                                    {rows.map((row: any, index: any) => {
                                        const isItemSelected = isSelected(row.id);
                                        return (
                                            <TableRow
                                                hover
                                                aria-checked={isItemSelected}
                                                // tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCellData align='center'>
                                                    {index + 1}
                                                </TableCellData>
                                                <TableCellData align='center'><div onClick={() => handleSelectClick(row.patient_id)} style={{ color: 'purple', cursor: 'pointer' }}>Select</div></TableCellData>
                                                <TableCellData align='center'>{row.patient_id}</TableCellData>
                                                <TableCellData align='center'>{FormatDate(row.edit_patient_reg_date)}</TableCellData>
                                                {/* <TableCell>Manage</TableCell> */}
                                                <TableCellData align='center'>{row.name}</TableCellData>
                                                <TableCellData align='center'>{row.father_name}</TableCellData>
                                                <TableCellData align='center'>{row.contact_number}</TableCellData>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Modal>
        </>
    );
};

export default RegistrationTable;
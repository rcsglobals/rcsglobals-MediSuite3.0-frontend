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
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import { DoctorAvailableService } from '../../../services/dropdownService/opdRegDropdownServive/DoctorAvblService';
import { SubmitBtn, TableCellData } from './OPDDoctorScheduleTable.styles';
import { connect } from 'react-redux';
import { setSelectedDoctor, setBillingData } from '../../../redux/actions/OpdRegAction';
import { CheckOpdValidDaysService } from '../../../services/registrationService/opdRegistrationService/patientDetalService/PatientDetailService';

interface Data {
    id: number;
    doctor_id: number;
    doctor_name: string;
    consultation_fee: number;
    unit_name: string;
    from_date: string;
    to_date: string;
    todayOpd: number;
}

function createData(
    id: number,
    doctor_id: number,
    doctor_name: string,
    consultation_fee: number,
    unit_name: string,
    from_date: string,
    to_date: string,
    todayOpd: number
): Data {
    return {
        id,
        doctor_id,
        doctor_name,
        consultation_fee,
        unit_name,
        from_date,
        to_date,
        todayOpd
    };
}

const style = {
    top: '50%',
    left: '50%',
    width: '60%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute' as 'absolute',
    // height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'auto'
};

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'doctor_name',
        numeric: false,
        disablePadding: true,
        label: 'Doctor Name',
    },
    {
        id: 'consultation_fee',
        numeric: true,
        disablePadding: false,
        label: 'Consultation Fee',
    },
    {
        id: 'unit_name',
        numeric: false,
        disablePadding: false,
        label: 'Unit Name',
    },
    {
        id: 'from_date',
        numeric: false,
        disablePadding: false,
        label: 'Available From',
    },
    {
        id: 'to_date',
        numeric: false,
        disablePadding: false,
        label: 'Available To',
    },
    {
        id: 'todayOpd',
        numeric: true,
        disablePadding: false,
        label: 'Today OPD',
    }
];

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCellData padding="checkbox" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40c18e', color: 'white', padding: 'normal' }}>Select
                </TableCellData>
                {headCells.map((headCell) => (
                    <TableCellData
                        key={headCell.id}
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
                        style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40c18e', color: 'white', padding: 'normal' }}
                    >
                        {headCell.label}
                    </TableCellData>
                ))}
            </TableRow>
        </TableHead>
    );
}

const OPDDoctorScheduleTable = (props: any) => {

    const [selected, setSelected] = useState<readonly number[]>([]);
    const [rows, setRows] = useState<any>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<any>([]);
    const [isValidDay, setIsValidDay] = useState<any>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorAvblServiceRes: any = await DoctorAvailableService(props.selectedDropdownValues);
                const mappedData = doctorAvblServiceRes.data.map((item: any, index: number) =>
                    createData(
                        index + 1,
                        item.doctor_id,
                        item.doctor_name,
                        item.consultation_fee,
                        item.unit_name,
                        item.from_date,
                        item.to_date,
                        item.todayOpd
                    )
                );
                setRows(mappedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCheckBoxClick = (doctor_name: any, consultation_fee: any, id: number, doctor_id: any) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        setSelectedDoctor({
            id: id,
            doctor_id: doctor_id,
            doctor_name: doctor_name,
            consultation_fee: consultation_fee,
            max_discount_per_unit: 0,
            quantity: 1,
            discount: null,
            remark: '',
            discount_unit_price: 0,
            total_discount: 0,
            total_price: consultation_fee - 0
        })
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleCloseIconClick = () => {
        props.setShowTable(false);
    }

    const handleSubmitClick = () => {
        props.setShowTable(false);
        let updatedSelectedDoctor: any = {
            id: selectedDoctor.id,
            doctor_id: selectedDoctor.doctor_id,
            doctor_name: selectedDoctor.doctor_name,
            consultation_fee: 0,
            max_discount_per_unit: 0,
            quantity: 1,
            discount: null,
            remark: '',
            discount_unit_price: 0,
            total_discount: 0,
            total_price: 0
        }

        const getData = async () => {
            try {
                const CheckOpdValidDaysServiceRes: any = await CheckOpdValidDaysService({ patient_id: props?.patientId, doctor_id: selectedDoctor.doctor_id });
                props.setSelectedDoctor(CheckOpdValidDaysServiceRes?.data?.status === true ? selectedDoctor : updatedSelectedDoctor);
            } catch (error) {
                console.error('Error fetching in CheckOpdValidDaysService:', error);
            }
        }
        getData();
        //  props.setSelectedDoctor(selectedDoctor);
    }

    return (
        <>
            <Modal open={true} onClose={() => props.setShowTable(false)} >
                <Box sx={style}>
                    {/* <Paper> */}
                    <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                        <CloseIcon onClick={handleCloseIconClick} style={{ cursor: 'pointer', float: 'right', padding: '5px' }} />
                    </div>
                    {
                        (rows?.length > 0) ?
                            <TableContainer sx={{ maxHeight: 500 }}>
                                <Table
                                    sx={{ minWidth: 350 }}
                                    aria-labelledby="tableTitle"
                                    stickyHeader
                                >
                                    <EnhancedTableHead />
                                    <TableBody>
                                        {rows.map((row: any, index: any) => {
                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    // onClick={() => handleClick(row.id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    selected={isItemSelected}
                                                // sx={{ cursor: 'pointer' }}
                                                >
                                                    <TableCellData padding="checkbox">
                                                        <Checkbox
                                                            sx={{
                                                                '& MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root': {
                                                                    width: '25px',
                                                                    height: '20px'
                                                                }
                                                            }}
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                            onClick={() => handleCheckBoxClick(row.doctor_name, row.consultation_fee, row.id, row.doctor_id)}
                                                        />
                                                    </TableCellData>
                                                    <TableCellData
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.doctor_name}
                                                    </TableCellData>
                                                    <TableCellData style={{ textAlign: 'center' }}>{row.consultation_fee}</TableCellData>
                                                    <TableCellData style={{ textAlign: 'center' }}>{row.unit_name}</TableCellData>
                                                    <TableCellData style={{ textAlign: 'center' }}>{row.from_date}</TableCellData>
                                                    <TableCellData style={{ textAlign: 'center' }}>{row.to_date}</TableCellData>
                                                    <TableCellData style={{ textAlign: 'center' }}>{row.todayOpd}</TableCellData>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer> :
                            <TableCellData style={{ padding: '10px', textAlign: 'center' }}>No Doctors Available</TableCellData>
                    }
                    {/* </Paper> */}
                    {(rows?.length > 0) && <SubmitBtn onClick={handleSubmitClick}>Submit</SubmitBtn>}
                </Box>
            </Modal>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    selectedDoctor: state?.OpdRegistration?.selectedDoctor
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedDoctor: (status: boolean) => dispatch(setSelectedDoctor(status)),
    setBillingData: (billingData: any) => dispatch(setBillingData(billingData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OPDDoctorScheduleTable);
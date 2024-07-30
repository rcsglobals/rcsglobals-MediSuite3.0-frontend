import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainHeading, StyledLabel, DropdownLabel, SubmitBtn, StyledTextField } from './PharmaModal.styles';
import SelectDropdown from '../../common/select/SelectDropdown';
import { GetMedicinesSer } from '../../../services/dropdownService/eOpdModalServices/pharmaModalServices/PharmaModalServices';
import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
import { getCurrDate } from '../../../utils/FormatDate';
import { CheckUomForBilling, GetDosesFrequency, PharmaGetData } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
import AutoSearch from '../../common/autoSearch/AutoSearch';
import { styled } from '@mui/material/styles';
import { setDignosisDetail } from '../../../redux/actions/EopdAction';
import { connect } from 'react-redux';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    // width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: 4,
    padding: '10px 30px',
    borderRadius: '3px',
    minHeight: '45vh',
    maxHeight: '100vh',
    // overflowY: 'auto'
};

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.black,
        backgroundColor: '#566f82',
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '5px'
    },
}));

export const PharmaModalTable = (props: any) => {

    const [gridData, setGridData] = useState<any>([]);

    useEffect(() => {
        const mappedData = props?.gridObjects.map((item: any, index: number) =>
            createData(
                index + 1,
                item.item_name,
                item.dose,
                item.doseVal,
                item.for_days,
                // item.ml_qty || item.TABQty,
                item.isUomIdmatched === true ? 1 : (item.doseVal) * (parseInt(item.for_days.split(" ")[0])),
                item.doctor_name,
                item.created_date
            )
        );
        setGridData(mappedData);
    }, [props.gridObjects])

    function createData(
        index: number,
        medicine_name: string,
        dose: number,
        doseVal: number,
        for_days: string,
        quantity: number,
        doctor_name: string,
        created_date: number,
    ) {
        return { medicine_name, dose, doseVal, for_days, quantity, doctor_name, created_date };
    }

    return (
        <TableContainer sx={{ maxHeight: 200 }}>
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Medicine Name</StyledTableCell>
                        <StyledTableCell align="right">Dose</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Doctor Name</StyledTableCell>
                        <StyledTableCell align="right">Created Date</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(gridData?.length > 0) && gridData?.map((row: any, index: any) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.medicine_name}</TableCell>
                            <TableCell align="right">{row.dose}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.doctor_name}</TableCell>
                            <TableCell align="right">{row.created_date}</TableCell>
                            <TableCell align="center">
                                <div onClick={() => props.handleRemoveClick(index)} style={{ padding: '5px 10px', margin: '2px', borderRadius: '5px', backgroundColor: '#840e779e', color: 'white', fontWeight: '500', cursor: 'pointer' }}>Remove</div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function PharmaModal(props: any) {
    const { showModal, setShowModal, rowData } = props;
    const [medicines, setMedicines] = useState<any>([]);
    const [userMedicine, setUserMedicine] = useState<any>('');
    const [pharmaData, setPharmaData] = useState<any>({
        item_name: '',
        dose: "",
        doseVal: null,
        ml_qty: null, //textfield
        TABQty: null, //textfield,
        qty: null,
        isUomIdmatched: false,
        for_days: '',
        Remarks: '', //textfield
        service_unit_price: 0,
        doctor_name: rowData.doctorName,
        created_date: getCurrDate()
    });
    const [gridObjects, setGridObjects] = useState<any>([]);
    const [doses, setDoses] = useState<any>([]);
    const [uomIds, setUomIds] = useState<any>([]);

    useEffect(() => {
        const fetchMedicines = async () => {

            try {
                const res: any = await GetMedicinesSer();
                if (res?.status === 200) {
                    setMedicines(res.data);
                }
            } catch (error) {
                console.error('Error in GetMedicinesSer:', error);
            }

            try {
                let res: any = await GetDosesFrequency();
                if (res?.status === 200) {
                    setDoses(res?.data);
                }
            } catch (error) {
                console.error('Error in GetDosesFrequency:', error);
            }


            try {
                let res: any = await CheckUomForBilling();
                if (res?.status === 200) {
                    setUomIds(res?.data);
                }
            } catch (error) {
                console.error('Error in CheckUomForBilling:', error);
            }

            try {
                let res: any = await PharmaGetData(rowData.opdNo);
                if (res?.status === 200) {
                    setUserMedicine(res.data.observations ? res.data.observations : '');
                }
            } catch (error) {
                console.error('Error in PharmaGetData:', error);
            }
        };
        if (rowData.opdNo === props.selectedOpdNo) {
            fetchMedicines();
        }
    }, []);

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    // const handleAddMedicine = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     pharmaData.item_name != '' && setGridObjects((prevGridObjects: any) => [...prevGridObjects, pharmaData]);
    // };

    const handleAddMedicine = (e: any) => {
        // e.stopPropagation();

        if (pharmaData.item_name != '') {
            setGridObjects((prevGridObjects: any) => {
                const isMedicineAlreadyAdded = prevGridObjects.some(
                    (obj: any) => obj.item_name === pharmaData.item_name
                );

                if (isMedicineAlreadyAdded) {
                    window.alert("This Medicine already added !");
                    return prevGridObjects;
                }
                return [...prevGridObjects, pharmaData];
            });
        }
    };

    const handleSubmitClick = async (e: any) => {
        e.stopPropagation();
        if (gridObjects.length >= 0) {
            let res: any = await DiagnosisInsertionService2({
                stageId: 7,
                opdNo: rowData.opdNo,
                PatientId: rowData.patientId,
                DoctorId: rowData.doctorId,
                GridObjects: gridObjects,
                Observations: userMedicine
            });

            if (res?.status === 200) {
                props?.setDignosisDetail(rowData.opdNo, { Pharma: true });
                setShowModal(false);
                window.alert("Data Inserted Successfully :)");
            } else {
                window.alert("Some problem in Insertion!");
            }
        } else {
            window.alert("please add any one medicine");
        }
    };

    // const handleSelectMedicine = (e: any) => {
    //     // const { value } = e.target;
    //     const selectedMedicineName: any = e.target.innerText;
    //     const selectedMedicineVal: any = medicines.find((value: any) => value.item_name.split(" -")[0] === selectedMedicineName);

    //     if (selectedMedicineVal) {
    //         const selectedMedicineFullName = selectedMedicineVal.item_name;
    //         const selectedMedicineItemCode = selectedMedicineVal.itemCode;
    //         // const selectedMedicineSerUnitPrice = selectedMedicineVal.mrp_unt;
    //         const selectedMedicineUomId = selectedMedicineVal.uom_id;
    //         let isUomIdExist = uomIds?.some((item: any) => parseInt(item.uom_id) === selectedMedicineUomId);

    //         setPharmaData((prevData: any) => ({
    //             ...prevData,
    //             // item_name: selectedMedicineName,
    //             item_name: selectedMedicineFullName,
    //             item_code: selectedMedicineItemCode,
    //             // service_unit_price: selectedMedicineSerUnitPrice,
    //             service_unit_price: selectedMedicineFullName.split('$')[1].trim().split(' ')[0],
    //             isUomIdmatched: isUomIdExist
    //         }));
    //     }
    // };

    const handleSelectMedicine = (medicine: any) => {
        // const { value } = e.target;
        // const selectedMedicineName: any = e.target.innerText;
        const selectedMedicineVal: any = medicines.find((value: any) => value.item_name.split(" -")[0] === medicine);

        if (selectedMedicineVal) {
            const selectedMedicineFullName = selectedMedicineVal.item_name;
            const selectedMedicineItemCode = selectedMedicineVal.itemCode;
            // const selectedMedicineSerUnitPrice = selectedMedicineVal.mrp_unt;
            const selectedMedicineUomId = selectedMedicineVal.uom_id;
            let isUomIdExist = uomIds?.some((item: any) => parseInt(item.uom_id) === selectedMedicineUomId);

            setPharmaData((prevData: any) => ({
                ...prevData,
                // item_name: selectedMedicineName,
                item_name: selectedMedicineFullName,
                item_code: selectedMedicineItemCode,
                // service_unit_price: selectedMedicineSerUnitPrice,
                service_unit_price: selectedMedicineFullName.split('$')[1].trim().split(' ')[0],
                isUomIdmatched: isUomIdExist
            }));
        }
    };


    const getDays = () => {
        const daysArray = [];
        for (let i = 1; i <= 30; i++) {
            daysArray.push(`${i} Day${i !== 1 ? 's' : ''}`);
        }
        return daysArray;
    };

    const handleDays = (e: any) => {
        const { value } = e.target;
        setPharmaData((prevData: any) => ({
            ...prevData,
            for_days: value
        }));
    };

    const handleSelectDose = (e: any) => {
        const { value } = e.target;
        const selectedDoseName: any = e?.target?.value;
        const isSelectedDose: any = doses.find((dose: any) => dose.abbreviation === selectedDoseName);

        if (isSelectedDose) {
            const selectedDoseQty = isSelectedDose.dose;
            setPharmaData((prevData: any) => ({
                ...prevData,
                dose: value,
                doseVal: selectedDoseQty
            }));
        }
    }

    const handleRemoveClick = (index: number) => {
        const updatedGridObjects = gridObjects.filter((_: any, idx: number) => idx !== index);
        setGridObjects(updatedGridObjects);
    }


    if (rowData.opdNo !== props.selectedOpdNo) return null;

    return (
        <>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                   "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
                        backgroundColor: "#00000080"
                    },
                    "& > .css-roqh9h": {
                        border: '2px solid transparent'
                    }
                }}
            >
                <Box sx={style} bgcolor={'pink'}>
                    <MainHeading>Medicines</MainHeading>
                    {
                        userMedicine != '' ?
                            <StyledLabel>
                                You have already used <span style={{ color: '#c14d40', fontWeight: '600' }}>{userMedicine}</span> medicine for the patient <span style={{ color: '#b4c140', fontWeight: '600' }}>{rowData.patientId}</span>
                            </StyledLabel> :
                            <StyledLabel>Please search for the required medicines</StyledLabel>
                    }
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ padding: '5px 20px 5px 0px' }}>
                                <DropdownLabel>For Days</DropdownLabel>
                                <SelectDropdown style={{width: '120px'}} dropdownPage={'pharma'} required={true} handleDays={handleDays} dropdown='forDays' values={getDays()} />
                            </div>
                            <div style={{ padding: '5px 20px' }}>
                                {/* <DropdownLabel>Remarks</DropdownLabel> */}
                                {/* <StyledTextField name="Remarks" value={pharmaData.Remarks} onChange={handleTextField} /> */}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ padding: '5px 20px 5px 0px' }}>
                                <DropdownLabel>Select Medicine</DropdownLabel>
                                <AutoSearch dropdown='pharmaMedicine' options={medicines} handleSelectMedicine={handleSelectMedicine} />
                                {/* <SelectDropdown dropdownPage={'pharma'} required={true} handleSelectMedicine={handleSelectMedicine} dropdown='pharmaMedicine' values={medicines} /> */}
                            </div>
                            <div style={{ padding: '5px 20px' }}>
                                <DropdownLabel>Select Dose</DropdownLabel>
                                {/* <StyledTextField name="dose" value={pharmaData.Dose} onChange={handleTextField} /> */}
                                <SelectDropdown dropdownPage={'pharma'} required={true} handleSelectDose={handleSelectDose} dropdown='selectDose' values={doses} />
                            </div>
                        </div>
                    </div>
                    <SubmitBtn onClick={(e: any) => handleAddMedicine(e)}>Add Medicines</SubmitBtn>
                    {
                        gridObjects.length > 0 && (
                            <>
                                <PharmaModalTable gridObjects={gridObjects} handleRemoveClick={handleRemoveClick} />
                                <SubmitBtn onClick={handleSubmitClick}>Submit</SubmitBtn>
                            </>
                        )
                    }
                </Box>
            </Modal>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    // isUserAuthenticate: state?.AuthenticationInfo?.isUserAuthenticate
});

const mapDispatchToProps = (dispatch: any) => ({
    setDignosisDetail: (opdNo: any, updates: any) => dispatch(setDignosisDetail(opdNo, updates)),

});

export default connect(mapStateToProps, mapDispatchToProps)(PharmaModal);
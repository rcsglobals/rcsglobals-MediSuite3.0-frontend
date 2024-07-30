import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MakePaymentBtn, StyledTextField, TableCellData } from './FeeTable.styles';
import { connect } from 'react-redux';
import { removeSelectedDoctor, setOpdDiscountData, setSelectedDoctor, setBillingData } from '../../../redux/actions/OpdRegAction';
import OpdBilling from './OpdBilling';

function DiscountDropdown(props: any) {

    const selectedOptionValue = props.selectedOption[props.doctorId]?.value || 'Rs';

    const handleChange = (event: any) => {

        const newValue = event.target.value;
        props.setSelectedOption((prevState: any) => ({
            ...prevState,
            [props.doctorId]: { value: newValue }
        }));
    };

    return (
        <StyledTableCell>
            <Select
                value={selectedOptionValue}
                onChange={handleChange}
                sx={{
                    "& fieldset": {
                        border: "none",
                        padding: '0px'
                    },
                    ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                        padding: '0px'
                    },
                    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                        fontSize: '13px !important',
                        paddingRight: '30px'
                    }
                }}
            >
                <MenuItem value="Rs">Rs</MenuItem>
                <MenuItem value="%">%</MenuItem>
            </Select>
        </StyledTableCell>
    );
}

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.black,
        backgroundColor: '#566f82',
        color: theme.palette.common.white,
        fontSize: '13px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        padding: '5px'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const FeeTable = (props: any) => {

    const [selectedOption, setSelectedOption] = useState<any>({
        // value: 'Rs',
        // doctor_id: null,
        // consultation_fee: 0
    });
    const [discountVal, setDiscountVal] = useState<any>(0);
    const [remarkText, setRemarkText] = useState('');
    const [initialRows, setInitialRows] = useState<any>({
        id: -1,
        service_name: 'Registration Fee',
        service_unit_price: 30,
        max_discount_per_unit: 0,
        quantity: 1,
        discount: 0,
        remark: '',
        discount_unit_price: 0,
        total_discount: 0,
        total_price: 30
    });
    const [selectedDoctors, setSelectedDoctors] = useState<any[]>((props?.selectedDoctor) ? (props?.selectedDoctor) : []);
    const [showModal, setShowModal] = useState<any>(false);
    const [discount, setDiscount] = useState<any>(0);
    // const [currdoctorId, setCurrDoctorId] = useState<any>(0);
    useEffect(() => {
        props.setBillingData({
            // con_service_discount: props?.selectedDoctor[0]?.discount_unit_price,
            // con_total_price: props?.selectedDoctor[0]?.total_price,
            // con_service_discount: 1000,
            // con_total_price: 500,
            reg_service_discount: initialRows.discount_unit_price,
            reg_total_price: initialRows.total_price
        })
    }, [])

    useEffect(() => {
        setSelectedDoctors(props.selectedDoctor);
    }, [props.selectedDoctor]);

    // useEffect(() => {
    //     if (currdoctorId === -1) {
    //         setInitialRows({
    //             ...initialRows,
    //             max_discount_per_unit: discountVal,
    //             discount_unit_price: initialRows.service_unit_price - discountVal,
    //             total_discount: discountVal,
    //             total_price: initialRows.service_unit_price - discountVal,
    //             remark: remarkText
    //         })
    //     } else {
    //         let updatedRows = selectedDoctors.map((row: any) => {
    //             if (row.doctor_id === currdoctorId) {
    //                 return {
    //                     ...row,
    //                     max_discount_per_unit: discountVal,
    //                     discount_unit_price: row.consultation_fee - discountVal,
    //                     total_discount: discountVal,
    //                     total_price: row.consultation_fee - discountVal,
    //                     remark: remarkText
    //                 };
    //             }
    //             return row;

    //         });
    //         setSelectedDoctors(updatedRows);
    //     }
    // }, [discountVal, selectedOption[currdoctorId]?.value])

    const isFirstTimePatient = props?.patientDetails?.flag || 0;

    function CalculateServiceDiscount() {

        let serviceUnitPriceSum = selectedDoctors.reduce((total: number, row: any) => total + parseInt(row.consultation_fee), 0);
        let totalServiceUnitPriceSum: any = serviceUnitPriceSum + (props.patientDetails.flag === 0 ? parseInt(initialRows.service_unit_price) : 0);

        let serviceDiscountSum = selectedDoctors.reduce((total: number, row: any) => total + parseInt(row.max_discount_per_unit), 0);
        let totalServiceDiscountSum: any = serviceDiscountSum + (props.patientDetails.flag === 0 ? parseInt(initialRows.max_discount_per_unit) : 0);

        let totalPriceSum = selectedDoctors.reduce((total: number, row: any) => total + parseInt(row.total_price), 0);
        let totalPriceSumTotal: any = totalPriceSum + (props.patientDetails.flag === 0 ? parseInt(initialRows.total_price) : 0);

        return { totalServiceUnitPriceSum, totalServiceDiscountSum, totalPriceSumTotal };
    }

    function handleDiscount(event: any, consultation_fee: any, doctorId: any) {
        // setCurrDoctorId(doctorId);
        const discountValue = event ? event.target.value : initialRows.discount;
        setDiscount(discountValue);
        // const discountType = selectedOption[doctorId]?.value || 'Rs';
        // const serviceUnitPrice = consultation_fee;
        // let totalDiscount: any = 0;
        // if (discountType === '%') {
        //     totalDiscount = (serviceUnitPrice * discountValue) / 100;
        // } else {
        //     totalDiscount = discountValue;
        // }
        // setDiscountVal(totalDiscount);
    }

    const handleUpdateClick = (e: any, doctorId: any, consultation_fee: any) => {
        const discountValue = discount;
        const discountType = selectedOption[doctorId]?.value || 'Rs';
        const serviceUnitPrice = consultation_fee;
        let totalDiscount: any = 0;
        if (discountType === '%') {
            totalDiscount = (serviceUnitPrice * discountValue) / 100;
        } else {
            totalDiscount = discountValue;
        }
        setDiscountVal(totalDiscount);

        if (remarkText === '') {
            window.alert("enter remark....")
        } else {
            if (doctorId === -1) {
                setInitialRows({
                    ...initialRows,
                    max_discount_per_unit: totalDiscount,
                    discount_unit_price: initialRows.service_unit_price - totalDiscount,
                    total_discount: totalDiscount,
                    total_price: initialRows.service_unit_price - totalDiscount,
                    remark: remarkText
                })
                props.setBillingData({
                    reg_service_unit_price: initialRows.service_unit_price - totalDiscount,
                    reg_service_discount: totalDiscount,
                    reg_total_price: initialRows.service_unit_price - totalDiscount
                })
            } else {
                let updatedRows = selectedDoctors.map((row: any) => {
                    if (row.doctor_id === doctorId) {
                        return {
                            ...row,
                            max_discount_per_unit: totalDiscount,
                            discount_unit_price: row.consultation_fee - totalDiscount,
                            total_discount: totalDiscount,
                            total_price: row.consultation_fee - totalDiscount,
                            remark: remarkText
                        };
                    }
                    return row;

                });
                props.setBillingData({
                    con_service_unit_price: updatedRows[0].discount_unit_price,
                    con_service_discount: updatedRows[0].total_discount,
                    con_total_price: updatedRows[0].total_price
                })
                setSelectedDoctors(updatedRows);
            }
        }

        // const totalDiscount: any =  CalculateServiceDiscount();
        // props.setOpdDiscountData({
        //     serviceDiscount: totalDiscount.totalServiceDiscountSum,
        //     totalBill: totalDiscount.totalPriceSumTotal
        // })
    }

    const handleRemoveClick = (e: any, rowId: any) => {
        if (rowId === -1) {
            // setIsFirstTimePatient(1);
        } else {
            props.removeSelectedDoctor(rowId);
        }
    }

    const handleMakePaymentClick = () => {
        const totalDiscount: any = CalculateServiceDiscount();
        props.setOpdDiscountData({
            serviceDiscount: totalDiscount.totalServiceDiscountSum,
            totalBill: totalDiscount.totalServiceUnitPriceSum,
            billAfterDiscount: totalDiscount.totalPriceSumTotal
        })
        setShowModal(true);
    }

    const handleTextArea = (event: any, doctorId: any) => {
        const textValue = event.target.value;
        setRemarkText(textValue);
    };

    return (
        <>
            {(props.selectedDoctor.length > 0 || isFirstTimePatient === 0) && <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Service Name</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Service Unit Price</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Max Discount Per Unit</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Quantity</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Discount</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Remark</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}> After Discount Service Price</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Total Discount</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Total Price</TableCellData>
                            <TableCellData style={{ backgroundColor: '#566f82', color: 'white' }}>Action</TableCellData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isFirstTimePatient === 0 &&
                            <StyledTableRow key={null}>
                                <TableCellData>{initialRows.service_name}</TableCellData>
                                <TableCellData>{initialRows.service_unit_price}</TableCellData>
                                <TableCellData>{initialRows.max_discount_per_unit}</TableCellData>
                                <TableCellData>{initialRows.quantity}</TableCellData>
                                <TableCellData style={{ display: 'flex', alignItems: 'center' }}>
                                    <StyledTextField style={{ color: 'black' }} disabled placeholder='NA' onChange={(event: any) => handleDiscount(event, initialRows.service_unit_price, initialRows.id)} /><DiscountDropdown consultationFee={initialRows.service_unit_price} doctorId={initialRows.id} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                                </TableCellData>
                                <TableCellData>
                                    <textarea onChange={(e: any) => handleTextArea(e, initialRows.id)} style={{ width: '145px' }} />
                                </TableCellData>
                                <TableCellData>{initialRows.discount_unit_price}</TableCellData>
                                <TableCellData>{initialRows.total_discount}</TableCellData>
                                <TableCellData>{initialRows.total_price}</TableCellData>
                                <TableCellData style={{ display: 'flex' }}>
                                    <div onClick={(e: any) => handleUpdateClick(e, initialRows.id, initialRows.service_unit_price)} style={{ padding: '5px 10px', margin: '2px', borderRadius: '5px', backgroundColor: '#840e779e', color: 'white', fontWeight: '500', cursor: 'pointer' }}>Update</div>
                                    <div onClick={(e: any) => handleRemoveClick(e, initialRows.id)} style={{ padding: '5px 10px', margin: '2px', borderRadius: '5px', backgroundColor: '#840e779e', color: 'white', fontWeight: '500', cursor: 'pointer' }}>Remove</div>
                                </TableCellData>
                            </StyledTableRow>}
                        {selectedDoctors.length > 0 && selectedDoctors.map((row: any, index: any) => (

                            <StyledTableRow key={index + 1}>
                                <TableCellData>{'Consultation Fee' + '(' + row.doctor_name + ')'}</TableCellData>
                                <TableCellData>{row.consultation_fee}</TableCellData>
                                <TableCellData>{row.max_discount_per_unit}</TableCellData>
                                <TableCellData>{row.quantity}</TableCellData>
                                <TableCellData style={{ display: 'flex', alignItems: 'center' }}>
                                    <StyledTextField onChange={(event: any) => handleDiscount(event, row.consultation_fee, row.doctor_id)} /><DiscountDropdown consultationFee={row.consultation_fee} doctorId={row.doctor_id} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                                </TableCellData>
                                <TableCellData>
                                    <textarea onChange={(e: any) => handleTextArea(e, row.doctor_id)} style={{ width: '145px', alignItems: 'center' }} />
                                </TableCellData>
                                <TableCellData>{row.discount_unit_price}</TableCellData>
                                <TableCellData>{row.total_discount}</TableCellData>
                                <TableCellData>{row.total_price}</TableCellData>
                                <TableCellData style={{ display: 'flex' }}>
                                    <div onClick={(e: any) => handleUpdateClick(e, row.doctor_id, row.consultation_fee)} style={{ padding: '5px 10px', margin: '2px', borderRadius: '5px', backgroundColor: '#840e779e', color: 'white', fontWeight: '500', cursor: 'pointer' }}>Update</div>
                                    <div onClick={(e: any) => handleRemoveClick(e, row.doctor_id)} style={{ padding: '5px 10px', margin: '2px', borderRadius: '5px', backgroundColor: '#840e779e', color: 'white', fontWeight: '500', cursor: 'pointer' }}>Remove</div>
                                </TableCellData>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            {
                (selectedDoctors.length > 0) &&
                <MakePaymentBtn onClick={handleMakePaymentClick}>Make Payment</MakePaymentBtn>
            }
            {
                showModal && <OpdBilling page={props?.page} showModal={showModal} setShowModal={setShowModal} />
            }
        </>
    );
}

const mapStateToProps = (state: any) => ({
    selectedDoctor: state?.OpdRegistration?.selectedDoctor
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedDoctor: (updatedData: any) => dispatch(setSelectedDoctor(updatedData)),
    removeSelectedDoctor: (doctorId: any) => dispatch(removeSelectedDoctor(doctorId)),
    setOpdDiscountData: (discountData: any) => dispatch(setOpdDiscountData(discountData)),
    setBillingData: (billingData: any) => dispatch(setBillingData(billingData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeeTable);
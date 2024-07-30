import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainHeading, StyledLabel, LoginBtn } from './FollowUpModal.styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
import { FollowUpGetData } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
import { FormatDate } from '../../../utils/FormatDate';
import { setDignosisDetail } from '../../../redux/actions/EopdAction';
import { connect } from 'react-redux';
import RefPatientModal from '../modals/RefPatientModal';

const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: 4,
    padding: '10px 30px',
    borderRadius: '3px'
};



function FollowUpModal(props: any) {
    const { showModal, setShowModal, rowData } = props;
    const [changedDate, setChangedDate] = useState<any>('');
    const [selectedDate, setSelectedDate] = useState<any>('');
    const [openRegModal, setOpenRegModal] = useState<any>(false);

    useEffect(() => {
        const getData = async () => {

            try {
                const res: any = await FollowUpGetData(rowData.opdNo);
                if (res?.status === 200) {
                    setSelectedDate(res?.data?.observations ? FormatDate(res?.data?.observations) : '');
                } else if (res?.status === 404) {
                    setSelectedDate('');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
        if (rowData.opdNo === props.selectedOpdNo) {
            getData();
        }
    }, []);

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleDateChange = (date: any) => {
        setChangedDate(date);
    };

    const handleSubmitClick = async (e: any, rowData: any) => {
        e.stopPropagation();
        if (changedDate != '') {
            let res: any = await DiagnosisInsertionService2({
                stageId: 8,
                opdNo: rowData.opdNo,
                PatientId: rowData.patientId,
                Observations: changedDate
            });

            if (res?.status === 200) {
                props.setDignosisDetail(rowData.opdNo, { 'Follow Up': true });
                setShowModal(false);
                window.alert("Data Inserted Successfully :)");
            } else {
                window.alert("Some problem in Insertion!");
            }
        } else {
            window.alert(`please select the date..`);
        }
    };

    const handleClick = () => {
        setOpenRegModal(true);
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
                <Box sx={style}>
                    <MainHeading>Next Follow Up</MainHeading>
                    <StyledLabel>Select your Next Follow Up TimeLine</StyledLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            slotProps={{
                                desktopPaper: {
                                    sx: {
                                        '& .MuiPickersCalendarHeader-root': {
                                            minHeight: '20px',
                                            fontSize: '10px' // Adjust header height
                                        },
                                        '& .MuiDateCalendar-root': {
                                            width: '200px', // Adjust the width of the calendar
                                            height: '230px', // Adjust the height of the calendar
                                            padding: '3px',
                                        },
                                        '& .MuiPickersDay-root': {
                                            width: '30px', // Adjust the size of the days
                                            height: '30px',
                                        },
                                        '& .css-1vs7z2v-MuiYearCalendar-root': {
                                            width: 'inherit',
                                            maxHeight: '200px'
                                        },
                                        '& .css-innj4t-MuiPickersYear-yearButton': {
                                            margin: '0px',
                                            width: 'inherit',
                                            height: '26px',
                                            fontSize: '13px'
                                        }
                                    },
                                },
                            }}
                            sx={{
                                '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                    padding: '10px'
                                },
                                '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                    transform: 'translate(14px, 10px) scale(1)',
                                    fontSize: '13px'
                                },
                                '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                    border: 'transparent',
                                    fontSize: '13px'
                                },
                                '& .MuiFormControl-root css-9h85id-MuiFormControl-root': {
                                    width: '100%'
                                },
                                // '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                //     color: '#40b4c1'
                                // },
                                // '& .MuiOutlinedInput-root': {
                                //     '&:hover fieldset': {
                                //         borderColor: '#40b4c1',
                                //     },
                                //     '&.Mui-focused fieldset': {
                                //         borderColor: '#40b4c1',
                                //         color: '#40b4c1'
                                //     }
                                // },
                                // '& .MuiInputLabel-root': {
                                //     borderColor: 'transparent',
                                // },
                                // '& .Mui-focused': {
                                //     borderColor: '#40b4c1',
                                //     border: 'transparent'
                                // }
                            }}
                            label={selectedDate === '' ? "Choose Date" : selectedDate}
                            // label= "Choose Date"
                            //value={selectedDate} 
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>
                    <LoginBtn onClick={(e: any) => handleSubmitClick(e, rowData)}>Submit</LoginBtn>
                    {/* <StyledLabel>Select your Next Follow Up TimeLine</StyledLabel> */}
                    <div style={{ display: 'flex', fontSize: '13px' }}>Want to Reffer the patient?<div onClick={handleClick} style={{ color: '#4074c1', cursor: 'pointer', paddingLeft: '5px' }}>Click here</div></div>
                    {
                        openRegModal && <RefPatientModal setOpenRegModal={setOpenRegModal} rowData={rowData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpModal);
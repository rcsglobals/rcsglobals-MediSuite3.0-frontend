import { useState } from 'react';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from '@mui/material/Modal';
import { Container, DataContainer, LoginBtn, MainHeading, StyledLabel, StyledTextField } from './DoctorCutModal.styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SelectDropdown from '../../../../common/select/SelectDropdown';
import { SetDoctorCut } from '../../../../../services/generalSetUpServices/doctorDetailsServices/DoctorDetailsServices';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    outline: 'none',
    p: 1,
};

export default function DoctorCutModal(props: any) {

    const { doctorName, doctorID, selectedDoctorId, showDoctorCut, setShowDoctorCut } = props;

    const [doctorCutData, setDoctorCutData] = useState<any>({
        doctor_id: doctorID,
        doctor_cut_per: null,
        service_classification: '',
        effective_date: ''
    });

    let doctorCutSerTypeOptions: any = [
        {
            service: 'Investigation',
            value: 'INV'
        },
        {
            service: 'Procedure',
            value: 'PROC'
        },
        {
            service: 'Consultation Fee',
            value: 'CON'
        }
    ];

    const formatSelectedDate = (dateString: any) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    }

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowDoctorCut(false);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDoctorCutData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleDateChange = (date: any) => {
        setDoctorCutData((prevData: any) => ({
            ...prevData,
            effective_date: formatSelectedDate(date)
        }));
    }

    const handleServiceType = (e: any) => {
        const selectedService: any = e.target.value;
        setDoctorCutData((prevData: any) => ({
            ...prevData,
            service_classification: selectedService
        }));
    }

    const handleSubmitClick = async (e: any) => {
        try {
            const res: any = await SetDoctorCut(doctorCutData);
            if (res?.status === 200) {
                window.alert("Doctor cut updated successfully :)");
                setShowDoctorCut(false);
            }
        } catch (err: any) {
            console.log("AddNewRoleRes api err", err);
        }
    }

    if (doctorID !== selectedDoctorId) return null;

    return (
        <div>
            <Modal
                open={showDoctorCut}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>Doctor Cut</MainHeading>
                    <div style={{ margin: '15px' }}>
                        <DataContainer>
                            <Container>
                                <StyledLabel>Doctor Name</StyledLabel>
                                <StyledTextField InputProps={{ readOnly: true }} name="DoctorName" value={doctorName} />
                            </Container>
                            <Container>
                                <StyledLabel>Doctor Cut(in %)</StyledLabel>
                                <StyledTextField name="doctor_cut_per" value={doctorCutData?.doctor_cut_per} onChange={(e: any) => handleChange(e)} />
                            </Container>
                            <Container>
                                <StyledLabel>Service Type</StyledLabel>
                                <SelectDropdown required={true} dropdown='doctorCutSerType' values={doctorCutSerTypeOptions} handleServiceType={(e: any) => handleServiceType(e)} />
                            </Container>
                            <Container>
                                <StyledLabel>Effective Date</StyledLabel>
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
                                        label={"Choose Date"}
                                        format="DD/MM/YYYY"
                                        onChange={handleDateChange}
                                    />
                                </LocalizationProvider>
                            </Container>
                        </DataContainer>
                    </div>
                    <LoginBtn onClick={(e: any) => handleSubmitClick(e)}>Submit</LoginBtn>
                </Box>
            </Modal>
        </div>
    );
}
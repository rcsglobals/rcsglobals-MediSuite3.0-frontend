import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainHeading, StyledLabel, StyledTextField, LoginBtn } from './AadharUpdationModal.styles';
import CloseIcon from '@mui/icons-material/Close';
import { AdharCardUpdationService } from '../../../services/registrationService/opdRegistrationService/patientDetalService/PatientDetailService';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: 4,
    padding: '10px 30px',
    borderRadius: '3px'
};

function AadharUpdationModal(props: any) {

    const [aadharValue, setAadharValue] = useState<any>('');

    const handleClose = (e: any) => {
        e.stopPropagation();
        props.setShowModal(false);
    };

    const handleSubmitClick = async (e: any) => {
        e.stopPropagation();
        if (aadharValue != '') {
            try {
                const res: any = await AdharCardUpdationService(props.patientId, aadharValue);
                if (res?.status === 200) {
                    props.setUpdatedAadharValue(res?.data?.adharNo);
                    props.setShowModal(false);
                }
            } catch (error) {
                console.log("error is:", error);
            }
        } else {
            window.alert("Please enter adhar number");
        }   
    };

    const handleInputChange = (e: any) => {
        const { value } = e.target;
        setAadharValue(value);
    };

    const handleCloseIconClick = () => {
        props.setShowModal(false);
    }

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmitClick(e);
        }
    };

    return (
        <>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    "& > .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
                        backgroundColor: "#9e9e9e1a"
                    },
                    "& > .css-roqh9h": {
                        border: '2px solid transparent'
                    }
                }}
            >
                <Box sx={style} bgcolor={'pink'}>
                    <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                        <CloseIcon onClick={handleCloseIconClick} style={{ cursor: 'pointer', float: 'right', padding: '5px' }} />
                    </div>
                    <MainHeading>Aadhar Card Updation</MainHeading>
                    <StyledLabel>Enter your Aadhar Card No below:</StyledLabel>
                    <StyledTextField
                        type="text"
                        name="username"
                        value={aadharValue}
                        onChange={handleInputChange}
                        fullWidth
                        onKeyPress={(e: any) => handleKeyPress(e)}
                    />
                    <LoginBtn onClick={handleSubmitClick}>Submit</LoginBtn>
                </Box>
            </Modal>
        </>
    );
}

export default AadharUpdationModal;
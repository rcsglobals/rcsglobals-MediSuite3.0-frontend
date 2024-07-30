import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { connect } from 'react-redux';
import { setBillingData } from '../../../redux/actions/OpdRegAction';
import OPDReg from '../opd/OPDReg';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '60%',
    maxWidth: '100%',
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: 4,
    padding: '10px 30px',
    borderRadius: '3px',
    overflowY: 'scroll',
    maxHeight: '90vh'
};

const RefPatientModal = (props: any) => {

    const { rowData } = props;

    useEffect(() => {
        props.setBillingData({
            patient_category_id: rowData?.patientCategoryId,
            patient_id: rowData?.patientId,
            camp_id: rowData?.campId,
            partner_id: rowData?.partnerId
        })
    }, [])

    const handleClose = (e: any) => {
        e.stopPropagation();
        props.setOpenRegModal(false);
    };

    const handleCloseClick = () => {
        props.setOpenRegModal(false);
    }

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
                <Box sx={style}>
                    <div>
                        <CloseIcon onClick={handleCloseClick} style={{ cursor: 'pointer', float: 'right', padding: '5px' }} />
                    </div>
                    <div>
                        <OPDReg page={'RefferedPatient'} patientId={rowData?.patientId} setOpenRegModal={props?.setOpenRegModal} rowData={rowData} />
                    </div>
                </Box>
            </Modal>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    billingData: state?.OpdRegistration?.billingData,
    selectedDoctor: state?.OpdRegistration?.selectedDoctor
});

const mapDispatchToProps = (dispatch: any) => ({
    setBillingData: (billingData: any) => dispatch(setBillingData(billingData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RefPatientModal);
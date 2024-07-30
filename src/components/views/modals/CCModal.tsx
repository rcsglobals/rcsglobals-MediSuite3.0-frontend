import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainHeading, StyledLabel, StyledTextField, LoginBtn } from './CCModal.styles';
import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
import { CcModalGetData, TtPlanGetData } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
import { connect } from 'react-redux';
import { setDignosisDetail } from '../../../redux/actions/EopdAction';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: 4,
    padding: '10px 20px',
    borderRadius: '3px'
};

function CCModal(props: any) {

    const [ccValue, setCCValue] = useState('');
    const { showModal, setShowModal, modalName, query, rowData } = props;

    useEffect(() => {
        const getData = async () => {
            let res: any = modalName === 'Chief Complaint' ? await CcModalGetData(rowData.opdNo) : await TtPlanGetData(rowData.opdNo);
            if (res?.status === 200) {
                setCCValue(res?.data?.observations ? res?.data?.observations : '');
            }
            else if (res?.status === 404) {
                setCCValue('');
            }
        }
        if (rowData.opdNo === props.selectedOpdNo) {
            getData();
        }
    }, [])

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleSubmitClick = async (e: any, rowData: any) => {
        e.stopPropagation();
        if (ccValue != '') {
            let res: any = await DiagnosisInsertionService2({
                stageId: props.modalName === 'Chief Complaint' ? 1 : 5,
                opdNo: rowData.opdNo,
                PatientId: rowData.patientId,
                Observations: ccValue
            });

            if (res?.status === 200) {
                props.setDignosisDetail(rowData.opdNo, (props.modalName === 'Chief Complaint' ? { CC: true } : { 'TT Plan': true }));
                setShowModal(false);
                window.alert("Data Inserted Successfully :)");
            } else {
                window.alert("Some problem in Insertion!");
            }
        } else {
            window.alert(`please enter some ${(props.modalName === 'Chief Complaint' ? 'cc' : 'ttPlan')} value`);
        }

    };

    const handleInputChange = (e: any) => {
        const { value } = e.target;
        setCCValue(value);
    };

    const handleKeyPress = (e: any, rowData: any) => {
        if (e.key === 'Enter') {
            handleSubmitClick(e, rowData);
        }
    };

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
                    <MainHeading>{modalName}</MainHeading>
                    <StyledLabel>{query}</StyledLabel>
                    <StyledTextField
                        type="text"
                        name="username"
                        value={ccValue}
                        onChange={handleInputChange}
                        fullWidth
                        onKeyPress={(e: any) => handleKeyPress(e, rowData)}
                    />
                    <LoginBtn onClick={(e: any) => handleSubmitClick(e, rowData)}>Submit</LoginBtn>
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

export default connect(mapStateToProps, mapDispatchToProps)(CCModal);
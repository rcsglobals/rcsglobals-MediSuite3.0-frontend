import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import { MainHeading, StyledLabel, StyledTextField, LoginBtn } from './GPEModal.styles';
import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
import { GpeModalGetData } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
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
    padding: '10px 15px',
    borderRadius: '3px'
};

function GPEModal(props: any) {

    const { showModal, setShowModal, rowData } = props;
    const history: any = useHistory();
    const [gpeData, setGpeData] = useState<any>({
        Height: null,
        Weight: null,
        BP: null,
        HR: null,
        Temperature: null,
        SPo2: null,
        RR: null,
        RBS: null
    })

    useEffect(() => {
        const getData = async () => {
            let res: any = await GpeModalGetData(rowData.opdNo);
            if (res?.status === 200) {
                setGpeData({
                    Height: (res?.data[0]?.height) ? (res?.data[0]?.height) : null,
                    Weight: (res?.data[0]?.weight) ? (res?.data[0]?.weight) : null,
                    BP: (res?.data[0]?.bp) ? (res?.data[0]?.bp) : null,
                    HR: (res?.data[0]?.hr) ? (res?.data[0]?.hr) : null,
                    Temperature: (res?.data[0]?.temperature) ? (res?.data[0]?.temperature) : null,
                    SPo2: (res?.data[0]?.sPo2) ? (res?.data[0]?.sPo2) : null,
                    RR: (res?.data[0]?.rr) ? (res?.data[0]?.rr) : null,
                    RBS: (res?.data[0]?.rbs) ? (res?.data[0]?.rbs) : null
                });
            }
        }
        if (rowData.opdNo === props.selectedOpdNo) {
            getData();
        }
    }, [rowData.opdNo])

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const isAnyValueNotNull = (data: any) => {
        return Object.values(data).some((value: any) => value !== null);
    }

    const handleSubmitClick = async (e: any) => {
        e.stopPropagation();

        if (isAnyValueNotNull(gpeData)) {
            let res: any = await DiagnosisInsertionService2({
                history,
                stageId: 2,
                opdNo: rowData.opdNo,
                PatientId: rowData.patientId,
                Observations: gpeData
            });
            if (res?.status === 200) {
                props.setDignosisDetail(rowData?.opdNo, { GPE: true });
                setShowModal(false);
                window.alert("Data Inserted Successfully :)");
            } else {
                window.alert("Some problem in Insertion!");
            }
        } else {
            window.alert(`Please fill atleast one field....`);
        }

    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setGpeData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
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
                    <MainHeading>General Physical Examination</MainHeading>
                    <div style={{ margin: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StyledLabel>Height(cm)</StyledLabel>
                                <StyledTextField type='number' name="Height" value={gpeData.Height} onChange={(e: any) => handleChange(e)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StyledLabel>Weight(Kg)</StyledLabel>
                                <StyledTextField type='number' name="Weight" value={gpeData.Weight} onChange={(e: any) => handleChange(e)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StyledLabel>BP(mmHg)</StyledLabel>
                                <StyledTextField type='number' name="BP" value={gpeData.BP} onChange={(e: any) => handleChange(e)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StyledLabel>HR(/min)</StyledLabel>
                                <StyledTextField type='number' name="HR" value={gpeData.HR} onChange={(e: any) => handleChange(e)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StyledLabel>Temperature(degree C)</StyledLabel>
                                <StyledTextField type='number' name="Temperature" value={gpeData.Temperature} onChange={(e: any) => handleChange(e)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StyledLabel>SPo2(%)</StyledLabel>
                                <StyledTextField type='number' name="SPo2" value={gpeData.SPo2} onChange={(e: any) => handleChange(e)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StyledLabel>RR(/min)</StyledLabel>
                                <StyledTextField type='number' name="RR" value={gpeData.RR} onChange={(e: any) => handleChange(e)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StyledLabel>RBS(mmol/L)</StyledLabel>
                                <StyledTextField type='number' name="RBS" value={gpeData.RBS} onChange={(e: any) => handleChange(e)} />
                            </div>
                        </div>

                    </div>
                    <LoginBtn onClick={handleSubmitClick}>Submit</LoginBtn>
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

export default connect(mapStateToProps, mapDispatchToProps)(GPEModal);

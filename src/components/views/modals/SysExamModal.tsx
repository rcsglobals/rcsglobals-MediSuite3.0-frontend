import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainHeading, StyledLabel, Table, TableRaw, RadioTd, SubmitBtn, StyledTextField, StyledLabelOptions } from './SysExamModal.styles';
import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
import { SysExamGetData } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
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
    padding: '10px 20px',
    borderRadius: '3px',
    maxHeight: '90vh',
    overflowY: 'auto'
};

function SysExamModal(props: any) {
    const { showModal, setShowModal, rowData } = props;
    const [sysExamDetails, setSysExamDetails] = useState<any>({
        cnsRadio: "",
        cns: "",
        cvs: [],
        cvs_S1S2Heard: "",
        cvs_Murmur: "",
        paExamRadio: [],
        pa_exam: "",
        pa_exam_TENDERNESS: "",
        pa_exam_HEPATOSPLEENOMEGALY: "",
        rs_Vesicular: false,
        rs_Bronchial: false,
        rs_Creps: false
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await SysExamGetData(rowData.opdNo);
                if (res?.status === 200) {
                    setSysExamDetails({
                        cnsRadio: res?.data[0]?.cnsRadio,
                        cns: res?.data[0]?.cns,
                        cvs: (res?.data[0]?.cvs).length > 0 ? (res?.data[0]?.cvs) : [],
                        // cvs: ((res?.data[0]?.s1S2Heard != '') && (res?.data[0]?.murmur != '')) ? ['S1 S2 Heard', 'Murmur'] : '' || [(res?.data[0]?.s1S2Heard !== '') ? 'S1 S2 Heard': '' || (res?.data[0]?.murmur !== '') ? 'Murmur' : ''],
                        cvs_S1S2Heard: res?.data[0]?.s1S2Heard,
                        cvs_Murmur: res?.data[0]?.murmur,
                        paExamRadio: (res?.data[0]?.paExamRadio).length > 0 ? (res?.data[0]?.paExamRadio) : [],
                        // paExamRadio: ((res?.data[0]?.tenderness != '') && (res?.data[0]?.hepatospleenomegaly != '')) ? ['Tenderness', 'Hepatospleenomegaly'] : '' || [(res?.data[0]?.tenderness !== '') ? 'Tenderness': '' || (res?.data[0]?.hepatospleenomegaly !== '') ? 'Hepatospleenomegaly' : ''],
                        pa_exam: res?.data[0]?.paExam,
                        pa_exam_TENDERNESS: res?.data[0]?.tenderness,
                        pa_exam_HEPATOSPLEENOMEGALY: res?.data[0]?.hepatospleenomegaly,
                        rs_Vesicular: res?.data[0]?.vesicularBreathSounds,
                        rs_Bronchial: res?.data[0]?.bronchialBreathing,
                        rs_Creps: res?.data[0]?.crepsRhonchi
                    });
                }
            } catch (error) {
                console.error('Error fetching system examination data:', error);
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

    const handleSubmitClick = async (e: any) => {
        e.stopPropagation();
        if (sysExamDetails?.cnsRadio != '') {
            let res: any = await DiagnosisInsertionService2({
                stageId: 3,
                opdNo: rowData.opdNo,
                PatientId: rowData.patientId,
                Observations: sysExamDetails
            });
            if (res?.status === 200) {
                props.setDignosisDetail(rowData.opdNo, { 'Syst Exam': true });
                setShowModal(false);
                window.alert("Data Inserted Successfully :)");
            } else {
                window.alert("Some problem in Insertion!");
            }
        } else {
            window.alert(`please select any value`);
        }
    };

    const handleChange = (e: any) => {
        const { name, value, checked } = e.target;
        if (name === 'cvs') {
            setSysExamDetails((prevData: any) => ({
                ...prevData,
                cvs: checked
                    ? [...prevData.cvs, value]
                    : prevData.cvs.filter((item: string) => item !== value),
                cvs_S1S2Heard: value === 'S1 S2 Heard' && !checked ? '' : prevData.cvs_S1S2Heard,
                cvs_Murmur: value === 'Murmur' && !checked ? '' : prevData.cvs_Murmur,
            }));
        } else if (name === 'paExamRadio') {
            setSysExamDetails((prevData: any) => ({
                ...prevData,
                paExamRadio: checked
                    ? [...prevData.paExamRadio, value]
                    : prevData.paExamRadio.filter((item: string) => item !== value),
                pa_exam_TENDERNESS: value === 'Tenderness' && !checked ? '' : prevData.pa_exam_TENDERNESS,
                pa_exam_HEPATOSPLEENOMEGALY: value === 'Hepatospleenomegaly' && !checked ? '' : prevData.pa_exam_HEPATOSPLEENOMEGALY,
            }));
        } else if (name === 'pa_exam') {
            setSysExamDetails((prevData: any) => ({
                ...prevData,
                [name]: value
            }));
        } else if (name === 'rs_Vesicular') {
            setSysExamDetails((prevData: any) => ({
                ...prevData,
                [name]: e?.target?.checked
            }));
        } else if (name === 'rs_Bronchial') {
            setSysExamDetails((prevData: any) => ({
                ...prevData,
                [name]: e?.target?.checked
            }));
        } else if (name === 'rs_Creps') {
            setSysExamDetails((prevData: any) => ({
                ...prevData,
                [name]: e?.target?.checked
            }));
        }
        else { // for set the value of CNS ( Yes or No )
            setSysExamDetails((prevData: any) => ({
                ...prevData,
                [name]: value
            }));
        }
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
                    <MainHeading>Systemic Examination</MainHeading>
                    <Table>
                        <tbody>
                            <TableRaw>
                                <td><StyledLabel>CNS</StyledLabel></td>
                                <RadioTd>
                                    <StyledLabelOptions>
                                        <input style={{margin: '3px'}} type="radio" checked={sysExamDetails?.cnsRadio === 'Yes'} name="cnsRadio" value="Yes" onChange={(e: any) => handleChange(e)} />Yes
                                        {(sysExamDetails?.cnsRadio === 'Yes') && <StyledTextField
                                            id="outlined-textarea"
                                            name="cns"
                                            value={sysExamDetails?.cns}
                                            multiline
                                            onChange={(e: any) => handleChange(e)}
                                            disabled={sysExamDetails?.cnsRadio !== 'Yes'}
                                        />}
                                    </StyledLabelOptions>
                                    <StyledLabelOptions><input style={{margin: '3px'}} type="radio" checked={sysExamDetails?.cnsRadio === 'No'} name="cnsRadio" value="No" onChange={(e: any) => handleChange(e)} />NAD</StyledLabelOptions>
                                </RadioTd>
                            </TableRaw>
                            <TableRaw>
                                <td><StyledLabel>CVS</StyledLabel></td>
                                <RadioTd>
                                    <StyledLabelOptions>
                                        <input type="checkbox" checked={sysExamDetails?.cvs.includes('S1 S2 Heard')} name="cvs" value="S1 S2 Heard" onChange={(e: any) => handleChange(e)} /> S1 S2 Heard
                                        {(sysExamDetails?.cvs.includes('S1 S2 Heard')) && <StyledTextField
                                            id="outlined-textarea"
                                            name="cvs_S1S2Heard"
                                            value={(sysExamDetails?.cvs.includes('S1 S2 Heard')) ? (sysExamDetails?.cvs_S1S2Heard) : ''}
                                            multiline
                                            onChange={(e: any) => handleChange(e)}
                                            disabled={!sysExamDetails?.cvs.includes('S1 S2 Heard')}
                                        />}
                                    </StyledLabelOptions>
                                    <StyledLabelOptions>
                                        <input type="checkbox" size={50} checked={sysExamDetails?.cvs.includes('Murmur')} name="cvs" value="Murmur" onChange={(e: any) => handleChange(e)} />Murmur
                                        {(sysExamDetails?.cvs.includes('Murmur')) && <StyledTextField
                                            id="outlined-textarea"
                                            name="cvs_Murmur"
                                            value={(sysExamDetails?.cvs.includes('Murmur')) ? (sysExamDetails?.cvs_Murmur) : ''}
                                            multiline
                                            onChange={(e: any) => handleChange(e)}
                                            disabled={!sysExamDetails?.cvs.includes('Murmur')}
                                        />}
                                    </StyledLabelOptions>
                                </RadioTd>
                            </TableRaw>
                            <TableRaw>
                                <td><StyledLabel>RS</StyledLabel></td>
                                <RadioTd>
                                    <StyledLabelOptions><input type="checkbox" checked={sysExamDetails?.rs_Vesicular === true} name="rs_Vesicular" value="Vesicular Breath Sounds" onChange={(e: any) => handleChange(e)} />Vesicular Breath Sounds</StyledLabelOptions>
                                    <StyledLabelOptions><input type="checkbox" checked={sysExamDetails?.rs_Bronchial === true} name="rs_Bronchial" value="Bronchial Breathing" onChange={(e: any) => handleChange(e)} />Bronchial Breathing</StyledLabelOptions>
                                    <StyledLabelOptions><input type="checkbox" checked={sysExamDetails?.rs_Creps === true} name="rs_Creps" value="Creps/Rhonchi" onChange={(e: any) => handleChange(e)} />Creps/Rhonchi</StyledLabelOptions>
                                </RadioTd>
                            </TableRaw>
                            <TableRaw>
                                <td><StyledLabel>PA Exam</StyledLabel></td>
                                <RadioTd>
                                    <StyledLabelOptions>
                                        <input type="radio" checked={sysExamDetails?.pa_exam === 'S'} name="pa_exam" value="S" onChange={(e: any) => handleChange(e)} />Soft
                                        <input type="radio" checked={sysExamDetails?.pa_exam === 'T'} name="pa_exam" value="T" onChange={(e: any) => handleChange(e)} />Tense
                                    </StyledLabelOptions>
                                    {/* <div><input type="checkbox" checked={sysExamData.pA_EXAM.includes('SOFT / TENSE')} name="pA_EXAM" value="SOFT / TENSE" onChange={handleInputChange} /> Soft / Tense</div> */}
                                    <StyledLabelOptions>
                                        <input type="checkbox" checked={sysExamDetails?.paExamRadio.includes('Tenderness')} name="paExamRadio" value="Tenderness" onChange={(e: any) => handleChange(e)} /> Tenderness
                                        {(sysExamDetails?.paExamRadio.includes('Tenderness')) && <StyledTextField
                                            id="outlined-textarea"
                                            name="pa_exam_TENDERNESS"
                                            value={(sysExamDetails?.paExamRadio.includes('Tenderness')) ? (sysExamDetails?.pa_exam_TENDERNESS) : ''}
                                            multiline
                                            onChange={(e: any) => handleChange(e)}
                                            disabled={!sysExamDetails?.paExamRadio.includes('Tenderness')}
                                        />}
                                    </StyledLabelOptions>
                                    <StyledLabelOptions>
                                        <input type="checkbox" checked={sysExamDetails?.paExamRadio?.includes('Hepatospleenomegaly')} name="paExamRadio" value="Hepatospleenomegaly" onChange={(e: any) => handleChange(e)} /> Hepatospleenomegaly
                                        {(sysExamDetails?.paExamRadio.includes('Hepatospleenomegaly')) && <StyledTextField
                                            id="outlined-textarea"
                                            name="pa_exam_HEPATOSPLEENOMEGALY"
                                            value={(sysExamDetails?.paExamRadio.includes('Hepatospleenomegaly')) ? (sysExamDetails?.pa_exam_HEPATOSPLEENOMEGALY) : ''}
                                            multiline
                                            onChange={(e: any) => handleChange(e)}
                                            disabled={!sysExamDetails?.paExamRadio.includes('Hepatospleenomegaly')}
                                        />}
                                    </StyledLabelOptions>
                                </RadioTd>
                            </TableRaw>
                        </tbody>
                    </Table>
                    <SubmitBtn onClick={handleSubmitClick}>Submit</SubmitBtn>
                </Box>
            </Modal>
        </>
    );
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    setDignosisDetail: (opdNo: any, updates: any) => dispatch(setDignosisDetail(opdNo, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SysExamModal);
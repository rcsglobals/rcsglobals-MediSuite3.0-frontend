import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import SelectDropdown from '../../common/select/SelectDropdown';
import OPDDoctorScheduleTable from './OPDDoctorScheduleTable';
import { MainHeading, PatientDetailCont, SubHeading, PatientDataCont, LabelContainer, RightContainer, SubCont, DoctorInfoCont, StyledLabel, StyledLabelValues, DropdownHeadings } from './OPDReg.styles';
import { SubmitBtn } from './OPDReg.styles';
import { DepartmentDropdownService, SpecializationDropdownService, UnitDropdownService } from '../../../services/dropdownService/opdRegDropdownServive/doctorInformation/DoctorInfoService';
import { RefferedByService, RefferedByDataService, PatientTypeService, PatientTypeOptionsService, DiscountService, CampOptionsService } from '../../../services/dropdownService/opdRegDropdownServive/generalInformation/GeneralInfoService';
import { OPDPatientDetailsService } from '../../../services/registrationService/opdRegistrationService/patientDetalService/PatientDetailService';
import { GetJRService, OpdFinalBillingService, RefferedOPDInsertionService } from '../../../services/registrationService/opdRegistrationService/opdBillingServices/OpdBillingServices';
import FeeTable from './FeeTable';
import AadharUpdationModal from './AadharUpdationModal';
import { connect } from 'react-redux';
import { clearSelectedDoctorsData, setBillingData, setOpdDiscountData, setPatientDetail } from '../../../redux/actions/OpdRegAction';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

const OPDReg = (props: any) => {
    const location: any = useLocation();
    const history: any = useHistory();
    const [deptValues, setDeptValues] = useState([]);
    const [selectedDeptId, setSelectedDeptId] = useState('');
    const [splnValues, setSplnValues] = useState([]);
    const [unitValues, setUnitValues] = useState([]);
    const [refferedValues, setRefferedValues] = useState([]);
    const [refferedValOptions, setRefferedValOptions] = useState([]);
    const [patientTypeValues, setPatientTypeValues] = useState([]);
    const [patientTypeOptions, setPatientTypeOptions] = useState([]);
    const [selectedPatientType, setSelectedPatientType] = useState('');
    const [discountOptions, setDiscountOptions] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [selectedDropdownValues, setSelectedDropdownValues] = useState({
        DeptID: 0,
        SpecID: 0,
        UnitId: 0,
        partnerId: 0,
        IsApplyEmergencyCharge: 'N',
        CampId: 0,
        OPDDiscountID: 0
    });
    const [showModal, setShowModal] = useState(false);
    const [updatedAadharValue, setUpdatedAadharValue] = useState('');
    const [loading, setLoading] = useState(false);
    const { patientId }: any = useParams();

    useEffect(() => {
        props.clearSelectedDoctorsData();
        const fetchOptions = async () => {

            try {
                const OPDPatientDetailsServiceRes: any = await OPDPatientDetailsService(props?.page === 'RefferedPatient' ? props?.patientId : patientId);
                if (OPDPatientDetailsServiceRes?.status === 200) {
                    props.setPatientDetail(OPDPatientDetailsServiceRes.data);
                } else {
                    console.error('Error fetching OPD patient details. Status:', OPDPatientDetailsServiceRes?.status);
                }
            } catch (error) {
                console.error('Error fetching OPD patient details:', error);
            }

            try {
                const DepartmentDropdownServiceRes: any = await DepartmentDropdownService();
                if (DepartmentDropdownServiceRes?.status === 200) {
                    const filteredData = filterDeptData(DepartmentDropdownServiceRes.data);
                    setDeptValues(filteredData);
                } else {
                    console.error('Error fetching department dropdown. Status:', DepartmentDropdownServiceRes?.status);
                }
            } catch (error) {
                console.error('Error fetching department dropdown:', error);
            }

            try {
                const RefferedByServiceRes: any = await RefferedByService();
                if (RefferedByServiceRes?.status === 200) {
                    setRefferedValues(RefferedByServiceRes.data);
                } else {
                    console.error('Error fetching referred by options. Status:', RefferedByServiceRes?.status);
                }
            } catch (error) {
                console.error('Error fetching referred by options:', error);
            }

            try {
                const PatientTypeServiceRes: any = await PatientTypeService();
                if (PatientTypeServiceRes?.status === 200) {
                    setPatientTypeValues(PatientTypeServiceRes.data);
                } else {
                    console.error('Error fetching patient type options. Status:', PatientTypeServiceRes?.status);
                }
            } catch (error) {
                console.error('Error fetching patient type options:', error);
            }

            try {
                const DiscountServiceRes: any = await DiscountService();
                if (DiscountServiceRes?.status === 200) {
                    setDiscountOptions(DiscountServiceRes.data);
                } else {
                    console.error('Error fetching discount options. Status:', DiscountServiceRes?.status);
                }
            } catch (error) {
                console.error('Error fetching discount options:', error);
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        setUpdatedAadharValue(updatedAadharValue);
    }, [updatedAadharValue])

    useEffect(() => {
        const BillNow = async () => {
            if (loading) {
                const res: any = (props?.billingData?.JR_Id != 0) && await OpdFinalBillingService({
                    billingData: props?.billingData,
                    selectedDoctor: props.selectedDoctor,
                    flag: props.patientDetails.flag,
                    page: props?.page
                });
                if (res?.status === 200) {
                    const opdNumber = res?.data?.opdNumber;
                    window.alert("Reffered Patient Billing Successful :)");
                    setLoading(false);
                    let RefferedOPDInsertionServiceRes: any = await RefferedOPDInsertionService({
                        patient_id: props?.rowData?.patientId,
                        prev_opd_registration_no: props?.rowData?.opdNo,
                        prev_dept_id: props?.rowData?.deptId,
                        prev_doctor_id: props?.rowData?.doctorId,
                        ref_opd_registration_no: opdNumber,
                        ref_dept_id: selectedDeptId,
                        ref_doctor_id: props?.billingData?.doctor_id,
                        CreatedBy: localStorage.getItem('userId')
                    });
                    if (RefferedOPDInsertionServiceRes?.status === 200) {
                        const isUseAuthorized: any = Object.values(props?.userMenu).some((value: any) => value?.uiRoute == '/patientForRequisition/:moduleId');
                        props?.setOpenRegModal(false);
                        isUseAuthorized && history.push('/patientForRequisition/3')
                        // const url = `/opdBillPrint?billNo=${encodeURIComponent(billNo)}`;
                        // const windowFeatures = "left=100,top=100,width=620,height=580";
                        // window.open(url, "popup", windowFeatures);
                    } else {
                        window.alert("Some problem occurred in insertion of reffered patient details...");
                    }
                } else {
                    (props?.billingData?.JR_Id === 0) ?  window.alert("SR/JR is not available. Please schedule one for billing......") : window.alert("Some issue occurred in reffered patient opd...");
                }
            }
        }
        BillNow();
    }, [props?.billingData])

    function filterDeptData(data: any) {
        return data.map((ele: any) => ({
            dept_id: ele.dept_id,
            dept_name: ele.dept_name
        }));
    }

    const handleDepartmentChange = async (event: any) => {
        const selectedDeptName: any = event.target.value;
        const selectedDeptVal: any = deptValues.find((department: any) => department.dept_name === selectedDeptName);

        if (selectedDeptVal) {
            const selectedDeptId = selectedDeptVal.dept_id;
            setSelectedDeptId(selectedDeptId);
            setSelectedDropdownValues(prevState => ({
                ...prevState,
                DeptID: selectedDeptId
            }));
            const res: any = await SpecializationDropdownService(selectedDeptId);
            setSplnValues(res);
        }
    }

    const handleSpecializationChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedSplnName: any = event.target.value;

        if (selectedDeptId !== '' && selectedSplnName !== '') {
            const selectedSplnVal: any = splnValues.find((spln: any) => spln.specialization === selectedSplnName);
            if (selectedSplnVal) {
                const selectedSplnId = selectedSplnVal.specialization_id;
                setSelectedDropdownValues(prevState => ({
                    ...prevState,
                    SpecID: selectedSplnId
                }));
                props.setBillingData({
                    specialization_id: selectedSplnId
                })
                const res: any = await UnitDropdownService(selectedDeptId, selectedSplnId);
                setUnitValues(res);
            }
        }
    }

    const handleUnitChange = (event: any) => {
        const selectedUnitName: any = event.target.value;

        if (selectedUnitName) {
            const selectedUnitVal: any = unitValues.find((unit: any) => unit.unit_name === selectedUnitName);
            const selectedUnitId = selectedUnitVal.unit_id;
            setSelectedDropdownValues(prevState => ({
                ...prevState,
                UnitId: selectedUnitId
            }));
            props.setBillingData({
                unit_id: selectedUnitId
            })
        }
    }

    const handleRefferedByChange = async (event: React.ChangeEvent<{ value: unknown }>) => {

        const selectedRefferedByName: any = event.target.value;
        const selectedRefferedVal: any = refferedValues.find((reffVal: any) => reffVal.doctor_master_type_name === selectedRefferedByName);

        if (selectedRefferedVal) {
            const selectedRefferedValId = selectedRefferedVal.doctor_master_type_id;
            // setSelectedDropdownValues(prevState => ({
            //     ...prevState,
            //     SpecID: selectedRefferedValId
            // }));
            const res: any = await RefferedByDataService(selectedRefferedValId);
            setRefferedValOptions(res.data);
        }
    }

    const handlePatientTypeChange = async (event: React.ChangeEvent<{ value: unknown }>) => {

        const selectedPatientTypeName: any = event.target.value;
        setSelectedPatientType(selectedPatientTypeName);
        props.setOpdDiscountData({
            patientType: selectedPatientTypeName
        })
        const selectedPatientTypeVal: any = patientTypeValues.find((patientType: any) => patientType.patient_category === selectedPatientTypeName);

        if (selectedPatientTypeVal) {
            props.setBillingData({
                patient_category_id: selectedPatientTypeVal.patient_category_id,
                partner_id: null,
                camp_id: null
            })
        }

        if (selectedPatientTypeVal && selectedPatientTypeName != 'Camp') {
            const selectedPatientTypeShortCode = selectedPatientTypeVal.category_short_Code;
            const res: any = await PatientTypeOptionsService(selectedPatientTypeShortCode);
            setPatientTypeOptions(res.data);
        }
        else if (selectedPatientTypeVal && selectedPatientTypeName === 'Camp') {
            const res: any = await CampOptionsService();
            setPatientTypeOptions(res?.data);
        }
    }

    const handlePatientTypeOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {

        const selectedPatientTypeOptionName: any = event.target.value;
        const selectedPatientTypeOptionVal: any = props.billingData.patient_category_id != 5 && patientTypeOptions.find((patientTypeOption: any) => patientTypeOption.partner_name === selectedPatientTypeOptionName);
        const selectedCampOptionVal: any = props.billingData.patient_category_id === 5 && patientTypeOptions.find((patientTypeOption: any) => patientTypeOption.camp_name === selectedPatientTypeOptionName);

        if (selectedPatientTypeOptionVal) {
            const selectedPatientTypeOptionId = selectedPatientTypeOptionVal.partner_id;
            setSelectedDropdownValues(prevState => ({
                ...prevState,
                partnerId: selectedPatientTypeOptionId
            }));
        } else if (selectedCampOptionVal) {
            const selectedCampId = selectedCampOptionVal.camp_id;
            setSelectedDropdownValues(prevState => ({
                ...prevState,
                CampId: selectedCampId,
            }));
        }

        if (props.billingData.patient_category_id === 1) {
            props.setBillingData({
                partner_id: null,
                camp_id: null
            })
        } else if (props.billingData.patient_category_id === 2) {
            props.setBillingData({
                partner_id: selectedPatientTypeOptionVal.partner_id,
                camp_id: null
            })
        } else if (props.billingData.patient_category_id === 5) {
            props.setBillingData({
                partner_id: null,
                camp_id: selectedCampOptionVal.camp_id
            })
        } else {

        }
    }

    const handleDiscountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedDiscountName: any = event.target.value;
        // const selectedDiscountTypeVal: any = discountOptions.find((discountType: any) => { (`${discountType.discountHead} (${discountType.discountPercent}%)`) === selectedDiscountName});
        const selectedDiscountTypeVal: any = discountOptions.find((discountType: any) => (`${discountType.discountHead} (${discountType.discountPercent}%)`) === selectedDiscountName);
        if (selectedDiscountTypeVal) {
            const selectedDiscountTypeId = selectedDiscountTypeVal.opdDiscountID;
            setSelectedDropdownValues(prevState => ({
                ...prevState,
                OPDDiscountID: selectedDiscountTypeId
            }));
            props.setBillingData({
                OPDDiscountID: selectedDiscountTypeId
            })
        }
    }

    const handleSubmitClick = () => {
        // if (
        //     ((selectedDropdownValues.DeptID && selectedDropdownValues.SpecID && selectedDropdownValues.UnitId) !== 0) &&
        //     (props.billingData.patient_category_id != 0) &&
        //     ((props.billingData.patient_category_id === 2 ? props.billingData.partner_id : props.billingData.camp_id) != (0 || null))
        // ) 
        
        if (
            selectedDropdownValues.DeptID !== 0 &&
            selectedDropdownValues.SpecID !== 0 &&
            selectedDropdownValues.UnitId !== 0 &&
            props.billingData.patient_category_id !== 0 &&
            (
              (props.billingData.patient_category_id === 1 && props.billingData.partner_id === null && props.billingData.camp_id === null) ||
              (props.billingData.patient_category_id === 2 && props.billingData.partner_id !== 0 && props.billingData.partner_id !== null && props.billingData.camp_id === null) ||
              (props.billingData.patient_category_id === 5 && (props.billingData.partner_id === 0 || props.billingData.partner_id === null) && props.billingData.camp_id !== 0 && props.billingData.camp_id !== null)
            )
          ){
            setShowTable(true);
        } else {
            window.alert("To view available doctors, please select department, specialization, unit, and patient category");
        }
    }

    const handleRefBillNowClick = () => {

        const BillNow = async () => {
            setLoading(true);
            if (props?.selectedDoctor[0] && props?.page === 'RefferedPatient') {
                try {
                    const responseData: any = props?.selectedDoctor[0] && await GetJRService({ doctorId: props?.selectedDoctor[0].doctor_id });
                    const mappedData = responseData.data.map((item: any) => ({
                        jr_id: item.jr_id,
                        jr_name: item.jr_name,
                        dept_id: item.dept_id,
                        jr_type_id: item.jr_type_id
                    }));

                    const smallestJrType = mappedData.reduce((min: any, current: any) => {
                        return current.jr_type_id < min.jr_type_id ? current : min;
                    }, mappedData[0]);

                    props.setBillingData({
                        doctor_id: props?.selectedDoctor[0].doctor_id,
                        JR_Id: (smallestJrType?.jr_id) ? (smallestJrType?.jr_id) : 0,
                        JR_deptId: (smallestJrType?.dept_id) ? (smallestJrType?.dept_id) : 0,
                        paid_amount: props?.selectedDoctor[0]?.consultation_fee,
                        pay_mode: 'CA',
                        con_total_price: props?.selectedDoctor[0]?.total_price,
                    })

                } catch (error) {
                    console.error('GetJRService Error:', error);
                }
            }
        }
        BillNow();
    }

    const handleInputChange = (value: any) => {
        if (value === 'Yes') {
            setSelectedDropdownValues(prevState => ({
                ...prevState,
                IsApplyEmergencyCharge: 'Y'
            }));
        } else {
            setSelectedDropdownValues(prevState => ({
                ...prevState,
                IsApplyEmergencyCharge: 'N'
            }));
        }
    }

    const handleClick = () => {
        setShowModal(true);
    }

    function getFormattedDate(dateString: any) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options: any = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }

    return (
        <div>
            <MainHeading>{props?.page === 'RefferedPatient' ? 'Reffered OPD' : 'OPD Registration'}</MainHeading>
            <div style={{ padding: '0px 20px 20px 10px', display: 'flex' }}>
                <PatientDetailCont >
                    <SubHeading>Patient Details</SubHeading>
                    <PatientDataCont>
                        <LabelContainer>
                            <StyledLabel>Patient Id:</StyledLabel>
                            <StyledLabelValues>{props.patientDetails?.patient?.patient_id}</StyledLabelValues>
                        </LabelContainer>
                        <LabelContainer>
                            <StyledLabel>Patient Name:</StyledLabel>
                            <StyledLabelValues>{props.patientDetails?.patient?.first_name + " " + props.patientDetails?.patient?.last_name}</StyledLabelValues>
                        </LabelContainer>
                        <LabelContainer>
                            <StyledLabel>Registration Date:</StyledLabel>
                            <StyledLabelValues>{getFormattedDate(props?.patientDetails?.patient?.registration_date)}</StyledLabelValues>
                        </LabelContainer>
                        <LabelContainer>
                            <StyledLabel>Gender:</StyledLabel>
                            <StyledLabelValues>{(props.patientDetails?.patient?.gender) ? (props.patientDetails?.patient?.gender) : ''}</StyledLabelValues>
                        </LabelContainer>
                        <LabelContainer>
                            <StyledLabel>Age:</StyledLabel>
                            <StyledLabelValues>{props.patientDetails?.patient?.age}</StyledLabelValues>
                        </LabelContainer>
                        <LabelContainer>
                            <StyledLabel>Father/Spouse Name:</StyledLabel>
                            <StyledLabelValues>{props.patientDetails?.patient?.father_spouse_name}</StyledLabelValues>
                        </LabelContainer>
                        <LabelContainer>
                            <StyledLabel>Contact No:</StyledLabel>
                            <StyledLabelValues>{props.patientDetails?.patient?.phone_no}</StyledLabelValues>
                        </LabelContainer>
                        <LabelContainer>
                            <StyledLabel>Is Rama Employee:</StyledLabel>
                            <StyledLabelValues>{(props.patientDetails?.patient?.isRamaEmployee === null ? 'No' : 'Yes')}</StyledLabelValues>
                        </LabelContainer>
                        <LabelContainer>
                            <StyledLabel>Aadhar Card:</StyledLabel>
                            <StyledLabelValues>{updatedAadharValue != '' ? updatedAadharValue : props.patientDetails?.patient?.adharNo}</StyledLabelValues>
                        </LabelContainer>
                        {props?.page !== 'RefferedPatient' && <StyledLabelValues style={{ display: 'flex', width: '100%' }}>Want to update the Aadhar Card?<div onClick={handleClick} style={{ color: '#4074c1', cursor: 'pointer', paddingLeft: '5px' }}>Click here</div></StyledLabelValues>}
                        {
                            showModal && <AadharUpdationModal setUpdatedAadharValue={setUpdatedAadharValue} patientId={props.patientDetails?.patient?.patient_id} showModal={showModal} setShowModal={setShowModal} />
                        }
                    </PatientDataCont>
                </PatientDetailCont>
                <RightContainer style={{ backgroundColor: '#f2f2f2', width: '100%', padding: '0px 20px' }}>
                    <SubCont>
                        <DoctorInfoCont>
                            <SubHeading>Doctor Information</SubHeading>
                            <div style={{ padding: '10px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <DropdownHeadings>Department</DropdownHeadings>
                                    <SelectDropdown required={true} handleDepartmentChange={(e: any) => handleDepartmentChange(e)} dropdown='department' values={deptValues} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <DropdownHeadings>Specialization</DropdownHeadings>
                                    <SelectDropdown required={true} handleSpecializationChange={handleSpecializationChange} dropdown='specialization' values={splnValues} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <DropdownHeadings>Unit</DropdownHeadings>
                                    <SelectDropdown required={true} handleUnitChange={handleUnitChange} dropdown='unit' values={unitValues} />
                                </div>
                                {props?.page != 'RefferedPatient' && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <DropdownHeadings>Emergency Charge</DropdownHeadings>
                                    <div style={{ padding: '10px 30px 10px 0px', display: 'flex', fontSize: '13px' }}>
                                        <input type="radio" name="choice" value="Yes" onChange={(e) => handleInputChange(e.target.value)} />Yes
                                        <input type="radio" name="choice" value="No" onChange={(e) => handleInputChange(e.target.value)} />No
                                    </div>
                                </div>}
                                {!showTable && props?.selectedDoctor.length !== 0 && props?.page === 'RefferedPatient' &&
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div>Reffered OPD Doctor</div>
                                            <div style={{ padding: '10px 30px 10px 0px', display: 'flex' }}>
                                                <div style={{ padding: '5px' }}>{props?.selectedDoctor[0].doctor_name}</div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </DoctorInfoCont>
                        {props?.page != 'RefferedPatient' && <DoctorInfoCont>
                            <SubHeading>General Information</SubHeading>
                            <div style={{ padding: '10px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <DropdownHeadings>Reffered by</DropdownHeadings>
                                    <SubCont>
                                        <SelectDropdown required={false} handleRefferedByChange={(e: any) => handleRefferedByChange(e)} dropdown='refferedBy' values={refferedValues} />
                                        <SelectDropdown required={false} dropdown='refferedByOptions' values={refferedValOptions} />
                                    </SubCont>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <DropdownHeadings>Patient Type</DropdownHeadings>
                                    <SubCont>
                                        <SelectDropdown required={true} handlePatientTypeChange={(e: any) => handlePatientTypeChange(e)} dropdown='patientType' values={patientTypeValues} />
                                        <SelectDropdown required={true} handlePatientTypeOptionChange={(e: any) => handlePatientTypeOptionChange(e)} dropdown='patientTypeOptions' values={patientTypeOptions} />
                                    </SubCont>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <DropdownHeadings>Discount Category</DropdownHeadings>
                                    <SelectDropdown required={false} handleDiscountChange={handleDiscountChange} dropdown='discount' values={discountOptions} />
                                </div>
                            </div>
                        </DoctorInfoCont>}
                    </SubCont>
                    {
                        (!showTable && props?.selectedDoctor.length !== 0 && props?.page === 'RefferedPatient') ?
                            (
                                loading ?
                                    <SubmitBtn><CircularProgress sx={{ color: 'white' }} size={24} /></SubmitBtn> :
                                    <SubmitBtn onClick={handleRefBillNowClick}>Bill Now</SubmitBtn>
                            ) :
                           ( <SubmitBtn onClick={handleSubmitClick}>Submit</SubmitBtn>)
                    }

                    {/* <SubmitBtn onClick={handleSubmitClick}>Submit</SubmitBtn>
                    <SubmitBtn onClick={handleBillNowClick}>Bill Now</SubmitBtn> */}
                </RightContainer>
            </div>
            {
                showTable && <OPDDoctorScheduleTable setShowTable={setShowTable} selectedDropdownValues={selectedDropdownValues} patientId={props?.patientDetails?.patient?.patient_id} />
            }
            {props?.page != 'RefferedPatient' && <FeeTable page={props?.page} selectedPatientType={selectedPatientType} patientDetails={props.patientDetails} />}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    patientDetails: state?.OpdRegistration?.patientDetails,
    billingData: state?.OpdRegistration?.billingData,
    selectedDoctor: state?.OpdRegistration?.selectedDoctor,
    userMenu: state?.AuthenticatedUserModules?.userMenu
});

const mapDispatchToProps = (dispatch: any) => ({
    setPatientDetail: (patientDetail: any) => dispatch(setPatientDetail(patientDetail)),
    setOpdDiscountData: (discountData: any) => dispatch(setOpdDiscountData(discountData)),
    setBillingData: (billingData: any) => dispatch(setBillingData(billingData)),
    clearSelectedDoctorsData: () => dispatch(clearSelectedDoctorsData())
});

export default connect(mapStateToProps, mapDispatchToProps)(OPDReg);
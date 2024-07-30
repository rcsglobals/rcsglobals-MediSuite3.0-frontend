import { useEffect, useState } from 'react';
import UserRoleMgmtImg from '../../../../images/ManageUsersIcon.png';
import SearchBar from '../../../../common/search/SearchBar';
import { Btns, BtnsContainer, CardContainer, Container, Heading, SubContainer, UserDataRaw, DoctorName, DeptName, SpclName } from './DoctorDetails.styles';
import Paper from '@mui/material/Paper';
import { GetDepartments, GetDoctorDetails, GetDoctorType } from '../../../../../services/generalSetUpServices/doctorDetailsServices/DoctorDetailsServices';
import { EditedDropdown } from '../../../../common/selectDropdown/EditedDropdown';
import AddIcon from '@mui/icons-material/Add';
import AddDoctorModal from '../../../modals/generalSetUp/doctorDetails/AddDoctorModal';
import EditDoctorModal from '../../../modals/generalSetUp/doctorDetails/EditDoctorModal';
import DoctorCutModal from '../../../modals/generalSetUp/doctorDetails/DoctorCutModal';

export default function DoctorDetails() {
    const [doctorTypes, setDoctorTypes] = useState<any>([]);
    const [depts, setDepts] = useState<any>([]);
    const [getDocDetailsParams, setGetDocDetailsParams] = useState<any>({
        docType: 'Employee',
        deptType: 'Medicine',
        docName: null
    })
    const [doctorDetails, setDoctorDetails] = useState<any>([]);
    const [searchValue, setSearchValue] = useState('');
    const [showAddDoctor, setShowAddDoctor] = useState<any>(false);
    const [showEditDoctor, setShowEditDoctor] = useState<any>(false);
    const [showDoctorCut, setShowDoctorCut] = useState<any>(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState<any>(false);

    useEffect(() => {
        const getData = async () => {

            try {
                const res: any = await GetDoctorType();
                setDoctorTypes(res?.data);
            } catch (err: any) {
                console.log("GetDoctorType api err", err);
            }

            try {
                const res: any = await GetDepartments();
                setDepts(res?.data);
            } catch (err: any) {
                console.log("GetDepartments api err", err);
            }
        }
        getData();
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetDoctorDetails(getDocDetailsParams);
                setDoctorDetails(res?.data);
                // setReloadData(false);
            } catch (err: any) {
                console.log("GetDoctorDetails api err", err);
            }
        }
        getData();
    }, [getDocDetailsParams])

    const handleSearchChange = async (e: any) => {
        const value = e?.target?.value;
        setSearchValue(value);
        setGetDocDetailsParams((prevState: any) => ({
            ...prevState,
            docName: value
        }));
    };

    const handleDoctorTypesChange = (event: any) => {
        const selectedDoctorType: any = event.target.value;
        const selectedDoctorTypeVal: any = doctorTypes.find((doctor: any) => doctor.doctorType === selectedDoctorType);
        setGetDocDetailsParams((prevState: any) => ({
            ...prevState,
            docType: selectedDoctorType
        }));
    }

    const handledeptsChange = (event: any) => {
        const selectedDept: any = event.target.value;
        const selectedDeptVal: any = depts?.find((dept: any) => dept.dept_name === selectedDept);
        setGetDocDetailsParams((prevState: any) => ({
            ...prevState,
            deptType: selectedDept
        }));
    }

    const handleAddDoctorClick = () => {
        setShowAddDoctor(true);
    }

    const handleEditClick = (id: any) => {
        setSelectedDoctorId(id);
        setShowEditDoctor(true);
    }

    const handleDoctorCutClick = (id: any) => {
        setSelectedDoctorId(id);
        setShowDoctorCut(true);
    }

    return (
        <div style={{ padding: '10px', backgroundColor: '#e0e0e05e' }}>
            <div style={{ border: '1px solid transparent', backgroundColor: '#55c79c', padding: '0px 10px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={UserRoleMgmtImg} height='40px' />
                    <div style={{ fontSize: '25px', fontWeight: '700', color: 'white', padding: '0px 10px' }}>Doctor Details</div>
                </div>
                <SearchBar page='doctorDetails' searchValue={searchValue} handleSearchChange={(e: any) => handleSearchChange(e)} />
            </div>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                <div style={{ border: '1px solid transparent', width: '4.5vw', minWidth: '60px', height: 'calc(100vh - 30vh)', backgroundColor: '#55c79c', padding: '10px 0px', textAlign: 'center' }}>
                </div>
                <div style={{ marginLeft: '2%', flexGrow: 1, paddingTop: '5px' }}>
                    <Container>
                        <Heading>
                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                <div style={{ margin: '0px 5px' }}>
                                    <EditedDropdown handleDoctorTypesChange={(e: any) => handleDoctorTypesChange(e)} dropdown='doctorTypes' options={doctorTypes} />
                                </div>
                                <div style={{ margin: '0px 5px' }}>
                                    <EditedDropdown handledeptsChange={handledeptsChange} dropdown='depts' options={depts} />
                                </div>
                            </div>
                            <div style={{ float: 'right', display: 'flex', textAlign: 'center', alignItems: 'center', padding: '0px 20px 0px 10px', minWidth: '100px', fontSize: '13px', borderRadius: '20px', cursor: 'pointer', backgroundColor: '#566f82', color: 'white', width: 'fit-content' }} onClick={() => handleAddDoctorClick()}>
                                <AddIcon fontSize='small' sx={{ width: '15px', height: '15px', padding: '0px 5px' }} /> Add Doctor
                            </div>
                        </Heading>
                        {
                            showAddDoctor && <AddDoctorModal doctorTypes={doctorTypes} departments={depts} showAddDoctor={showAddDoctor} setShowAddDoctor={setShowAddDoctor} />
                        }
                        <SubContainer>
                            {doctorDetails?.map((item: any, index: any) => (
                                <Paper elevation={5}>
                                    <CardContainer key={index}>
                                        <UserDataRaw>
                                            <DoctorName>{item.detailedInfo.doctor_name}</DoctorName>
                                            <DeptName>{item.detailedInfo.departments[0].dept_name}</DeptName>
                                        </UserDataRaw>
                                        <SpclName>{item.detailedInfo.departments[0].specialityTitle}</SpclName>
                                        <div>
                                            <BtnsContainer>
                                                <Btns style={{ color: '#af0200', margin: '0px 10px', borderBottom: '1px solid #af0200' }} onClick={() => handleDoctorCutClick(item.detailedInfo.doctor_id)}>Doctors Cut</Btns>
                                                <Btns style={{ color: '#40b4c1' }} onClick={() => handleEditClick(item.detailedInfo.doctor_id)}>Edit</Btns>
                                            </BtnsContainer>
                                            {
                                                showEditDoctor &&
                                                <EditDoctorModal doctorDataDetails={{ doctor_type_id: item.detailedInfo.doctor_type_id, doctor_type: item.detailedInfo.doctor_type, doctor_name: item.detailedInfo.doctor_name, doctor_id: item.detailedInfo.doctor_id, contactNoForSMS: item.detailedInfo.contactNoForSMS, doctorCategoryName: item.detailedInfo.doctorCategoryName, dept_name: item.detailedInfo.departments[0].dept_name, dept_id: item.detailedInfo.departments[0].dept_id, specialityTitle: item.detailedInfo.departments[0].specialityTitle, consultation_fee: item.detailedInfo.specializations[0].consultation_fee, consultation_fee_E: item.detailedInfo.specializations[0].consultation_fee_E, specialization_id: item.detailedInfo.specializations[0].specialization_id }}
                                                    specialization={item.detailedInfo.departments[0].specialityTitle} doctorTypes={doctorTypes} departments={depts} doctorID={item.detailedInfo.doctor_id} selectedDoctorId={selectedDoctorId} showEditDoctor={showEditDoctor} setShowEditDoctor={setShowEditDoctor}
                                                />
                                            }
                                            {
                                                showDoctorCut && <DoctorCutModal doctorName={item.detailedInfo.doctor_name} doctorID={item.detailedInfo.doctor_id} selectedDoctorId={selectedDoctorId} showDoctorCut={showDoctorCut} setShowDoctorCut={setShowDoctorCut} />
                                            }
                                        </div>
                                    </CardContainer>
                                </Paper>
                            ))}
                        </SubContainer>
                    </Container>
                </div>
            </div>
        </div>
    )
}
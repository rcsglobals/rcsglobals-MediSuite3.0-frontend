import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, DataContainer, LoginBtn, MainHeading, RadioBtnsContainer, StyledLabel, StyledTextField } from './AddDoctorModal.styles';
import { AddNewRole } from '../../../../../services/generalSetUpServices/manageUserRolesServices/ManageUserRoleSercices';
import AutoSearch from '../../../../common/autoSearch/AutoSearch';
import { AddNewDoctor, GetSpecializations } from '../../../../../services/generalSetUpServices/doctorDetailsServices/DoctorDetailsServices';
import SelectDropdown from '../../../../common/select/SelectDropdown';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    outline: 'none',
    p: 1,
};

export default function AddDoctorModal(props: any) {

    const { showAddDoctor, setShowAddDoctor, doctorTypes, departments } = props;

    const [spcln, setSpcln] = useState<any>([]);
    const [doctorData, setDoctorData] = useState<any>({
        DoctorName: '',
        DoctorTypeId: null,
        DoctorCategory: '',
        UniqueEmpID: null,
        ContactNo: null,
        DepartmentIds: null,
        Specializations: {
            specialization_id: null,
            consultation_fee: null,
            consultation_fee_E: null
        }
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetSpecializations();
                setSpcln(res?.data);
            } catch (err: any) {
                console.log("GetDoctorType api err", err);
            }
        }
        getData();
    }, [])

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowAddDoctor(false);
    };

    const handleInputChange = (e: any) => {
        const { value } = e.target;
    };

    const handleAddClick = async (e: any, roleName: any) => {
        e.stopPropagation();
        try {
            const res: any = await AddNewRole(roleName);
            if (res?.status === 200) {
                window.alert("New role add successfully :)");
                setShowAddDoctor(false);
            }
        } catch (err: any) {
            console.log("AddNewRoleRes api err", err);
        }

    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setDoctorData((prevData: any) => {
            // Check if the field belongs to Specializations
            if (name === 'consultation_fee' || name === 'consultation_fee_E' || name === 'specialization_id') {
                return {
                    ...prevData,
                    Specializations: {
                        ...prevData.Specializations,
                        [name]: value
                    }
                };
            }
            // Update the root level fields
            return {
                ...prevData,
                [name]: value
            };
        });
    }

    // const handleDepartment = (e: any) => {
    //     const selectedDepartment: any = e.target.innerText;
    //     const selectedDepartmentVal: any = departments.find((dept: any) => dept.dept_name === selectedDepartment);

    //     if (selectedDepartmentVal) {
    //         const selectedDepartmentId = selectedDepartmentVal.dept_id;

    //         setDoctorData((prevData: any) => ({
    //             ...prevData,
    //             DepartmentIds: selectedDepartmentId
    //         }));
    //     }
    // }

    const handleDepartment = (dept: any) => {
        // const selectedDepartment: any = e.target.innerText;
        const selectedDepartmentVal: any = departments.find((dept: any) => dept.dept_name === dept);

        if (selectedDepartmentVal) {
            const selectedDepartmentId = selectedDepartmentVal.dept_id;

            setDoctorData((prevData: any) => ({
                ...prevData,
                DepartmentIds: selectedDepartmentId
            }));
        }
    }

    // const handleSpecialization = (e: any) => {
    //     const selectedSpecialization: any = e.target.innerText;
    //     const selectedSpecializationVal: any = spcln.find((spcl: any) => spcl.specialization === selectedSpecialization);

    //     if (selectedSpecializationVal) {
    //         const selectedDoctorTypeId = selectedSpecializationVal.specializationId;
    //         setDoctorData((prevData: any) => ({
    //             ...prevData,
    //             Specializations: {
    //                 specialization_id: selectedDoctorTypeId
    //             }
    //         }));
    //     }
    // }

    const handleSpecialization = (spcl: any) => {
        // const selectedSpecialization: any = e.target.innerText;
        const selectedSpecializationVal: any = spcln.find((spcl: any) => spcl.specialization === spcl);

        if (selectedSpecializationVal) {
            const selectedDoctorTypeId = selectedSpecializationVal.specializationId;
            setDoctorData((prevData: any) => ({
                ...prevData,
                Specializations: {
                    specialization_id: selectedDoctorTypeId
                }
            }));
        }
    }

    const handleDoctorType = (e: any) => {
        const selectedDoctorType: any = e.target.value;
        const selectedDoctorTypeVal: any = doctorTypes.find((type: any) => type.doctorType === selectedDoctorType);

        if (selectedDoctorTypeVal) {
            const selectedDoctorTypeId = selectedDoctorTypeVal.doctorTypeId;
            setDoctorData((prevData: any) => ({
                ...prevData,
                DoctorTypeId: selectedDoctorTypeId
            }));
        }


    }

    const handleAddDoctor = async () => {
        try {
            const res: any = await AddNewDoctor(doctorData);
            if (res?.status === 200) {
                window.alert("New Doctor Added Successfully :)");
            }

        } catch (err: any) {
            console.log("GetDoctorDetails api err", err);
        }
    }

    return (
        <div>
            <Modal
                open={showAddDoctor}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>Add Doctor</MainHeading>
                    <div style={{ margin: '15px' }}>
                        <DataContainer>
                            <Container>
                                <StyledLabel>Doctor Type</StyledLabel>
                                <SelectDropdown required={true} dropdown='doctorType' values={doctorTypes} handleDoctorType={(e: any) => handleDoctorType(e)} />
                            </Container>
                            <Container>
                                <StyledLabel>Doctor Name</StyledLabel>
                                <StyledTextField name="DoctorName" value={doctorData.DoctorName} onChange={(e: any) => handleChange(e)} />
                            </Container>
                            <Container>
                                <StyledLabel>Contact No</StyledLabel>
                                <StyledTextField name="ContactNo" value={doctorData.ContactNo} onChange={(e: any) => handleChange(e)} />
                            </Container>
                            {/* <Container>
                                <StyledLabel>Employee Code</StyledLabel>
                                <StyledTextField type='email' name="email" value={''} onChange={handleChange} />
                            </Container> */}
                            <Container>
                                <StyledLabel>Speciality</StyledLabel>
                                <RadioBtnsContainer>
                                    <input
                                        style={{ marginRight: '5px', alignItems: 'center', accentColor: '#0d839252' }}
                                        type="radio"
                                        // checked={userInfo?.status === 'A'}
                                        name="DoctorCategory"
                                        value="SS"
                                        onChange={handleChange}
                                    /> Super Specialist
                                    <input
                                        style={{ marginRight: '5px', accentColor: '#0d839252' }}
                                        type="radio"
                                        // checked={userInfo?.status === 'I'}
                                        name="DoctorCategory"
                                        value="S"
                                        onChange={handleChange}
                                    /> Specialist
                                    <input
                                        style={{ marginRight: '5px', accentColor: '#0d839252' }}
                                        type="radio"
                                        // checked={userInfo?.status === 'I'}
                                        name="DoctorCategory"
                                        value="NA"
                                        onChange={handleChange}
                                    /> Not Applicable
                                </RadioBtnsContainer>
                            </Container>
                            <Container>
                                <StyledLabel>Department</StyledLabel>
                                <AutoSearch dropdown='docDetailsDept' options={departments} handleDepartment={(e: any) => handleDepartment(e)} />
                            </Container>
                            <Container>
                                <StyledLabel>Specialization</StyledLabel>
                                <AutoSearch dropdown='docDetailsSpln' options={spcln} handleSpecialization={handleSpecialization} />
                            </Container>
                            <Container>
                                <StyledLabel>Consultation Fee</StyledLabel>
                                <StyledTextField name="consultation_fee" value={doctorData.Specializations.consultation_fee} onChange={handleChange} />
                            </Container>
                            <Container>
                                <StyledLabel>E. Consultation Fee</StyledLabel>
                                <StyledTextField name="consultation_fee_E" value={doctorData.Specializations.consultation_fee_E} onChange={handleChange} />
                            </Container>
                        </DataContainer>
                    </div>
                    <LoginBtn onClick={handleAddDoctor}>Add Doctor</LoginBtn>
                </Box>
            </Modal>
        </div>
    );
}
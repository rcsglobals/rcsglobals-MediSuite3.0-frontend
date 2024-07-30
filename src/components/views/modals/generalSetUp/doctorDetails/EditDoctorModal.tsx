import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, DataContainer, LoginBtn, MainHeading, RadioBtnsContainer, StyledLabel, StyledTextField } from './EditDoctorModal.styles';
import AutoSearch from '../../../../common/autoSearch/AutoSearch';
import { GetSpecializations, UpdateDoctorDetailsService } from '../../../../../services/generalSetUpServices/doctorDetailsServices/DoctorDetailsServices';
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

export default function EditDoctorModal(props: any) {

  const { doctorID, selectedDoctorId, showEditDoctor, setShowEditDoctor, doctorTypes, departments, doctorDataDetails, specialization } = props;

  const [spcln, setSpcln] = useState<any>([]);
  const [doctorData, setDoctorData] = useState<any>({
    DoctorName: doctorDataDetails.doctor_name,
    DoctorTypeId: doctorDataDetails.doctor_type_id,
    DoctorCategory: doctorDataDetails.doctorCategoryName,
    UniqueEmpID: null,
    ContactNo: doctorDataDetails.contactNoForSMS,
    DepartmentIds: doctorDataDetails.dept_id,
    Specializations: {
      specialization_id: doctorDataDetails.specialization_id,
      consultation_fee: doctorDataDetails.consultation_fee,
      consultation_fee_E: doctorDataDetails.consultation_fee_E
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
    if (doctorID === selectedDoctorId) {
      getData();
    }
  }, [])

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowEditDoctor(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // setDoctorData((prevData: any) => ({
    //     ...prevData,
    //     [name]: value
    // }));

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
  //   const selectedDepartment: any = e.target.innerText;
  //   const selectedDepartmentVal: any = departments.find((dept: any) => dept.dept_name === selectedDepartment);

  //   if (selectedDepartmentVal) {
  //     const selectedDepartmentId = selectedDepartmentVal.dept_id;

  //     setDoctorData((prevData: any) => ({
  //       ...prevData,
  //       DepartmentIds: selectedDepartmentId
  //     }));
  //   }
  // }

  const handleDepartment = (selectedDepartment: any) => {
    const selectedDepartmentVal: any = departments.find((dept: any) => dept.dept_name === selectedDepartment);

    if (selectedDepartmentVal) {
      const selectedDepartmentId = selectedDepartmentVal.dept_id;

      setDoctorData((prevData: any) => ({
        ...prevData,
        DepartmentIds: selectedDepartmentId
      }));
    }
  }


  // const handleSpecialization = (e: any) => {
  //   const selectedSpecialization: any = e.target.innerText;
  //   const selectedSpecializationVal: any = spcln.find((spcl: any) => spcl.specialization === selectedSpecialization);

  //   if (selectedSpecializationVal) {
  //     const selectedDoctorTypeId = selectedSpecializationVal.specializationId;
  //     setDoctorData((prevData: any) => ({
  //       ...prevData,
  //       Specializations: {
  //         specialization_id: selectedDoctorTypeId
  //       }
  //     }));
  //   }
  // }

  const handleSpecialization = (selectedSpcln: any) => {
    // const selectedSpecialization: any = e.target.innerText;
    const selectedSpecializationVal: any = spcln.find((spcl: any) => spcl.specialization === selectedSpcln);

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

  const handleEditDoctor = async () => {
    try {
      const res: any = await UpdateDoctorDetailsService({ doctorData: doctorData, doctor_id: doctorDataDetails.doctor_id });
      if (res?.status === 200) {
        window.alert("Doctor Edited Successfully :)");
      }
    } catch (err: any) {
      console.log("UpdateDoctorDetailsService api err", err);
    }
  }

  if (doctorID !== selectedDoctorId) return null;

  return (
    <div>
      <Modal
        open={showEditDoctor}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MainHeading>Edit Doctor</MainHeading>
          <div style={{ margin: '15px' }}>
            <DataContainer>
              <Container>
                <StyledLabel>Doctor Type</StyledLabel>
                <SelectDropdown required={true} dropdown='doctorType' values={doctorTypes} doctor_type={doctorDataDetails.doctor_type} handleDoctorType={(e: any) => handleDoctorType(e)} />
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
                    checked={doctorData?.DoctorCategory === 'Super Specialist' || doctorData?.DoctorCategory === 'SS'}
                    name="DoctorCategory"
                    value="SS"
                    onChange={handleChange}
                  /> Super Specialist
                  <input
                    style={{ marginRight: '5px', accentColor: '#0d839252' }}
                    type="radio"
                    checked={doctorData?.DoctorCategory === 'Specialist' || doctorData?.DoctorCategory === 'S'}
                    name="DoctorCategory"
                    value="S"
                    onChange={handleChange}
                  /> Specialist
                  <input
                    style={{ marginRight: '5px', accentColor: '#0d839252' }}
                    type="radio"
                    checked={doctorData?.DoctorCategory === 'Not Applicable' || doctorData?.DoctorCategory === 'NA'}
                    name="DoctorCategory"
                    value="NA"
                    onChange={handleChange}
                  /> Not Applicable
                </RadioBtnsContainer>
              </Container>
              <Container>
                <StyledLabel>Department</StyledLabel>
                <AutoSearch dept_name={doctorDataDetails.dept_name} dropdown='docDetailsDept' options={departments} handleDepartment={(e: any) => handleDepartment(e)} />
              </Container>
              <Container>
                <StyledLabel>Specialization</StyledLabel>
                <AutoSearch specialization={specialization} dropdown='docDetailsSpln' options={spcln} handleSpecialization={handleSpecialization} />
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
          <LoginBtn onClick={handleEditDoctor}>Edit Doctor</LoginBtn>
        </Box>
      </Modal>
    </div>
  );
}
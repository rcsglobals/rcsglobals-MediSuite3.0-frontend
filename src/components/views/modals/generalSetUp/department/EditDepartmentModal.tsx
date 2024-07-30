import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, LoginBtn, MainHeading, RadioBtnsContainer, StyledLabel, StyledTextField } from './EditDepartmentModal.styles';
import { UpdateDepartmentTimeSlot } from '../../../../../services/generalSetUpServices/departmentServices/DepartmentServices';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  outline: 'none',
  boxShadow: 24,
  p: 2,
};

export default function EditDepartmentModal(props: any) {

  const { selectedDept, selectedCard, deptdata, showEditDept, setShowEditDept, setReloadData } = props;

  const [deptInfo, setDeptInfo] = useState<any>({
    deptName: deptdata.deptName,
    timeSlot: deptdata.timeSlot,
    status: deptdata.status,
    deptId: deptdata.deptId
  });

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowEditDept(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDeptInfo((prevData: any) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleUpdateClick = async () => {
    try {
      const res: any = await UpdateDepartmentTimeSlot({ deptName: deptInfo.deptName, timeSlot: deptInfo.timeSlot, status: deptInfo.status, dept_id: deptInfo.deptId });
      if (res?.status === 200) {
        window.alert("Your Department details updated successfully :)");
        setShowEditDept(false);
        setReloadData(true);
      }
    } catch (err: any) {
      console.log("UpdateDepartmentTimeSlot api err", err);
    }
  }

  if (selectedDept !== selectedCard) return null;

  return (
    <div>
      <Modal
        open={showEditDept}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MainHeading>Edit Department</MainHeading>
          <Container>
            <StyledLabel>Department Name</StyledLabel>
            <StyledTextField name="deptName" value={deptInfo.deptName} onChange={handleChange} />
          </Container>
          <Container>
            <StyledLabel>Appointment Time Slot(In Minutes)</StyledLabel>
            <StyledTextField name="timeSlot" value={deptInfo.timeSlot} onChange={handleChange} />
          </Container>
          <Container>
            <StyledLabel>Status</StyledLabel>
            <RadioBtnsContainer>
              <input
                style={{ marginRight: '5px', alignItems: 'center', accentColor: '#0d839252' }}
                type="radio"
                checked={deptInfo?.status === 'A'}
                name="status"
                value="A"
                onChange={handleChange}
              /> Active
              <input
                style={{ marginRight: '5px', accentColor: '#0d839252' }}
                type="radio"
                checked={deptInfo?.status === 'I'}
                name="status"
                value="I"
                onChange={handleChange}
              /> InActive
            </RadioBtnsContainer>
          </Container>
          <LoginBtn onClick={(e: any) => handleUpdateClick()}>Update</LoginBtn>
        </Box>
      </Modal>
    </div>
  );
}
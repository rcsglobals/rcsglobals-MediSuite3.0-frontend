import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { LoginBtn, MainHeading, StyledLabel, StyledTextField } from './AddNewRoleModal.styles';
import { AddNewRole } from '../../../../../services/generalSetUpServices/manageUserRolesServices/ManageUserRoleSercices';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  outline: 'none',
  p: 1,
};

export default function AddNewRoleModal(props: any) {

  const { showAddRole, setShowAddRole } = props;

  const [roleName, setRoleName] = useState('');

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowAddRole(false);
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setRoleName(value);
  };


  const handleKeyPress = (e: any, roleName: any) => {
    if (e.key === 'Enter') {
      handleAddClick(e, roleName);
    }
  };

  const handleAddClick = async (e: any, roleName: any) => {
    e.stopPropagation();
    try {
      const res: any = await AddNewRole(roleName);
      if (res?.status === 200) {
        window.alert("New role add successfully :)");
        setShowAddRole(false);
      }
    } catch (err: any) {
      console.log("AddNewRoleRes api err", err);
    }

  };

  return (
    <div>
      <Modal
        open={showAddRole}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MainHeading>Add Role</MainHeading>
          <StyledLabel>Enter Role Name</StyledLabel>
          <StyledTextField
            type="text"
            name="username"
            value={roleName}
            onChange={handleInputChange}
            fullWidth
            onKeyPress={(e: any) => handleKeyPress(e, roleName)}
          />
          <LoginBtn onClick={(e: any) => handleAddClick(e, roleName)}>Add</LoginBtn>
        </Box>
      </Modal>
    </div>
  );
}
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, MainHeading, DataContainer, StyledLabel, StyledTextField, Btn } from './ResetPaswrdModal.styles';
import { UpdateUserPasswordService } from '../../../../../services/generalSetUpServices/resetPswrdServices/ResetPswrdServices';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

export function ResetPaswrdModal(props: any) {

    const { searchedUserDetails, showResetPaswrd, sethowResetPaswrd } = props;

    const [isResetPaswrd, setIsResetPaswrd] = useState<any>(false);
    const [password, setPassword] = useState<any>('');

    const handleClose = (e: any) => {
        e.stopPropagation();
        sethowResetPaswrd(false);
    };

    const handleResetClick = () => {
        setIsResetPaswrd(true);
    }

    const handleInputChange = (e: any) => {
        const { value } = e.target;
        setPassword(value);
    }

    const handleSubmitClick = async () => {
        try {
            const res: any = await UpdateUserPasswordService(searchedUserDetails[0]?.userId, password);
            if (res?.status === 200) {
                window.alert("User Password updated Successfully :)");
                sethowResetPaswrd(false);
            }
        } catch (err: any) {
            console.log("UpdateUserPasswordService api err", err);
        }
    }

    return (
        <div>
            <Modal
                open={showResetPaswrd}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>Searched User Details</MainHeading>
                    <DataContainer>
                        <Container>
                            <StyledLabel>Username</StyledLabel>
                            <StyledTextField InputProps={{ readOnly: true }} name="userName" value={searchedUserDetails[0]?.username} />
                        </Container>
                        <Container>
                            <StyledLabel>Role Name</StyledLabel>
                            <StyledTextField InputProps={{ readOnly: true }} name="roleName" value={searchedUserDetails[0]?.roleName} />
                        </Container>
                        <Container>
                            <StyledLabel>Employee Id</StyledLabel>
                            <StyledTextField InputProps={{ readOnly: true }} name="empId" value={searchedUserDetails[0]?.uniqueEMPID} />
                        </Container>
                        {isResetPaswrd &&
                            <>
                                <Container>
                                    <StyledLabel>Enter Password</StyledLabel>
                                    <StyledTextField name="password" value={password} onChange={(e: any) => handleInputChange(e)} />
                                </Container>
                                {/* <Container>
                                    <StyledLabel>Confirm Password</StyledLabel>
                                    <StyledTextField name="cfmPassword" value={'userInfo.fullname'} />
                                </Container> */}
                            </>
                        }
                        {!isResetPaswrd ?
                            <Btn onClick={handleResetClick}>Reset Password</Btn>
                            :
                            <Btn onClick={handleSubmitClick}>Submit</Btn>
                        }
                    </DataContainer>
                </Box>
            </Modal>
        </div>
    );
}
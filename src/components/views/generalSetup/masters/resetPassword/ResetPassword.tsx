import { useState, useEffect } from 'react';
import UserRoleMgmtImg from '../../../../images/ManageUsersIcon.png';
import ResetPasswordIcon from '../../../../images/ResetPswrdIcon.png';
import { MainContainer, TopBarCont, MainHeadingCont, MainHeading, ContentCont, SideBar, Container, ResetPaswrdCont, ResetPaswrdHeading, BtnContainer, SearchBtn, StyledLabel, StyledTextField, LinkCont, LinkText, ClickHere } from './ResetPassword.styles';
import { EditedDropdown } from '../../../../common/selectDropdown/EditedDropdown';
import { GetLocations, GetSearchedUser } from '../../../../../services/generalSetUpServices/resetPswrdServices/ResetPswrdServices';
import { ResetPaswrdModal } from '../../../modals/generalSetUp/resetPswrdModal/ResetPaswrdModal';

export default function ResetPassword() {

    const [showEmpIdField, setShowEmpIdField] = useState<any>(false);
    const [locations, setLocations] = useState<any>([]);
    const [searchUserParams, setSearchUserParams] = useState<any>({
        locationId: null,
        serchText: ''
    })
    const [showResetPaswrd, sethowResetPaswrd] = useState<any>(false);
    const [searchedUserDetails, setSearchedUserDetails] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetLocations();
                setLocations(res?.data);
            } catch (err: any) {
                console.log("GetLocations api err", err);
            }
        }
        getData();
    }, [])

    const handleInputChange = (e: any) => {
        const { value } = e.target;
        setSearchUserParams((prevState: any) => ({
            ...prevState,
            serchText: value
        }));
    }

    const handleClickHere = () => {
        setShowEmpIdField(true);
    }

    const handleLocationChange = async (event: any) => {
        const selectedLocationName: any = event.target.value;
        const selectedLocVal: any = locations.find((location: any) => location.locationName === selectedLocationName);

        if (selectedLocVal) {
            const selectedLocId = selectedLocVal.locationId;
            setSearchUserParams((prevState: any) => ({
                ...prevState,
                locationId: selectedLocId
            }));
        }
    }

    const handleSearchBtnClick = async (e: any) => {
        sethowResetPaswrd(true);
        try {
            const res: any = await GetSearchedUser(searchUserParams);
            if (res?.status === 200) {
                setSearchedUserDetails(res?.data);
            }
        } catch (err: any) {
            console.log("GetSearchedUser api err", err);
        }
    }

    return (
        <MainContainer>
            <TopBarCont>
                <MainHeadingCont>
                    <img src={UserRoleMgmtImg} height='40px' />
                    <MainHeading>Reset Password</MainHeading>
                </MainHeadingCont>
            </TopBarCont>
            <ContentCont>
                <SideBar />
                <Container>
                    <div style={{ textAlign: 'right', padding: '10px' }}>
                        <EditedDropdown options={locations} dropdown='resetPswrd' handleLocationChange={handleLocationChange} />
                    </div>
                    <ResetPaswrdCont>
                        <div style={{ textAlign: 'center', padding: '10px' }}><img src={ResetPasswordIcon} /></div>
                        <ResetPaswrdHeading>Search User to Reset the Password</ResetPaswrdHeading>
                        <div style={{ padding: '10px' }}>
                            {!showEmpIdField ?
                                <div style={{ padding: '0px 15%' }}>
                                    <StyledLabel>Enter your Username</StyledLabel>
                                    <StyledTextField
                                        type="text"
                                        name="roleName"
                                        onChange={handleInputChange}
                                        fullWidth
                                        onKeyPress={(e: any) => handleSearchBtnClick(e)}
                                    />
                                </div> :
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <StyledLabel>Employee Id</StyledLabel>
                                    <StyledTextField
                                        type="text"
                                        name="roleName"
                                        onChange={handleInputChange}
                                        fullWidth
                                        onKeyPress={(e: any) => handleSearchBtnClick(e)}
                                    />
                                </div>
                            }
                            <LinkCont>
                                <LinkText >If you forgot your Username?
                                    <ClickHere onClick={handleClickHere}>Click here</ClickHere>
                                </LinkText>
                            </LinkCont>
                            <BtnContainer>
                                <SearchBtn onClick={handleSearchBtnClick}>Search</SearchBtn>
                            </BtnContainer>
                            {
                                showResetPaswrd && <ResetPaswrdModal searchedUserDetails={searchedUserDetails} showResetPaswrd={showResetPaswrd} sethowResetPaswrd={sethowResetPaswrd} />
                            }
                        </div>
                    </ResetPaswrdCont>
                </Container>
            </ContentCont>
        </MainContainer>
    );
}
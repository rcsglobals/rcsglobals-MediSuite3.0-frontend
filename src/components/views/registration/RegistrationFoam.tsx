import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { MainContainer, FoamContainer, MainHeading, Label, SearchBtn, StyledTextField } from "./RegistrationFoam.styles";
import RegistrationTable from "./RegistrationTable";
import { connect } from 'react-redux';
import { clearBillingData } from "../../../redux/actions/OpdRegAction";

const RegistrationFoam = (props: any) => {

    const [showTable, setShowTable] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState("patientId");
    const [patientData, setPatientData] = useState({
        patientId: "",
        phoneNo: "",
        patientName: "",
        fatherName: ""
    });
    const serachCritiria: any = searchCriteria === 'patientId' ? patientData.patientId : patientData.patientName;

    useEffect(() => {
        props.clearBillingData();
    }, [])

    const handleSearchClick = () => {
        setShowTable(true);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setSearchCriteria(name);
        setPatientData({
            ...patientData,
            [name]: value
        })
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <MainContainer>
            <FoamContainer>
                <div style={{}}>
                    <MainHeading>
                        Search Patient/OPD
                    </MainHeading>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px 0px' }}>
                        <div style={{ display: 'flex', width: '50%', alignItems: 'center' }}>
                            <Label>Patient Id:</Label>
                            <StyledTextField id="filled-basic" label="" name="patientId" onChange={handleChange} onKeyPress={(e: any) => handleKeyPress(e)} />
                        </div>
                        <div style={{ display: 'flex', width: '50%', alignItems: 'center' }}>
                            <Label>Phone No:</Label>
                            <StyledTextField id="filled-basic" label="" name="phoneNo" onChange={handleChange} onKeyPress={(e: any) => handleKeyPress(e)} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px 0px' }}>
                        <div style={{ display: 'flex', width: '50%', alignItems: 'center' }}>
                            <Label>Patient Name:</Label>
                            <StyledTextField id="filled-basic" label="" name="patientName" onChange={handleChange} onKeyPress={(e: any) => handleKeyPress(e)} />
                        </div>
                        <div style={{ display: 'flex', width: '50%', alignItems: 'center' }}>
                            <Label>Father Name:</Label>
                            <StyledTextField id="filled-basic" label="" name="fatherName" onChange={handleChange} onKeyPress={(e: any) => handleKeyPress(e)} />
                        </div>
                    </div>
                    <SearchBtn onClick={handleSearchClick}>Search</SearchBtn>
                </div>
                {
                    showTable && <RegistrationTable setShowTable={setShowTable} serachCritiria={serachCritiria} userMenu={props?.userMenu} />
                }
            </FoamContainer>
        </MainContainer>
    )
}

const mapStateToProps = (state: any) => ({
    userMenu: state?.AuthenticatedUserModules?.userMenu,
});

const mapDispatchToProps = (dispatch: any) => ({
    clearBillingData: () => dispatch(clearBillingData())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationFoam);
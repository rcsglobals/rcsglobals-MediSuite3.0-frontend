import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const MainHeading = styled.div`
    text-align: center;
    font-size: 25px;
    font-weight: 500;
    padding: 10px;
`

export const PatientDetailCont = styled.div`
    width: 40%;
    background-color: #f2f2f2;
    margin: 0px 3%;
`

export const SubHeading = styled.div`
    text-align: center;
    font-weight: 500;
    font-size: 13px;
    padding: 10px;
`

export const PatientDataCont = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px 20px;
`

export const LabelContainer = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 1150px) {
        display: block;
    }
`

export const StyledLabel = styled.div`
    color: grey;
    font-weight: 400;
    width: 50%;
    padding: 2px 0px;
    font-size: 12px;

    @media screen and (max-width: 1150px) {
        width: 100%;
        padding: 5px 0px;
    }
`

export const StyledLabelValues = styled.div`
    width: 50%;
    padding: 2px 0px;
    font-size: 12px;

    @media screen and (max-width: 1150px) {
        width: 100%;
        padding: 5px 0px;
    }
`

export const StyledTextField = styled(TextField)`
    width: 300px;
    padding: 5px;

    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 0px 10px !important;
    }
`

export const RightContainer = styled.div`
    background-color: #f2f2f2;
    width: 100%;
    padding: 0px 20px;
`

export const SubCont = styled.div`
    display: flex;

    @media screen and (max-width: 1150px) {
        flex-direction: column;
    }
`

export const DoctorInfoCont = styled.div`
    background-color: #fff;
    width: 100%;
    margin: 20px 5px 0px 5px;

`
export const DropdownHeadings = styled.div`
    width: 50%;
    padding: 2px 0px;
    font-size: 14px;

    @media screen and (max-width: 1150px) {
        width: 100%;
        padding: 5px 0px;
    }
`

export const SubmitBtn = styled.div`
    background-color: #4074c1;
    padding: 8px;
    color: white;
    cursor: pointer;
    width: 100px;
    text-align: center;
    border-radius: 5px;
    margin: 20px 0px;
    font-size: 13px;
`
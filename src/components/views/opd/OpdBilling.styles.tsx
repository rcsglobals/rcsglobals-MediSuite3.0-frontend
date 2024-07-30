import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const BillingBtn = styled.div`
    background-color: #4074c1;
    padding: 10px;
    color: white;
    cursor: pointer;
    width: 100px;
    text-align: center;
    border-radius: 5px;
    margin: 10px;
`
export const MainHeading = styled.div`
    padding: 10px;
    color: black;
    font-size: 20px;
    font-weight: 500
    border-radius: 3px;
`

export const StyledLabel = styled.div`
    color: black;
    font-weight: 500;
    font-size: 13px;
`

export const StyledTextField = styled(TextField)`
    width: 100px;
    padding: 5px;

    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 0px 10px !important;
    }
`

export const StyledLabelValue = styled.div`
    padding: 5px;
    font-size: 13px;
`
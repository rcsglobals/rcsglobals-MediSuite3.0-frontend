import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const MainHeading = styled.div`
    padding: 10px;
    color: black;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    border-bottom: 1px solid grey;
    border-radius: 3px;
`

export const StyledLabel = styled.div`
    padding: 20px 0px 10px 0px;
    color: grey;
    font-weight: 400;
    font-size: 13px;
`

export const StyledTextField = styled(TextField)`
    width: 100%;
    
    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    .MuiInputBase-input.MuiOutlinedInput-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 10px 14px;
        font-size: 13px;
    }
`

export const LoginBtn = styled.div`
    background-color: #4074c1;
    padding: 8px 5px;
    color: white;
    cursor: pointer;
    width: 15%;
    text-align: center;
    border-radius: 5px;
    margin: 10px 0px;
    font-size: 13px;
`

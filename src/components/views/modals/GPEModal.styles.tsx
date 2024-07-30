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
    color: black;
    font-weight: 400;
    font-size: 13px;
    width: 50%;
`

export const StyledTextField = styled(TextField)`
    width: 200px;
    padding: 5px;

    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 0px 10px !important;
        font-size: 13px;
    }
`

export const LoginBtn = styled.div`
    background-color: #4074c1;
    padding: 8px;
    color: white;
    cursor: pointer;
    width: 15%;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 13px;
    margin-left: 10px;
`

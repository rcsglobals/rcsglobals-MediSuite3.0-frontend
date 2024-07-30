import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const MainHeading = styled.div`
    padding: 5px 10px;
    color: black;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    border-bottom: 1px solid grey;
    border-radius: 3px;
`

export const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
`

export const StyledLabel = styled.div`
    color: black;
    font-weight: 400;
    font-size: 13px;
    width: 35%;
`

export const StyledTextField = styled(TextField)`
    width: 200px;
    padding: 5px;

    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 3px 10px !important;
        font-size: 13px;
    }
`

export const Btn = styled.div`
    background-color: #40b4c1;
    padding: 5px 8px;
    color: white;
    cursor: pointer;
    min-width: 15%;
    width: 25%;
    text-align: center;
    border-radius: 5px;
    font-size: 13px;
`
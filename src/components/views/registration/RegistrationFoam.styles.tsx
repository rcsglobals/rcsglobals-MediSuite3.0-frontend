import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const MainContainer = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #a0acab42;
    min-height: 91vh;
`

export const FoamContainer = styled.div `
    padding: 15px;
    background-color: white;
`

export const MainHeading = styled.div `
   font-size: 15px;
   font-weight: 500;
   align-item: center;
   color: #40b4c1;
   text-align: center;
   margin-bottom: 10px;
`

export const Label = styled.div`
    padding: 10px;
    width: 50%;
    font-size: 13px;
    color: black;
`

export const StyledTextField = styled(TextField)`
    width: 100%;

    .MuiInputBase-input.MuiOutlinedInput-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 8px 10px;
        font-size: 13px;
    }
    
    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }
`

export const SearchBtn = styled.div`
    background-color: #4074c1;
    padding: 10px;
    color: white;
    cursor: pointer;
    width: 15%;
    text-align: center;
    border-radius: 5px;
    margin: 10px;
`
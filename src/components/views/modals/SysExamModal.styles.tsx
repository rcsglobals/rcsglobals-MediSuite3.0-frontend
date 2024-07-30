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
    padding: 10px 0px;
    color: black;
    font-weight: 500;
    font-size: 13px;
`
export const StyledLabelOptions = styled.div`
    padding: 3px;
    color: black;
    font-size: 13px;
    align-items: center;
    display: flex;
`

export const Table = styled.table`
    width: 100%;
    padding: 15px 0px;
`

export const TableRaw = styled.tr`
   
`

export const RadioTd = styled.td`
    padding: 10px;
    box-shadow: 0px 1px 1px 0.25px #80808024;

    input[type="radio"] {
        margin: 5px;
    }
`

export const SubmitBtn = styled.div`
    background-color: #4074c1;
    padding: 8px 5px;
    color: white;
    cursor: pointer;
    width: 15%;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 13px;
`

export const StyledTextField = styled(TextField)`
    width: 150px;
    padding: 5px;

    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 0px !important;
    }

    .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root  {
        padding: 5px !important;
        margin-left: 5px;
    }
`

import styled from "styled-components";
import { styled as MuiStyled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';

export const TableCellData = MuiStyled(TableCell)(({ theme }) => ({
    fontSize: '11px',
    // padding: '10px',
    // border: '1px solid red',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        padding: '8px',
    },
    [`&.${tableCellClasses.head}`]: {
        padding: '10px'
    },
    [`&.${tableCellClasses.body}`]: {
        padding: '5px'
    },
}));

export const MainHeading = styled.div`
    padding: 5px 10px;
    color: black;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    border-bottom: 1px solid grey;
    border-radius: 3px;
`

export const StyledLabel = styled.div`
    padding: 10px 0px 10px 0px;
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
        padding: 5px 10px;
        font-size: 13px;
    }
`

export const LoginBtn = styled.div`
    background-color: #4074c1;
    padding: 5px;
    color: white;
    cursor: pointer;
    width: 25%;
    text-align: center;
    border-radius: 5px;
    margin: 10px 0px;
    font-size: 13px;
`
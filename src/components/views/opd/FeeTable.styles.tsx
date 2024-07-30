import styled from 'styled-components';
import { styled as MuiStyled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';

export const StyledTextField = styled(TextField)`
    width: 70px;
    padding: 10px;  

    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 3px 10px !important;
         font-size: 13px !important;
    }
`

export const MakePaymentBtn = styled.div`
    background-color: #4074c1;
    padding: 8px;
    color: white;
    cursor: pointer;
    width: 10%;
    text-align: center;
    border-radius: 5px;
    margin: 10px;
    font-size: 13px;
`

export const TableCellData = MuiStyled(TableCell)(({ theme }) => ({
    fontSize: '11px',
    padding: '10px',

    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        padding: '8px',
    },
}));
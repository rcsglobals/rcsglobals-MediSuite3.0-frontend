import styled from "styled-components";
import { styled as MuiStyled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export const SubmitBtn = styled.div`
    background-color: #4074c1;
    padding: 10px;
    color: white;
    cursor: pointer;
    width: 100px;
    text-align: center;
    border-radius: 5px;
    margin: 10px;
`

export const TableCellData = MuiStyled(TableCell)(({ theme }) => ({
  fontSize: '11px',
  padding: '5px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    padding: '8px'
  },
}));
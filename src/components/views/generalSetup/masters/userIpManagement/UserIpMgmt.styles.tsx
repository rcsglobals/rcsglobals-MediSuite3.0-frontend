import { styled as MuiStyled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const TableCellData = MuiStyled(TableCell)(({ theme }) => ({
    fontSize: '11px',
   
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
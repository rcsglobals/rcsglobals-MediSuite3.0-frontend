import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export const TableCellData = styled(TableCell)(({ theme }) => ({
  fontSize: '11px',
  padding: '10px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    padding: '8px'
  },
}));
import styled from "styled-components";
import { styled as MuiStyled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
// import InputBase from '@mui/material/InputBase';

export const MainHeading = styled.div`
  padding: 0px 20px;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #1e4c79;
  width: 30%;
  font-family: Epilogue, sans-serif;
`
export const TableCellData = MuiStyled(TableCell)(({ theme }) => ({
  fontSize: '11px',
  padding: '10px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    padding: '8px',
  },
}));

export const SearchContainer = styled.div`
  padding: 0px 15px;
  // display: flex;
  justify-content: space-between;
  border-radius: 5px;
  // background-color: #fff;
`

export const SearchIconWrapper = styled('div')`
  pointer-events: none;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`

// export const StyledInputBase = styled(InputBase)`
//   // padding: 0px 20px;
//   color: inherit;
//   width: 80%;
//   font-size: 13px !important;
//   & .MuiInputBase-input {
//     @media (min-width: 50px) {
//       width: 20ch;
//     }
//   }
// `
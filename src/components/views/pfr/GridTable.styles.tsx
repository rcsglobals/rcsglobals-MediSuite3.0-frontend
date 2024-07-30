import styled from "styled-components";
import { styled as MuiStyled  } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
`
export const EopdContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 0px 10px;
`

export const EopdText = styled.div`
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    color: #1e4c79;
`

export const SearchContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media screen and (max-width: 1150px) {
        width: 100%;
    }
`

export const SearchText = styled.div`
    font-weight: 500;
    font-size: 20px;
    color: #1e4c79;
`

export const TableCellData = MuiStyled(TableCell)(({ theme }) => ({
    fontSize: '11px',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      padding: '8px',
    },
  }));
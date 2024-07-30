import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const MainHeading = styled.div`
    padding: 5px 10px;
    color: black;
    text-align: center;
    font-size: 25px;
    font-weight: 500;
    border-bottom: 2px solid #40b4c1;
    border-radius: 5px;
`

export const InfoText = styled.div`
    font-size: 20px;
    color: #23629f;
    font-weight: 500;
    padding: 30px 0px 20px 0px;
    font-family: serif;
`

export const StyledLabel = styled.div`
    padding: 20px 0px 20px 0px;
    color: grey;
    font-weight: 400;
    font-size: 20px;
`

export const StyledTextField = styled(TextField)`
    width: 100%;
    
    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    .MuiInputBase-input.MuiOutlinedInput-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 10px 14px;
        font-size: 15px;
    }
`

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
`

export const SearchBtn = styled.div`
    background-color: #40b4c1;
    padding: 8px 10px;
    color: white;
    cursor: pointer;
    width: 15%;
    min-width: 70px;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
    font-size: 17px;
`
export const RegBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RegisterBtn = styled.div`
    background-color: #40b4c1;
    padding: 8px;
    color: white;
    cursor: pointer;
    width: 15%;
    min-width: 70px;
    text-align: center;
    border-radius: 5px;
    margin: 0px 5px;
    font-size: 17px;
`

export const UserDetailMainCont = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`

export const UserDetailCont = styled.div`
    border: 1px solid #dfd7d8;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: #f5f3f3de;
`

export const CompanyName = styled.div`
    font-size: 25px;
    color: #344d60;
    font-weight: 500;
    text-align: center;
    padding: 5px;
`

export const UserImage = styled.div`
    text-align: center;
    padding: 10px;
`

export const Username = styled.div`
    font-size: 20px;
    color: #4c0d45ed;
    font-weight: 600;
    text-align: center;
    padding: 10px;
`

export const IdAndDept = styled.div`
    font-size: 15px;
    color: black;
    font-weight: 400;
    text-align: center;
    padding: 5px;
`
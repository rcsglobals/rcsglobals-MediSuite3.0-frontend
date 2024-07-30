import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const MainContainer = styled.div`
    padding: 10px;
    background-color: #e0e0e05e;
`

export const TopBarCont = styled.div`
    border: 1px solid transparent;
    background-color: #55c79c;
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
`

export const MainHeadingCont = styled.div`
    display: flex;
    align-items: center;
`

export const MainHeading = styled.div`
    font-size: 25px;
    font-weight: 700;
    color: white;
    padding: 12px 10px;
`

export const ContentCont = styled.div`
    display: flex;
    overflow-X: auto;
`

export const SideBar = styled.div`
    border: 1px solid transparent;
    width: 4.5vw;
    min-width: 60px;
    height: calc(100vh - 25vh);
    background-color: #55c79c;
    padding: 10px 0px;
    text-align: center;
`

export const Container = styled.div`
    margin: 2%;
    flex-grow: 1;
    padding-top: 5px;
    background-color: #cef3f7;
`

export const ResetPaswrdCont = styled.div`
    padding: 10px;
    margin: 0% 30%;
    border-radius: 5px;
    text-align: center;
    background-color: #f2feff;
` 

export const ResetPaswrdHeading = styled.div`
    text-align: center;
    font-size: 20px;
    color: black;
    font-weight: 500;
`

export const StyledLabel = styled.div`
    margin: 10px 0px;
    color: grey;
    font-weight: 400;
    font-size: 15px;
    text-align: left;
`

export const StyledTextField = styled(TextField)`
    width: 50%;
    
    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    .MuiInputBase-input.MuiOutlinedInput-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 5px 10px;
        font-size: 13px;
    }
`

export const LinkCont = styled.div`
    padding: 10px;
`

export const LinkText = styled.div`
    display: flex;
    width: 100%;
    font-size: 13px;
    justify-content: center;
    margin-top: 10px;
`

export const ClickHere = styled.div`
    color: #4074c1;
    cursor: pointer;
    padding-left: 5px;
`

export const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
`

export const SearchBtn = styled.div`
    background-color: #40b4c1;
    padding: 5px 10px;
    color: white;
    cursor: pointer;
    width: 15%;
    min-width: 70px;
    text-align: center;
    border-radius: 5px;
    font-size: 15px;
`
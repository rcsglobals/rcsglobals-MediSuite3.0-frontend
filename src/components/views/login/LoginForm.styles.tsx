import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const MainContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;

    @media screen and (max-width: 920px) {
        flex-direction: column;
    }
` 

interface LeftContainerProps {
    backgroundimage: string;
    backgroundimagemb: string;
}
 

export const LeftContainer = styled.div<LeftContainerProps>`
    display: flex;
    align-items: center;
    text-align: center;
    background-image: url(${props => props.backgroundimage});
    background-size: cover;
    background-position: center;
    padding: 0% 5%;
    height: 100%;

    @media screen and (max-width: 920px) {
        background-image: url(${props => props.backgroundimagemb});
        width: 100%;
        padding: 50px 30px;
    }
`

interface LogoContainerProps {
    RCSLogo: string;
    RCSLogoMb: string;
}

export const RCSLogoContainer = styled.img<LogoContainerProps>`
    

`

export const RightContainer = styled.div`
    width: 100%;
    padding: 5%;
    align-items: center;

    @media screen and (max-width: 920px) {
        width: 90%;
        padding: 30px;
    }
`

export const MainHeading = styled.div`
    color: black;
    font-size: 25px;
    font-weight: 500;
    padding: 5px 0px;
`

export const NormalText = styled.div`
    color: grey;
    font-size: 13px;
    padding: 5px 0px;
`

export const LoginFormContainer = styled.div`
    margin-top: 20px;
    padding: 20px 30px;
    box-shadow: 0px 0px 15px grey;
`

export const StyledLabel = styled.div`
    padding: 5px 0px;
    color: grey;
    font-size: 13px;
`

export const StyledTextField = styled(TextField)`
    width: 100%;

    .MuiInputBase-input.MuiOutlinedInput-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 10px 14px;
        font-size: 13px;
    }
    
    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }
`

export const ShowPasswordContainer = styled.div`
    display: flex;
    align-items: center;
`

export const ShowPasswordText = styled.div`
    font-size: 13px;
    color: grey;
`

export const LoginBtn = styled.div`
    background-color: #4074c1;
    padding: 10px;
    color: white;
    cursor: pointer;
    width: 15%;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 15px;
`
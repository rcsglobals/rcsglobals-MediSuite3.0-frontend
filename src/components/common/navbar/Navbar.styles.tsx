import styled from "styled-components";

interface MainContainerProps {
    currScreen: String
}

export const MainContainer = styled.div<MainContainerProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 15px grey;
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: white;
    padding: ${(props) => (props.currScreen === 'laptop' ? '0px' : '10px 0px')}
`
export const LeftContainer = styled.div`
    padding: 10px 10%;
`
export const MiddleContainer = styled.div`
    // padding: 10px;
    display: flex;
    justify-content: space-between; 
`

export const TabLinks = styled.div`
    padding: 20px;
`

export const RightContainer = styled.div`
    // padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const LoggedInUser = styled.div`
    padding: 5px;
    border-radius: 80%;
    color: black;
    font-weight: 500;
    font-size: 50px;
    background-color: grey;
`

export const LoginBtn = styled.div`
    padding: 10px 25px;
    color: black;
    background-color: #40b4c1;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
`
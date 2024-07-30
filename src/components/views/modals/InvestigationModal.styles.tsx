import styled from "styled-components";

export const MainHeading = styled.div`
    padding: 10px;
    color: black;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    border-bottom: 1px solid grey;
    border-radius: 3px;
`

export const StyledLabel = styled.div`
    padding: 20px 0px 10px 0px;
    color: grey;
    font-weight: 400;
    font-size: 13px;
`

export const RadioTd = styled.td`
    padding: 10px 0px;
    display: flex;
    align-items: center;
    font-size: 13px;

    input[type="radio"] {
        // margin: 5px;
    }
`

export const RadioBtn = styled.input`
    padding: 30px;
`

export const LoginBtn = styled.div`
    background-color: #4074c1;
    padding: 10px 0px;
    color: white;
    cursor: pointer;
    width: 30%;
    min-width: 120px;
    text-align: center;
    border-radius: 5px;
    margin: 10px 0px;
`
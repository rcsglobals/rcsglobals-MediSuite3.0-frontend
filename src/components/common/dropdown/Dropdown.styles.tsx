import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const MainContainer = styled.div`
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
`

export const LeftContainer = styled.div`
    padding: 0px 10px;
`

export const MiddleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 10px;

    @media screen and (max-width: 1200px) {
        flex-direction: column;
    }
`

interface ModuleProps {
    selectedModule: boolean;
}

export const Module = styled.div<ModuleProps>`
    padding: 7px 10px;
    cursor: pointer;
    color: black;
    box-shadow: 0px 1px 1px 0.5px #40b4c1;
    border-radius: 3px;
    margin: 0px 3px;
    background-color: ${(props) => (props.selectedModule ? '#40c18e' : 'transparent')};
    font-size: 13px;
`
export const ModuleDropdownContainer = styled.div`
    background-color: #f8f8f8;
    box-shadow: 0px 3px 3px -2px rgb(215 219 215 / 20%), 0px 3px 4px 0px rgb(255 251 251 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 13%);
    position: absolute;
    top: 48px;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 30px;
    color: black;
`
export const DropdownData = styled.div`
    display: flex;
    align-items: center;
    // justify-content: space-between;
`

export const RoleContainer = styled.div`
    padding: 0px 30px;
    width: 12%;
    align-items: center;
`

interface UserRoleProps {
    hoveredRole: boolean;
}

export const UserRole = styled.div<UserRoleProps>`
    padding: 10px 0px 10px 10px;
    text-align: center;
    color: white;
    font-size: 15px;
    font-weight: 500px;
    border-bottom: 2px solid transparent;
    background-color: ${(props) => (props.hoveredRole ? '#40c18e' : '#4074c1')};
    border-radius: 5px;
    margin-bottom: 5px;

    // &:hover {
    //     background-color: #9e9e9e1c;
    //     border-bottom: 2px solid #808080ab;
    //     border-radius: 5px;
    //     color: black;
    // }
`

export const StyledArrowIcon = styled(ArrowForwardIosIcon)`
    color: white;
    padding: 0px 10px !important;
    font-size: 10px !important;
`

export const RoleValuesContainer = styled.div`
    width: 70%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 150px;
    // overflow-y: auto;
`

export const RoleValues = styled.div`
    // background-color: #a972a39e;
    padding: 5px 10px;
    margin: 5px;
    font-size: 13px;
    // box-shadow: 0px 1px 1px 0.25px #80808057;
    box-shadow: 0px 1px 1px 0.25px #a972a39e;
    transition: transform 0.2s ease, box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2); /* Increase shadow for more depth */
        transform: scale(1.05) translateY(-1px); /* Slightly scale up and lift the element */
        background-color: #a972a39e;
    }
`

export const LoginBtn = styled.div`
    background-color: #26c6da;
    color: black;
    font-size: 15px;
    font-weight: 400;
    padding: 5px 20px;
    border-radius: 20px;
    border: 1px solid #8080804f;
    cursor: ponter;
`
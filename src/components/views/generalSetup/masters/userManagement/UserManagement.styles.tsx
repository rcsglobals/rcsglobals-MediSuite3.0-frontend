import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    height: calc(100vh - 10vh);
`

export const LeftContainer = styled.div`
    width: 15%;
    background-color: #d5d3d380;
    display: flex;
    align-items: center;
`

interface ActionBtnsrProps {
    currUserType: String
}

export const ActionBtns = styled.div<ActionBtnsrProps>`
    // background-color: ${(props) => (props.currUserType === 'P' ? '#e0f7f3' : '#89828252')} ;
    border-radius: 5px;
    color: black;
    padding: 10px;
    cursor: pointer;
    margin: 15% 10px;
    text-align: center;
    // color: white;
`

export const MainHeadingCont = styled.div` //display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Heading = styled.div` //style={{ fontSize: '30px', fontWeight: '700', padding: '10px' }}
    font-size: 30px;
    font-weight: 700;
    padding: 10px;
`

export const SearchContainer = styled.div`
  padding: 0px 15px;
  justify-content: space-between;
  border-radius: 5px;
`

export const RightContainer = styled.div`
    width: 85%;
    padding: 2% 5%;
`

export const RightSubContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #edededd1;
    max-height: 70vh;
    overflow-y: auto;
`

export const CardContainer = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    // border: 2px solid #40b4c1;
    justify-content: space-between;
`

export const UserDataRaw = styled.div` //display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`

export const Username = styled.div`
    font-size: 18px;
    font-weight: 700;
    padding: 5px;
`

export const Fullname = styled.div`
    font-size: 13px;
    font-weight: 500;
    padding: 5px;
`

export const ActiveUserLink = styled.div`
    font-weight: 600;
    font-size: 15px;
    color: green;
    padding: 5px;
    cursor: pointer;
`

export const BtnsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const Btns = styled.div`
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
`
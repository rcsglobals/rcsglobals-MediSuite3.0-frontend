import styled from "styled-components";

export const MainContainer = styled.div`
    height: calc(100vh - 10vh);
`

export const Container = styled.div`
    padding: 10px 20px;
`

export const Heading = styled.div`
    font-size: 30px;
    font-weight: 700;
    padding: 10px;
`

// export const SearchContainer = styled.div`
//   padding: 0px 15px;
//   justify-content: space-between;
//   border-radius: 5px;
// `

export const SubContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #edededd1;
    max-height: 80vh;
    overflow-y: auto;
`

export const CardContainer = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    justify-content: space-between;
`

export const UserDataRaw = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`

export const DeptName = styled.div`
    font-size: 18px;
    font-weight: 700;
    padding: 5px;
`

export const TimeSlot = styled.div`
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
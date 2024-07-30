import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px 20px;
`

export const Heading = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SubContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #edededd1;
    max-height: 60vh;
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
    padding: 5px;
`

export const DoctorName = styled.div`
    font-size: 18px;
    font-weight: 700;
    padding: 5px;
`

export const DeptName = styled.div`
    font-size: 13px;
    font-weight: 500;
    padding: 5px;
`

export const SpclName = styled.div`
    text-align: right;
    padding: 5px 5px 5px 5px;
    color: green;
    font-weight: 500;
`

export const BtnsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`

export const Btns = styled.div`
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
`
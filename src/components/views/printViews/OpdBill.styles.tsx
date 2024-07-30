import styled from "styled-components";

export const A4Page = styled.div`
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media print {
    box-shadow: none;
  }
`
export const Content = styled.div`
  padding: 10mm 15mm;
`
export const HospitalName = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  padding: 5px;
`
export const HospitalAddress = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  padding: 10px;
`
export const HospitalDetail = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
`

export const DuplicateReceipt = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  padding: 10px;
`
export const PatientDetailCont = styled.div`
  border: 1px solid black;
`
export const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
`
export const Column = styled.div`
  width: 50%;
  padding: 2.5px 10px;
  border: 1px solid black;
`
export const TableHeader = styled.th`
  border: 1px solid black;
  padding: 5px;
  // width: 10%;
  font-size: 15px;
`
export const TableData = styled.td`
  border: 1px solid black;
  padding: 5px;
  font-size: 15px;
`
export const MainCont = styled.div`
  width: 100%; 
  display: flex
`
export const Cont = styled.div`
  border: 1px solid black;
  width: 40%;
  display: flex;
  align-items: center;
`
export const Label = styled.div`
  width: 70%;
  border-right: 1px solid black;
  padding: 0px 5px;
`
export const Value = styled.div`
  width: 30%;
  padding: 0px 5px;
  text-align: center;
`
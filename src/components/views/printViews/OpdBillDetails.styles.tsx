import styled from 'styled-components';

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
  // padding: 10mm 15mm;
  padding: 5mm 10mm;
`

export const PrintButton = styled.div`
  // margin-top: 20px;
  background-color: #4074c1;
  padding: 10px;
  color: white;
  cursor: pointer;
  width: 10%;
  text-align: center;
  border-radius: 5px;
  margin: 20px 0px;

  
  @media print {
    display: none;
  }
`
import { useState, useEffect } from 'react';
import { A4Page, Content, HospitalAddress, HospitalDetail, HospitalName, DuplicateReceipt, PatientDetailCont, Row, Column, TableHeader, TableData, MainCont, Cont, Label, Value } from './OpdBill.styles';
import { OpdBillGetPatientDetailsSer, OpdBillHospitalDetailsSer, OpdBillInfoDetailsSer } from '../../../services/printServices/OpdBillPrintService';
import { getCurrDate } from '../../../utils/FormatDate';
import { useLocation } from 'react-router-dom';

export default function OpdBill() {

  const [hospitalDetails, setHospitalDetails] = useState<any>({});
  const [patientDetails, setPatientDetails] = useState<any>({});
  const [billDetails, setBillDetails] = useState<any>({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const billNo = query.get('billNo');

  useEffect(() => {
    const getData = async () => {

      try {
        const OpdBillHospitalDetailsSerRes: any = await OpdBillHospitalDetailsSer(billNo);
        if (OpdBillHospitalDetailsSerRes?.status === 200) {
          setHospitalDetails(OpdBillHospitalDetailsSerRes.data[0]);
        } else {
          console.error('Error fetching OPD patient details. Status:', OpdBillHospitalDetailsSerRes?.status);
        }
      } catch (error) {
        console.error('Error fetching OPD reg bill print hospital details:', error);
      }

      try {
        const OpdBillGetPatientDetailsSerRes: any = await OpdBillGetPatientDetailsSer(billNo);
        if (OpdBillGetPatientDetailsSerRes?.status === 200) {
          setPatientDetails(OpdBillGetPatientDetailsSerRes.data[0]);
        } else {
          console.error('Error fetching OPD patient details. Status:', OpdBillGetPatientDetailsSerRes?.status);
        }
      } catch (error) {
        console.error('Error fetching OPD reg bill print hospital details:', error);
      }

      try {
        const OpdBillInfoDetailsSerRes: any = await OpdBillInfoDetailsSer(billNo);
        if (OpdBillInfoDetailsSerRes?.status === 200) {
          setBillDetails(OpdBillInfoDetailsSerRes.data);
        } else {
          console.error('Error fetching OPDreg bill info print. Status:', OpdBillInfoDetailsSerRes?.status);
        }
      } catch (error) {
        console.error('Error fetching OPD reg bill info print details:', error);
      }

    }
    getData();
  }, [])

  const getGrossAmount = () => {
    if (Array.isArray(billDetails)) {
      const totalGrossAmount = billDetails.reduce((sum, service) => {
        return sum + service.serviceUnitPrice;
      }, 0);
      return totalGrossAmount;
    }
  }

  const getBillDiscount = () => {
    if (Array.isArray(billDetails)) {
      const totalBillDiscount = billDetails.reduce((sum, service) => {
        return sum + service.serviceDiscount;
      }, 0);
      return totalBillDiscount;
    }
  }

  const getNetAmount = () => {
    if (Array.isArray(billDetails)) {
      const totalNetAmount = billDetails.reduce((sum, service) => {
        return sum + (service.serviceUnitPrice - service.serviceDiscount);
      }, 0);
      return totalNetAmount;
    }
  }

  return (
    <A4Page id="print-root">
      <Content>
        <HospitalName>{hospitalDetails.hospital_name}</HospitalName>
        <div style={{ padding: '10px' }}>
          <HospitalAddress>{`${hospitalDetails.address}, ${hospitalDetails.city}, ${hospitalDetails.state_name}`}</HospitalAddress>
          <HospitalDetail>{`Tel: ${hospitalDetails.phone}, Fax: ${hospitalDetails.fax}`}</HospitalDetail>
          <HospitalDetail>{`Website: ${hospitalDetails.website}, E-mail: ${hospitalDetails.email}`}</HospitalDetail>
          <DuplicateReceipt>[OPD Receipt]</DuplicateReceipt>
          <PatientDetailCont>
            <Row>
              <Column><b>UHID NO:</b> {patientDetails.uhid}</Column>
              <Column><b>Receipt No:</b> {patientDetails.billNo}</Column>
            </Row>
            <Row>
              <Column><b>Patient Name:</b> {patientDetails.patientName}</Column>
              <Column><b>Age / Sex:</b> {patientDetails.patientAge} / {patientDetails.gender}</Column>
              <Column><b>Category:</b> {patientDetails.patientCategoryName}</Column>
            </Row>
            <Row>
              <Column><b>S/D/W/o:</b> {patientDetails.fatherSpouseName}</Column>
              <Column><b>Date:</b> {patientDetails.billDate}</Column>
            </Row>
            <Row>
              <Column style={{ width: '100%' }}><b>Address & Phone No:</b> {patientDetails.patientAddress} & {patientDetails.contactNo}</Column>
              {/* <Column><b>Category:</b> {patientDetails.patientCategoryName}</Column> */}
            </Row>
            <Row>
              <Column><b>OPD Reg No:</b> {patientDetails.referenceRegId}</Column>
              <Column><b>Discount Category:</b> {patientDetails.discountHead}</Column>
            </Row>
          </PatientDetailCont>
          <div style={{ marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <TableHeader>S.No</TableHeader>
                  <TableHeader>Particulars</TableHeader>
                  <TableHeader>Unit</TableHeader>
                  <TableHeader>Amt./Unit(Rs.)</TableHeader>
                  <TableHeader>Disc.(Rs.)</TableHeader>
                  <TableHeader>Amt.(Rs.)</TableHeader>
                </tr>
              </thead>
              <tbody>
                {
                  billDetails.length >= 0 && billDetails?.map((data: any, index: any) => {
                    return (
                      <>
                        <tr>
                          <TableData style={{ textAlign: 'center' }}>{index + 1}</TableData>
                          <TableData>{data.serviceName}</TableData>
                          <TableData>1.00</TableData>
                          <TableData>{data.serviceUnitPrice}</TableData>
                          <TableData>{data.serviceDiscount}</TableData>
                          <TableData>{(data.serviceUnitPrice) - (data.serviceDiscount)}</TableData>
                        </tr>
                      </>
                    )
                  })
                }
                {/* <tr>
                  <TableData style={{ textAlign: 'center' }}>1</TableData>
                  <TableData>Registration Fee</TableData>
                  <TableData>1.00</TableData>
                  <TableData>30.00</TableData>
                  <TableData>30.00</TableData>
                  <TableData>0.00</TableData>
                </tr>
                <tr>
                  <TableData style={{ textAlign: 'center' }}>2</TableData>
                  <TableData>Consultation Fee - Dr. Ravish Kumar Verma (Medicine)</TableData>
                  <TableData>1.00</TableData>
                  <TableData>0.00</TableData>
                  <TableData>0.00</TableData>
                  <TableData>0.00</TableData>
                </tr> */}
              </tbody>
            </table>
            <MainCont>
              <div style={{ width: '60%' }}></div>
              <Cont>
                <Label>Gross Amount</Label>
                <Value>{getGrossAmount()}</Value>
              </Cont>
            </MainCont>
            <MainCont>
              <div style={{ width: '60%' }}></div>
              <Cont>
                <Label>Service Discount(A)</Label>
                <Value>0</Value>
              </Cont>
            </MainCont>
            <MainCont>
              <div style={{ width: '60%' }}></div>
              <Cont>
                <Label>Bill Discount(B)</Label>
                <Value>{getBillDiscount()}</Value>
              </Cont>
            </MainCont>
            <MainCont>
              <div style={{ width: '60%' }}></div>
              <Cont>
                <Label>Total Discount(A+B)</Label>
                <Value>{getBillDiscount()}</Value>
              </Cont>
            </MainCont>
            <MainCont>
              <div style={{ width: '60%' }}></div>
              <Cont>
                <Label>Net Amt. Payable</Label>
                <Value>{getNetAmount()}</Value>
              </Cont>
            </MainCont>
            <MainCont>
              <div style={{ width: '60%' }}></div>
              <Cont>
                <Label>Amt. Received</Label>
                <Value>{getNetAmount()}</Value>
              </Cont>
            </MainCont>
            <div style={{ padding: '20px 10px 10px 10px' }}>
              <div style={{ padding: '5px', textAlign: 'center', fontSize: '15px' }}>Received with Thanks only by CASH From {patientDetails.patientName}</div>
              <div style={{ padding: '5px', textAlign: 'center', fontSize: '15px' }}><b>Note:</b> Kindly feed your registration no. in your mobile for future ready reference.</div>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '50%' }}>
                <b>Printed By:</b> {localStorage.getItem("username")}, {getCurrDate()}
              </div>
              <div style={{ textAlign: 'right', width: '50%' }}>
                <div>Signature</div>
                <div>USER:- {localStorage.getItem("username")}</div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </A4Page>
  )
}
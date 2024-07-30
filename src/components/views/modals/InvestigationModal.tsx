import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainHeading, StyledLabel, RadioTd, LoginBtn, RadioBtn } from './InvestigationModal.styles';
import SelectDropdown from '../../common/select/SelectDropdown';
import { GetDoctors, InvOrderSer, ProOrderSer } from '../../../services/dropdownService/eOpdModalServices/investigationModalServices/InvestigationModalServices';
import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
import { getCurrDate } from '../../../utils/FormatDate';
import { styled } from '@mui/material/styles';
import { InvestigationGetData } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
import AutoSearch from '../../common/autoSearch/AutoSearch';
import { setDignosisDetail } from '../../../redux/actions/EopdAction';
import { connect } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 350,
  // width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 0,
  p: 4,
  padding: '10px 30px',
  borderRadius: '3px',
  minHeight: '45vh',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({

  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#566f82',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '5px'
  },
}));

export const InvTable = (props: any) => {

  const [gridData, setGridData] = useState<any>([]);

  useEffect(() => {
    const mappedData = props?.gridObjects.length > 0 && props?.gridObjects.map((item: any, index: number) =>
      createData(
        index + 1,
        item.serviceName,
        item.serviceUnitPrice,
        item.doctorName,
        item.orderDate,
        item.remarks
      )
    );
    setGridData(mappedData);
  }, [props.gridObjects])

  function createData(
    index: number,
    service_name: string,
    service_price: number,
    doctor_name: string,
    order_date: number,
    remarks: string
  ) {
    return { index, service_name, service_price, doctor_name, order_date, remarks };
  }

  return (
    <TableContainer sx={{ maxHeight: 200 }}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Service Name</StyledTableCell>
            <StyledTableCell align="right">Service Price</StyledTableCell>
            <StyledTableCell align="right">Doctor name</StyledTableCell>
            <StyledTableCell align="right">Order Date</StyledTableCell>
            <StyledTableCell align="right">Remarks</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(gridData.length > 0) && gridData.map((row: any, index: any) => (
            <TableRow
              // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.service_name}</TableCell>
              <TableCell align="right">{row.service_price}</TableCell>
              <TableCell align="right">{row.doctor_name}</TableCell>
              <TableCell align="right">{row.order_date}</TableCell>
              <TableCell align="right">{row.remarks}</TableCell>
              <TableCell align="right">
                <div onClick={() => props.handleRemoveClick(index)} style={{ padding: '5px 10px', margin: '2px', borderRadius: '5px', backgroundColor: '#840e779e', color: 'white', fontWeight: '500', cursor: 'pointer' }}>Remove</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

function InvestigationModal(props: any) {
  const { showModal, setShowModal, rowData } = props;
  const [serviceType, setServiceType] = useState<any>('Investigation');
  const [doctors, setDoctors] = useState<any>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>({
    doctorName: rowData.doctorName,
    doctorId: rowData.doctorId
  });
  const [orderSerOptions, setOrderSerOptions] = useState<any>([]);
  const [orderServiceApiData, setOrderServiceApiData] = useState<any>({
    hospitalId: 1,
    patientCategoryId: 0,
    campId: 0,
    partnerId: 0,
    isSRLDiagnosis: 0,
    opdDiscountId: 0
  });
  const [selectedService, setSelectedService] = useState<any>('');
  const [userServices, setUserServices] = useState<any>('');
  const [gridObjects, setGridObjects] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res: any = await GetDoctors();
        if (res?.status === 200) {
          setDoctors(res.data);
        }
      } catch (error) {
        console.error('Error in GetDoctors:', error);
      }

      try {
        let res: any = await InvestigationGetData(rowData.opdNo);
        if (res?.status === 200) {
          setUserServices(res?.data?.observations ? res?.data?.observations : '');
        }
      } catch (error) {
        console.error('Error in InvestigationGetData:', error);
      }
    };

    if (rowData.opdNo === props.selectedOpdNo) {
      fetchDoctors();
    }
  }, []);

  useEffect(() => {
    setOrderServiceApiData({
      hospitalId: 1,
      patientCategoryId: rowData.patientCategoryId || 0,
      campId: rowData.campId || 0,
      partnerId: rowData.partnerId || 0,
      isSRLDiagnosis: 0,
      opdDiscountId: 0
    });
  }, [rowData]);

  useEffect(() => {
    const fetchOrderServices = async () => {
      let orderServices: any;
      if (serviceType === 'Investigation') {
        orderServices = await InvOrderSer(orderServiceApiData);
      } else if (serviceType === 'Procedure') {
        orderServices = await ProOrderSer(orderServiceApiData);
      }
      setOrderSerOptions(orderServices?.data?.value);
    };
    if (rowData?.opdNo === props?.selectedOpdNo) {
      fetchOrderServices();
    }
  }, [serviceType, orderServiceApiData]);

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowModal(false);
  };

  // const handleDoctor = (event: any) => {
  //   const selectedDoctor: any = event?.target?.innerText;
  //   const selectedDoctorVal: any = doctors.find((val: any) => val.doctor_name === selectedDoctor);
  //   if (selectedDoctorVal) {
  //     const selectedDoctorId = selectedDoctorVal.doctor_id;
  //     setSelectedDoctor({
  //       doctorName: selectedDoctor,
  //       doctorId: selectedDoctorId
  //     })
  //   }
  // }

  const handleDoctor = (doctor: any) => {
    // const selectedDoctor: any = event?.target?.innerText;
    const selectedDoctorVal: any = doctors.find((val: any) => val.doctor_name === doctor);
    if (selectedDoctorVal) {
      const selectedDoctorId = selectedDoctorVal.doctor_id;
      setSelectedDoctor({
        doctorName: selectedDoctor,
        doctorId: selectedDoctorId
      })
    }
  }

  // const handleOrderService = (event: any) => {
  //   const selectedServiceName: any = event.target.innerText;
  //   const selectedServiceVal: any = orderSerOptions.find((selectedService: any) => selectedService.serviceName == selectedServiceName);

  //   if (selectedServiceVal) {
  //     const selectedSerCategoryMapId = selectedServiceVal.serviceCategoryMapId;
  //     const selectedSerUnitPrice = selectedServiceVal.serviceUnitPrice;
  //     const newSelectedServiceData = {
  //       serviceCategoryMapId: selectedSerCategoryMapId,
  //       serviceName: selectedServiceName,
  //       serviceUnitPrice: selectedSerUnitPrice,
  //       doctorName: selectedDoctor.doctorName,
  //       orderDate: getCurrDate(),
  //       DoctorId: selectedDoctor.doctorId,
  //       remarks: ''
  //     };
  //     setSelectedService(newSelectedServiceData);
  //     // setGridObjects((prevGridObjects: any) => [...prevGridObjects, newSelectedServiceData]);
  //   }
  // };

  const handleOrderService = (service: any) => {
    // const selectedServiceName: any = event.target.innerText;
    const selectedServiceVal: any = orderSerOptions.find((selectedService: any) => selectedService.serviceName == service);

    if (selectedServiceVal) {
      const selectedSerCategoryMapId = selectedServiceVal.serviceCategoryMapId;
      const selectedSerUnitPrice = selectedServiceVal.serviceUnitPrice;
      const newSelectedServiceData = {
        serviceCategoryMapId: selectedSerCategoryMapId,
        // serviceName: selectedServiceName,
        serviceName: service,
        serviceUnitPrice: selectedSerUnitPrice,
        doctorName: selectedDoctor.doctorName,
        orderDate: getCurrDate(),
        DoctorId: selectedDoctor.doctorId,
        remarks: ''
      };
      setSelectedService(newSelectedServiceData);
      // setGridObjects((prevGridObjects: any) => [...prevGridObjects, newSelectedServiceData]);
    }
  };


  // const handleOrderServicesClick = (e: any) => {
  //   e.stopPropagation();
  //   selectedService.length != '' && setGridObjects((prevGridObjects: any) => [...prevGridObjects, selectedService]);
  // }

  const handleOrderServicesClick = (e: any) => {
    e.stopPropagation();

    if (selectedService.length !== '') {
      setGridObjects((prevGridObjects: any) => {
        const isServiceAlreadyAdded = prevGridObjects.some(
          (obj: any) => obj.serviceName === selectedService.serviceName
        );

        if (isServiceAlreadyAdded) {
          window.alert(" This service already added !");
          return prevGridObjects;
        }
        return [...prevGridObjects, selectedService];
      });
    }
  };

  const handleAddServicesClick = async (e: any, rowData: any) => {
    setLoading(true);
    // e.stopPropagation();
    try {
      let res: any = await DiagnosisInsertionService2({
        stageId: 6,
        opdNo: rowData.opdNo,
        PatientId: rowData.patientId,
        PatientCategoryId: rowData.patientCategoryId,
        SpecializationId: rowData.SpeclnId,
        // DoctorId: rowData.doctorId,
        GridObjects: gridObjects,
        Observations: userServices
      });
      if (res?.status === 200) {
        props.setDignosisDetail(rowData?.opdNo, { Investigation: true });
        setShowModal(false);
        window.alert("Data Inserted Successfully :)");
      } else {
        window.alert("Some problem in Insertion!");
      }
    } catch (error) {
      console.error('Insertion Service Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setServiceType(value);
  };

  const handleRemoveClick = (index: number) => {
    const updatedGridObjects = gridObjects.filter((_: any, idx: number) => idx !== index);
    setGridObjects(updatedGridObjects);
  }

  if (rowData.opdNo !== props.selectedOpdNo) return null;

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
            backgroundColor: "#00000080"
          },
          "& > .css-roqh9h": {
            border: '2px solid transparent'
          }
        }}
      >
        <Box sx={style} >
          <MainHeading>Services</MainHeading>
          {
            userServices != '' ?
              <StyledLabel>
                You have ordered <span style={{ color: '#c14d40', fontWeight: '600' }}>{userServices}</span> for the patient <span style={{ color: '#b4c140', fontWeight: '600' }}>{rowData.patientId}</span>
              </StyledLabel> :
              <StyledLabel>Please search for the required services</StyledLabel>
          }
          <RadioTd>
            <RadioBtn type="radio" name="serviceType" value="Investigation" checked={serviceType === 'Investigation'} onChange={handleInputChange} />Investigation
            <RadioBtn type="radio" name="serviceType" value="Procedure" checked={serviceType === 'Procedure'} onChange={handleInputChange} />Procedure
          </RadioTd>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
            <div>Select Doctor</div>
            <AutoSearch setSelectedDoctor={setSelectedDoctor} doctorId={rowData.doctorId} doctorName={rowData.doctorName} dropdown='invesDoctor' options={doctors} handleDoctor={handleDoctor} />
            {/* <SelectDropdown handleDoctor={handleDoctor} dropdownPage={'investigation'} required={true} dropdown='invesDoctor' values={doctors} /> */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
            <div>Order Service</div>
            <AutoSearch dropdown='invesOrderService' options={orderSerOptions} handleOrderService={handleOrderService} />
            {/* <SelectDropdown handleOrderService={(e: any) => handleOrderService(e, rowData.doctorName)} dropdownPage={'investigation'} required={true} dropdown='invesOrderService' values={orderSerOptions} /> */}
          </div>
          <LoginBtn onClick={(e: any) => handleOrderServicesClick(e)}>Order Services</LoginBtn>
          {
            gridObjects.length > 0 && (
              <>
                <InvTable gridObjects={gridObjects} handleRemoveClick={handleRemoveClick} />
                {
                  loading ? <LoginBtn><CircularProgress sx={{ color: 'white' }} size={24} /></LoginBtn> :
                    <LoginBtn onClick={(e: any) => handleAddServicesClick(e, rowData)}>Add Services</LoginBtn>
                }
                {/* <LoginBtn onClick={(e: any) => handleAddServicesClick(e, rowData)}>Add Services</LoginBtn> */}
              </>
            )
          }
        </Box>
      </Modal>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  // isUserAuthenticate: state?.AuthenticationInfo?.isUserAuthenticate
});

const mapDispatchToProps = (dispatch: any) => ({
  setDignosisDetail: (opdNo: any, updates: any) => dispatch(setDignosisDetail(opdNo, updates)),

});

export default connect(mapStateToProps, mapDispatchToProps)(InvestigationModal);
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import SearchBar from '../../common/search/SearchBar';
import CCModal from '../modals/CCModal';
import GPEModal from '../modals/GPEModal';
import SysExamModal from '../modals/SysExamModal';
import FollowUpModal from '../modals/FollowUpModal';
import ProvDiag from '../modals/ProvDiag';
import { GetFilledDiagosisOpd, PfrService } from '../../../services/eOpdServices/PfrService';
import PharmaModal from '../modals/PharmaModal';
import InvestigationModal from '../modals/InvestigationModal';
import ProvDiagDropdownSer from '../../../services/dropdownService/ProvDiagDropdownSer';
import { FormatDate } from '../../../utils/FormatDate';
import { useHistory } from 'react-router-dom';
import { EopdContainer, EopdText, MainContainer, SearchContainer, SearchText, TableCellData } from './GridTable.styles';
import { connect } from 'react-redux';
import PatientOpdModal from '../modals/PatientOpdModal';
import { Link } from '@mui/material';

interface Data {
  id: number;
  opd_no: number;
  patient_name: string;
  patient_id: number;
  registration_date: string;
  doctor_name: string;
  jr_name: string;
  patient_category_id: number,
  camp_id: number,
  partner_id: number,
  specialization_id: number,
  doctor_id: number,
  opdType: boolean,
  dept_id: number,
  action: string[];
}

function createData(
  id: number,
  opd_no: number,
  patient_name: string,
  patient_id: number,
  registration_date: string,
  doctor_name: string,
  jr_name: string,
  patient_category_id: number,
  camp_id: number,
  partner_id: number,
  specialization_id: number,
  doctor_id: number,
  opdType: boolean,
  dept_id: number,
  action: string[],
): Data {
  return {
    id,
    opd_no,
    patient_name,
    patient_id,
    registration_date,
    doctor_name,
    jr_name,
    patient_category_id,
    camp_id,
    partner_id,
    specialization_id,
    doctor_id,
    opdType,
    dept_id,
    action,
  };
}

let actionArr: string[] = ['CC', 'GPE', 'Syst Exam', 'Prov.Diag', 'TT Plan', 'Investigation', 'Pharma', 'Follow Up'];


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'opd_no',
    numeric: true,
    disablePadding: true,
    label: 'OPD No',
  },
  {
    id: 'patient_name',
    numeric: false,
    disablePadding: true,
    label: 'Patient Name',
  },
  {
    id: 'patient_id',
    numeric: true,
    disablePadding: true,
    label: 'Patient Id',
  },
  {
    id: 'registration_date',
    numeric: true,
    disablePadding: false,
    label: 'Registration Date',
  },
  {
    id: 'doctor_name',
    numeric: false,
    disablePadding: false,
    label: 'Doctor Name',
  },
  {
    id: 'jr_name',
    numeric: false,
    disablePadding: false,
    label: 'SR/JR Name',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
];

interface EnhancedTableProps {
  // numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCellData
            // style={{ fontWeight: '600', fontSize: '15px', backgroundColor: '#40c18e' }}
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCellData>
        ))}
      </TableRow>
    </TableHead>
  );
}

const GridTable = (props: any) => {
  const history: any = useHistory();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('opd_no');
  // const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState<string | null>();
  const [rows, setRows] = useState<any>([]);
  const [provDiagOptions, setProvDiagOptions] = useState([]);
  const [selectedOpdNo, setSelectedOpdNo] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [filledDiag, setFilledDiag] = useState<any>([]);
  const [showOpds, setShowOpds] = useState<any>(false);
  const [filledDiagOpds, setFilledDiagOpds] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pfrServiceRes = await PfrService();
        const mappedData = pfrServiceRes.map((item: any, index: number) =>
          createData(
            index + 1,
            item.opdRegistrationNo,
            item.patientName,
            item.patientId,
            item.registrationDate,
            item.doctorName,
            item.jrName,
            item.patientCategoryId,
            item.campId,
            item.partnerId,
            item.specialization_id,
            item.doctor_id,
            item.opdType,
            item.dept_id,
            actionArr
          )
        );
        setRows(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const res: any = await GetFilledDiagosisOpd();
        setFilledDiagOpds(res?.data);
      } catch (error) {
        console.error('Error fetching filled diagnosis opds:', error);
      }

      try {
        const res: any = await ProvDiagDropdownSer();
        setProvDiagOptions(res.data);
      } catch (error) {
        console.error('Error fetching ProvDiag data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtering rows based on search value
    const filteredData = rows.filter((row: any) =>
      row.opd_no.toString().includes(searchValue)
    );
    setTimeout(() => {
      setFilteredRows(filteredData);
    }, 300)
  }, [searchValue, rows]);

  useEffect(() => {
    if (props.dignosisData.length >= 0) {
      const currFilledDiag: any = getFilledDiagnosis(props.dignosisData, selectedOpdNo);
      setFilledDiag(currFilledDiag);
    }
  }, [props.dignosisData]);

  
  const getFilledDiagnosis = (dignosisData: any, opdNo: any) => {
    const object = dignosisData.find((item: any) => item.opdNo === opdNo);
    if (object) {
      return Object.keys(object).filter(key => object[key] && key !== 'opdNo');
    }
    return [];
  };

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = [...selected, id];
  //   } else {
  //     newSelected = selected.filter((itemId) => itemId !== id);
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleActionClick = (e: any, opd_no: any) => {
    const clickedAction = e.target.innerText;

    if (clickedAction === 'CC') {
      setSelectedOpdNo(opd_no);
      setShowModal(true);
      setSelectedModal('CC');
    }
    else if (clickedAction === 'GPE') {
      setSelectedOpdNo(opd_no);
      setShowModal(true);
      setSelectedModal('GPE');
    }
    else if (clickedAction === 'Syst Exam') {
      setSelectedOpdNo(opd_no);
      setShowModal(true);
      setSelectedModal('Syst Exam');
    }
    else if (clickedAction === 'Prov.Diag') {
      setSelectedOpdNo(opd_no);
      setShowModal(true);
      setSelectedModal('Prov.Diag');
    }
    else if (clickedAction === 'TT Plan') {
      setSelectedOpdNo(opd_no);
      setShowModal(true);
      setSelectedModal('TT Plan');
    }
    else if (clickedAction === 'Investigation') {
      setSelectedOpdNo(opd_no);
      setShowModal(true);
      setSelectedModal('Investigation');
    }
    else if (clickedAction === 'Pharma') {
      setSelectedOpdNo(opd_no);
      setShowModal(true);
      setSelectedModal('Pharma');
    }
    else if (clickedAction === 'Follow Up') {
      setSelectedOpdNo(opd_no);
      setShowModal(true);
      setSelectedModal('Follow Up');
    }
    else {
      console.error("No Actions Found or Invalid Action");
    }
  };

  // const handlePrint = (opdNo: any, doctor_name: any) => {
  //   const isPresentAndAllTrue = isOpdNoPresentAndAllTrue(props.dignosisData, opdNo);
  //   if (isPresentAndAllTrue) {
  //     history.push('/opdPrint', { opdNo: opdNo, doctor_name: doctor_name });
  //   } else {
  //     console.log(`OpdNo ${opdNo} is not present in diagnosis data or not all variables are true.`);
  //   }
  // };

  // const isOpdNoPresentAndAllTrue = (dignosisData: any, opdNo: any) => {
  //   const object = dignosisData.find((item: any) => item.opdNo === opdNo);
  //   if (object) {
  //     const { cc, gpe, sysExam, provDiag, ttPlan, investigation, pharma, followUp } = object;
  //     return cc && gpe && sysExam && provDiag && ttPlan && investigation && pharma && followUp;
  //   }
  //   return false;

  // const handlePrint = (opdNo: any, doctor_name: any) => {
  //   const windowFeatures = "left=100,top=100,width=620,height=580";
  //   const url = `/opdPrint?opdNo=${encodeURIComponent(opdNo)}&doctor_name=${encodeURIComponent(doctor_name)}`;
  //   window.open(url, "popup", windowFeatures);
  // };

  const handlePrintt = (opdNo: any, doctor_name: any, patientId: any) => {
    setShowOpds(true);
    setSelectedOpdNo(opdNo);
  };

  return (
    <>
      <MainContainer>
        <EopdContainer>
          <EopdText> e-OPD </EopdText>
        </EopdContainer>
        <SearchContainer>
          {/* <SearchText>Search your patient by opdNo:</SearchText> */}
          <SearchBar page='gridTable' searchValue={searchValue} handleSearchChange={handleSearchChange} />
        </SearchContainer>
      </MainContainer>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer sx={{ maxHeight: '69vh' }}>
            {/* 440 previous height */}
            <Table sx={{ minWidth: 750 }} stickyHeader size={'medium'}>
              <EnhancedTableHead
                // numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length} />
              <TableBody>
                {(searchValue === '' ? visibleRows : filteredRows).map((row: any, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                      style={{ backgroundColor: (!filledDiagOpds?.includes(row?.opd_no)) ? (row?.opdType === 'R' ? '#e9aeaea3' : 'transparent') : '#f3c57e6b' }}
                    >
                      <TableCellData align="center">{row.opd_no}</TableCellData>
                      {/* <TableCell align="center" component="th" id={labelId} scope="row" padding="none" onClick={() => handlePrint(row.opd_no, row.doctor_name)}>{row.opd_no}</TableCell> */}
                      <TableCellData align="center">{row.patient_name}</TableCellData>
                      <TableCellData align="center" component="th" id={labelId} scope="row" padding="none">
                        <Link onClick={() => handlePrintt(row.opd_no, row.doctor_name, row.patient_id)}>{row.patient_id}</Link>
                        {
                          showOpds && <PatientOpdModal rowData={{ opdNo: row.opd_no, patientId: row.patient_id, doctorName: row.doctor_name, opdType: row.opdType }} selectedOpdNo={selectedOpdNo} showOpds={showOpds} setShowOpds={(open: boolean) => setShowOpds(open)} />
                        }
                      </TableCellData>
                      <TableCellData align="center">{FormatDate(row.registration_date)}</TableCellData>
                      <TableCellData align="center">{row.doctor_name}</TableCellData>
                      <TableCellData align="center">{row.jr_name}</TableCellData>
                      <TableCellData style={{ display: 'flex', textAlign: 'center' }} align="center" onClick={(e: any) => handleActionClick(e, row.opd_no)}>
                        {/* {row.action.map((val: any, index: any) => (
                          <React.Fragment key={index}>
                            <div style={{ padding: '0pc 5px', cursor: 'pointer', color: '#c14d10'}}>{val}</div>
                            {index !== row.action.length - 1 && <div style={{ color: 'black' }}>/</div>}
                          </React.Fragment>
                        ))} */}
                        {row.action.map((val: any, index: any) => {
                          const color = filledDiag?.includes(val) ? 'green' : '#c14d10';
                          return (
                            <React.Fragment key={index}>
                              <div
                                style={{
                                  padding: '0pc 5px',
                                  cursor: 'pointer',
                                  color: (filledDiag?.includes(val) && row.opd_no === selectedOpdNo) ? color : '#c14d10'
                                }}
                              >
                                {val}
                              </div>
                              {index !== row.action.length - 1 && <div style={{ color: 'black' }}>/</div>}
                            </React.Fragment>
                          );
                        })}
                        {
                          selectedModal === 'CC' && showModal && <CCModal rowData={{ opdNo: row.opd_no, patientId: row.patient_id }} selectedOpdNo={selectedOpdNo} modalName={'Chief Complaint'} query={'Please enter the Chief Complaint'} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                          selectedModal === 'GPE' && showModal && <GPEModal rowData={{ opdNo: row.opd_no, patientId: row.patient_id }} selectedOpdNo={selectedOpdNo} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                          selectedModal === 'Syst Exam' && showModal && <SysExamModal rowData={{ opdNo: row.opd_no, patientId: row.patient_id }} selectedOpdNo={selectedOpdNo} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                          selectedModal === 'Prov.Diag' && showModal && <ProvDiag rowData={{ opdNo: row.opd_no, patientId: row.patient_id }} selectedOpdNo={selectedOpdNo} provDiagOptions={provDiagOptions} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                          selectedModal === 'TT Plan' && showModal && <CCModal rowData={{ opdNo: row.opd_no, patientId: row.patient_id }} selectedOpdNo={selectedOpdNo} modalName={'T/T Plan'} query={'Please enter your treatment plan'} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                          selectedModal === 'Investigation' && showModal && <InvestigationModal rowData={{ opdNo: row.opd_no, patientId: row.patient_id, patientCategoryId: row.patient_category_id, partnerId: row.partner_id, campId: row.camp_id, doctorId: row.doctor_id, SpeclnId: row.specialization_id, doctorName: row.doctor_name }} selectedOpdNo={selectedOpdNo} modalName={'Investigation'} query={'Search your desired Investigation detail here'} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                          selectedModal === 'Pharma' && showModal && <PharmaModal rowData={{ opdNo: row.opd_no, patientId: row.patient_id, doctorId: row.doctor_id, doctorName: row.doctor_name }} selectedOpdNo={selectedOpdNo} modalName={'Pharmacy'} query={'Search your desired Pharmacy detail here'} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                          selectedModal === 'Follow Up' && showModal && <FollowUpModal rowData={{ opdNo: row.opd_no, patientId: row.patient_id, patientCategoryId: row.patient_category_id, doctorId: row.doctor_id, doctorName: row.doctor_name, deptId: row.dept_id, campId: row?.camp_id, partnerId: row?.partner_id }} selectedOpdNo={selectedOpdNo} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                      </TableCellData>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={headCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 35]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
      </Box>
    </>
  );
}


const mapStateToProps = (state: any) => ({
  dignosisData: state?.EOPD?.dignosisData
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GridTable);
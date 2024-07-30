import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MainHeading, SearchContainer, TableCellData } from './ServiceAcknowledgement.styles';
import { GetServiceAckUsersList } from '../../../services/opdServices/serviceAckServices/ServiceAckServices';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import ServiceAckActionModal from '../modals/ServiceAckActionModal';
import SearchBar from '../../common/search/SearchBar';

export default function ServiceAcknowledgement() {

    const [allServicesdata, setAllServicesData] = useState<any>([]);
    const [openModal, setOpenModal] = useState<any>(false);
    const [selectedDate, setSelectedDate] = useState<any>('');
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowReceiptNo, setSelectedRowReceiptNo] = useState<any>(null);
    const [isDataChange, setIsDataChange] = useState<any>(false);
    const [getUserListParams, setGetUsersListParams] = useState<any>({
        fromDate: getCurrentFormattedDate(),
        toDate: getCurrentFormattedDate(),
        search: null
    });


    useEffect(() => {
        const getData = async () => {
            try {
                const getServiceAckUsersListRes: any = await GetServiceAckUsersList(getUserListParams);
                setAllServicesData(getServiceAckUsersListRes?.data);
                setIsDataChange(false);
            } catch (error) {
                console.error("Error fetching setAllServicesData:", error);
            }
        };
        getData();
    }, [getUserListParams, isDataChange]);

    const formatSelectedDate = (dateString: any) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    }

    function getCurrentFormattedDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleFromDate = (date: any) => {
        setGetUsersListParams({
            ...getUserListParams,
            fromDate: formatSelectedDate(date)
        })
    };

    const handleToDate = (date: any) => {
        setGetUsersListParams({
            ...getUserListParams,
            toDate: formatSelectedDate(date)
        })
    };

    const handleActionClick = (e: any, receiptNo: any) => {
        setOpenModal(true);
        setSelectedRowReceiptNo(receiptNo);
    }

    const handleSearchChange = (event: any) => {
        setSearchValue(event.target.value);
        setGetUsersListParams({
            ...getUserListParams,
            search: event.target.value
        })
    };

    return (

        <div style={{ backgroundColor: '#dbddddc9', height: '90vh', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: '40px' }}>
                <MainHeading>Service Acknowledgement</MainHeading>
                <div>
                    <>
                        <div style={{ display: 'flex', paddingRight: '15px' }}>
                            <div>
                                <FormControl sx={{ m: 1, borderRadius: '4px', width: '150px', backgroundColor: 'white' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{
                                                desktopPaper: {
                                                    sx: {
                                                        '& .MuiPickersCalendarHeader-root': {
                                                            minHeight: '20px',
                                                            fontSize: '10px' // Adjust header height
                                                        },
                                                        '& .MuiDateCalendar-root': {
                                                            width: '200px', // Adjust the width of the calendar
                                                            height: '270px', // Adjust the height of the calendar
                                                            padding: '3px',
                                                            //   overflowY: 'auto'
                                                        },
                                                        '& .MuiPickersDay-root': {
                                                            width: '30px', // Adjust the size of the days
                                                            height: '30px',
                                                        },
                                                        '& .css-1vs7z2v-MuiYearCalendar-root': {
                                                            width: 'inherit',
                                                            maxHeight: '200px'
                                                        },
                                                        '& .css-innj4t-MuiPickersYear-yearButton': {
                                                            margin: '0px',
                                                            width: 'inherit',
                                                            height: '26px',
                                                            fontSize: '13px'
                                                        }
                                                    },
                                                },
                                            }}
                                            sx={{
                                                '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                                    padding: '4px 8px'
                                                },
                                                '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                                    transform: 'translate(14px, 7px) scale(1)',
                                                    fontSize: '13px'
                                                },
                                                '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                    border: 'transparent',
                                                    fontSize: '13px'
                                                },
                                                '& .MuiFormControl-root.css-9h85id-MuiFormControl-root': {
                                                    width: '100%'
                                                },
                                                '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                                    color: '#40b4c1'
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover fieldset': {
                                                        borderColor: '#40b4c1',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#40b4c1',
                                                        color: '#40b4c1'
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    borderColor: 'transparent',
                                                },
                                                '& .Mui-focused': {
                                                    color: '#40b4c1',
                                                    borderColor: '#40b4c1',
                                                    border: 'transparent',
                                                },
                                            }}
                                            label={selectedDate === '' ? "From Date" : selectedDate}
                                            format="DD/MM/YYYY"
                                            onChange={handleFromDate}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                <FormControl sx={{ m: 1, borderRadius: '4px', width: '150px', backgroundColor: 'white' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{
                                                desktopPaper: {
                                                    sx: {
                                                        '& .MuiPickersCalendarHeader-root': {
                                                            minHeight: '20px',
                                                            fontSize: '10px' // Adjust header height
                                                        },
                                                        '& .MuiDateCalendar-root': {
                                                            width: '200px', // Adjust the width of the calendar
                                                            height: '230px', // Adjust the height of the calendar
                                                            padding: '3px',
                                                        },
                                                        '& .MuiPickersDay-root': {
                                                            width: '30px', // Adjust the size of the days
                                                            height: '30px',
                                                        },
                                                        '& .css-1vs7z2v-MuiYearCalendar-root': {
                                                            width: 'inherit',
                                                            maxHeight: '200px'
                                                        },
                                                        '& .css-innj4t-MuiPickersYear-yearButton': {
                                                            margin: '0px',
                                                            width: 'inherit',
                                                            height: '26px',
                                                            fontSize: '13px'
                                                        }
                                                    },
                                                },
                                            }}
                                            sx={{
                                                '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                                    padding: '4px 8px'
                                                },
                                                '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                                    transform: 'translate(14px, 7px) scale(1)',
                                                    fontSize: '13px'
                                                },
                                                '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                    border: 'transparent',
                                                    fontSize: '13px'
                                                },
                                                '& .MuiFormControl-root css-9h85id-MuiFormControl-root': {
                                                    width: '100%'
                                                },
                                                '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                                    color: '#40b4c1'
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover fieldset': {
                                                        borderColor: '#40b4c1',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#40b4c1',
                                                        color: '#40b4c1'
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    borderColor: 'transparent',
                                                },
                                                '& .Mui-focused': {
                                                    borderColor: '#40b4c1',
                                                    border: 'transparent'
                                                }
                                            }}
                                            format="DD/MM/YYYY"
                                            label={selectedDate === '' ? "To Date" : selectedDate}
                                            onChange={handleToDate}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <SearchContainer>
                                <SearchBar page='serviceAcknowledgement' searchValue={searchValue} handleSearchChange={handleSearchChange} />
                            </SearchContainer>
                        </div>
                    </>
                </div>
            </div>
            <div style={{ padding: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '8%' }}>Receipt No</TableCellData>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '8%' }} align="right">Billing Group</TableCellData>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '11%' }} align="right">Payment Mode</TableCellData>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '10%' }} align="right">Bill Date</TableCellData>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '15%' }} align="right">Bill Number</TableCellData>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '8%' }} align="right">OPD Number</TableCellData>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '15%' }} align="right">Patient Id</TableCellData>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '15%' }} align="right">Patient Name</TableCellData>
                                <TableCellData style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center', width: '10%' }} align="right">Action</TableCellData>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allServicesdata?.map((row: any, index: any) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCellData align="center" style={{ width: '8%' }}>{row.receiptNo}</TableCellData>
                                    <TableCellData align="center" style={{ width: '8%' }}>{row.billingGroup}</TableCellData>
                                    <TableCellData align="center" style={{ width: '11%' }}>{row.payMode}</TableCellData>
                                    <TableCellData align="center" style={{ width: '10%' }}>{row.paymentDate}</TableCellData>
                                    <TableCellData align="center" style={{ width: '15%' }}>{row.billNo}</TableCellData>
                                    <TableCellData align="center" style={{ width: '8%' }}>{row.opdNo}</TableCellData>
                                    <TableCellData align="center" style={{ width: '15%' }}>{row.patientId}</TableCellData>
                                    <TableCellData align="center" style={{ width: '15%' }}>{row.patientName}</TableCellData>
                                    <TableCellData style={{ width: '10%', padding: '10px 15px' }}>
                                        <div onClick={(e: any) => handleActionClick(e, row.receiptNo)} style={{ padding: '5px', margin: '2px', borderRadius: '5px', backgroundColor: '#566f82', color: 'white', fontWeight: '500', cursor: 'pointer', textAlign: "center", width: '80px' }}>View Services</div>
                                        {
                                            <ServiceAckActionModal serviceData={{ Services: row.services, ActionedBy: row.createdByName, ReceiptNo: row.receiptNo }} setIsDataChange={setIsDataChange} selectedRowReceiptNo={selectedRowReceiptNo} openModal={openModal} setOpenModal={setOpenModal} />
                                        }
                                    </TableCellData>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
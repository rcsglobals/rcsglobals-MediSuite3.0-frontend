import { useEffect, useState } from 'react'
import { MainContainer, Container, Heading, SubContainer, Btns, CardContainer, TimeSlot, UserDataRaw, DeptName, BtnsContainer } from './Department.styles'
import Paper from '@mui/material/Paper';
import { GetDepartmentsInfo } from '../../../../../services/generalSetUpServices/departmentServices/DepartmentServices';
import EditDepartmentModal from '../../../modals/generalSetUp/department/EditDepartmentModal';

export default function Department() {

    const [departments, setDepartments] = useState<any>([]);
    const [showEditDept, setShowEditDept] = useState<any>(false);
    const [selectedDept, setSelectedDept] = useState<any>(null);
    const [reloadData, setReloadData] = useState<any>(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetDepartmentsInfo();
                setDepartments(res?.data);
                setReloadData(false);
            } catch (err: any) {
                console.log("GetDepartmentsInfo api err", err);
            }
        }
        getData();
    }, [reloadData])

    const handleEditClick = (dept_id: any) => {
        setShowEditDept(true);
        setSelectedDept(dept_id);
    }

    return (
        <MainContainer>
            <Container>
                <Heading>Manage Department</Heading>
                <SubContainer>
                    {departments?.map((item: any, index: any) => (
                        <Paper elevation={5}>
                            <CardContainer key={index}>
                                <UserDataRaw>
                                    <DeptName>{item.dept_name}</DeptName>
                                    <TimeSlot>{item.appointment_time_slot}</TimeSlot>
                                </UserDataRaw>
                                <div>
                                    <BtnsContainer>
                                        <Btns style={{ color: '#40b4c1', margin: '0px 10px' }} onClick={() => handleEditClick(item.dept_id)}>Edit</Btns>
                                    </BtnsContainer>
                                    {
                                        showEditDept && <EditDepartmentModal deptdata={{ deptName: item.dept_name, timeSlot: item.appointment_time_slot, status: item.status, deptId: item.dept_id }} selectedDept={selectedDept} selectedCard={item.dept_id} showEditDept={showEditDept} setShowEditDept={setShowEditDept} setReloadData={setReloadData} />
                                    }
                                </div>
                            </CardContainer>
                        </Paper>
                    ))}
                </SubContainer>
            </Container>
        </MainContainer>
    )
}
import GeneralSetUp from '../../images/GeneralSetUp.jpg';
import PatientRegistration from '../../images/PatientReg.png';
import OPD from '../../images/OPD.png';
import IPD from '../../images/IPD.png';
import NursingStation from '../../images/NursingReg.png';
import LabAndDiagnosis from '../../images/LabAndDiag.png';
import Pathology from '../../images/Pathology.png';
import Doctor from '../../images/Doctor.png';
import OT from '../../images/OT.png';
import Reports from '../../images/Reports2.png';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { MainContainer, ModuleImgContainer, ModuleName } from './Dashboard.styles';
import { connect } from 'react-redux';
import { setUserModules } from '../../../redux/actions/UserModulesAction';
import { useHistory } from 'react-router-dom';

function Dashboard(props: any) {

  const history = useHistory();

  // const modulesIds: number[] = [1,2,3,4,5,6,7,8,10,11];

  const userModuleData: any = {
    // 1: { image: GeneralSetUp, name: 'General Setup' },
    // 2: { image: PatientRegistration, name: 'Patient Registration' },
    // 3: { image: OPD, name: 'OPD' },
    // 4: { image: IPD, name: 'IPD' },
    // 5: { image: Lab, name: 'Lab and Diagnosis' },
    // 6: { image: Casuality, name: 'Casuality' },
    // 7: { image: OT, name: 'OT' },
    // 8: { image: Nursing, name: 'Nursing' },
    // 9: { image: Nursing, name: 'Nursing' },
    // 10: { image: Pathology, name: 'Pathology' },
    // 11: { image: Doctor, name: 'Doctor' },
    // 12: { image: PatientRegistration, name: 'Nursing' },
    // 13: { image: Casuality, name: 'Nursing' },
    // 14: { image: Nursing, name: 'Nursing' },
    // 15: { image: OT, name: 'Nursing' },
    // 16: { image: Nursing, name: 'Nursing' },
    // 17: { image: IPD, name: 'Nursing' },
    // 18: { image: Casuality, name: 'Nursing' },
    // 19: { image: GeneralSetUp, name: 'Nursing' },
    // 20: { image: PatientRegistration, name: 'Nursing' }

    1: { image: GeneralSetUp, name: 'General Setup' },
    2: { image: PatientRegistration, name: 'Patient Registration' },
    3: { image: OPD, name: 'OPD' },
    4: { image: IPD, name: 'IPD' },
    8: { image: NursingStation, name: 'Nursing Station' },
    9: { image: LabAndDiagnosis, name: 'Lab and Diagnosis' },
    10: { image: Pathology, name: 'Pathology' },
    11: { image: Doctor, name: 'Doctor' },
    15: { image: OT, name: 'OT' },
    17: { image: Reports, name: 'Reports' }
  };

  const handleModuleClick = (moduleId: any) => {
    if(moduleId === 3){
      history.push('/registration');
    }
    // history.push(`/patientForRequisition/${moduleId}`);
  }

  return (
    <>
      <MainContainer style={{ padding: '5%', display: 'flex' }}>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 5,
            width: 100,
            height: 100,
            textAlign: 'center',
          },
        }}>
          {props.userModules.map((moduleId: number) => (
            <ModuleImgContainer onClick={() => {handleModuleClick(moduleId)}} key={moduleId}>
              <>
                  <Paper style={{ height: '100%', backgroundImage: `url(${userModuleData[moduleId].image})`, backgroundSize: 'cover', cursor: 'pointer' }} elevation={3} >
                  </Paper>
                <ModuleName style={{ padding: '10px', fontSize: '13px', fontWeight: '600' }}>{userModuleData[moduleId].name}</ModuleName>
              </>
            </ModuleImgContainer>
          ))}
        </Box>
      </MainContainer>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  userModules: state.AuthenticatedUserModules.userModules
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserModules: (moduleIds: number[]) => dispatch(setUserModules(moduleIds))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
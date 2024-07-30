import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/views/login/LoginForm';
import Dashboard from './components/views/dashboard/Dashboard';
import Dropdown from './components/common/dropdown/Dropdown';
import PatientForRegistration from './components/views/pfr/PatientForRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthenticate, setAuthToken, setUserId } from './redux/actions/AuthAction';
import Layout from './layout/Layout';
import PrivateRoute from './routes/PrivateRoutes';
import OPDReg from './components/views/opd/OPDReg';
import RegistrationFoam from './components/views/registration/RegistrationFoam';
import OpdBillDetail from './components/views/printViews/OpdBillDetail';
import OpdBill from './components/views/printViews/OpdBill';
import ServiceAcknowledgement from './components/views/serviceAcknowledgement/ServiceAcknowledgement';
import AddRole from './components/views/generalSetup/masters/manageUserRoles/AddRole';
import UserManagement from './components/views/generalSetup/masters/userManagement/UserManagement';
import UserIpManagement from './components/views/generalSetup/masters/userIpManagement/UserIpMgmt';
import Department from './components/views/generalSetup/masters/department/Department';
import ResetPassword from './components/views/generalSetup/masters/resetPassword/ResetPassword';
import DoctorDetails from './components/views/generalSetup/masters/doctorDetails/DoctorDetails';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated: any = useSelector((state: any) => state.AuthenticationInfo.isUserAuthenticate);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');

    if (storedAuth === 'true') {
      dispatch(setAuthToken(localStorage.getItem('authToken')));
      dispatch(setUserAuthenticate(true));
      dispatch(setUserId(localStorage.getItem('userId')));
    } else if (storedAuth === 'false') {
      dispatch(setAuthToken(''));
      dispatch(setUserAuthenticate(false));
      dispatch(setUserId(''));
    } else {
      console.log("else calledddd....");
    }
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => isAuthenticated ?
          <Redirect to="/dashboard" /> : <Redirect to="/login" />} />
        <Route path="/login" component={LoginForm} />
        <Route path="/opdPrint" component={OpdBillDetail} />
        <Route path="/opdBillPrint" component={OpdBill} />
        <Layout>
          <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/patientForRequisition/:moduleId" component={PatientForRegistration} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/opdRegistration/:patientId" component={OPDReg} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/registration" component={RegistrationFoam} isAuthenticated={isAuthenticated} />
          <Route path="/serviceAcknowledge" component={ServiceAcknowledgement} />
          <Route path="/manageUserRoles" component={AddRole} />
          <Route path="/userManagement" component={UserManagement} />
          <Route path="/userIpManagement" component={UserIpManagement} />
          <Route path="/departmentUnits" component={Department} />
          <Route path="/resetPassword" component={ResetPassword} />
          <Route path="/doctorDetails" component={DoctorDetails} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;

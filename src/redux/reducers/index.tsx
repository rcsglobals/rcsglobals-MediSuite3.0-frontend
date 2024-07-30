import { combineReducers } from 'redux';
import AuthReducer from '../reducers/AuthReducer';
import UserModuleReducer from "../reducers/UserModulesReducer";
import OpdRegReducer from './OpdRegReducer';
import EopdReducer from './EopdReducer';

const rootReducer = combineReducers({
    AuthenticationInfo: AuthReducer,
    AuthenticatedUserModules: UserModuleReducer,
    OpdRegistration: OpdRegReducer,
    EOPD: EopdReducer 
});

export default rootReducer;
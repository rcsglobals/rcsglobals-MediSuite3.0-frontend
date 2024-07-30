import { useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { connect } from 'react-redux';
import { Module, ModuleDropdownContainer, RoleContainer, RoleValues, RoleValuesContainer, UserRole } from './MobileDropdown.styles';
import { UserModulesConstants } from '../constants/UserModulesConstants';
import { useHistory } from 'react-router-dom';

function MobileDropdown({ userModules, userMenu, setIsMenuClick }: any) {
    const [hoveredRole, setHoveredRole] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [modulesWithIds, setModulesWithIds] = useState<any>([]);
    const [filteredMenus, setFilteredMenus] = useState<any>([]);

    const role: string[] = ["Masters", "Transactions", "Reports"];
    const history: any = useHistory();

    const menuGroupLabels: { [key: string]: string } = {
        'T': 'Transactions',
        'R': 'Reports',
        'M': 'Masters'
    };

    useEffect(() => {
        const modulesMapped: any = userModules.map((moduleId: any) => ({
            moduleId,
            moduleName: UserModulesConstants[moduleId],
        }));
        setModulesWithIds(modulesMapped);
    }, [userModules])

    useEffect(() => {
        if (selectedModule) {
            const filtered = userMenu.filter((menu: any) => menu.moduleName === selectedModule);
            setFilteredMenus(filtered);
        }
    }, [selectedModule]);

    const handleRoleHover = (role: string) => {
        setHoveredRole(role);
    };

    const handleRoleClick = (role: any) => {
        if (role === 'OPD Registration(Walk-in)') {
            history.push('/registration');
            setIsMenuClick(false);
        } else if (role === 'e-OPD') {
            history.push('/patientForRequisition/3');
            setIsMenuClick(false);
        } else if (role === 'Service Acknowledge ') {
            history.push('/serviceAcknowledge');
            setIsMenuClick(false);
        } else if (role === 'Manage User Roles') {
            history.push('/manageUserRoles');
            setIsMenuClick(false);
        } else if (role === 'User Management') {
            history.push('/userManagement');
            setIsMenuClick(false);
        } else if (role === 'User Ip Management') {
            history.push('/userIpManagement');
        } else if (role === 'Department Units') {
            history.push('/departmentUnits');
        }else if (role === 'Reset Password') {
            history.push('/resetPassword');
        }else if (role === 'Doctor Details') {
            history.push('/doctorDetails');
          }
    }

    return (
        <div>
            <ModuleDropdownContainer>
                <div>
                    {modulesWithIds.map(({ moduleId, moduleName }: any) => (
                        <Module
                            onClick={() => setSelectedModule(moduleName)}
                            key={moduleId}
                            selectedModule={selectedModule === moduleName}
                        >
                            {moduleName}
                        </Module>
                    ))}
                </div>
                <RoleContainer>
                    {role.map((ele, index) => (
                        <UserRole hoveredRole={hoveredRole === ele} key={index} onMouseEnter={() => handleRoleHover(ele)}>
                            {ele}
                            <ArrowForwardIosIcon style={{ color: 'white', padding: '0px 20px', fontSize: '15px' }} />
                        </UserRole>
                    ))}
                </RoleContainer>
                <RoleValuesContainer>
                    {hoveredRole &&
                        filteredMenus.map((menu: any) => (
                            menuGroupLabels[menu.menuGroup] === hoveredRole && (
                                <RoleValues onClick={() => handleRoleClick(menu.menuName)} key={menu.menuId}>{menu.menuName}</RoleValues>
                            )
                        ))}
                </RoleValuesContainer>
            </ModuleDropdownContainer>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    userModules: state?.AuthenticatedUserModules?.userModules,
    userMenu: state?.AuthenticatedUserModules?.userMenu
});

export default connect(mapStateToProps, null)(MobileDropdown);
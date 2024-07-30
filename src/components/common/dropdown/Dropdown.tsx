import { useState, useEffect } from 'react';
import { MiddleContainer, Module, ModuleDropdownContainer, DropdownData, RoleContainer, UserRole, StyledArrowIcon, RoleValuesContainer, RoleValues } from './Dropdown.styles';
import { UserModulesConstants } from '../../common/constants/UserModulesConstants';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Dropdown = ({ userModules, userMenu, setIsMenuClick }: any) => {
  const role: string[] = ["Masters", "Transactions", "Reports"];
  const history: any = useHistory();

  const [selectedModule, setSelectedModule] = useState('');
  const [hoveredRole, setHoveredRole] = useState('');
  const [modulesWithIds, setModulesWithIds] = useState<any>([]);
  const [filteredMenus, setFilteredMenus] = useState<any>([]);

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
  }, [userModules]);

  useEffect(() => {
    if (selectedModule) {
      const filtered = userMenu.filter((menu: any) => menu.moduleName === selectedModule);
      setFilteredMenus(filtered);
    }
  }, [selectedModule]);

  const handleModuleHover = (module: string) => {
    setSelectedModule(module);
  };

  const handleModuleHoverOut = () => {
    setSelectedModule('');
  };

  const handleRoleHover = (role: string) => {
    setHoveredRole(role);
  };

  const handleRoleClick = (role: any) => {
    if(role === 'OPD Registration(Walk-in)'){
      history.push('/registration');
      setIsMenuClick();
    }else if(role === 'e-OPD'){
      history.push('/patientForRequisition/3');
    }else if(role === 'Service Acknowledge '){
      history.push('/serviceAcknowledge');
    }else if(role === 'Manage User Roles'){
      history.push('/manageUserRoles');
    }else if(role === 'User Management'){
      history.push('/userManagement');
    }else if(role === 'User Ip Management'){
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
      <MiddleContainer>
        {modulesWithIds.map(({ moduleId, moduleName }: any) => (
          <Module
            key={moduleId}
            onMouseEnter={() => handleModuleHover(moduleName)}
            onMouseLeave={handleModuleHoverOut}
            selectedModule={selectedModule === moduleName}
          >
            {moduleName}
            {selectedModule === moduleName && (
              <ModuleDropdownContainer>
                <DropdownData>
                  <RoleContainer>
                    {role.map((ele: string, index: number) => (
                      <UserRole hoveredRole={hoveredRole === ele} key={index} onMouseEnter={() => handleRoleHover(ele)}>
                        {ele}
                        <StyledArrowIcon />
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
                </DropdownData>
              </ModuleDropdownContainer>
            )}
          </Module>
        ))}
      </MiddleContainer>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  userModules: state?.AuthenticatedUserModules?.userModules,
  userMenu: state?.AuthenticatedUserModules?.userMenu
});

const mapDispatchToProps = (dispatch: any) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
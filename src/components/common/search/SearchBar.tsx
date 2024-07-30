import SearchIcon from '@mui/icons-material/Search';
import { SearchContainer, SearchIconWrapper, StyledInputBase } from './SearchBar.styles';

function SearchBar(props: any) {

  const placeholderMapping: any = {
    addRole: 'Search Role...',
    serviceAcknowledgement: 'OPD No...',
    userManagement: 'Serach by Username...',
    userIpManagement: 'Search by Employee...',
    gridTable: 'OPD No...',
    doctorDetails: 'Search Doctor...'
  };

  const getPlaceholder = (pageName: any) => {
    return placeholderMapping[pageName] || 'Search...';
  };

  return (
    <SearchContainer page={props?.page}>
      {props?.page !== 'serviceAcknowledgement' && <SearchIconWrapper>
        <SearchIcon height="20px" width="25px" />
      </SearchIconWrapper>
      }
      <StyledInputBase
        // placeholder={props?.page === 'addRole' ? 'Search Role...' : "OPD No..."} //{getPlaceholder(props?.page)}
        placeholder={getPlaceholder(props?.page)}
        inputProps={{ 'aria-label': 'search' }}
        value={props.searchValue}
        onChange={props.handleSearchChange}
      />
    </SearchContainer>
  );
}

export default SearchBar;
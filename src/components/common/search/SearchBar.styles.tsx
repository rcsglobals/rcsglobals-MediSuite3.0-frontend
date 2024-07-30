import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';

interface SearchContainerrProps {
  page: string;
}

// export const SearchContainer = styled.div<SearchContainerrProps>`
//   padding: ${(props) => (props.page === "gridTable" || props.page === "addRole") ? "5px 10px" : "0px"};
//   display: flex;
//   justify-content: space-between;
//   border-radius: ${(props) => (props.page === "gridTable" || props.page === "addRole") ? "5px" : "0px"};
//   background-color: ${(props) => (props.page === "gridTable" || props.page === "addRole") ? "#fff" : "transparent"};
//   margin: 8px 10px;
//   border: ${(props) => (props.page === "gridTable" || props.page === "addRole") ? '1px solid #8f8b8b99' : 'transparent'};
//   border-bottom: ${(props) => (props.page !== "gridTable" && props.page !== "addRole") ? '1px solid black' : '1px solid #8f8b8b99'};
//   float: right;
// `

const isStyledPage = (page: any) => ['gridTable', 'addRole', 'userIpManagement', 'doctorDetails'].includes(page);

export const SearchContainer =styled.div<SearchContainerrProps>`
  padding: ${(props) => isStyledPage(props.page) ? "5px 10px" : "0px"};
  display: flex;
  justify-content: space-between;
  border-radius: ${(props) => isStyledPage(props.page) ? "5px" : "0px"};
  background-color: ${(props) => isStyledPage(props.page) ? "#fff" : "transparent"};
  margin: 8px 10px;
  border: ${(props) => isStyledPage(props.page) ? '1px solid #8f8b8b99' : 'transparent'};
  border-bottom: ${(props) => !isStyledPage(props.page) ? '1px solid black' : '1px solid #8f8b8b99'};
  float: right;
`

export const SearchIconWrapper = styled('div')`
  pointer-events: none;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`

export const StyledInputBase = styled(InputBase)`
  padding: 0px 20px;
  color: inherit;
  width: 100%;
  font-size: 13px !important;
  & .MuiInputBase-input {
    @media (min-width: 50px) {
      width: 20ch;
    }
  }
`

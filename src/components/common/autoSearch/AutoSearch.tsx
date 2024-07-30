// import { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// export default function AutoSearch(props: any) {

//   const { options } = props;

//   const [selectedVal, setSelectedVal] = useState('');

//   useEffect(() => {
//     if(props.dropdown === 'invesDoctor'){
//       setSelectedVal('Dr. Mahesh');
//     }else if(props.dropdown === 'docDetailsDept') {
//       setSelectedVal('Medicine');
//     }
//   }, [props.dropdown]);

//   const handleInputChange = (e: any) => {
//     if (props?.dropdown === 'pharmaMedicine') {
//       props.handleSelectMedicine(e);
//     } else if (props?.dropdown === 'invesOrderService') {
//       props.handleOrderService(e);
//     } else if (props?.dropdown === 'invesDoctor') {
//       props.handleDoctor(e);
//     } else if (props?.dropdown === 'docDetailsDept') {
//       props.handleDepartment(e);
//     } else if (props?.dropdown === 'docDetailsSpln') {
//       props.handleSpecialization(e);
//     }
//   }

//   const filterOptions = (options: any, { inputValue }: any) => {
//     const searchTerms = inputValue?.toLowerCase()?.split(" ");
//     return options?.filter((option: any) => {
//       const label = option?.toLowerCase();
//       return searchTerms?.every((term: any) => label?.includes(term));
//     });
//   };

//   const GetOptions = () => {
//     if (props?.dropdown === 'pharmaMedicine') {
//       return (
//         options?.map((val: any) => val?.item_name.split(" -")[0])
//       )
//     } else if (props?.dropdown === 'invesOrderService') {
//       return (
//         options?.map((val: any) => val?.serviceName)
//       )
//     } else if (props?.dropdown === 'invesDoctor') {
//       return (
//         options?.map((val: any) => val?.doctor_name)
//       )
//     }else if (props?.dropdown === 'docDetailsDept') {
//       return (
//         options?.map((val: any) => val?.dept_name)
//       )
//     }else if (props?.dropdown === 'docDetailsSpln') {
//       return (
//         options?.map((val: any) => val?.specialization)
//       )
//     }
//   }

//   return (
//     <Autocomplete
//       disablePortal
//       disableClearable
//       id="combo-box-demo"
//       options={GetOptions()}
//       filterOptions={filterOptions}
//       onInputChange={(e) => handleInputChange(e)}
//       value={props?.dropdown === 'docDetailsDept' ? selectedVal : ''}
//       // value={selectedVal}
//       sx={{
//         width: 400, margin: '8px',
//         '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
//           fontSize: '13px',
//           transform: 'translate(14px, 8px) scale(1)'
//         }
//       }}
//       renderInput={(params) => <TextField {...params} label="Search..."
//         sx={{
//           '& .MuiOutlinedInput-root': {
//             padding: '2px',
//             '& .MuiAutocomplete-input': {
//               padding: '4px',
//             },
//             '& .css-1ovvzo2-MuiAutocomplete-root .MuiOutlinedInput-root': {
//               padding: '0px'
//             },
//             '& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper': {
//               fontSize: '13px'
//             }
//           }
//         }} />}
//     />
//   );
// }

import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoSearch(props: any) {
  const { options, doctorName, dept_name, specialization } = props;

  // Initialize the state with the default selected value
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (props?.dropdown === 'pharmaMedicine') {
      setSelectedValue('')
    } else if (props?.dropdown === 'invesOrderService') {
      setSelectedValue('')
    } else if (props?.dropdown === 'invesDoctor') {
      setSelectedValue(doctorName)
    } else if (props?.dropdown === 'docDetailsDept') {
      setSelectedValue(dept_name)
    } else if (props?.dropdown === 'docDetailsSpln') {
      setSelectedValue(specialization)
    }
  }, [])

  const handleInputChange = (event: any, newInputValue: any) => {
    setSelectedValue(newInputValue);
    if (props?.dropdown === 'pharmaMedicine') {
      props.handleSelectMedicine(newInputValue);
    } else if (props?.dropdown === 'invesOrderService') {
      props.handleOrderService(newInputValue);
    } else if (props?.dropdown === 'invesDoctor') {
      props.handleDoctor(newInputValue);
    } else if (props?.dropdown === 'docDetailsDept') {
      props.handleDepartment(newInputValue);
    } else if (props?.dropdown === 'docDetailsSpln') {
      props.handleSpecialization(newInputValue);
    }
  }

  const filterOptions = (options: any, { inputValue }: any) => {
    const searchTerms = inputValue?.toLowerCase()?.split(" ");
    return options?.filter((option: any) => {
      const label = option?.toLowerCase();
      return searchTerms?.every((term: any) => label?.includes(term));
    });
  };

  const GetOptions = () => {
    if (props?.dropdown === 'pharmaMedicine') {
      return (
        options?.map((val: any) => val?.item_name.split(" -")[0])
      )
    } else if (props?.dropdown === 'invesOrderService') {
      return (
        options?.map((val: any) => val?.serviceName)
      )
    } else if (props?.dropdown === 'invesDoctor') {
      return (
        options?.map((val: any) => val?.doctor_name)
      )
    } else if (props?.dropdown === 'docDetailsDept') {
      return (
        options?.map((val: any) => val?.dept_name)
      )
    } else if (props?.dropdown === 'docDetailsSpln') {
      return (
        options?.map((val: any) => val?.specialization)
      )
    }
  }

  return (
    <Autocomplete
      disablePortal
      disableClearable
      id="combo-box-demo"
      options={GetOptions()}
      filterOptions={filterOptions}
      value={selectedValue}
      onInputChange={handleInputChange}
      onChange={(event, newValue) => handleInputChange(event, newValue)} // Add this line
      sx={{
        width: 400, margin: '8px',
        '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: '13px',
          transform: 'translate(14px, 8px) scale(1)'
        }
      }}
      renderInput={(params) => <TextField {...params} label="Search..."
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '2px',
            '& .MuiAutocomplete-input': {
              padding: '4px',
            },
            '& .css-1ovvzo2-MuiAutocomplete-root .MuiOutlinedInput-root': {
              padding: '0px'
            },
            '& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper': {
              fontSize: '13px'
            }
          }
        }} />}
    />
  );
}
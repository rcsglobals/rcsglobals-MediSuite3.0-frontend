// import { useState, useEffect } from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';

// export const EditedDropdown = (props: any) => {
//     const { dropdown, options } = props;

//     const [selectedVal, setSelectedVal] = useState('');

//     const handleChange = (e: any) => {
//         const selectedValue = e.target.value;
//         setSelectedVal(selectedValue);

//         if (props.dropdown === 'resetPswrd') {
//             props.handleLocationChange(e);
//         }else if(props.dropdown === 'doctorTypes'){
//             props.handleDoctorTypesChange(e);
//         }else if(props.dropdown === 'depts'){
//             props.handledeptsChange(e);
//         }
//     };

//     return (
//         <FormControl
//             sx={{
//                 m: 1, minWidth: 120, backgroundColor: 'white', color: 'white', margin: '0px',
//                 '& .MuiOutlinedInput-root': {
//                     '& fieldset': {
//                         borderColor: 'grey',
//                     },
//                     '&:hover fieldset': {
//                         borderColor: 'Grey',
//                     },
//                 },
//                 '& .MuiFormLabel-root': {
//                     fontSize: '13px',
//                     '&.Mui-focused': {
//                         color: 'grey'
//                     },
//                 },
//                 '& .css-1mlvn36-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
//                     fontSize: '13px'
//                 }
//             }}
//             size="small"
//         >
//             <InputLabel required id="demo-select-small-label">Select</InputLabel>
//             <Select
//                 sx={{
//                     '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
//                         padding: '5px',
//                         fontSize: '13px',
//                         textAlign: 'center'
//                     },
//                     '& .css-bp4fj4-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
//                         // borderRadius: '20px'
//                     }
//                 }}
//                 labelId="demo-select-small-label"
//                 id="demo-select-small"
//                 label="Select"
//                 value={selectedVal}
//                 onChange={(e: any) => handleChange(e)}
//                 MenuProps={{
//                     PaperProps: {
//                         style: {
//                             maxHeight: 48 * 4.5 + 8,
//                         }
//                     }
//                 }}
//             >
//                 {options?.map((data: any, index: number) => (
//                     dropdown === 'resetPswrd' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.locationName}>{data.locationName}</MenuItem> ||
//                     dropdown === 'doctorTypes' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.doctorType}>{data.doctorType}</MenuItem> ||
//                     dropdown === 'depts' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.dept_name}>{data.dept_name}</MenuItem>
//                 ))}
//             </Select>
//         </FormControl>
//     );
// }

import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const labelMapping: any = {
  resetPswrd: 'Select Location',
  doctorTypes: 'Doctor Type',
  depts: 'Department',
};

export const EditedDropdown = (props: any) => {
  const { dropdown, options } = props;
  const [selectedVal, setSelectedVal] = useState('');

  const handleChange = (e: any) => {
    const selectedValue = e.target.value;
    setSelectedVal(selectedValue);

    if (props.dropdown === 'resetPswrd') {
      props.handleLocationChange(e);
    } else if (props.dropdown === 'doctorTypes') {
      props.handleDoctorTypesChange(e);
    } else if (props.dropdown === 'depts') {
      props.handledeptsChange(e);
    }
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        backgroundColor: 'white',
        color: 'white',
        margin: '0px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'grey',
          },
          '&:hover fieldset': {
            borderColor: 'Grey',
          },
        },
        '& .MuiFormLabel-root': {
          fontSize: '13px',
          '&.Mui-focused': {
            color: 'grey'
          },
        },
        '& .css-1mlvn36-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
          fontSize: '13px'
        }
      }}
      size="small"
    >
      <InputLabel required id="demo-select-small-label">
        {labelMapping[dropdown] || 'Select'}
      </InputLabel>
      <Select
        sx={{
          '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
            padding: '5px',
            fontSize: '13px',
            textAlign: 'center'
          },
        }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        label={labelMapping[dropdown] || 'Select'}
        value={selectedVal}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
            }
          }
        }}
      >
        {options?.map((data: any, index: number) => (
          dropdown === 'resetPswrd' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.locationName}>{data.locationName}</MenuItem> ||
          dropdown === 'doctorTypes' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.doctorType}>{data.doctorType}</MenuItem> ||
          dropdown === 'depts' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.dept_name}>{data.dept_name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
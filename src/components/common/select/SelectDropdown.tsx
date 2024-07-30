import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectDropdown = (props: any) => {

  const [selectedVal, setSelectedVal] = useState('');
  const { dropdown, values, doctor_type } = props;

  useEffect(() => {
    if(props.dropdown === 'invesDoctor'){
      setSelectedVal('Dr. Mahesh');
    }else if(props.dropdown === 'doctorType') {
      setSelectedVal(doctor_type);
    }
  }, [props.dropdown]);

  const handleChange = (e: any) => {

    const selectedValue = e.target.value as string;
    setSelectedVal(selectedValue);

    //OPD Registration Dropdowns
    if (props.dropdown === 'department') {
      props.handleDepartmentChange(e);
    }
    else if (props.dropdown === 'specialization') {
      props.handleSpecializationChange(e);
    }
    else if (props.dropdown === 'unit') {
      props.handleUnitChange(e);
    }
    else if(props.dropdown === 'refferedBy') {
      props.handleRefferedByChange(e);
    }
    else if(props.dropdown === 'patientType') {
      props.handlePatientTypeChange(e);
    }
    else if(props.dropdown === 'patientTypeOptions') {
      props.handlePatientTypeOptionChange(e);
    }
    else if(props.dropdown === 'discount') {
      props.handleDiscountChange(e);
    }
    else if(props.dropdown === 'paymentMode') {
      props.handlePaymentMode(e);
    }
    //E-OPD Investigation Modal Dropdowns
    else if(props.dropdown === 'invesDoctor') {
      props.handleDoctor(e);
    }
    else if(props.dropdown === 'invesOrderService') {
      props.handleOrderService(e);
    }
     //E-OPD Pharma Modal Dropdowns
    else if(props.dropdown === 'pharmaMedicine') {
      props.handleSelectMedicine(e);
    }
    else if(props.dropdown === 'forDays') {
      props.handleDays(e);
    }
    else if(props.dropdown === 'selectDose') {
      props.handleSelectDose(e);
    }
    // General SetUp Doctor Details (AddDoctorModal)
    else if(props.dropdown === 'doctorType') {
      props.handleDoctorType(e);
    }
    // General SetUp Doctor Details (DoctorCutModal)
    else if(props.dropdown === 'doctorCutSerType') {
      props.handleServiceType(e);
    }
  };

  return (
    <FormControl
      sx={{
        m: 1, minWidth: props.dropdownPage === 'pharma' ? 120 : 120,
        '& .MuiFormLabel-root': {
          fontSize: '13px',
          '&.Mui-focused': {
            color: 'grey'
          },
        }
      }}
      size="small"
    >
      <InputLabel required={props.required ? true : false} id="demo-select-small-label">Select</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedVal}
        label="Select"
        onChange={(e: any) => handleChange(e)}
        name={props.dropdown}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8
            },
          },
        }}
        sx={{
          '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
              padding: '5px',
              fontSize: '13px'
          },
          '& .css-bp4fj4-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
              borderRadius: '20px',
              fontSize: '13px'
          }
      }}
      >
        {values?.map((data: any, index: any) => (
          // opd registration dropdowns
          dropdown === 'department' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.dept_name}>{data.dept_name}</MenuItem> ||
          dropdown === 'specialization' && <MenuItem sx={{ fontSize: '13px' }}  key={index} value={data.specialization}>{data.specialization}</MenuItem> ||
          dropdown === 'unit' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.unit_name}>{data.unit_name}</MenuItem> ||
          dropdown === 'refferedBy' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.doctor_master_type_name}>{data.doctor_master_type_name}</MenuItem> ||
          dropdown === 'refferedByOptions' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.doctor_name}>{data.doctor_name}</MenuItem> ||
          dropdown === 'patientType' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.patient_category}>{data.patient_category}</MenuItem> ||
          dropdown === 'patientTypeOptions' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.partner_name || data.camp_name}>{data.partner_name || data.camp_name}</MenuItem> ||
          dropdown === 'discount' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={`${data.discountHead} (${data.discountPercent}%)`}>{`${data.discountHead} (${data.discountPercent}%)`}</MenuItem> ||
          dropdown === 'paymentMode' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.description}>{data.description}</MenuItem> ||
           //E-OPD Investigation Modal Dropdowns
          dropdown === 'invesDoctor' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.doctor_name}>{data.doctor_name}</MenuItem> ||
          dropdown === 'invesOrderService' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.serviceName}>{data.serviceName}</MenuItem> ||
           //E-OPD Pharma Modal Dropdowns
          dropdown === 'pharmaMedicine' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.item_name}>{data.item_name}</MenuItem> ||
          dropdown === 'forDays' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data}>{data}</MenuItem> ||
          dropdown === 'selectDose' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data?.abbreviation}>{data?.abbreviation}</MenuItem> ||
          // General SetUp Doctor Details (AddDoctorModal)
          dropdown === 'doctorType' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.doctorType}>{data.doctorType}</MenuItem> ||
          // (DoctorCutModal)
          dropdown === 'doctorCutSerType' && <MenuItem sx={{ fontSize: '13px' }} key={index} value={data.value}>{data.service}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectDropdown;
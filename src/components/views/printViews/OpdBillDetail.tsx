import { useState, useEffect } from 'react';
import { A4Page, Content, PrintButton } from './OpdBillDetails.styles';
import Logo from '../../images/RamaHospitalLogoHindi.png';
import { useLocation } from 'react-router-dom';
import { GetRefferedOpdNoSer, OpdGetDiagDetailsSer, OpdGetPatientDetailsSer } from '../../../services/printServices/eOpdPrintServices';
import { FormatDate } from '../../../utils/FormatDate';
import { getCurrDate } from '../../../utils/FormatDate';

const RegistrationFormTable = (props: any) => {
  return (
    <table style={{ boxShadow: '0px 1px 2px 0.5px #80808067' }}>
      <thead>
        <tr>
          <td colSpan={10} style={{ padding: '5px', fontWeight: '500', fontSize: '20px' }}>Patient Details:</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '5px', fontWeight: '600' }}>Patient Name:</td>
          <td style={{ padding: '5px' }}>{props.patientDetails.patient_Name}</td>
          <td style={{ padding: '5px', fontWeight: '600' }}>Spouse Name:</td>
          <td style={{ padding: '5px' }}>{props.patientDetails.spouse_name}</td>
          <td style={{ padding: '5px', fontWeight: '600' }}>Age/Sex:</td>
          <td style={{ padding: '5px' }}>{props.patientDetails.age}/{props.patientDetails.sex}</td>
        </tr>
        <tr style={{ padding: '15px' }}>
          <td style={{ padding: '5px', fontWeight: '600' }}>OpdNo:</td>
          <td style={{ padding: '5px' }}>{props.patientDetails.opd_registration_no}</td>
          <td style={{ padding: '5px', fontWeight: '600' }}>Address/Contact No:</td>
          <td style={{ padding: '5px' }}>{`${props.patientDetails.address_Contact != (null && '') ? props.patientDetails.address_Contact : 'Not Available'} ${" / "} ${props.patientDetails.mobile_no}`}</td>
          <td style={{ padding: '5px', fontWeight: '600' }}>OPD Date:</td>
          <td style={{ padding: '5px' }}>{FormatDate(props.patientDetails.registration_date)}</td>
        </tr>
        <tr style={{ padding: '15px' }}>
          <td style={{ padding: '5px', fontWeight: '600' }}>UHID No:</td>
          <td style={{ padding: '5px' }}>{props.patientDetails.patient_id}</td>
          <td style={{ padding: '5px', fontWeight: '600' }}>Doctor Name:</td>
          <td style={{ padding: '5px' }}>{props.patientDetails.doctor_name}</td>
          <td style={{ padding: '5px', fontWeight: '600' }}>SR/JR Name:</td>
          <td style={{ padding: '5px' }}>{props.patientDetails.jrName}</td>
        </tr>
      </tbody>
    </table>
  );
};

const GpeTable = ({ gpeObservations }: { gpeObservations: string }) => {

  const pairs = gpeObservations ? gpeObservations.split(',') : [];

  const extractValues = () => {
    const values: { [key: string]: string } = {};
    pairs?.forEach((pair: string) => {
      const [key, value] = pair.split(': ');
      if (key !== undefined && value !== undefined) {
        values[key.trim()] = value.trim();
      }
    });

    return values;
  };

  let data: any = extractValues();

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ fontWeight: '700', fontSize: '15px', padding: '5px' }}>GPE: </div>
        {Object.keys(data).map((key) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', padding: '5px' }}>{key}:</div>
            <div style={{ textAlign: 'center', padding: '0px 10px' }}>{data[key]}</div>
          </div>
        ))}
      </div>
    </>
  )
}

const SysExamData = (sysExamObservations: any) => {

  const parseString = (str: any) => {
    const result: any = {
      CNS: '',
      CVS: [],
      RS: [],
      PA_EXAM: [],
    };

    const sections = str !== '' ? str.split(',') : [];

    sections.forEach((section: any) => {
      const [key, value] = section.split(': ').map((item: any) => item.trim());
      switch (key) {
        case 'CNS':
          result.CNS = value;
          break;
        case 'S1S2Heard':
        case 'Murmur':
          result.CVS.push(`${key}: ${value}`);
          break;
        case 'VesicularBreathSounds':
        case 'BronchialBreathing':
        case 'CrepsRhonchi':
          if (value === 'True') {
            result.RS.push(`${key}: ${value}`);
          }
          break;
        case 'PAExam':
        case 'Tenderness':
        case 'Hepatospleenomegaly':
          result.PA_EXAM.push(`${key}: ${value}`);
          break;
        default:
          break;
      }
    });

    return result;
  };

  const parsedResult = parseString(sysExamObservations?.sysExamObservations);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '5px' }}>
        <div style={{ fontWeight: '700', fontSize: '15px' }}>System Examination:</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontWeight: '600' }}>CNS:</div>
          <div style={{ padding: '0px 20px' }}>{parsedResult.CNS}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontWeight: '600' }}>CVS:</div>
          <div style={{ padding: '0px 20px' }}>
            {parsedResult.CVS.map((item: any, index: any) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontWeight: '600' }}>RS:</div>
          <div style={{ padding: '0px 20px' }}>
            {parsedResult.RS.map((item: any, index: any) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontWeight: '600' }}>PA Exam:</div>
          <div style={{ padding: '0px 20px' }}>
            {parsedResult.PA_EXAM.map((item: any, index: any) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OpdBillDetail = () => {

  const query = useQuery();
  const opdNo = query.get('opdNo');
  const doctorName = query.get('doctor_name');
  const opdType = query.get('opd_type');
  const [patientDetails, setPatientDetails] = useState<any>({});
  const [patientDiagData, setPatientDiagData] = useState<any>([]);
  const [refOpdNo, setRefOpdNo] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      // let res: any = await OpdGetPatientDetailsSer(location.state.opdNo);
      let res: any = await OpdGetPatientDetailsSer(opdNo);
      if (res?.status === 200) {
        setPatientDetails(res?.data);
      }
      // let response: any = await OpdGetDiagDetailsSer(location?.state?.opdNo);
      let response: any = await OpdGetDiagDetailsSer(opdNo);
      if (response?.status === 200) {
        setPatientDiagData(response?.data);
      }

      let refOpdNoRes: any = await GetRefferedOpdNoSer(opdNo);
      if (refOpdNoRes?.status === 200) {
        setRefOpdNo(refOpdNoRes?.data[0]?.ref_opd_registration_no);
      }
    }
    getData();
  }, [])

  const getDoctorname = (opdType: any) => {
    const doctorNameDisplay = opdType === 'R' ? (patientDetails?.doctor_name) : doctorName;
    return doctorNameDisplay;
  }

  const handlePrint = () => {
    window.print();
  };

  const GetDiagnosisData = (stageId: any) => {
    const isStageIdExist = patientDiagData?.find((data: any) => data.stage_id === stageId);
    const stageIdObservations = isStageIdExist ? isStageIdExist.observations : '';
    return stageIdObservations;
  }

  const GetInvesAndPharmaData = (stageId: any) => {
    let observations: any = GetDiagnosisData(stageId);
    let observationsArray: any = observations !== '' ? observations?.split(',') : [];
    return observationsArray;
  }
  const gpeObservations: any = GetDiagnosisData(2);
  const sysExamObservations: any = GetDiagnosisData(3);
  const invesObservations: any = GetInvesAndPharmaData(6);
  const pharmaObservations: any = GetInvesAndPharmaData(7);
  const followUpObservations: any = GetDiagnosisData(8);

  const date: any = FormatDate(followUpObservations);

  return (
    <A4Page id="print-root">
      <Content >
        <div>
          <img alt="" src={Logo} />
        </div>
        <div style={{}}>
          <div style={{ textAlign: 'left', fontWeight: '600', fontSize: '30px', padding: '20px 0px' }}>OPD Summary</div>
        </div>
        <div>
          <RegistrationFormTable patientDetails={patientDetails} />
          <div style={{ padding: '10px 0px' }}>
            <div style={{ boxShadow: '0px 1px 2px 0.5px #80808067' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontWeight: '700', fontSize: '15px', padding: '5px' }}>Chief Complaint:</div>
                <div style={{ padding: '10px 20px 10px 10px' }}>{GetDiagnosisData(1)}</div>
                <div style={{ fontWeight: '700', fontSize: '15px', padding: '5px' }}>Treatment Plan:</div>
                <div style={{ padding: '10px 20px 10px 10px' }}>{GetDiagnosisData(5)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontWeight: '700', fontSize: '15px', padding: '5px' }}>Provisional Diagnosis:</div>
                <div style={{ padding: '10px 20px 10px 10px' }}>{GetDiagnosisData(4)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <GpeTable gpeObservations={gpeObservations} />
                <SysExamData sysExamObservations={sysExamObservations} />
              </div>
            </div>
            {/* <div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0px' }}>
                <div style={{ fontWeight: '700', fontSize: '15px', minWidth: '130px' }}>Investigation:</div>
                <div>
                  {
                    (invesObservations.length > 0) && invesObservations.map((item: any, index: any) => (
                      <div key={index} style={{ padding: '2px 20px 2px 20px', boxShadow: '0px 1px 2px 0.5px #80808067' }}>{item}</div>
                    ))
                  }
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontWeight: '700', fontSize: '15px', minWidth: '130px' }}>Medicine:</div>
                <div>
                  {
                    (pharmaObservations.length > 0) && pharmaObservations.map((item: any, index: any) => (
                      <div key={index} style={{ padding: '2px 20px 2px 20px', boxShadow: '0px 1px 2px 0.5px #80808067' }}>{item}</div>
                    ))
                  }
                </div>
              </div>
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '10px 0px', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '20px', width: '50%' }}>
                <div style={{ fontWeight: '700', fontSize: '15px', minWidth: '130px', padding: '5px 0px' }}>Investigation:</div>
                <div>
                  {
                    (invesObservations.length > 0) && invesObservations.map((item: any, index: any) => (
                      <div key={index} style={{ padding: '2px 20px', boxShadow: '0px 1px 2px 0.5px #80808067' }}>{item}</div>
                    ))
                  }
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '50%' }}>
                <div style={{ fontWeight: '700', fontSize: '15px', minWidth: '130px', padding: '5px 0px' }}>Medicine:</div>
                <div>
                  {
                    (pharmaObservations.length > 0) && pharmaObservations.map((item: any, index: any) => (
                      <div key={index} style={{ padding: '2px 20px', boxShadow: '0px 1px 2px 0.5px #80808067' }}>{item}</div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '5px 0px' }}>
              <div style={{ fontWeight: '700', fontSize: '15px', minWidth: '130px' }}>Next Follow Up:</div>
              <div style={{ padding: '2px 20px 2px 20px', boxShadow: '0px 1px 2px 0.5px #80808067' }}>
                {
                  // `${location.state.doctor_name} on ${date}`
                  // `${doctorName} on ${date}`
                  `${getDoctorname(opdType)} on ${date}`
                }
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '30%', textAlign: 'center' }}>
          {refOpdNo !== null && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', padding: '5px 0px' }}>
              <div style={{ fontWeight: '700', fontSize: '15px', minWidth: '100px' }}>Ref OpdNo:</div>
              <div>{refOpdNo}</div>
            </div>
          </div>}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div style={{ textAlign: 'left', fontWeight: '700', fontSize: '15px' }}>
              Date: {getCurrDate()}
            </div>
            <div style={{ textAlign: 'right', fontWeight: '700', fontSize: '15px' }}>
              Signature(Doctor):
            </div>
          </div>
        </div>
        <PrintButton className="no-print" onClick={handlePrint}>Print</PrintButton>
      </Content>
    </A4Page>
  );
};

export default OpdBillDetail;

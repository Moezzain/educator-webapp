import url from '../config/apiConfig';
import axios from 'axios';
import { parseArray } from '../helpers/Converters';

export const getPatient = async (educatorId, token, patientId) => {
  try {
    const result = await axios.get(
      `${url}/patient?patientId=${patientId}&educatorId=${educatorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result.data) {
      const { patient: unparsedPatient, patientProfile } = result.data;
      const patient = JSON.parse(unparsedPatient);
      return { patient, patientProfile };
    }
  } catch (error) {
    console.log('getPatient Error', error);
  }
};
export const getAppointments = async (patientId, token, educatorId) => {
  try {
    const result = await axios.get(
      `${url}/appointment?patientId=${patientId}&educatorId=${educatorId}&get=one`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result.data) {
      const parsedPatient = parseArray(result.data) 
      return parsedPatient;
    }
  } catch (error) {
    console.log('error', error);
  }
};

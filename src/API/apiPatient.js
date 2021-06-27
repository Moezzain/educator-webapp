import url from '../config/apiConfig'
import axios from "axios"

export const getPatient = async (educatorId, token, patientId) => {
    try {
      const result = await axios.get(`${url}/patient?patientId=${patientId}&educatorId=${educatorId}`, {headers: {
        Authorization: `Bearer ${token}`
      }})
      if(result.data) {
        const {patient: unparsedPatient, patientProfile} = result.data;
          const patient = JSON.parse(unparsedPatient);
          return {patient, patientProfile};
      }
    } catch (error) {
      console.log('getPatient Error', error);
    }
  
}
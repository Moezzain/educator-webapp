export const concatProfile = (patientProfile, profileValue) => {
  //getting prfileValue without the last character
  const valueInside = profileValue.substring(0, profileValue.length - 1);
  let result = '';
  if (patientProfile?.[profileValue])
    //concating each value srting to the result
    patientProfile[profileValue].forEach((item) => {
      result = result.concat(item?.[valueInside] + '\n');
    });
  return result;
};
export const getAppointmentsEducators = (educators, appointments) => {
  const tempAppointments = [];
  if (educators) {
    educators.forEach((educator) => {
      tempAppointments.push(
        appointments
          .filter((appointment) => {
            return educator.id === appointment.educatorId;
          })
          .map((appointment) => {
            return {
              date: appointment.date,
              educatorId: appointment.educatorId,
              name: educator.name,
            };
          })
      );
    });
  }

  return tempAppointments.flat();
};

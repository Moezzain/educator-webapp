export const concatProfile = (patientProfile, profileValue) => {
    //getting prfileValue without the last character
    const valueInside = profileValue.substring(0,profileValue.length-1)
    let result = '';
    if(patientProfile?.[profileValue])
    //concating each value srting to the result 
  patientProfile[profileValue].forEach((item) => {
    result = result.concat(item?.[valueInside]+'\n')
  })
  return result
}

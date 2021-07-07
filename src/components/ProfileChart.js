import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  Tooltip,
  Legend,
} from 'recharts';
import { lightStyles as styles } from '../styles/patientProfileStyles';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
const ProfileChart = ({ text, hba1cs, weights, height }) => {
  const theme = useTheme();
  function createData(date, hba1c, weight, height) {
    return { date, hba1c, weight, height };
  }
  const [data, setData] = useState([])
  useEffect(() => {
    let tempData = []
    hba1cs?.forEach((hba1c) => {

      tempData.push(
        createData(
          hba1c?.createdOn?.split('T')[0],
          weights?.[0]?.weight,
          hba1c?.hba1c,
          height
        )
      );
    });
    setData(tempData)
  }, [hba1cs]);
  
  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart data={data} margin={styles.chartMargin}>
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
              }}
            >
              {text}
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="hba1c"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="height" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};
export default ProfileChart;

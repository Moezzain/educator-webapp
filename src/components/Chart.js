import React from 'react'
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Label,
    Tooltip,
    Legend
  } from 'recharts';

  import { useTheme } from '@material-ui/core/styles';

const Chart = (data,text) => {
    console.log('chart data',data);
    const theme = useTheme();

    return (
        <div style={{flex:1}}> 
            
      <React.Fragment>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
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
            <Legend/>
            <Line
              type="monotone"
              name={text}
              dataKey='amount'
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
        </div>
    );
  };

  export default Chart
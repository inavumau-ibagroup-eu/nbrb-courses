import { useTheme } from '@emotion/react';
import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const CourseDynamicsScreenChart = ({ chartData }) => {
    const theme = useTheme();

    return chartData?.length > 0 ? (
        <Paper sx={{ mt: 2 }} elevation={3}>
            <ResponsiveContainer style={{ 'padding-top': 16 }} width="99%" height={300}>
                <LineChart margin={{ top: 30, right: 24 }} data={chartData}>
                    <CartesianGrid />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip
                        separator=": "
                        contentStyle={{
                            color: theme.palette.primary.main,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 4
                        }}
                    />
                    <Line dataKey="Course" stroke={theme.palette.primary.main} />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    ) : (
        <Typography sx={{ mt: 2 }}>Возникла ошибка или данные отсутствуют.</Typography>
    );
};

CourseDynamicsScreenChart.propTypes = {
    chartData: PropTypes.array
};

export default CourseDynamicsScreenChart;

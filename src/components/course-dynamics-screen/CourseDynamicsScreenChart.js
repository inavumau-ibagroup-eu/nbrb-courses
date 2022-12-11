import { useTheme } from '@emotion/react';
import { Collapse, Fade, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
    Brush,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';

const CourseDynamicsScreenChart = ({ chartData }) => {
    const theme = useTheme();

    const defaultAxisProps = {
        tickMargin: 6,
        axisLine: { stroke: theme.palette.text.primary },
        tick: { fill: theme.palette.text.primary },
        tickLine: false
    };

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload?.length) {
            return (
                <Fade in={active}>
                    <Paper
                        sx={{
                            borderRadius: 1,
                            px: 2,
                            py: 1
                        }}
                        elevation={3}
                    >
                        <Typography>{label}</Typography>
                        <Typography>{`Курс: ${payload[0].value}`}</Typography>
                    </Paper>
                </Fade>
            );
        }

        return null;
    };

    return (
        <Collapse in={chartData?.length >= 0}>
            <ErrorWrapper isError={chartData?.length === 0}>
                <Paper sx={{ mt: 2 }} elevation={3}>
                    <ResponsiveContainer width="99%" height={400}>
                        <LineChart margin={{ top: 30, bottom: 30, right: 30 }} data={chartData}>
                            <CartesianGrid strokeOpacity={0.2} />
                            <XAxis
                                {...defaultAxisProps}
                                interval="preserveStartEnd"
                                dataKey="date"
                                height={35}
                            />
                            <YAxis {...defaultAxisProps} domain={['auto', 'auto']} />
                            <Tooltip cursor={false} content={customTooltip} />
                            <Line
                                type="monotone"
                                dataKey="course"
                                strokeWidth={2}
                                dot={{ fill: theme.palette.primary.main }}
                                activeDot={{ stroke: theme.palette.primary.main, strokeWidth: 4 }}
                                stroke={theme.palette.primary.main}
                            />
                            <Brush
                                tickFormatter={() => null}
                                height={30}
                                stroke={theme.palette.primary.main}
                                fill={theme.palette.background.paper}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </ErrorWrapper>
        </Collapse>
    );
};

CourseDynamicsScreenChart.propTypes = {
    chartData: PropTypes.array
};

export default CourseDynamicsScreenChart;

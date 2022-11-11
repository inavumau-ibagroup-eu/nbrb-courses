import { useEffect, useState } from 'react';
import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CoursesScreen from '../components/courses-screen/CoursesScreen';
import CourseDynamicsScreen from '../components/course-dynamics-screen/CourseDynamicsScreen';
import useQuery from '../hooks/useQuery';
import ConverterScreen from '../components/converter-screen/ConverterScreen';

const defaultSceensValues = {
    courses: ['coursesDate'],
    dynamics: ['from', 'to', 'currency'],
    converter: ['firstValue', 'secondValue', 'firstCurrency', 'secondCurrency']
};

const MainPage = () => {
    const [screens, setScreens] = useState([]);
    const navigate = useNavigate();
    const query = useQuery();

    useEffect(
        () =>
            setScreens(
                Object.keys(defaultSceensValues).reduce(
                    (acc, screen) => (query.has(screen) ? [...acc, screen] : acc),
                    []
                )
            ),
        [query]
    );

    const deleteValues = screen => {
        query.delete(screen);
        defaultSceensValues[screen].forEach(item => query.delete(item));
    };

    const handleScreens = (event, newScreens) => {
        Object.keys(defaultSceensValues).forEach(screen =>
            newScreens.indexOf(screen) !== -1 ? query.set(screen, 'display') : deleteValues(screen)
        );
        navigate({ search: query.toString() });
    };

    return (
        <Box
            sx={{
                minWidth: '50%',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                mb: 2
            }}
        >
            <Paper sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <ToggleButtonGroup
                    sx={{ p: 2 }}
                    color="primary"
                    value={screens}
                    onChange={handleScreens}
                >
                    <ToggleButton value="courses">Курсы НБРБ</ToggleButton>
                    <ToggleButton value="dynamics">Динамика курса</ToggleButton>
                    <ToggleButton value="converter">Конвертер валют</ToggleButton>
                </ToggleButtonGroup>
            </Paper>
            <CoursesScreen display={query.has('courses')} />
            <CourseDynamicsScreen display={query.has('dynamics')} />
            <ConverterScreen display={query.has('converter')} />
        </Box>
    );
};

export default MainPage;

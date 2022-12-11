import { useContext, useEffect, useState } from 'react';
import { Box, Paper, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import CoursesScreen from '../components/courses-screen/CoursesScreen';
import CourseDynamicsScreen from '../components/course-dynamics-screen/CourseDynamicsScreen';
import useQuery from '../hooks/useQuery';
import ConverterScreen from '../components/converter-screen/ConverterScreen';
import ThemeContext from '../components/mui-theme-context/MuiThemeContext';

const defaultSceensValues = {
    courses: ['coursesDate'],
    dynamics: ['from', 'to', 'currency'],
    converter: ['firstValue', 'secondValue', 'firstCurrency', 'secondCurrency']
};

const MainPage = () => {
    const [screens, setScreens] = useState([]);
    const navigate = useNavigate();
    const query = useQuery();
    const { toggleDarkTheme } = useContext(ThemeContext);
    const theme = useTheme();

    useEffect(
        () =>
            setScreens(
                Object.keys(defaultSceensValues).reduce((acc, screen) => {
                    if (query.has(screen)) {
                        acc.push(screen);
                    }
                    return acc;
                }, [])
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
                minWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                mb: 2
            }}
        >
            <Paper
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    minWidth: 322,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                }}
            >
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
                <Tooltip title="Переключение темной/светлой темы">
                    <ToggleButton
                        sx={{ m: 2, ml: 'auto' }}
                        value="change"
                        onClick={toggleDarkTheme}
                    >
                        {theme.palette.mode === 'dark' ? <Brightness4 /> : <Brightness7 />}
                    </ToggleButton>
                </Tooltip>
            </Paper>
            <CoursesScreen />
            <CourseDynamicsScreen />
            <ConverterScreen />
        </Box>
    );
};

export default MainPage;

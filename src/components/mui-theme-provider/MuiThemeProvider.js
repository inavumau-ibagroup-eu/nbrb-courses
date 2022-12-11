import PropTypes from 'prop-types';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';
import ThemeContext from '../mui-theme-context/MuiThemeContext';
import themePalette from '../../themePalette';

const MuiThemeProvider = ({ children }) => {
    const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');
    const userDarkMode = localStorage.getItem('dark-mode');
    const [darkTheme, setDarkTheme] = useState(
        userDarkMode ? userDarkMode === 'true' : prefersDarkScheme
    );

    const darkMode = useMemo(
        () => ({
            toggleDarkTheme: () => {
                localStorage.setItem('dark-mode', !darkTheme);
                setDarkTheme(!darkTheme);
            }
        }),
        [darkTheme]
    );

    const theme = useMemo(() => createTheme(themePalette(darkTheme)), [darkTheme]);

    return (
        <ThemeContext.Provider value={darkMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

MuiThemeProvider.propTypes = {
    children: PropTypes.any
};

export default MuiThemeProvider;

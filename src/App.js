import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import darkTheme from './theme';
import MainPage from './pages/MainPage';

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline enableColorScheme />
            <BrowserRouter>
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'background.default'
                    }}
                >
                    <MainPage />
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

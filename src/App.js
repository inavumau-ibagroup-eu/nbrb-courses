import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from './components/mui-theme-provider/MuiThemeProvider';

import MainPage from './pages/MainPage';

const App = () => {
    return (
        <MuiThemeProvider>
            <BrowserRouter>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'background.default'
                    }}
                >
                    <MainPage />
                </Box>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};

export default App;

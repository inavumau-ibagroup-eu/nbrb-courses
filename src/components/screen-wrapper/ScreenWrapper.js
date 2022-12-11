import PropTypes from 'prop-types';
import { Collapse, Paper, Typography } from '@mui/material';

const ScreenWrapper = ({ display, header, children }) => {
    return (
        <Collapse in={display}>
            <Paper
                sx={{
                    p: 2,
                    mt: 2,
                    flexDirection: 'column',
                    minWidth: 322
                }}
            >
                {header && (
                    <Typography variant="h5" sx={{ pb: 2.5 }}>
                        {header}
                    </Typography>
                )}
                {children}
            </Paper>
        </Collapse>
    );
};

ScreenWrapper.propTypes = {
    display: PropTypes.bool,
    header: PropTypes.string,
    children: PropTypes.any
};

export default ScreenWrapper;

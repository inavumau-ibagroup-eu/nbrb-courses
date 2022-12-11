import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const ErrorWrapper = ({ isError, children }) => {
    return isError ? (
        <Typography sx={{ mt: 2 }}>Возникла ошибка или данные отсутствуют.</Typography>
    ) : (
        children
    );
};

ErrorWrapper.propTypes = {
    isError: PropTypes.bool,
    children: PropTypes.any
};

export default ErrorWrapper;

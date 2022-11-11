import { ErrorOutlineOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const ShareButton = ({ showMessage, onCloseMessage, onShare }) => (
    <Box sx={{ mt: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            open={showMessage}
            autoHideDuration={1300}
            onClose={onCloseMessage}
        >
            <Alert onClose={onCloseMessage} severity="success" sx={{ width: '100%' }}>
                Ссылка скопирована!
            </Alert>
        </Snackbar>
        <Button sx={{ py: 0.85, px: 2 }} variant="outlined" onClick={onShare}>
            Поделиться
        </Button>
        <Tooltip title={navigator.userAgent}>
            <ErrorOutlineOutlined color="disabled" />
        </Tooltip>
    </Box>
);

ShareButton.propTypes = {
    showMessage: PropTypes.bool,
    onCloseMessage: PropTypes.func,
    onShare: PropTypes.func
};

export default ShareButton;

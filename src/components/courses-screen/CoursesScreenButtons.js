import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

const CoursesScreenButtons = ({ dateValue, onChangeDate, onLoad, disabledLoad }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: 2
        }}
    >
        <TextField
            sx={{ colorScheme: 'dark' }}
            label="Выберите дату"
            InputLabelProps={{ shrink: true }}
            type="date"
            size="small"
            value={dateValue}
            onChange={onChangeDate}
            error={disabledLoad}
            inputProps={{
                max: moment().format('YYYY-MM-DD')
            }}
        />
        <Button
            sx={{ py: 0.85, px: 2 }}
            variant="outlined"
            disabled={!dateValue || disabledLoad}
            onClick={() => onLoad(dateValue)}
        >
            Загрузить
        </Button>
    </Box>
);

CoursesScreenButtons.propTypes = {
    dateValue: PropTypes.string,
    onChangeDate: PropTypes.func,
    onLoad: PropTypes.func,
    disabledLoad: PropTypes.bool
};

export default CoursesScreenButtons;

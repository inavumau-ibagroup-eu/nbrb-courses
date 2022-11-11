import { Box, Button, MenuItem, TextField } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

const dateFieldProps = {
    size: 'small',
    type: 'date',
    sx: { colorScheme: 'dark' },
    InputLabelProps: { shrink: true }
};

const selectProps = {
    sx: { width: 100 },
    SelectProps: {
        MenuProps: {
            sx: {
                maxHeight: 300
            }
        }
    },
    label: 'Валюта',
    size: 'small',
    select: true
};

const CourseDynamicsScreenButtons = ({
    dynamicsValues,
    currenciesOptions,
    onChangeFromValue,
    onChangeToValue,
    onChangeCurrency,
    onLoad,
    disabledLoad
}) => {
    const currentCurrencyExist = () =>
        currenciesOptions.find(item => item.Cur_ID === dynamicsValues.currency);

    const dateNotValid = value =>
        moment(value, 'YYYY-MM-DD').isAfter(moment()) ||
        moment(value, 'YYYY-MM-DD').isBefore(moment('1995-04-01'));

    const onLoadChart = () =>
        onLoad(dynamicsValues.from, dynamicsValues.to, dynamicsValues.currency);

    return (
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
                {...dateFieldProps}
                label="C"
                value={dynamicsValues.from}
                error={
                    dateNotValid(dynamicsValues.from) ||
                    moment(dynamicsValues.from, 'YYYY-MM-DD').isAfter(
                        moment(dynamicsValues.to, 'YYYY-MM-DD')
                    )
                }
                onChange={onChangeFromValue}
                inputProps={{
                    min: moment('1995-04-01').format('YYYY-MM-DD'),
                    max: dynamicsValues.to || moment().format('YYYY-MM-DD')
                }}
            />
            <TextField
                {...dateFieldProps}
                label="По"
                value={dynamicsValues.to}
                error={dateNotValid(dynamicsValues.to)}
                onChange={onChangeToValue}
                inputProps={{
                    min: moment('1995-04-01').format('YYYY-MM-DD'),
                    max: moment().format('YYYY-MM-DD')
                }}
            />
            <TextField
                {...selectProps}
                disabled={
                    currenciesOptions.length === 0 ||
                    disabledLoad ||
                    dateNotValid(dynamicsValues.to)
                }
                value={currentCurrencyExist() ? dynamicsValues.currency : ''}
                onChange={onChangeCurrency}
            >
                {currenciesOptions.map(item => (
                    <MenuItem key={item.Cur_ID} value={item.Cur_ID}>
                        {item.Cur_Abbreviation}
                    </MenuItem>
                ))}
            </TextField>
            <Button
                disabled={disabledLoad || !currentCurrencyExist()}
                sx={{ py: 0.85, px: 2 }}
                variant="outlined"
                onClick={onLoadChart}
            >
                Загрузить
            </Button>
        </Box>
    );
};

CourseDynamicsScreenButtons.propTypes = {
    dynamicsValues: PropTypes.object,
    currenciesOptions: PropTypes.array,
    onChangeFromValue: PropTypes.func,
    onChangeToValue: PropTypes.func,
    onChangeCurrency: PropTypes.func,
    onLoad: PropTypes.func,
    disabledLoad: PropTypes.bool
};

export default CourseDynamicsScreenButtons;

import { Box, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const boxesStyle = { display: 'flex', gap: 2, flexWrap: 'wrap' };

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

const fieldProps = {
    label: 'Сумма',
    type: 'number',
    size: 'small'
};

const ConverterScreenButtons = ({
    converterValues,
    currencies,
    onChangeFirstValue,
    onChangeSecondValue,
    onChangeFirstCurrency,
    onChangeSecondCurrency
}) => {
    const selectOptions = () =>
        currencies?.map(item => (
            <MenuItem
                key={item.Cur_Abbreviation}
                value={item.Cur_Abbreviation}
                disabled={
                    converterValues.firstCurrency === item.Cur_Abbreviation ||
                    converterValues.secondCurrency === item.Cur_Abbreviation
                }
            >
                {item.Cur_Abbreviation}
            </MenuItem>
        ));

    const onKeyDown = event => {
        if (/[^\d,.]/.test(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Box sx={boxesStyle}>
                <TextField
                    {...fieldProps}
                    value={converterValues.firstValue}
                    onKeyDown={onKeyDown}
                    onChange={onChangeFirstValue}
                />
                <TextField
                    {...selectProps}
                    value={converterValues.firstCurrency}
                    disabled={currencies?.length === 0}
                    onChange={onChangeFirstCurrency}
                >
                    {selectOptions()}
                </TextField>
            </Box>
            <Box sx={boxesStyle}>
                <TextField
                    {...fieldProps}
                    value={converterValues.secondValue}
                    onKeyDown={onKeyDown}
                    onChange={onChangeSecondValue}
                />
                <TextField
                    {...selectProps}
                    value={converterValues.secondCurrency}
                    disabled={currencies?.length === 0}
                    onChange={onChangeSecondCurrency}
                >
                    {selectOptions()}
                </TextField>
            </Box>
        </Box>
    );
};

ConverterScreenButtons.propTypes = {
    converterValues: PropTypes.object,
    currencies: PropTypes.array,
    onChangeFirstValue: PropTypes.func,
    onChangeSecondValue: PropTypes.func,
    onChangeFirstCurrency: PropTypes.func,
    onChangeSecondCurrency: PropTypes.func
};

export default ConverterScreenButtons;

import { Box, Collapse, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useQuery from '../../hooks/useQuery';
import ConverterScreenButtons from './ConverterScreenButtons';
import ShareButton from '../share-button/ShareButtonWithInfo';
import { getRates } from '../../api/coursesApi';

const ConverterScreen = ({ display }) => {
    const [values, setValues] = useState({
        firstValue: '',
        secondValue: '',
        firstCurrency: '',
        secondCurrency: ''
    });
    const [currencies, setCurrencies] = useState([]);
    const [toast, setToast] = useState(false);
    const query = useQuery();

    const onFetch = () => {
        getRates().then(
            response => {
                setCurrencies([
                    { Cur_Abbreviation: 'BYN', Cur_OfficialRate: 1, Cur_Scale: 1 },
                    ...response.data
                ]);
                const valuesKeys = Object.keys(values);
                if (valuesKeys.some(item => query.has(item))) {
                    setValues(prevState =>
                        valuesKeys.reduce(
                            (acc, value) => ({
                                ...acc,
                                [value]: query.get(value) || prevState[value]
                            }),
                            {}
                        )
                    );
                }
            },
            () => setCurrencies(null)
        );
    };

    useEffect(() => {
        if (display) {
            onFetch();
        }
    }, [display]);

    const calculateValue = (value, firstCur, secondCur) => {
        const fromCur = currencies.find(item => item.Cur_Abbreviation === firstCur);
        const toCur = currencies.find(item => item.Cur_Abbreviation === secondCur);
        return (
            Math.ceil(
                ((value * toCur.Cur_Scale * fromCur.Cur_OfficialRate) /
                    (fromCur.Cur_Scale * toCur.Cur_OfficialRate)) *
                    100
            ) / 100
        );
    };

    const onChangeFirstValue = event =>
        setValues(prevValue => ({
            ...prevValue,
            firstValue: event.target.value,
            secondValue:
                prevValue.firstCurrency && prevValue.secondCurrency
                    ? calculateValue(
                          event.target.value,
                          prevValue.firstCurrency,
                          prevValue.secondCurrency
                      )
                    : event.target.value
        }));

    const onChangeSecondValue = event =>
        setValues(prevValue => ({
            ...prevValue,
            firstValue:
                prevValue.firstCurrency && prevValue.secondCurrency
                    ? calculateValue(
                          event.target.value,
                          prevValue.secondCurrency,
                          prevValue.firstCurrency
                      )
                    : event.target.value,
            secondValue: event.target.value
        }));

    const onChangeFirstCurrency = event =>
        setValues(prevValue => ({
            ...prevValue,
            firstCurrency: event.target.value,
            secondValue: prevValue.secondCurrency
                ? calculateValue(prevValue.firstValue, event.target.value, prevValue.secondCurrency)
                : prevValue.secondValue
        }));

    const onChangeSecondCurrency = event =>
        setValues(prevValue => ({
            ...prevValue,
            secondCurrency: event.target.value,
            firstValue: prevValue.firstCurrency
                ? calculateValue(prevValue.secondValue, event.target.value, prevValue.firstCurrency)
                : prevValue.firstValue
        }));

    const onShare = () => {
        const shareSearch = new URLSearchParams();
        shareSearch.append('converter', 'display');
        Object.entries(values).forEach(item => item[1] && shareSearch.append(item[0], item[1]));
        navigator.clipboard
            .writeText(`${window.location.origin}/?${shareSearch.toString()}`)
            .then(setToast(true));
    };

    const onCloseToast = () => setToast(false);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={display}>
                <Paper
                    sx={{
                        p: 2,
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {currencies !== null ? (
                        <ConverterScreenButtons
                            converterValues={values}
                            currencies={currencies}
                            onChangeFirstValue={onChangeFirstValue}
                            onChangeSecondValue={onChangeSecondValue}
                            onChangeFirstCurrency={onChangeFirstCurrency}
                            onChangeSecondCurrency={onChangeSecondCurrency}
                        />
                    ) : (
                        <Typography>Возникла ошибка или данные отсутствуют.</Typography>
                    )}
                    <ShareButton
                        showMessage={toast}
                        onCloseMessage={onCloseToast}
                        onShare={onShare}
                    />
                </Paper>
            </Collapse>
        </Box>
    );
};

ConverterScreen.propTypes = {
    display: PropTypes.bool
};

export default ConverterScreen;

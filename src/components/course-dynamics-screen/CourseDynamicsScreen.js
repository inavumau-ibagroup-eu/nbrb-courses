import { Box, Collapse, Paper } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

import useQuery from '../../hooks/useQuery';
import { getDynamics, getRates } from '../../api/coursesApi';
import ShareButton from '../share-button/ShareButtonWithInfo';
import CourseDynamicsScreenButtons from './CourseDynamicsScreenButtons';
import CourseDynamicsScreenChart from './CourseDynamicsScreenChart';

const CourseDynamicsScreen = () => {
    const [values, setValues] = useState({
        from: moment().subtract(7, 'd').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
        currency: 431
    });
    const [currenciesOptions, setCurrencies] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [toast, setToast] = useState(false);
    const query = useQuery();

    const disabledLoad = (from, to) =>
        !moment(from).isValid() ||
        !moment(to).isValid() ||
        moment(from, 'YYYY-MM-DD').isAfter(moment(to, 'YYYY-MM-DD'));

    const onFetchDynamics = (from, to, id) => {
        if (!disabledLoad(from, to) || !values.currency)
            getDynamics(from, to, id).then(
                response =>
                    setChartData(
                        response.data.map(item => ({
                            Date: moment(item.Date).format('DD-MM-YYYY'),
                            Course: item.Cur_OfficialRate
                        }))
                    ),
                () => setChartData([])
            );
    };

    const onFetchCurrency = currency => {
        const currDate = moment(currency, 'YYYY-MM-DD');
        if (currDate.isBefore(moment()) && currDate.isAfter(moment('1995-03-31')))
            getRates(currency).then(
                response => {
                    setCurrencies(response.data);
                },
                () => setCurrencies([])
            );
    };

    useEffect(() => {
        if (query.has('dynamics')) {
            const valuesKeys = Object.keys(values);
            if (valuesKeys.some(item => query.has(item))) {
                const searchValues = valuesKeys.reduce(
                    (acc, value) => ({ ...acc, [value]: query.get(value) || values[value] }),
                    {}
                );
                setValues({ ...searchValues, currency: Number(searchValues.currency) });
                onFetchCurrency(searchValues.from);
                onFetchDynamics(searchValues.from, searchValues.to, searchValues.currency);
            } else {
                onFetchCurrency(values.from);
                onFetchDynamics(values.from, values.to, values.currency);
            }
        }
    }, [query]);

    useEffect(() => {
        if (query.has('dynamics') && currenciesOptions.length !== 0) {
            const currentCurrencyExist = currenciesOptions.find(
                item => item.Cur_ID === values.currency
            );
            if (!currentCurrencyExist) {
                setValues(prevState => ({ ...prevState, currency: '' }));
            }
        }
    }, [currenciesOptions]);

    const onChangeFromValue = event => {
        onFetchCurrency(event.target.value);
        setValues(prevState => ({ ...prevState, from: event.target.value }));
    };

    const onChangeToValue = event =>
        setValues(prevState => ({ ...prevState, to: event.target.value }));

    const onChangeCurrency = event =>
        setValues(prevState => ({ ...prevState, currency: event.target.value }));

    const onShare = () => {
        const shareSearch = new URLSearchParams();
        shareSearch.append('dynamics', 'display');
        Object.entries(values).forEach(item => item[1] && shareSearch.append(item[0], item[1]));
        navigator.clipboard
            .writeText(`${window.location.origin}/?${shareSearch.toString()}`)
            .then(setToast(true));
    };

    const onCloseToast = () => setToast(false);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={query.has('dynamics')}>
                <Paper
                    sx={{
                        p: 2,
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    elevation={2}
                >
                    <CourseDynamicsScreenButtons
                        dynamicsValues={values}
                        currenciesOptions={currenciesOptions}
                        onChangeFromValue={onChangeFromValue}
                        onChangeToValue={onChangeToValue}
                        onChangeCurrency={onChangeCurrency}
                        onLoad={onFetchDynamics}
                        disabledLoad={disabledLoad(values.from, values.to)}
                    />
                    <Collapse in={chartData?.length >= 0}>
                        <CourseDynamicsScreenChart chartData={chartData} />
                    </Collapse>
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

export default CourseDynamicsScreen;

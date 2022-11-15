import { Box, Collapse, Paper } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

import useQuery from '../../hooks/useQuery';
import { getDynamics, getRates } from '../../api/coursesApi';
import ShareButton from '../share-button/ShareButtonWithInfo';
import CourseDynamicsScreenButtons from './CourseDynamicsScreenButtons';
import CourseDynamicsScreenChart from './CourseDynamicsScreenChart';

const CourseDynamicsScreen = () => {
    const [values, setValues] = useState({ from: '', to: '', currency: null });
    const [currenciesOptions, setCurrencies] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [toast, setToast] = useState(false);
    const query = useQuery();

    const disabledLoad = (from, to) =>
        !from || !to || moment(from, 'YYYY-MM-DD').isAfter(moment(to, 'YYYY-MM-DD'));

    const onFetchDynamics = (from, to, id) =>
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

    const onFetchCurrency = currency =>
        getRates(currency).then(
            response => {
                setCurrencies(response.data);
                if (query.has('currency') && query.has('dynamics')) {
                    setValues(prevValue => ({
                        ...prevValue,
                        currency: Number(query.get('currency'))
                    }));
                }
            },
            () => setCurrencies([])
        );

    useEffect(() => {
        if (query.has('dynamics')) {
            if (Object.keys(values).some(item => query.has(item))) {
                const searchValues = Object.keys(values).reduce(
                    (acc, value) => ({ ...acc, [value]: query.get(value) }),
                    {}
                );
                setValues(prevValue => ({
                    from: searchValues.from || prevValue.from,
                    to: searchValues.to || prevValue.to
                }));
                if (searchValues.from) {
                    onFetchCurrency(searchValues.from);
                }
                if (searchValues.currency && !disabledLoad(searchValues.from, searchValues.to)) {
                    onFetchDynamics(searchValues.from, searchValues.to, searchValues.currency);
                }
            }
        }
    }, [query]);

    const onChangeFromValue = event => {
        const currentValue = event.target.value;
        const currDate = moment(currentValue, 'YYYY-MM-DD');
        setValues(prevState => ({ ...prevState, from: currentValue }));
        if (currDate.isBefore(moment()) && currDate.isAfter(moment('1995-03-31'))) {
            onFetchCurrency(currentValue);
        }
    };

    const onChangeToValue = event =>
        setValues(prevState => ({ ...prevState, to: event.target.value }));

    const onChangeCurrency = event =>
        setValues(prevValue => ({ ...prevValue, currency: event.target.value }));

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

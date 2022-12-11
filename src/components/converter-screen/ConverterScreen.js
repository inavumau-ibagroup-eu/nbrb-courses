import { useEffect, useState } from 'react';

import useQuery from '../../hooks/useQuery';
import ConverterScreenButtons from './ConverterScreenButtons';
import ShareButton from '../share-button/ShareButtonWithInfo';
import { getRates } from '../../api/coursesApi';
import ScreenWrapper from '../screen-wrapper/ScreenWrapper';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';

const ConverterScreen = () => {
    const [values, setValues] = useState({
        firstValue: 0,
        secondValue: 0,
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
            },
            () => setCurrencies(null)
        );
    };

    useEffect(() => {
        if (query.has('converter')) {
            onFetch();
        }
    }, [query]);

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

    useEffect(() => {
        if (query.has('converter') && currencies?.length > 0) {
            const valuesKeys = Object.keys(values);
            if (valuesKeys.some(item => query.has(item))) {
                setValues(prevState =>
                    valuesKeys.reduce(
                        (acc, value) => ({ ...acc, [value]: query.get(value) || prevState[value] }),
                        {}
                    )
                );
            } else {
                setValues(prevState => ({
                    ...prevState,
                    firstValue: 1,
                    secondValue: calculateValue(1, 'USD', 'BYN'),
                    firstCurrency: 'USD',
                    secondCurrency: 'BYN'
                }));
            }
        }
    }, [query, currencies?.length]);

    const onChangeFirstValue = event =>
        setValues(prevState => ({
            ...prevState,
            firstValue: event.target.value,
            secondValue:
                prevState.firstCurrency && prevState.secondCurrency
                    ? calculateValue(
                          event.target.value,
                          prevState.firstCurrency,
                          prevState.secondCurrency
                      )
                    : event.target.value
        }));

    const onChangeSecondValue = event =>
        setValues(prevState => ({
            ...prevState,
            firstValue:
                prevState.firstCurrency && prevState.secondCurrency
                    ? calculateValue(
                          event.target.value,
                          prevState.secondCurrency,
                          prevState.firstCurrency
                      )
                    : event.target.value,
            secondValue: event.target.value
        }));

    const onChangeFirstCurrency = event =>
        setValues(prevState => ({
            ...prevState,
            firstCurrency: event.target.value,
            secondValue: prevState.secondCurrency
                ? calculateValue(prevState.firstValue, event.target.value, prevState.secondCurrency)
                : prevState.secondValue
        }));

    const onChangeSecondCurrency = event =>
        setValues(prevState => ({
            ...prevState,
            secondCurrency: event.target.value,
            firstValue: prevState.firstCurrency
                ? calculateValue(prevState.secondValue, event.target.value, prevState.firstCurrency)
                : prevState.firstValue
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
        <ScreenWrapper display={query.has('converter')} header="Конвертер валют">
            <ErrorWrapper isError={currencies === null}>
                <ConverterScreenButtons
                    converterValues={values}
                    currencies={currencies}
                    onChangeFirstValue={onChangeFirstValue}
                    onChangeSecondValue={onChangeSecondValue}
                    onChangeFirstCurrency={onChangeFirstCurrency}
                    onChangeSecondCurrency={onChangeSecondCurrency}
                />
            </ErrorWrapper>
            <ShareButton showMessage={toast} onCloseMessage={onCloseToast} onShare={onShare} />
        </ScreenWrapper>
    );
};

export default ConverterScreen;

import moment from 'moment';
import { useEffect, useState } from 'react';

import useQuery from '../../hooks/useQuery';
import CoursesScreenTable from './CoursesScreenTable';
import CoursesScreenButtons from './CoursesScreenButtons';
import ShareButton from '../share-button/ShareButtonWithInfo';
import { getRates } from '../../api/coursesApi';
import ScreenWrapper from '../screen-wrapper/ScreenWrapper';

const CoursesScreen = () => {
    const [value, setValue] = useState(moment().format('YYYY-MM-DD'));
    const [courses, setCourses] = useState(null);
    const [toast, setToast] = useState(false);
    const query = useQuery();

    const disabledLoad = () => moment(value, 'YYYY-MM-DD').isAfter(moment());

    const onFetch = currency => {
        getRates(currency).then(
            response => setCourses(response.data),
            () => setCourses([])
        );
    };

    useEffect(() => {
        if (query.has('courses')) {
            if (query.has('coursesDate')) {
                const currentValue = query.get('coursesDate');
                setValue(currentValue);
                onFetch(currentValue);
            } else {
                onFetch(value);
            }
        }
    }, [query]);

    const onChangeValue = event => setValue(event.target.value);

    const onShare = () => {
        const shareSearch = new URLSearchParams();
        shareSearch.append('courses', 'display');
        if (value) {
            shareSearch.append('coursesDate', value);
        }
        navigator.clipboard
            .writeText(`${window.location.origin}/?${shareSearch.toString()}`)
            .then(setToast(true));
    };

    const onCloseToast = () => setToast(false);

    return (
        <ScreenWrapper display={query.has('courses')} header="Курсы валют Нац. Банка РБ">
            <CoursesScreenButtons
                dateValue={value}
                onChangeDate={onChangeValue}
                onLoad={onFetch}
                disabledLoad={disabledLoad()}
            />
            <CoursesScreenTable coursesData={courses} />
            <ShareButton showMessage={toast} onCloseMessage={onCloseToast} onShare={onShare} />
        </ScreenWrapper>
    );
};

export default CoursesScreen;

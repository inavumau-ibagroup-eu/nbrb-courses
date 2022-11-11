import { Box, Collapse, Paper } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useQuery from '../../hooks/useQuery';
import CoursesScreenTable from './CoursesScreenTable';
import CoursesScreenButtons from './CoursesScreenButtons';
import ShareButton from '../share-button/ShareButtonWithInfo';
import { getRates } from '../../api/coursesApi';

const CoursesScreen = ({ display }) => {
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
        if (display) {
            if (query.has('coursesDate')) {
                const currentValue = query.get('coursesDate');
                setValue(currentValue);
                onFetch(currentValue);
            }
        }
    }, [display]);

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
                    <CoursesScreenButtons
                        dateValue={value}
                        onChangeDate={onChangeValue}
                        onLoad={onFetch}
                        disabledLoad={disabledLoad()}
                    />
                    <Collapse in={courses?.length >= 0}>
                        <CoursesScreenTable coursesData={courses} />
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

CoursesScreen.propTypes = {
    display: PropTypes.bool
};

export default CoursesScreen;

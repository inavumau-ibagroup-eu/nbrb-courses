import { Collapse, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';

const coursesHeader = ['Валюта', 'Код', 'Курс', 'Единиц'];

const CorusesScreenTable = ({ coursesData }) => (
    <Collapse in={coursesData?.length >= 0}>
        <ErrorWrapper isError={coursesData?.length === 0}>
            <Paper
                sx={{ maxHeight: '50vh', minHeight: 200, overflowY: 'auto', mt: 2 }}
                elevation={3}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {coursesHeader.map(item => (
                                <TableCell key={item} sx={{ backgroundColor: 'background.paper' }}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coursesData?.map(item => (
                            <TableRow key={item.Cur_ID}>
                                <TableCell>{item.Cur_Name}</TableCell>
                                <TableCell>{item.Cur_Abbreviation}</TableCell>
                                <TableCell>{item.Cur_OfficialRate}</TableCell>
                                <TableCell>{item.Cur_Scale}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </ErrorWrapper>
    </Collapse>
);

CorusesScreenTable.propTypes = {
    coursesData: PropTypes.array
};

export default CorusesScreenTable;

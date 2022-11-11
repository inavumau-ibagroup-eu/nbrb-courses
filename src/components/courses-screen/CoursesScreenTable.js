import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const coursesHeader = ['Валюта', 'Код', 'Курс', 'Единиц'];

const CorusesScreenTable = ({ coursesData }) =>
    coursesData?.length > 0 ? (
        <Paper sx={{ maxHeight: '50vh', overflowY: 'auto', mt: 2 }} elevation={3}>
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
    ) : (
        <Typography sx={{ mt: 2 }}>Возникла ошибка или данные отсутствуют.</Typography>
    );

CorusesScreenTable.propTypes = {
    coursesData: PropTypes.array
};

export default CorusesScreenTable;

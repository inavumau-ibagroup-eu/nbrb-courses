import axios from 'axios';

export const getRates = currency =>
    axios(`https://www.nbrb.by/api/exrates/rates?ondate=${currency}&periodicity=0`);

export const getDynamics = (from, to, id) =>
    axios(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${id}
    ?startDate=${from}&endDate=${to}`);

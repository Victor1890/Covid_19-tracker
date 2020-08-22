import axios from 'axios';

const url = `https://covid19.mathdro.id/api`;

export const fetchData = async(country) => {

    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }

    const { data } = await axios.get(changeableUrl)
    .catch(error => console.log(`${error}`));

    const modifiedData = {
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        lastUpdate: data.lastUpdate
    };

    return modifiedData;
}

export const fetchDailyDate = async() => {
    const { data } = await axios.get(`${url}/daily`)
    .catch(e => console.log(e));
    
    const modifiedData = data.map((dailyData) =>
    ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate
    }));

    return modifiedData;
}

export const fetchDataCountries = async() =>{
    const { data: { countries } } = await axios.get(`${url}/countries`)
    .catch(e => console.log(e));

    console.log(countries)
    return countries.map(country => country.name);
}
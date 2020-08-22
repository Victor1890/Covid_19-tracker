import React, { Fragment, useEffect, useState } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import style from './App.module.css';

import { fetchData } from './services';

function App() {

  const [ data, setData ] = useState({});
  const [ country, setCountry ] = useState('');

  useEffect(() => {
    const GetDataGeneral = async() => {
      const data = await fetchData();
      setData(data);
    }
    GetDataGeneral();
  },[setData]);

  const handleCountryChange = async(country) => {
    const { value } = country.target;
    const _data = await fetchData(value);
    setCountry(value);
    setData(_data);
  }

  return (
    <Fragment>
      <div className={style.container}>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    </Fragment>
  );
}

export default App;

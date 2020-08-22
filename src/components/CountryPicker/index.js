import React, { Fragment, useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchDataCountries } from '../../services';
import style from './CountryPicker.module.css';

export default function CountryPicker({ handleCountryChange }) {

    const [ country, setCountry ] = useState([]);

    useEffect(() => {
        const getDataCountry = async() => {
            setCountry(await fetchDataCountries());
        }

        getDataCountry();
    },[setCountry]);

    
    return(
        <Fragment>
            <FormControl className={style.formControl}>
                <NativeSelect defaultValue='' onChange={handleCountryChange}>
                    <option value=''>Global</option>
                    {country.map((country, idx) => <option key={idx} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl>
        </Fragment>
    );
}
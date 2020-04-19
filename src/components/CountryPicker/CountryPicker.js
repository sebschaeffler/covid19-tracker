import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountries } from '../../infrastructure/api'
import { Typography } from '@material-ui/core'

const CountryPicker = ({ handleCountrySelect }) => {

  const [countries, setCountries] = useState([])

  /**
   * Memoize results.
   */
  const callFetch = useCallback(async () => {
    setCountries(await fetchCountries())
  }, [setCountries])

  useEffect(() => {
    callFetch()
  }, [callFetch])

  return (
    <Container>
      <Typography color='textSecondary'>Select a country: </Typography>
      <FormControl style={{ marginLeft: '25px' }}>
        <NativeSelect defaultValue='' onChange={e => handleCountrySelect(e.target.value)}>
          <option value=''>Global</option>
          {countries.length && countries.map((country, idx) => <option key={idx} value={country}>{country}</option>)}
        </NativeSelect>
      </FormControl>
    </Container>
  )
}

export default CountryPicker

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`
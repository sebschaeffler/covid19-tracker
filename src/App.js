import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Cards, Chart, CountryPicker } from './components'
import { fetchData } from './infrastructure/api'
import LogoImg from './assets/logo.png'
import { Typography } from '@material-ui/core'

const App = () => {

  const [data, setData] = useState({})
  const [country, setCountry] = useState('')

const handleCountrySelect = async (selectedCountry) => {
  setCountry(selectedCountry)
}

  /**
   * Memoize results.
   */
  const callFetch = useCallback(async() => {
    const res = await fetchData(country)
    setData(res)
  }, [setData, country])

  useEffect(() => {
    callFetch()
  }, [callFetch])

  return (
    <Container>
      <Logo />
      <Cards data={data} country={country} />
      <CountryPicker handleCountrySelect={handleCountrySelect} />
      <Chart data={data} country={country} />
      <Footer><Typography color='textSecondary'>Made by Bidispot, April 2020</Typography></Footer>
    </Container>
  )
}

export default App

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`

export const Logo = styled.div`
  background: url(${LogoImg}) no-repeat;
  background-size: 650px 225px;
  width: 650px;
  height: 225px;
`

export const Footer = styled.div`
  margin-top: 100px;
`
import axios from 'axios'

const URL = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
  let dynamicURL = URL

  if (country) {
    dynamicURL = `${URL}/countries/${country}`
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await  axios.get(dynamicURL)
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await  axios.get(`${URL}/daily`)
    return data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      reportDate: dailyData.reportDate
    }))
  } catch (error) {
    throw new Error(error)
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries }} = await axios.get(`${URL}/countries`)
    return countries.map(country => country.name)
  } catch (error) {
    throw new Error(error)
  }
}
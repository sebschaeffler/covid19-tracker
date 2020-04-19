import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { fetchDailyData } from '../../infrastructure/api'
import { Line, Bar } from 'react-chartjs-2'

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {

  // Array
  const [dailyData, setDailyData] = useState([])

  const buildLineChart = () => {
    if (!dailyData || !dailyData.length) return null

    return (
      <Line
        data={{
          labels: dailyData.map(({ reportDate }) => reportDate),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Confirmed cases',
            borderColor: '#333FF',
            fill: true
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            border: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true
          }],
        }}
      />
    )
  }

  const buildBarChart = () => {
    if (!country || !confirmed) return null

    return (
      <Bar
        data={{
          labels: ['Confirmed cases', 'Deaths', 'Recovered',],
          datasets: [{
            label: 'People',
            backgroundColor: [
              'rgba(0,0,255,0.5)',
              'rgba(255,0,0,0.5)',
              'rgba(0,255,0,0.5)',
            ],
            data: [confirmed.value, deaths.value, recovered.value]
          }]

        }}
        options={{
          legend: {display: false},
          title: {display: true, text:`Current state in ${country}`},
        }}
      />
    )
  }

  /**
   * Memoize results.
   */
  const callFetch = useCallback(async () => {
    setDailyData(await fetchDailyData())
  }, [setDailyData])

  useEffect(() => {
    callFetch()
  }, [callFetch])

  return (
    <Container>{country ? buildBarChart() : buildLineChart()}</Container>
  )
}

export default Chart

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 85%;
`
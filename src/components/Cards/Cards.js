import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'

export const TYPE = { INFECTED: 'INFECTED', RECOVERED: 'RECOVERED', DEATHS: 'DEATHS' }

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  
  if (!confirmed || !recovered || !deaths ||!lastUpdate) return null

  return (
    <Container>
      <Grid container spacing={3} justify="center">
        <GridWrapper item component={Card} xs={12} md={3} type={TYPE.INFECTED}>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>Confirmed cases</Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={confirmed.value} duration={1} separator={','} />
            </Typography>
            <br />
            <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
            <br />
            <Typography variant='body2'>Number of confirmed cases of Covid-19</Typography>
          </CardContent>
        </GridWrapper>
        <GridWrapper item component={Card} xs={12} md={3} type={TYPE.DEATHS}>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>Deaths</Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={deaths.value} duration={1} separator={','} />
            </Typography>
            <br />
            <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
            <br />
            <Typography variant='body2'>Number of deaths caused by Covid-19</Typography>
          </CardContent>
        </GridWrapper>
        <GridWrapper item component={Card} xs={12} md={3} type={TYPE.RECOVERED}>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>Recovered</Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={recovered.value} duration={1} separator={','} />
            </Typography>
            <br />
            <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
            <br />
            <Typography variant='body2'>Number of recovered cases of Covid-19</Typography>
          </CardContent>
        </GridWrapper>
      </Grid>
    </Container>
  )
}

Cards.propTypes = {
  data: PropTypes.any
}

Cards.defaultProps = {
  data: null
}

export default Cards

export const Container = styled.div`
  margin: 50px 0;
`

export const GridWrapper = styled(Grid)`
  margin: 0 2% !important;
  border: 1px solid ${props => props.type === TYPE.INFECTED ? 'rgba(0,0,255,0.2)' : props.type === TYPE.RECOVERED ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)'};
  border-bottom: 10px solid ${props => props.type === TYPE.INFECTED ? 'rgba(0,0,255,0.8)' : props.type === TYPE.RECOVERED ? 'rgba(0,255,0,0.8)' : 'rgba(255,0,0,0.8)'};
  border
`
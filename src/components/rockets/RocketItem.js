import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Skeleton,
} from '@mui/material';
import Time from '@mui/icons-material/AccessTime';
import moment from 'moment';

const RocketItem = (props) => {
  // const { props.loading } = props.loading;

  return (
    <Card
      sx={{ minHeight:'400px', Width: '100%', m:2, backgroundColor: '#1d1d1d' }}
    >
      <CardHeader
        sx={{ color: '#cececede' }}
        title={
          props.loading ? (
            <Skeleton animation="wave" height={30} width="80%" />
          ) : (
            <>
              <h5
                style={{
                  margin: '10px 0px 5px',
                }}
              >
                {props.mission}
              </h5>
            </>
          )
        }
        subheader={
          props.loading ? (
            <>
              <Skeleton
                sx={{ display: 'inline-flex', marginRight: '5px' }}
                variant="circular"
                width={20}
                height={20}
              />
              <Skeleton
                sx={{ display: 'inline-flex' }}
                animation="wave"
                height={20}
                width="30%"
              />
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: '#5b5b5b',
                fontSize: '.8rem',
              }}
            >
              <Time
                color="#c7c6c6!important"
                sx={{
                  marginRight: '3px',
                  color: '#5b5b5b!important',
                  fontSize: '1rem',
                }}
              />
              {moment(props.date,'YYYYMMDD').fromNow()}
            </div>
          )
        }
      />

      {props.loading ? (
        <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="200"
          image={props.thumb}
          alt="Paella dish"
        />
      )}

      <CardContent>
        {props.loading ? (
          <>
            <Skeleton
              sx={{ display: 'inline-flex', marginRight: '15px' }}
              animation="wave"
              height={25}
              width="calc(80% - 15px)"
            />
            <Skeleton
              sx={{ display: 'inline-flex', borderRadius: '10px' }}
              animation="wave"
              height={25}
              width="20%"
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: '#5b5b5b',
                fontSize: '.8rem',
              }}
            >
              <Typography
                sx={{ color: '#cececede', margin: '0px' }}
                variant="h6"
                component="h6"
              >
                {props.rocket}
              </Typography>
              <Chip
                sx={{
                  backgroundColor: '#4c6a84',
                  color: '#ffffff',
                  marginLeft: '10px',
                  padding: '1px 3px',
                  fontSize: '12px',
                }}
                label={`To: ${props.to}`}
                size="small"
              />
            </div>
            <Typography
              sx={{ color: '#cececede', marginTop: '10px' }}
              variant="body2"
              component="p"
            >
              {props.desc}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

RocketItem.propTypes = {
  loading: PropTypes.bool,
};

export default RocketItem;

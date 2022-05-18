import React from 'react';
import { useSelector } from 'react-redux';
// import { rocketsActions } from '../../store';

import Grid from '@mui/material/Grid';
import RocketItem from './RocketItem';


const RocketsList = (props) => {
  let content = '';
  const collection = useSelector(state => state.rockets.collection);
  // const collection = useSelector(state => state.rockets.collection);
  // console.log('LOADING...', props.loading);
  // console.log('COLLECTION: ', props.collection);


  props.loading ? (content = Array.from({ length: props.limit }, (v, k) => k++).map(
        (element, index) => {
          return (
            <Grid key={`m_${index}`} item xl={4} lg={4} md={4} sm={6} xs={12}>
              <RocketItem
                id=""
                mission=""
                thumb=""
                desc=""
                rocket=""
                // to={item.to}
                loading={props.loading}
                date=""
              />
            </Grid>
          );
        }
      ))
    : (content = collection.map((item, index) => {
        return (
          <Grid key={`m_${item.id}`} item xl={4} lg={4} md={4} sm={6} xs={12}>
            <RocketItem
              id={item.id}
              mission={item.mission}
              thumb={item.thumb}
              desc={item.desc}
              rocket={item.rocket}
              // to={item.to}
              loading={props.loading}
              date={item.date}
            />
          </Grid>
        );
      }));

  return (
    <Grid container wrap="wrap" width={'90vw'} minHeight={'60vh'}>
      {content}
    </Grid>
  );
};

export default RocketsList;

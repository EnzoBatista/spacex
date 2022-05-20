import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rocketsActions } from '../../store/index';
import useHttp from '../../hooks/use-http';
import RocketsList from './RocketsList';
import CustomPagination from './CustomPagination';
import Filters from './Filters';

const Rockets = () => {
  // console.log('ROCKET COMPONENT!!');

  const currentPage = useSelector(
    (state) => state.rockets.pagination.currentPage
  );
  const totalPages = useSelector(
    (state) => state.rockets.pagination.totalPages
  );

  const rockets = useSelector((state) => state.rockets);
  // const criterialWATCH = useSelector((state) => state.rockets.sortCriterial);

  const dispatch = useDispatch();

  // const sortHandler =async (criterial) => {
  //   console.log('CRITERIAL: ', criterial);
  //   await fetchRocketsHandler();
  //   dispatch(rocketsActions.changeSort({criterial}));
  //   // dispatch(rocketsActions.sort());
  // };

  const updateStore = useCallback(
    (collection, total) => {
      console.log('UPDATE: ',collection, total);
      dispatch(
        rocketsActions.fetch({
          collection: collection,
          total: total,
          offset:
            +rockets.pagination.limit * +rockets.pagination.currentPage -
            +rockets.pagination.limit,
          sortCriterial: +rockets.sortCriterial,
          pagination: {
            limit: +rockets.pagination.limit,
            currentPage: +rockets.pagination.currentPage,
            totalPages: +rockets.pagination.totalPages,
          },
        })
      );
    },
    [
      dispatch,
      rockets.pagination.currentPage,
      rockets.pagination.totalPages,
      rockets.pagination.limit,
      rockets.sortCriterial
    ]
  );


  // APPLY DATA FORMAT FOR FRONTEND
  const applyData = useCallback((data) => {
    let collection = [];
    const total = data.result.totalCount;
    const fetchedCollection = data.data;

    for (const key in fetchedCollection) {
      collection.push({
        id: fetchedCollection[key].id,
        mission: fetchedCollection[key].mission_name,
        desc: fetchedCollection[key].details,
        date: fetchedCollection[key].launch_date_local,
        rocket: fetchedCollection[key].rocket.rocket_name,
        thumb: fetchedCollection[key].links.mission_patch_small,
        video: fetchedCollection[key].links.video_link,
      });
    }
    updateStore(collection, total);

  }, [updateStore]);

  // HTTP REQUEST FETCH() CONFIG OBJECT
  const requestConfig = useMemo(() => {
    return {
      url: 'https://api.spacex.land/rest/launches-past-result',
      params: {
        offset: +rockets.offset,
        limit: rockets.pagination.limit,
        sort: 'launch_date_local',
        order: rockets.sortCriterial === 0 ? 'desc' : 'asc',
      },
    };
  }, [rockets.offset, rockets.pagination.limit, rockets.sortCriterial]);

  //HTTP REQUEST CUSTOM HOOK
  const {
    loading,
    error,
    sendRequest: fetchRocketsHandler,
  } = useHttp(requestConfig, applyData);

  //FETCH DATA ON FIRTS LOADING
  useEffect(() => {
    fetchRocketsHandler();
  }, [fetchRocketsHandler]);

  return (
    <>
      <Filters
        sort={rockets.sortCriterial}
        rockets={rockets.collection}
      />
      {error}
      <RocketsList
        loading={loading}
        limit={rockets.pagination.limit}
        collection={rockets.collection}
      />
      {totalPages > 0 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};
export default Rockets;

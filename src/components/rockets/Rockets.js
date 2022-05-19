import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rocketsActions } from '../../store/index';
import useHttp from '../../hooks/use-http';
import RocketsList from './RocketsList';
import CustomPagination from './CustomPagination';

const Rockets = () => {
  console.log('ROCKET COMPONENT!!');

  const currentPage = useSelector(
    (state) => state.rockets.pagination.currentPage
  );
  const totalPages = useSelector(
    (state) => state.rockets.pagination.totalPages
  );
  const rockets = useSelector((state) => state.rockets);

  const dispatch = useDispatch();
  
  const fetchHandler = (page) => {
    const prevState = JSON.parse(JSON.stringify(rockets));
    const newOffset =
      prevState.pagination.limit * page - prevState.pagination.limit;

    const newState = {
      ...prevState,
      offset: newOffset,
      pagination: {
        ...prevState.pagination,
        currentPage: page,
      },
    };
    // console.log({ prevState, newState });
    dispatch(rocketsActions.fetch(newState));
  };

  const applyData = useCallback(
    (data) => {
      console.log('applyData');
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

      fetchHandler(rockets.pagination.currentPage);
      dispatch(
        rocketsActions.fetch({
          collection: collection,
          total: total,
          offset:
            +rockets.pagination.limit * +rockets.pagination.currentPage -
            +rockets.pagination.limit,
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
    ]
  );

  const requestConfig = useMemo(() => {
    return {
      url: 'https://api.spacex.land/rest/launches-past-result',
      params: {
        offset: rockets.offset,
        limit: rockets.pagination.limit,
      },
    };
  }, [rockets.offset, rockets.pagination.limit]);

  const {
    loading,
    error,
    sendRequest: fetchRocketsHandler,
  } = useHttp(requestConfig, applyData);

  useEffect(() => {
    fetchRocketsHandler();
  }, [fetchRocketsHandler]);
  return (
    <>
      {/* <Filters
          onSort={sortHandler}
          sort={rockets.sort}
          rockets={rockets.collection.pages.pageList}
        /> */}
      {error}
      <RocketsList
        loading={loading}
        limit={rockets.pagination.limit}
        collection={rockets.collection}
      />
      {!loading && (
        <CustomPagination
          onPageChange={fetchHandler}
          data={{ currentPage, totalPages }}
        />
      )}
    </>
  );
};
export default Rockets;

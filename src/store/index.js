import { configureStore, createSlice } from '@reduxjs/toolkit';

const totalPag = (count, limit) => {
  let rest =
    count % limit === 0
      ? (count / limit).toFixed(0)
      : (count / limit++).toFixed(0);
  return rest;
};

const initialState = {
  rockets: {
    collection: [],
    total: 100,
    offset: 1,
    sortCriterial: 0,
    pagination: {
      limit: 6,
      currentPage: 1,
      totalPages: 0,
    },
  },
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: initialState.rockets,
  reducers: {
    fetch(state, action) {
      console.log('FETCH_DATA: ', action.payload.sortCriterial);
      const newOffset =
        +state.pagination.limit * +state.pagination.currentPage -
        +state.pagination.limit + 1;
      return {
        collection: action.payload.collection,
        total: action.payload.total,
        offset: newOffset,
        sortCriterial: action.payload.sortCriterial,
        pagination: {
          currentPage: action.payload.pagination.currentPage,
          limit: state.pagination.limit,
          totalPages: totalPag(
            action.payload.total,
            action.payload.pagination.limit
          ),
        },
      };
    },
    changePage(state, action) {
      state.pagination.currentPage = action.payload;
    },
    changeSort(state, action) {
      state.sortCriterial = +action.payload.criterial;
    },
    // sort(state, action) {
    //   let unsortedCollection = state.collection;

    //   let sortedCollection = unsortedCollection.sort((a, b) => {
    //     let aDate = moment(moment(a.date).format()).diff(
    //       moment().format(),
    //       'seconds'
    //     );
    //     let bDate = moment(moment(b.date).format()).diff(
    //       moment().format(),
    //       'seconds'
    //     );

    //     if (state.sortCriterial === 0) {
    //       return aDate - bDate;
    //     } else {
    //       return aDate + bDate;
    //     }
    //   });

    //   state.collection = sortedCollection;
    // },
  },
});

const store = configureStore({
  reducer: { rockets: rocketsSlice.reducer },
});

export const rocketsActions = rocketsSlice.actions;
export default store;

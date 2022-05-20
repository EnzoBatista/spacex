import { configureStore, createSlice } from '@reduxjs/toolkit';

const totalPag = (count, limit) => {
    let rest = count % limit === 0 ? (count / limit).toFixed(0) : (count / limit ++).toFixed(0);
    return rest;
}

const initialState = {
    rockets: {
        collection: [],
        total: 100,
        offset: 0,
        pagination: {
            limit: 5,
            currentPage: 1, 
            totalPages: 0
        }
    }
}

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: initialState.rockets,
  reducers: {
      fetch(state, action) {
        console.log('FETCH_DATA: ', action);
        const newOffset= +state.pagination.limit * +state.pagination.currentPage - +state.pagination.limit;
          return {
                collection: action.payload.collection,
                total: action.payload.total,
                offset: newOffset,
                pagination: {
                    currentPage: action.payload.pagination.currentPage,
                    limit: state.pagination.limit,
                    totalPages: totalPag(action.payload.total, action.payload.pagination.limit)
                }
          }
      }
  },
});

const store = configureStore({
  reducer: { rockets: rocketsSlice.reducer },
});

export const rocketsActions = rocketsSlice.actions;
export default store;

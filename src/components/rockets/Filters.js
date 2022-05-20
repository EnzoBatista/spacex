import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rocketsActions } from '../../store';
import {
  Card,
  Container,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  // Stack,
  // Autocomplete,
  // TextField,
} from '@mui/material';

const Filters = (props) => {
  console.log(props.sort);
  const [sortValue, setSortValue] = useState(props.sort);
  const dispatch = useDispatch();

  const sortChangeHandler = (event) => {
    setSortValue(state => event.target.value);
    dispatch(rocketsActions.changeSort({criterial: event.target.value}));
  };
  
  return (
    <Card sx={{ padding: '10px', marginBottom: '20px' }}>
      <Container>
        <form>
          <FormControl sx={{ float: 'right', width: 'auto', minWidth: '98px' }}>
            <InputLabel id="demo-simple-select-label">Sort by: </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortValue}
              label="Sort  by: "
              onChange={sortChangeHandler}
            >
              <MenuItem value={0}>Latest</MenuItem>
              <MenuItem value={1}>Earliest</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              float: 'right',
              marginRight: '15px',
              width: 'auto',
              minWidth: '98px',
            }}
          >
            {/* <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                onChange={searchChangeHandler}
                options={props.rockets.map((option) => option.mission)}
                renderInput={(params) => (
                  <TextField {...params} label="search" />
                )}
              /> */}
              {/* <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                value={searchValue}
                // disableClearable
                // selectOnFocus
                // clearOnBlur
                // blurOnSelect
                onChange={searchChangeHandler}
                options={props.rockets.map((option) => option.mission)}
                getOptionLabel={(option) =>
                  option.mission ? option.mission : ''
                }
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  // // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title ? option.title : '';
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              /> */}
            {/* </Stack> */}
          </FormControl>
        </form>
      </Container>
    </Card>
  );
};
export default Filters;

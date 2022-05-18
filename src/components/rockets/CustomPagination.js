import React from 'react';
import { Pagination } from '@mui/material';
import { styled } from '@mui/system';

const StyledPagination = styled(Pagination)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: calc(100% - 30px);
  margin: 15px;

  ul {
    width: fit-content;

    li {
      background: 1px solid rgba(0, 0, 0, 0.23);

      & > {
        .MuiPaginationItem-outlined {
          color: #ffffff;
        }
      }

      button {
        background-color: rgba(76, 106, 132, 0.34);

        &:hover {
          background-color: rgb(25, 118, 209, 0.42);
        }

        &.Mui-selected {
          background-color: #1976d1;
          &:hover {
            background-color: #1976d1;
            cursor: not-allowed;
          }
        }
      }
    }
  }
`;

const CustomPagination = (props) => {
  const { currentPage, totalPages } = props.data;

  const pageChangeHandler = (event, page) => {
    props.onPageChange(page);
  };

  return (
    <StyledPagination
      onChange={pageChangeHandler}
      defaultPage={1}
      page={~~currentPage}
      count={~~totalPages}
      variant="outlined"
      shape="rounded"
    >
      {props.children}
    </StyledPagination>
  );
};

export default CustomPagination;

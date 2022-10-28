import React from 'react';
import styled from 'styled-components';


const Buttons = styled.button`
    border: none;
    background-color: white;
    margin-left: 10px;
    margin-right: 10px;
    color : ${props => props ? props.color : 'black'};
`;


function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
        <Buttons onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Buttons>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Buttons
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
              color = { page === i + 1 ? 'blue' : 'black'}
            >
              {i + 1}
            </Buttons>
          ))}
        <Buttons onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
        </Buttons>
    </>
  );
}


export default React.memo(Pagination);
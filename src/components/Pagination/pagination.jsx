import { useState } from 'react';
import { Pagination } from 'react-bootstrap';

function CustomPagination(props) {
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(props.currPageNumber === props.maxPageNum ? true : false);


  function switchPage(increment) {
    const newPageNumber = props.currPageNumber + increment;

    if (newPageNumber === 1) setIsFirst(true);
    else if (newPageNumber === props.maxPageNum) setIsLast(true);

    if (newPageNumber === 2 && isFirst) setIsFirst(false);
    else if (newPageNumber === props.maxPageNum - 1 && isLast) setIsLast(false)

    props.onPageNumberChange(newPageNumber);
  }

  return (
    <Pagination>
      <Pagination.Prev onClick={() => switchPage(-1)} disabled={isFirst} />
      <Pagination.Item key={props.currPageNumber} active>{props.currPageNumber}</Pagination.Item>
      <Pagination.Next onClick={() => switchPage(1)} disabled={isLast} />
    </Pagination>
  )
}


export default CustomPagination;

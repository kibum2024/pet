import React from 'react';
import './ServicePagination.css';

const ServicePagination = ({ currentPageProp, totalPagesProp, pageLimitProp, onPageChange }) => {
  const pageLimit = pageLimitProp; // 한 번에 표시할 페이지 번호 수
  const totalBlocks = Math.ceil(totalPagesProp / pageLimit);

  // 현재 페이지가 포함된 블록의 첫 페이지 번호 계산
  const currentBlock = Math.ceil(currentPageProp / pageLimit);
  const startPage = (currentBlock - 1) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPagesProp);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="pagination">
      {/* 이전 페이지로 이동 */}
      <button
        onClick={() => onPageChange(currentPageProp - 1)}
        disabled={currentPageProp === 1}
        style={{color: currentPageProp === 1 ? '#bbbbbb' : 'black'}}
      >
        ◀
      </button>

      {/* 페이지 번호 */}
      {pages.map(page => (
        <button
          key={page}
          className={currentPageProp === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지로 이동 */}
      <button
        onClick={() => onPageChange(currentPageProp + 1)}
        disabled={currentPageProp === totalPagesProp}
        style={{color: currentPageProp === totalPagesProp ? '#bbbbbb' : 'black'}}
      >
        ▶
      </button>
    </div>
  );
};

export default ServicePagination;

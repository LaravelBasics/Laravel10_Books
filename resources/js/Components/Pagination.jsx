export default function Pagination({ paginator }) {
    const {
      first_page_url,
      last_page_url,
      next_page_url,
      prev_page_url,
      current_page,
      last_page
    } = paginator;
  
    return (
      <div className="pagination">
        {
          (() => {
            if (current_page !== 1) {
              return (
                  <a
                  href={first_page_url}
                  className="pagination-link px-2 py-1 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500"
                  aria-disabled={current_page === 1}
                >
                  最初
                </a>
              )
            }
          })()
        }
        {
          (() => {
            if (current_page !== 1) {
              return (
                    <a
                      href={prev_page_url}
                      className="pagination-link px-2 py-1 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500"
                      aria-disabled={!prev_page_url}
                    >
                      前へ
                    </a>
              )
            }
          })()
        }
        <span className="current-page">
          &nbsp;{current_page} / {last_page}&nbsp;
        </span>
        {
          (() => {
            if (current_page !== last_page) {
              return (
                    <a
                      href={next_page_url}
                      className="pagination-link px-2 py-1 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500"
                      aria-disabled={!next_page_url}
                    >
                      次へ
                    </a>
              )
            }
          })()
        }
        {
          (() => {
            if (current_page !== last_page) {
              return (
                    <a
                      href={last_page_url}
                      className="pagination-link px-2 py-1 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500"
                      aria-disabled={current_page === last_page}
                    >
                      最後
                    </a>
              )
              }
          })()
        }   
      </div>
    );
  }
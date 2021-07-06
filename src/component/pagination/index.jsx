import { Link, useHistory } from 'react-router-dom'
import './index.css'

export default function Pagination({ page = 1, total_page = 1 }) {
    let prev = []
    let next = []

    const { location: { pathname, search } } = useHistory()
    const url = new URLSearchParams(search)

    if (page - 2 > 0) { 
        url.delete('page')
        url.append('page', page - 2)

        prev.push(<Link key={1} className="pagination-item" to={`${pathname}?${url.toString()}`}>{page - 2}</Link>)
        
        url.delete('page')
        url.append('page', page - 1)

        prev.push(<Link key={2} className="pagination-item" to={`${pathname}?${url.toString()}`}>{page - 1}</Link>)
    }

    if (page + 2 <= total_page) {
        url.delete('page')
        url.append('page', page + 1)

        next.push(<Link key={3} className="pagination-item" to={`${pathname}?${url.toString()}`}>{page + 1 }</Link>)

        url.delete('page')
        url.append('page', page+ 2)

        next.push(<Link key={4} className="pagination-item" to={`${pathname}?${url.toString()}`}>{page +  2}</Link>)
    }

    url.delete('page')
        url.append('page', page)

    return <div className="pagination">
        {prev}
        <Link className="pagination-item active" to={`${pathname}?${url.toString()}`}>{page}</Link>
        {next}
    </div>
}
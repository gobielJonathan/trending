import './index.css'
import classNames from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const menu = [
    {
        path: '/film',
        title: "Film"
    },
    {
        path: '/music',
        title: "Music"
    },
]

export default function Aside() {
    const [active, setActive] = useState(0)

    return <aside className={'aside'}>
        {
            menu?.map(({ path, title }, idx) => {
                return <Link
                    key={idx}
                    onClick={() => setActive(idx)}
                    to={path}
                >
                    <div
                        className={classNames('aside-item', {
                            'active': idx == active
                        })}>
                        <span>{title}</span>
                    </div>
                </Link>
            })
        }
    </aside>
}
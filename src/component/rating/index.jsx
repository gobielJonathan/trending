import './index.css'

export default function Rating({ text = 1, symbol = '%' }) {
    return <div className="rounded-circle rating">
        <div className="rating-bar">
        </div>
        <span>
            <span>{text}</span>
            <sup style={{ fontSize: 7 }}>{symbol}</sup>
        </span>
    </div>
}
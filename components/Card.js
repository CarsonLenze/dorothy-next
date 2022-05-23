export function Card({ left, title, description, image }) {
    return (
        <div className={`contentdiv${!left ? ' reverseflex' : ''}`}>
            {left ? <img className="contentimg" src={image}></img> : ''}
            <div className={`contentsep${left ? '' : ' reverse'}`}>
                <h1>{title}</h1>
                <h2>{description}</h2>
            </div>
            {!left ? <img className="contentimg" src={image}></img> : ''}
        </div>
    )
}
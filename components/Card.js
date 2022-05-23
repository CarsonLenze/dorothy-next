import Image from 'next/image'

export function Card({ left, title, description, image }) {
    return (
        <div className={`contentdiv${!left ? ' reverseflex' : ''}`}>
            {left ? <Image alt="contentimg" className="contentimg" src={image}></Image> : ''}
            <div className={`contentsep${left ? '' : ' reverse'}`}>
                <h1>{title}</h1>
                <h2>{description}</h2>
            </div>
            {!left ? <Image alt="contentimg" className="contentimg" src={image}></Image> : ''}
        </div>
    )
}
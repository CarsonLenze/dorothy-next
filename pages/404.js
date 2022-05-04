const Link = require('next/link')

function Custom404() {
    return <section className="hero">
        <div className="hero-body">
            <div className="center">
                <h1 className="code">404</h1>
                <h2 className="text">Page Not Found</h2>
                <Link href="/">
                    <button className="return">Return</button>
                </Link>
            </div>
        </div>
    </section>
}

export default Custom404
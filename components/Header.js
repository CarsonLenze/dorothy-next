const Link = require('next/link')

module.exports = function Header({ user }) {
    return (
        <nav>
            <h1 className="name"><Link href="/">Dorothy</Link></h1>
            <Link href="/"><span className="name sep">|</span></Link>
            <ul className="ops">
            <Link href="/commands"><a className="lis">Commands</a></Link>
            <Link href="/plus"><a className="lis">Premium</a></Link>
            </ul>
            <div className="idk">
                <a target="_blank" className="button" onClick={() => { user ? window.location.href = "/api/logout" : window.open("/api/login", "_blank", "width=500,height=850") }}>
                    <div className="icon">
                        <img className={user ? "current" : ''} src={user ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "./discord.svg"}></img>
                    </div>
                    <span>{user ? user.username : 'Login'}</span>
                </a>
            </div>
            
        </nav>
    );
};
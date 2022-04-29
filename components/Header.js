module.exports = function Header({ user }) {
    return (
        <nav>
            <h1 className="name"><a href="/">Dorothy</a></h1>
            <span className="name sep">|</span>
            <ul className="ops">
                <a className="lis" href="/commands">Commands</a>
                <a className="lis" href="/plus">Premium</a>
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
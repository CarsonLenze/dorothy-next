module.exports = function Header() {
    return (
        <nav>
            <h1 className="name">Dorothy</h1>
            <span className="name sep">|</span>
            <ul className="ops">
                <a className="lis" href="/commands" target="_self">
                    Commands
                </a>
                <a className="lis" href="/plus" target="_self">
                    Premium
                </a>
            </ul>
            <div className="idk">
                <a target="_blank" className="button" onClick="Invite()">
                    <div className="icon">
                        <img src="./discord.svg"></img>
                    </div>
                    <span>Login</span>
                </a>
            </div>
        </nav>
    );
};

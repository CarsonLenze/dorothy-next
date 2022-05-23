import Link from 'next/link'
import Image from 'next/image'

export function Navbar({ user }) {
    return (
        <nav>
            <Link href="/"><h1 className="botName">Dorothy</h1></Link>
            <Link href="/"><span className="botName sep">|</span></Link>
            <ul className="ops">
                <Link href="/commands"><a className="lis">Commands</a></Link>
                <Link href="/plus"><a className="lis">Premium</a></Link>
            </ul>

            <div className="dropdown">
                <a id="button" target="_blank" className="button" onClick={() => {
                    if (user) {
                        let dropdown = document.getElementById('dropdown');
                        dropdown.classList.toggle("hidden");
                    } else {
                        window.open("/api/login", "_blank", "width=500,height=850")
                    }
                }}>
                    <div className="icon">
                        <Image alt="discord" className={user ? "current" : ''} src={user ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "https://darling-bot.com/img/discord.svg"}></Image>
                    </div>
                    <span>{user ? user.username : 'Login'}</span>
                </a>
                <a id="dropdown" className="box hidden" onClick={async () => {
                    user = null
                    await fetch('/api/logout')
                    let button = document.getElementById('button');
                    let span = button.getElementsByTagName("span");
                    let image = button.getElementsByTagName("img");
                    image[0].src = 'https://darling-bot.com/img/discord.svg'
                    span[0].innerHTML = 'Login'

                    let dropdown = document.getElementById('dropdown');
                    dropdown.classList.toggle("hidden");
                }}>
                    <div className="arrow"></div>
                    <div className="inner">Logout</div>
                </a>
            </div>
        </nav>
    )
}
import { Card, Footer, Navbar } from '../components'
import { getUser } from '../lib/user'

export default function Home({ user }) {
  return (
    <div>
      <Navbar user={user} />

      <div className='hero'>

      </div>

      <section className="section">
        <div className="contentsection">
          <Card left={true} title={'Moderation'} description={'Darling will be able to help you punish people who are misbehaving. You can mute them for a period of time or just ban them outright. Darling uses slash commands which will allow you to easily and effortlessly punish users.'} image={'https://darling-bot.com/img/moderation.png'} />
          <Card left={false} title={'Profiles'} description={'You can view members custom profiles that correspond to that server and view their previous punishments. The longer you stay in a server the higher your tier will be.'} image={'https://darling-bot.com/img/profile.gif'} />
          <Card left={true} title={'Verification (Coming soon)'} description={'You can make sure your members are not bots with our verification system. Set a channel and a role to be given with /setup and you can be assured that no unwanted bots will join.'} image={'https://darling-bot.com/img/verifiy.png'} />
          <Card left={false} title={'STR Tracker'} description={'View current Strength and value amounts on OP factions with /top. Values update every 2 hours. Courtesy of ECPE Network.'} image={'https://darling-bot.com/img/top.png'} />
        </div>
      </section>

      <Footer />

    </div>
  )
}

export async function getServerSideProps(ctx) {
  let user = await getUser(ctx);
  return {
    props: { user },
  }
}
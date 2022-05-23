import { Footer, Navbar } from '../components'
import { getUser } from '../lib/user'

export default function Home({ user }) {
    return (
        <div>
            <Navbar user={user} />
            <div>Commands</div>
            <div className='hero'></div>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(ctx) {
    let user = await getUser(ctx);
    return {
        props: { user },
    }
}
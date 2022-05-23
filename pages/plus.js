import { Footer, Navbar } from '../components'
import { getUser } from '../lib/user'

export default function Home({ user }) {
    return (
        <div>
            <Navbar user={user} />
            <div className='hero'>
                <div>Plus</div>
                <div>Plus</div>
                <div>Plus</div>
            </div>
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
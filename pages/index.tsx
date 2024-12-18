import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {getLayout} from 'components/layout/baseLayout/BaseLayout';

const Home: NextPageWithLayout = () => (
       <>
        <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
        />
       </>
);
Home.getLayout = getLayout;
export default Home;

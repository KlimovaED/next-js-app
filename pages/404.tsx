import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import {getLayout} from '../components/layout/baseLayout/BaseLayout';
import Image from 'next/image';

const NotFoundPage = () => {
    return (
        <PageWrapper>
            <Image
                src={'https://img.freepik.com/premium-vector/cartoon-monster-holding-404-error-sign_884185-21.jpg?w=996'}
                alt={''} width={500} height={500}/>
        </PageWrapper>
    )
}
NotFoundPage.getLayout = getLayout;
export default NotFoundPage;

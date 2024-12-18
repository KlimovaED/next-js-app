// @flow
import * as React from 'react';
import {NextPage} from 'next';
import {PropsWithChildren, ReactElement} from 'react';
import {Header} from '../Header/Header';
import {PageWrapper} from '../PageWrapper/PageWrapper';



export const Layout:NextPage<PropsWithChildren> = ({children}) => {
    return (
            <PageWrapper>
                <Header/>
                {children}
            </PageWrapper>
    );
};

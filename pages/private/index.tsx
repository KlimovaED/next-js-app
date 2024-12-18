// @flow
import * as React from 'react';
import {getLayout} from 'components/layout/baseLayout/BaseLayout';
import {HeadMeta} from 'components/HeadMeta/HeadMeta';
import * as path from 'node:path';
import * as process from 'node:process';
import fs from 'fs/promises'
import {LoginNavigate} from '../../hoc/LoginNavigate';
import {PageWrapper} from '../../components/PageWrapper/PageWrapper';



function Private (){


    return (
        <LoginNavigate>
            <PageWrapper>PRIVATE PAGE</PageWrapper>
        </LoginNavigate>
    );
};

Private.getLayout=getLayout;
export default Private;

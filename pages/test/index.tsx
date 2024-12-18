// @flow
import * as React from 'react';
import {getLayout} from 'components/layout/baseLayout/BaseLayout';
import {HeadMeta} from 'components/HeadMeta/HeadMeta';
import * as path from 'node:path';
import * as process from 'node:process';
import fs from 'fs/promises'


//1 метод
export const getStaticProps = async () => {
    const getParseData=async ():Promise<{title:string}>=>{
        const filePath=path.join(process.cwd(),'public','staticData.json')//создание путя к файлу

        try{
            const jsonData= await fs.readFile(filePath);
            return JSON.parse(jsonData.toString());
        }catch (error){
            return {title:'no title '}
        }
    }


const {title}= await getParseData()

    return {
        props: {
            title
        },
        // revalidate:60
    }
}

type Props = {
   title:string
}

function Test ({title}:Props){


    return (
        <>
            <HeadMeta title={'Characters'}/>
           <h1> {title}</h1>
        </>
    );
};

Test.getLayout=getLayout;
export default Test;

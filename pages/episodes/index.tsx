// @flow
import * as React from 'react';
import {API} from 'assets/api/api';
import {EpisodeType, ResponseType} from 'assets/api/rick-and-morty-api';
import {Card} from '../../components/Card/Card';
import {getLayout} from '../../components/layout/baseLayout/BaseLayout';
import Link from 'next/link';
import {GetServerSideProps} from 'next';

//2 метод
export const getServerSideProps:GetServerSideProps = async ({res}) => {

    //кэгирование сохранит на 100 секунд
    res.setHeader('Cache-Control','public, s-maxage=10,stale-while-revalidate=100')

    const episodies = await API.rickAndMorty.getEpisodes()

    if(!episodies){
        return {
            notFound: true,
        }
    }

    return {
        props: {
            episodies,
        }
    }
}

type EpisodiesType = {
    episodies: ResponseType<EpisodeType>;
}

 const Episodies = ({episodies}:EpisodiesType) => {
    const episodiesList =episodies.results.map((episod: EpisodeType) => (
        <Link href={`/episodes/${episod.id}`} key={episod.id}>
        <Card name={episod.name}/>
        </Link>
    ))

    return (
        <>
            {episodiesList}
        </>
    );
};
Episodies.getLayout=getLayout;
export default Episodies;

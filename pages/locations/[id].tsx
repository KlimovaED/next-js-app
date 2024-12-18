import React from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {API} from '../../assets/api/api';
import {CharacterType, LocationType} from '../../assets/api/rick-and-morty-api';
import {getLayout} from '../../components/layout/baseLayout/BaseLayout';
import {CharacterCard} from '../../components/Card/CharacterCard/CharacterCard';
import {PageWrapper} from '../../components/PageWrapper/PageWrapper';
import styled from 'styled-components';
import {SuperButton} from '../../components/button/SuperButton';

export const getStaticPaths: GetStaticPaths = async ()=>{
    const {results} = await API.rickAndMorty.getLocations()

    const paths= results.map(location=>({
        params:{id:String(location.id)}
    }))

    //[{params:{id:1}}]

    return {
        paths,
        fallback:'blocking'
    };
}

export const getStaticProps: GetStaticProps = async ({params})=>{
    const {id} = params || {}
    const location = await API.rickAndMorty.getLocation(id as string)
    if(!location) {
        return {notFound: true};
    }

    const residents = await Promise.all(
        location.residents.map(async (residentUrl: string) => {
           return await API.rickAndMorty.getCharacterByUrl(residentUrl);
        })
    );

    return {
        props: {
            location,
            residents
        }
    }

}

type Location = {
    location:LocationType
residents:CharacterType[]

}

const Location = ({location,residents}:Location) => {

    return (
        <div>
            <SuperButton title={'locations'} url={'/locations'}/>

            <h1>{location.name}</h1>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>

            <h2>Residents:</h2>
            <PageWrapper >
                {residents.length === 0 ? (
                    <p>No residents found.</p>
                ) : (
                    <>
                        {
                            residents.map(resident => (
                                <>
                                <CharacterCard character={resident} key={resident.id} />
                                </>

                            ))
                        }
                    </>
                )}
            </PageWrapper>
        </div>
    )
            };


            Location.getLayout=getLayout;
            export default Location;

            const Container = styled.div`
            display: flex;
                width: 100%;
                flex-wrap: wrap;
                border: 1px solid black;
                gap:20px
            `

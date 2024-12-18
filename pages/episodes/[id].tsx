import React from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {CharacterType, EpisodeType} from '../../assets/api/rick-and-morty-api';
import {API} from '../../assets/api/api';
import {getLayout} from '../../components/layout/baseLayout/BaseLayout';
import {PageWrapper} from '../../components/PageWrapper/PageWrapper';
import {CharacterCard} from '../../components/Card/CharacterCard/CharacterCard';
import {SuperButton} from '../../components/button/SuperButton';

export const getStaticPaths: GetStaticPaths =async ()=>{
    const {results} = await API.rickAndMorty.getEpisodes()

    const paths= results.map(episode=>({
      params:{
          id:String(episode.id)
      }
    }))

    return{
        paths,
        fallback:'blocking'
    }
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
const {id} = params || {};

const episode = await API.rickAndMorty.getEpisode(id as string);

    if(!episode) {
        return {notFound: true};
    }

    const characters = await Promise.all(
        episode.characters.map(async (characterUrl:string) =>{
            return await API.rickAndMorty.getCharacterByUrl(characterUrl);

        })
    )

return{
    props: {
        episode,
        characters
    }
}
}

type Props={
    episode: EpisodeType
    characters: CharacterType[]
}

const Episode = ({episode,characters}:Props) => {
    
    return (
        <div>
            <SuperButton title={'episodies'} url={'/episodes'}/>

            <h1>{episode.name}</h1>
            <h2>Episode No : {episode.episode}</h2>
            <h3>Air date: {episode.air_date}</h3>
            
            <h2>Characters : </h2>
            <PageWrapper>
                {characters.length === 0 ? (
                    <p>No characters found.</p> 
                ):(
                    <>
                        {
                            characters.map(character => (
                                <CharacterCard character={character} key={character.id} />
                            ))
                        }
                    </>
                )
                }
            </PageWrapper>
        </div>
    );
};
Episode.getLayout=getLayout;
    export default Episode;

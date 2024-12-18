// @flow
import * as React from 'react';
import {API} from 'assets/api/api';
import {CharacterType, ResponseType} from 'assets/api/rick-and-morty-api';
import {getLayout} from 'components/layout/baseLayout/BaseLayout';
import {HeadMeta} from 'components/HeadMeta/HeadMeta';
import dynamic from 'next/dynamic';
import {LoginNavigate} from '../../hoc/LoginNavigate';
import axios from 'axios';

const authMe=async ()=>{
    const user= await {}//axios.get('auth/me')

    if(!user){
        return {
            redirect:{
                destination:'/test',
                permanent:false,
            }
        }
    }
}

const CharacterCard= dynamic(() => import('components/Card/CharacterCard/CharacterCard')
    .then(module=>module.CharacterCard),/*{
    ssr: false,
    loading:()=><h1>Loading</h1>
}*/); // если страничка долго грузится и данные сразу не нужны ,то можно
// подгружать динамически

//1 метод
export const getStaticProps = async () => {

    await authMe();
    const characters = await API.rickAndMorty.getCharacters()


    if(!characters){
        return {
            notFound: true,
        }
    }

    return {
        props: {
            characters,
        },
       // revalidate:60
    }
}

type CharactersType = {
    characters: ResponseType<CharacterType>;
}

function Characters ({characters}:CharactersType){
const charactersList = characters.results.map((character: CharacterType) => (
    <CharacterCard character={character} key={character.id} />
))

    return (
<>
    <HeadMeta title={'Characters'}/>
    {charactersList}
</>
    );
};

Characters.getLayout=getLayout;
export default Characters;

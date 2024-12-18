// @flow
import * as React from 'react';
import {CharacterType} from 'assets/api/rick-and-morty-api';
import Image from 'next/image';
import {API} from 'assets/api/api';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getLayout} from 'components/layout/baseLayout/BaseLayout';
import styled from 'styled-components';
import {Card} from 'components/Card/Card';
import {useRouter} from 'next/router';
import {SuperButton} from '../../components/button/SuperButton';


export const getStaticPaths: GetStaticPaths = async ()=>{
    const {results} = await API.rickAndMorty.getCharacters()

    const paths= results.map(character=>({
        params:{id:String(character.id)}
    }))

    //[{params:{id:1}}]

    return {
        paths,
        fallback:'blocking'
    };
}

export const getStaticProps:GetStaticProps = async ({params}) => {
    const {id} = params || {};
    const character = await API.rickAndMorty.getCharacter(id as string);

    if(!character) {
        return {notFound: true};
    }

    return {
        props: {
            character,
        }
    }
}

type Props = {
   character:CharacterType
};

const Character = ({character}: Props) => {

    //если fallback true, но SEO не будет видеть данные сразу
   const router = useRouter();
    if(router.isFallback) return <h1>Loading...</h1>
   //достаем роутером параметры
    const characterID=router.query.id



    return (
        <Container>
            <SuperButton title={'characters'} url={'/characters'} />
    <Card name={character.name}>
        <IdText>ID: {characterID}</IdText>
            <Image src={character.image} alt={character.name}  width={300} height={300}/>
            <Text>Gender: {character.gender}</Text>
        </Card>
        </Container>
    );
};
Character.getLayout=getLayout;
export default Character;


const Text = styled.span`
text-align: center;
margin-top: 15px`

const IdText = styled.span`
    margin: 10px 0;
font-size: 38px`

const Container = styled.div`
display: flex;
    flex-direction: column;
    gap:20px;
    align-items: center;
`


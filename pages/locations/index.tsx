// @flow
import * as React from 'react';
import {LocationType, ResponseType} from 'assets/api/rick-and-morty-api';
import {dehydrate, useQuery} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/query-core';
import {Card} from '../../components/Card/Card';
import {getLayout} from '../../components/layout/baseLayout/BaseLayout';
import Link from 'next/link';

//3 метод + app файл
const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location',{
        method:'GET'
    }).then(res=>res.json())
}

export const getStaticProps = async () => {
    const queryClient =new QueryClient()
   await queryClient.fetchQuery(['locations'],getLocations)


    return {
        props: {
            dehydratedState:dehydrate(queryClient),
        }
    }
}


 const Locations = () => {
const {data:locations}=useQuery<ResponseType<LocationType>>(['locations'],getLocations);

     if(!locations) return null;

    const locationsList = locations.results.map((location: LocationType) => (
        <Link href={`/locations/${location.id}`} key={location.id}>
        <Card name={location.name} key={location.id}/>
        </Link>
    ))

    return (
        <>
            {locationsList}
        </>
    );
};
Locations.getLayout=getLayout;
export default Locations;

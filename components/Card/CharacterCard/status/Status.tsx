// @flow
import * as React from 'react';
import Image, {StaticImageData} from 'next/image';
import {CharacterStatusType} from 'assets/api/rick-and-morty-api';

type Props = {
    status:CharacterStatusType
    src:StaticImageData
};
export const Status = ({status,src}: Props) => {
    return (
        <>
            <Image src={src}  alt={''} width={20} height={20} style={{padding:'10px'}}/>
        </>
    );
};

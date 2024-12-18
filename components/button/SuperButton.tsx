// @flow
import * as React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';

type Props = {
 title: string;
url: string;
};

export const SuperButton = ({title,url}: Props) => {
const router = useRouter();
    const goToCheractersHendler=()=>{
        router.push(url);
    }
    return (
        <Button onClick={goToCheractersHendler}>
GO TO {title.toUpperCase()}
        </Button>
    );
};

export const Button = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 4px;
    width: 200px;
    height: 40px;
    background-color: #fa52d3;
    color: white;

    &:hover {
        background-color: transparent;
        color: #fa52d3;
        border: 2px solid #facaff;
        box-shadow: 0 2px 3px 1px #fa52d3;
    }`

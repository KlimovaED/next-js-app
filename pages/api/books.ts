// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = Books[]

const booksDB=[
    {
        id:1,title:'name 1',
    },
    {
        id:1,title:'title',
    },
    {
        id:1,title:'name 2',
    }
]

type Books = {
    id:number,
    title:string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if(req.method === 'GET') {
        let books = booksDB;
        const term = req.query.term as string;
        if(term) {
            books=books.filter((book) => book.title.toLowerCase().includes(term.toLowerCase()));
        }
await res.revalidate('/characters') //дергать обновление

        res.status(200).json(books)
    }
}


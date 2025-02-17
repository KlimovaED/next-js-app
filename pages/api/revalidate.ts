import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.NEXT_PUBLIC_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }
//?secret=sjnxsnac
    try {
        // This should be the actual path not a rewritten path
        // e.g. for "/posts/[id]" this should be "/posts/1"
        await res.revalidate('/test')
        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}

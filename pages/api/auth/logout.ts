// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface ResponseSuccess {
    success: boolean;
    message: string;
    data: [];
    pagination: {} | any;
    error: {
        error_code: string;
        error_data: any
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseSuccess>
) {
    if (req.method === "POST") {
        res.setHeader('Set-Cookie', `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly SameSite=Lax; Max-Age=0;`)

        return res.status(200).json({
            success: true,
            message: "Logout success",
            data: [],
            pagination: {},
            error: {
                error_code: "",
                error_data: {}
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Bad request",
            data: [],
            pagination: {},
            error: {
                error_code: "",
                error_data: {}
            }
        })
    }
}

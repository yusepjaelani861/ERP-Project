// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserLogin } from 'interfaces/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface ResponseSuccess {
    success: boolean;
    message: string;
    data: UserLogin;
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
    //   res.status(200).json({ name: 'John Doe' })
    if (req.method === "POST") {
        const { email, password, name, phone_number, type, password_confirmation } = req.body

        try {
            const response = await axios.post<ResponseSuccess>(process.env.NEXT_PUBLIC_API_URL + '/auth/register', {
                email,
                password,
                name,
                phone_number,
                type,
                password_confirmation
            })
            console.log(response.data)
            res.setHeader('Set-Cookie', `token=${response.data.data.token}; path=/; expires=${response.data.data.expiredIn}; HttpOnly SameSite=Lax; Max-Age=${response.data.data.expiredIn};`)
            return res.status(200).json(response.data)
        } catch (error: any) {
            return res.status(400).json(error.response.data)
        }
    }
}

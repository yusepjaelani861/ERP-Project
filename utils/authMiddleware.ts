import { GetServerSidePropsContext } from "next";
import axiosService from "./axiosService";

const authMiddleware = async (context: GetServerSidePropsContext) => {
    const token = context.req.cookies.token;
    if (!token) {
        context.res.setHeader("Set-Cookie", `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly SameSite=Lax; Max-Age=0;`);
        return {
            status: false,
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    try {
        const response = await axiosService("/auth/me", "GET", {}, token);
        if (response.data.success === false) {
            context.res.setHeader("Set-Cookie", `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly SameSite=Lax; Max-Age=0;`);
            return {
                status: false,
                redirect: {
                    destination: "/auth/login",
                    permanent: false,
                },
            };
        }

        return {
            status: true,
            props: {
                user: response.data.data,
            },
        };
    } catch (error) {
        // context.res.setHeader("Set-Cookie", `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly SameSite=Lax; Max-Age=0;`);
        return {
            status: false,
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        }
    }
}

export default authMiddleware;
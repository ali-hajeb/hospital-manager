'use client'
import { BASE_PATH } from "@/src/constants";
import { userActions } from "@/src/lib/module/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
    const router = useRouter();
    useEffect(() => {
        userActions.logout()
            .then((res) => {
                console.log(res.data);
                // router.refresh();
                router.replace(`${BASE_PATH}/`);
            }).catch(error => {
                console.error(error);
            })

    }, [])
    return <></>
}

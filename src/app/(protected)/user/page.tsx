'use client'
import UsersPanel from "@/src/containers/UserPanel/index";
import TopbarContext from "@/src/contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function UsersPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('کاربرها')
        return () => {
            setTitle('سامانه مدیریت درآمد بیمارستان‌ها')
        }
    }, []);
    return <UsersPanel title="کاربران"/>;
}

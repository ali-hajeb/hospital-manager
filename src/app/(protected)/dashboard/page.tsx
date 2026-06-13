'use client'
import DashboardPanel from "@/src/containers/DashboardPanel";
import TopbarContext from "@/src/contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function DashboardPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('داشبورد')
        return () => {
            setTitle('سامانه مدیریت درآمد بیمارستان‌ها')
        }
    }, []);

    return <DashboardPanel title="داشبورد"/>
}


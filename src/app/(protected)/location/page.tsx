'use client'
import LocationPanel from '@/src/containers/LocationPanel/';
import TopbarContext from '@/src/contexts/TopbarContext';
import { useContext, useEffect } from 'react';

export default function LocationPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('مراکز')
        return () => {
            setTitle('سامانه مدیریت درآمد بیمارستان‌ها')
        }
    }, []);
    return <LocationPanel />
}

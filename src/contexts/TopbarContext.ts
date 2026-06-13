'use client'
import { createContext } from "react";

export interface ITopbarContext {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const DEFAULT_TOPBAR_CONTEXT: ITopbarContext = {
    title: '',
    setTitle: () => {},
};

const TopbarContext = createContext<ITopbarContext>(DEFAULT_TOPBAR_CONTEXT);

export default TopbarContext;

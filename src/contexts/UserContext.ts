'use client'
import { createContext } from "react";
import type { IUserPopulated } from "@/src/lib/module/common/types";

const UserContext = createContext<IUserPopulated | null>(null);

export default UserContext;

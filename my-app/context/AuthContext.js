import React,{useState,createContext,useCallback,useEffect} from "react";
import { useDisconnect,useAccount } from 'wagmi'

export const AuthContext = createContext()

export const AuthProvider=({children})=>{
    const { disconnect } = useDisconnect()
    const { address, isConnecting, isDisconnected } = useAccount()


    return (
        <AuthContext.Provider
        value={{
            logout: ()=>{
                disconnect()
            },
            address,
            isConnecting,
            isDisconnected,

        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
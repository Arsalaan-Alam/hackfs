import React,{useState,createContext,useCallback,useEffect} from "react";
import { useDisconnect,useAccount,useEnsName,useEnsAvatar } from 'wagmi'

export const AuthContext = createContext()

export const AuthProvider=({children})=>{
    const { disconnect } = useDisconnect()
    const { address, isConnecting, isDisconnected } = useAccount()
    const {data:ensName} = useEnsName({
        address:address
    })
    const {data:ensAvatar} = useEnsAvatar({
        name:ensName
    })


    return (
        <AuthContext.Provider
        value={{
            logout: ()=>{
                disconnect()
            },
            address,
            isConnecting,
            isDisconnected,
            ensName,
            ensAvatar

        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
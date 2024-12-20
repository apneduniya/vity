"use client";

import { Wallet } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { shortenTextFunction } from "@/utils/shortenText";


export default function ConnectWallet() {
    const { publicKey, connecting, connected, disconnecting } = useWallet();

    return (
        <>
            <WalletMultiButton style={{ height: "40px", padding: "10px" }}>
                <div className="flex flex-row items-center justify-normal space-x-4">
                    {!publicKey ? (
                        <>
                            {!connecting && !connected && !disconnecting && (
                                <Wallet className="size-6" />
                            )}
                            <p className="whitespace-nowrap text-sm">Connect Wallet</p>
                        </>
                    ) : (
                        <p className="text-sm">
                            {shortenTextFunction(publicKey.toString())}
                        </p>
                    )}
                </div>
            </WalletMultiButton>
        </>
    );
}




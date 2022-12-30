import { NetworkName } from "../networks/connections/network-connection.types"

export type ResolveOptions = {
    /**
     * The chain to scan to find the `domainOrTld`. If no chain is specified every chain of the provider is scanned to find the domain or tld.
     */
    network?: NetworkName | string | undefined

    /**
    * The timeout of the call to get the `domainOrTld` timeout.
    */
    metadataTimeout?: number | undefined
}
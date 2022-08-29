export enum NameType {
    TLD = "tld",
    SECOND_LEVEL_DOMAIN = "domain",
    SUB_DOMAINED_DOMAIN = "sub-domain"
}

export type MappedName = {
    fullname: string,
    domain?: string | undefined,
    tld: string,
    type: NameType,
}
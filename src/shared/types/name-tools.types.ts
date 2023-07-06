import { NameType } from "../enumerations/enumerations";
/**
 * @description A Object that has been resolved from a domain and TLD
 */
export type MappedName = {
    fullname: string,
    domain?: string | undefined,
    tld: string,
    type: NameType,
}
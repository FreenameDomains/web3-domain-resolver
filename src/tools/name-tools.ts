import { ResolvedResourceType } from "../resolvers/types/resolved-resource-type";
import { MappedName, NameType } from "./name-tools.types";
const punycode = require("punycode");

export class NameTools {
	static mapName(domainOrTld: string): MappedName | undefined {
		if (!domainOrTld) {
			return undefined;
		}
		const detailedName = this.getDetailedName(domainOrTld);
		if (!detailedName) {
			return undefined;
		}

		//portions
		let tld = null;
		let tldAsciiName = null;
		let secondLevelDomain = null;
		let secondLevelDomainAsciiName = null;

		if (detailedName.type === NameType.TLD) {
			tld = domainOrTld;
			tldAsciiName = detailedName.asciiName;
		}
		else if (detailedName.type === NameType.SECOND_LEVEL_DOMAIN || detailedName.type === NameType.SUB_DOMAINED_DOMAIN) {
			const nameSplitted = detailedName.name.split(".");
			const asciiNameSplitted = detailedName.asciiName.split(".");
			tld = nameSplitted[nameSplitted.length - 1];
			secondLevelDomain = nameSplitted[nameSplitted.length - 2];

			tldAsciiName = asciiNameSplitted[asciiNameSplitted.length - 1];
			secondLevelDomainAsciiName = asciiNameSplitted[asciiNameSplitted.length - 2];
		}

		return {
			domain: secondLevelDomainAsciiName,
			fullname: domainOrTld,
			tld: tldAsciiName,
			type: detailedName.type,
		};
	}

	private static getItemTypeFromString(name: string): NameType {
		if (name.includes(".")) {
			const splitted = name.split(".");
			const cleanSplitted = splitted.filter(s => s !== "");
			if (cleanSplitted.length === 2) {
				return NameType.SECOND_LEVEL_DOMAIN;
			} else if (cleanSplitted.length === 1) {
				return NameType.TLD;
			} else if (cleanSplitted.length > 2) {
				return NameType.SUB_DOMAINED_DOMAIN;
			}
		}

		return NameType.TLD;
	}

	private static getDetailedName(name: string) {
		let foundError = false;
		const errors: string[] = [];

		//We need the ascii string to avoid detecting emoji and other unicode characters as invalid
		const asciiString = punycode.toASCII(name);

		//Check if the search input contains forbidden characters
		const isSearchStringAllowable = this.isNameAllowed(asciiString);
		if (!isSearchStringAllowable?.isAllowable) {
			errors.push("INVALID_NAME");
			foundError = true;
		}

		//Check if the search input name has a repeated dot (es. app..cryptotld)
		if (name.includes("..")) {
			errors.push("REPETED_DOT");
			foundError = true;
		}

		if (!foundError) {
			let asciiName = asciiString;
			const itemType = this.getItemTypeFromString(asciiString);

			if (itemType == NameType.TLD) {
				//remove the "." from the start of the tld (es .freename becomes freename)
				if (name.includes(".")) {
					name = name.replace(/\./g, "");
					asciiName = asciiName.replace(/\./g, "");
				}
			}
			return {
				asciiName,
				name,
				type: itemType,
			};
		}
	}

	static isNameAllowed(name: string) {
		//Check if search string contains only allowed characters
		const allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.";
		let invalidCharacters = [];
		let isAllowable = true;
		let dotsOnly = true;
		for (let i = 0; i < name.length; i++) {
			const char = name.charAt(i);
			if (allowedCharacters.indexOf(char) === -1) {
				invalidCharacters.push(char);
				isAllowable = false;
			}
			if (char !== ".") {
				dotsOnly = false;
			}
		}

		if (dotsOnly) {
			invalidCharacters = ["."];
			isAllowable = false;
		}

		return {
			isAllowable,
			invalidCharacters,
		};
	}

	static getResolvedResourceType(type: NameType): ResolvedResourceType {
		switch (type) {
			case NameType.TLD:
				return ResolvedResourceType.TLD;
			case NameType.SECOND_LEVEL_DOMAIN:
				return ResolvedResourceType.SECOND_LEVEL_DOMAIN;
			default:
				return ResolvedResourceType.UNTYPED;
		}
	}
}
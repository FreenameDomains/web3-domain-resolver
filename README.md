# Web3 Domain Name Resolver
This library is part of the Freename Web3 ecosystem and wants to help Web3 developers to easly support multiple Web3 Domain Providers. This library standardizes interfaces for interaction enabling to resolve and manage these supported providers: 
* [ENS](https://ens.domains/) 
* [Unstoppable Domains](https://unstoppabledomains.com/) 
* [Freename](https://freename.io/) 

## Installation
To install the library use npm.
<!-- 
```shell
yarn add @freenamedomains/web3-domain-resolver
``` -->

```shell
npm install @freenamedomains/web3-domain-resolver --save
```
## Usage

### Resolve a domain or TLD

To resolve a domain or TLD using the web3-domain-resolver, you have to import it into your project then create a new istance of the default `Web3Resolver` class.

```ts
const web3resolver = new Web3Resolver();
```

From the `Web3Resolver` you can call the `resolve` function.

```ts
const resolvedDomain = web3resolver.resolve("test.web3domain");
```

If the domain is valid, exists on the blockchain and can be resolved a `IResolvedResource` is given, otherwise the result is `undefined`.
```ts
{
        fullname: string,
        tld: string,
        type: ResolvedResourceType,//'domain' | 'tld'
        tokenId: string,
        resolverName: ResolverName,//'unstoppable' | 'ens' | 'freename'
        resolverProvider: IResolverProvider,
        network: NetworkName,//'polygon' | 'ethereum' | ...
        proxyReaderAddress: string,
        proxyWriterAddress: string,
        ownerAddress: string,
        metadataUri: string | undefined,
        imageUrl: string | undefined,
        metadata: any | undefined,
        records: { [key: string]: string } | undefined,
        domain: string | undefined,
        realTimeUpdates: false
    }
```
To obtain the resolved resource a series of calls to the blockchain are made, depending on the chain traffic the `resolve` call can take a couple of seconds to be completed.


### Token ID Resolution

You can also obtain a `IResolvedResource` from a domain NFT tokenId, in this case use the `resolveFromTokenId` function from the `Web3Resolver` instance.

```ts
const web3resolver = new Web3Resolver();
const resolvedDomain = web3resolver.resolveFromTokenId("web3-domain-nft-tokenId");
```
To find the correct domain provider a call to every available provider is made, using the current priority of the `Web3Resolver` (see Priority chapter).

To speed up the resolution the `ResolverName` can be provided, in this case only the given provider is checked.
```ts
const web3resolver = new Web3Resolver();
const resolvedDomain = web3resolver.resolveFromTokenId("web3-domain-nft-tokenId", ResolverName.UD);
```

### Transfer the ownership

You can transfer the ownership of the domain directly from a `IResolvedResource` instance by calling the `transfer` function.  
To do so you need a `ethers.Wallet` to use as signer for the transaction.

Usually for the transfer to work the signer wallet must be the owner or an approved wallet of the domain. 

```ts
const resolvedDomain = web3resolver.resolve("test.web3domain");

//Domain transfer
const signer = new ethers.Wallet("wallet-secret-key")
await resolvedDomain.transfer("receiver-wallet-address", signer);
```

### Get and Set Records
A web3 domain NFT can have a key-value object associated with it and saved on the blochain. Each key-value pair is called record. 

Currently there is no way to get a list of all the keys of an NFT from the blockchain, so providers save all the records of a web3 domain in a centralized public metadata file, stored on the Web2.  
The `records` field of a `IResolvedResource` contains the records available on the metadata file.
```ts
const resolvedDomain = web3resolver.resolve("test.web3domain");

console.log(resolvedDomain.records);
// {
//   'my-eth-address': '0x00000...1',
//   'my-matic-address':'0x00000...2',
// }
```

If you want to interact directly with the blockchain you can set and get the records of the domain from a `IResolvedResource` by calling the `getRecord`, `getManyRecords`, `setRecord` and `setManyRecords`.  
To interact with the blockchain records you need to know the key(s) of the key-value pair(s) you want to interact with.

```ts
//Read "my-eth-address" and "my-matic-address" records
const addrs = await resolvedDomain.getManyRecords(["my-eth-address", "my-matic-address"]);
console.log(addrs);
// [
//   '0x00000...1',
//   '0x00000...2',
// ]

//Save new value for "my-eth-address" record
const signer = new ethers.Wallet("wallet-secret-key")
await resolvedDomain.setRecord("my-eth-address", "0x00000...3", signer);

//Read "my-eth-address" record
const updatedAddr = await resolvedDomain.getRecord("my-eth-address");
console.log(updatedAddr);
//0x00000...3
```

### Refresh
If you want to update all the fields of a `IResolvedResource` you can call the `refresh` method.
```ts
const resolvedDomain = web3resolver.resolve("test.web3domain");
console.log(resolvedDomain.ownerAddress);
//"0x12345...F"

//Domain transfer
const signer = new ethers.Wallet("wallet-secret-key")
await resolvedDomain.transfer("0x98765...A", signer);

await resolvedDomain.refresh();
console.log(resolvedDomain.ownerAddress);
//"0x98765...A"
```

## Custom Infura or RCP urls
You can set your own custom Json RPC urls instead of using the default ones from the library.  
To do so create a `ConnectionLibrary` instance and provide it to the `Web3Resolver`.  
In this way every call to the specified network is made using your custom url.
```ts
 const networkConnection: NetworkConnection = {
        networkName: NetworkName.POLYGON,
        rpcUrl: "https://your-custom-url"
    };
    const connectionLibrary: ConnectionLibrary = new ConnectionLibrary([networkConnection]);
    const web3res = new Web3Resolver(connectionLibrary);
```

## Resolvers Priority
You can set the resolvers order in which a domain **tokenId** is resolved by calling the `setResolversPriority` function.

At the moment Freename, Unstoppble Domains and ENS don't have overlapping top-level domains, therefore a resolve by **name** does not need a priority.  
In the future a priority to resolve names could be necessary, in that case the priority setted by the `setResolversPriority` function will be followed.

The default priority is:

1. Freename
2. Unstoppable Domains
3. ENS
```ts
    const web3resolver = new Web3Resolver();
    web3resolver.setResolversPriority([ResolverName.ENS, ResolverName.UD, ResolverName.FREENAME]);
```
## Use a custom ResolverProvider
A `ResolverProvider` is a class that implements the `IResolverProvider` interface.  
This class comunicate with the web3 domain NFT registry, reading and writing from and to the appropriate smart contracts.


You can create a custom `ResolverProvider` and then use it on a custom `Resolver` (see "Use a custom Resolver" chapter).
```ts
export class CustomResolverProvider implements IResolverProvider {
    //Implement interface
}
```

If your custom `ResolverProvider` needs to interfce with a standard [ERC721 Contract](https://docs.openzeppelin.com/contracts/4.x/erc721) you can use the abstract class `DefaultERC721ResolverProvider` that already handles most of the work.

```ts
export class CustomResolverProvider extends DefaultERC721ResolverProvider implements IResolverProvider {
    //Implement abstract methods
}
```

## Use a custom Resolver
The `Web3Resolver` class is an extension of the `Resolver` class that uses the Freename, Unstoppble Domains and ENS `ResolverProvider` implementations.

You can configure a custom `Resolver` to use only your preferred resolver providers.
```ts
export class CustomResolver extends Resolver {
	constructor(connectionLibrary?: ConnectionLibrary) {
		const freenameResolverProvider = new FreenameResolverProvider({ connectionLibrary: connectionLibrary });
		const customResolverProvider = new CustomResolverProvider({ connectionLibrary: connectionLibrary });

		super([freenameResolverProvider, customResolverProvider]);
	}
}
```

<!-- 
## Support the project -->


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
        metadata: any | undefined
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
const resolvedDomain = web3resolver.resolveFromTokenId("111068025256548295425145748205686048629728752166525026143111404611000478055970");
```
To find the correct domain provider a call to every available provider is made, using the current priority of the `Web3Resolver` (see Priority chapter).

To speed up the resolution the `ResolverName` can be provided, in this case only the given provider is checked.
```ts
const web3resolver = new Web3Resolver();
const resolvedDomain = web3resolver.resolveFromTokenId("111068025256548295425145748205686048629728752166525026143111404611000478055970", ResolverName.UD);
```

### Transfer the ownership

You can transfer the ownership of the domain directly from the `IResolvedResource` instance by calling the `transfer` function.  
To do so you need a `ethers.Wallet` to use as signer for the transaction.

Usually for the transfer to work the signer wallet must be the owner or an approved wallet of the domain. 

```ts
const resolvedDomain = web3resolver.resolve("test.web3domain");

//Domain transfer
const signer = new ethers.Wallet("wallet-secret-key")
resolvedDomain.transfer("new-wallet-address", signer);
```

<!-- ### Get and Set Records -->

## Custom Infura or RCP urls
You can set your own custom Json RPC urls instead of using the default ones from the library.  
To do so create a `ConnectionLibrary` instance and provide it to the `Web3Resolver`.  
In this way every call to the specified network is made using your custom url.
```ts
 const networkConnection: NetworkConnection = {
        networkName: NetworkName.POLYGON,
        rpcUrl: "your-custom-url"
    };
    const connectionLibrary: ConnectionLibrary = new ConnectionLibrary([networkConnection]);
    const web3res = new Web3Resolver(connectionLibrary);
```

## Resolvers Priority
You can set the resolvers order in which a domain is resolved by calling the `setResolversPriority` function.  
The default priority is:

1. Freename
2. Unstoppable Domains
3. ENS
```ts
    const web3resolver = new Web3Resolver();
    web3resolver.setResolversPriority([ResolverName.ENS, ResolverName.UD, ResolverName.FREENAME]);
```


<!-- ## Add your custom resolver

## Support the project -->


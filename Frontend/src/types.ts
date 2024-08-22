export type NftType = {
    tokenUri: string;
    name: string;
    description: string;
    imageUrl: string;
    owner: string;
};
  
export type EventType = {
    name: string,
    address: string,
    tokenUri?: string
}
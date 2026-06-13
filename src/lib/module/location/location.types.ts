export interface INewLocation {
    name: string;
    city: string;
    address: string;
}

export default interface ILocation extends INewLocation {
    _id: string;
}


export interface IPeople {
    name: string;
    gender: string;
    age: number;
    pets: Array<IPet>
}

export interface IPet {
    name: string;
    type: string;
}
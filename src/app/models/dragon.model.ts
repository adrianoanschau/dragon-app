export interface IDragon {
    id: string | null;
    name: string | null;
    type: string | null;
    createdAt?: Date;
}

export interface IDragonForm {
    name: string;
    type: string;
}

export class Dragon implements IDragon {
    id = null;
    name = null;
    type = null;
    createdAt = new Date();

    constructor(data?: Partial<IDragon>) {
        Object.assign(this, data);
    }
}

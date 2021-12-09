import { Person } from './person.model';

export interface People {
    count: number,
    next: string,
    previous: string,
    results: Person[]
}
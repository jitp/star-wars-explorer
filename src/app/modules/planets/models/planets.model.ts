import { Planet } from ".";

export interface Planets {
    count: number,
    next: string,
    previous: string,
    results: Planet[]
}
import { Person } from ".";

export interface PersonDetailsState {
    person: Person | null;
    loading: boolean;
}
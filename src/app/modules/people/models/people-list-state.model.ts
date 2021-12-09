import { Person } from './person.model';

export interface PeopleListState {
    persons: Person[];
    total: number;
    nextPage: string | null;
    previousPage: string | null;
    paginatorDisabled: boolean;
    loading: boolean
}
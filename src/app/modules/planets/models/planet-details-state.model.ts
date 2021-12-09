import { Planet } from '.';

export interface PlanetDetailsState {
  planet: Planet | null;
  loading: boolean;
}

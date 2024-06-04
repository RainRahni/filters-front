import {Criteria} from "./Criteria";

export interface Filter {
  filterName: string;
  criterias: Criteria[];
}

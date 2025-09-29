export * from "./builtin_stubs";

export class Entity {
  constructor() {
    throw new Error("use NewEntity() to create an Entity");
  }

  private _ID: string;
  public set ID(id: string) {
    throw new Error("use SetId() to update an ID to" + id);
  }
  public get ID(): string {
    return this._ID;
  }
}

export type PropertyValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | Entity
  | Entity[];

export type ReferenceValue = string | string[];

export interface Transaction {
  DatasetEntities: TxnDatasetEntities;
}

export type TxnDatasetEntities = Record<string, Entity[]>;
export type QueryResult = [string, string, Entity];

import { Query } from "./builtin_stubs";
export type SingleQueryResult = Entity[];
export function SQuery(
  startId: string,
  predicate: string,
  inverse: boolean,
  datasets?: string[],
): SingleQueryResult {
  const r = Query([startId], predicate, inverse, datasets);
  const out = new Array();
  r.forEach((item) => {
    out.push(item[2]);
  });
  return out;
}

export class PagedQueryQuery {
  StartURIs?: string[];
  Via?: string;
  Inverse?: boolean = false;
  Datasets?: string[];
  Continuations?: PagedQueryContinuation;
}
export type PagedQueryContinuation = string[];
export type PagedQueryCallbackFn = (page: QueryResult[]) => boolean;

export class DependencyRoot {
    private steps: Array<{type: string, nextDataset: string, predicate: string}> = [];

    hop(nextDataset: string, predicate: string): this {
        this.steps.push({ type: "hop", nextDataset, predicate });
        return this;
    }

    iHop(nextDataset: string, predicate: string): this {
        this.steps.push({ type: "iHop", nextDataset, predicate });
        return this;
    }

    getSteps() {
        return this.steps;
    }
}
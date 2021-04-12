import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Calculation {
  readonly id: string;
  readonly result?: number;
  readonly Users?: (User | null)[];
  constructor(init: ModelInit<Calculation>);
  static copyOf(source: Calculation, mutator: (draft: MutableModel<Calculation>) => MutableModel<Calculation> | void): Calculation;
}

export declare class User {
  readonly id: string;
  readonly calculationID?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}
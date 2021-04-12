// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Calculation, User } = initSchema(schema);

export {
  Calculation,
  User
};
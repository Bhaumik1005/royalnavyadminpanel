import { ModelDefinition } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entities';

export const modelDefination: ModelDefinition[] = [
  {
    name: 'User',
    schema: UserSchema,
  },
];

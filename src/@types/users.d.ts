import { User } from '@prisma/client';

type PublicUser = Omit<User, 'password'>;

import { User } from '@modules/auth/models';
export { User };

export class MockUser implements User {
    uid: string | undefined;
    username: string | undefined;
    id = '00000000-0000-0000-0000-000000000001';
    firstName = 'TEST_FIRST_NAME';
    lastName = 'TEST_LAST_NAME';
    email = 'TEST_EMAIL';
}

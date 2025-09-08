import { test , expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const email = 'testcyril@fake.com';
const password = 'myPassword';
test('get token', async ({ request }) => {
 const response = await request.post('/users/login',
    {
      data:
     {
   "email":email,
    "password": password
}
    }
  )

const responseBody = await response.json();
  console.log(responseBody.token);
  const envPath = path.resolve(__dirname, '../../../.env');  // ../ goes back to tests/api
  fs.writeFileSync(envPath, `API_TOKEN=${responseBody.token}`);

});

// cd ..
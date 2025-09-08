import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

const email = 'testcyril@fake.com';
const password = 'myPassword';

test('POST /users add users', async ({ request })=>
{
  // xlsx jar
  const firstName = "Dinesh";
  const lastName = "john";
  const email = `test${firstName}_${lastName}@fake.com`;
  const password = "myPassword";
  const response = await request.post('/users',
    {
      data:
     {
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "password": password
}
    }
  )
const responseBody = await response.json();
  console.log(responseBody);
  expect.soft(responseBody).toHaveProperty('user');
  expect.soft(responseBody).toHaveProperty('token');

  expect.soft(responseBody.user.firstName).toBe(firstName);
  expect.soft(responseBody.user.lastName).toBe('lastName');
  expect.soft(responseBody.user.email).toBe(email);
  
})

test('POST /users/me getProfile', async ({ request })=>
{
const responseMe = await request.get('/users/me', )

console.log(await responseMe.json());
}

)


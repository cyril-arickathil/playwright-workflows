import { test, expect } from "@playwright/test";

test('get /contacts getcontact', async ({ request })=>
{
const response = await request.get('/contacts', );
console.log(await response.json());
});

test('POST /contacts add contact', async ({ request })=>
{
  const response = await request.post('/contacts',
    {
      data:
      {
    "firstName": "sam",
    "lastName": "Doe",
    "birthdate": "1970-01-01",
    "email": "jdoe@fake.com",
    "phone": "8005555555",
    "street1": "1 Main St.",
    "street2": "Apartment A",
    "city": "Anytown",
    "stateProvince": "KS",
    "postalCode": "12345",
    "country": "USA"
}
    }
  )
})
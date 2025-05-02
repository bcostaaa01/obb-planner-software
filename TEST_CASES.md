### Test Data & Test Cases

This section describes the test data and test cases used to verify the main features of the OBB Trip Planner Software.

### Test Data

Sample trips (as found in frontend/src/mocks/trips.ts):

```typescript
export const trips = [
  {
    id: "1",
    startstation: "Salzburg Hbf",
    endstation: "Graz Hbf",
    starttime: "08:00",
    endtime: "12:00",
    price: 39.9,
    date: "2025-03-20",
    trainType: "RJX",
    duration: "4h 00min",
    transfers: 0,
    segments: [
      {
        trainType: "RJX",
        duration: "4h 00min",
        transfers: 0,
      },
    ],
  },
  {
    id: "2",
    startstation: "Graz Hbf",
    endstation: "Salzburg Hbf",
    starttime: "09:30",
    endtime: "12:00",
    price: 29.9,
    date: "2025-03-20",
    trainType: "RJ",
    duration: "2h 30min",
    transfers: 1,
    segments: [
      {
        trainType: "RJ",
        duration: "2h 30min",
        transfers: 1,
      },
      {
        trainType: "RJ",
        duration: "1h 30min",
        transfers: 1,
      },
    ],
  },
];
```

## Test Cases

### Authentication

#### Sign Up
- Register with a new email and password
- Attempt to register with an existing email

#### Login
- Login with correct credentials
- Login with incorrect password

### Trip Search

#### Search for a Trip
- Search for trips from "Salzburg Hbf" to "Graz Hbf" on "2025-03-20"
  - **Expected**: Trip with id "1" is returned
- Search for trips from "Graz Hbf" to "Salzburg Hbf" on "2025-03-20"
  - **Expected**: Trip with id "2" is returned
- Search for a trip on a date with no trips
  - **Expected**: No results

### Add to Cart & Purchase

#### Add Trip to Cart

Adding two different trips based on the direction (order of the above train stations in the test data):

- Add trip id "1" to cart
- Add trip id "2" to cart

#### Purchase Trip
- Purchase trip from cart
- Attempt to purchase the same trip twice

### My Trips Page

#### View Saved Trips
- After purchase, "My Trips" should list the purchased trip(s)

#### View Trip Ticket
- Click on a trip in "My Trips" to view the ticket and QR code

### User Settings

#### Change User Data
- Update user name, email, or language

### Language Switch

#### Switch Language

Change the language via the language switch component on the top navigation, or via the roouting:

- Change language to "de" and verify UI updates
- Change language to "en" and verify UI updates

### Notifications

#### Subscribe/Unsubscribe
- Subscribe to notifications for a trip

### Example User Flow
1. Sign up as a new user
2. Log in
3. Search for "Salzburg Hbf" → "Graz Hbf" on "2025-03-20"
4. Add trip id "1" to cart
5. Purchase trip
6. Go to "My Trips" and view the ticket
7. Subscribe to notifications
8. Change language to German

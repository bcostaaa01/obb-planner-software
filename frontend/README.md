# OBB Trip Planner Software

This is an application which allows the user to search for train trips in Austria, and add them to their personal trips. 

The user can:

- sign up and login
- search for trips (currently stored as dummy JSON objects for testing purposes)
- save trips in a user trips table in the database
- retrieve their saved trips in a "my trips" page
- change their user data in the user settings page
- change between English and German in the application
- open a ticket for a saved trip with an automatically generated QR code

## Tech Stack

- Vue 3 for the frontend
- Pinia for state management
- Vue Router for the routing + SPA
- TypeScript
- Node.js, Express for the backend and middleware
- Supabase for the BaaS (backend-as-a-service) functions and auth
- Postgres (in Supabase) for the database

## Instructions for running the application

1. Sign up to Supabase and create a project
2. Run the SQL migrations in the `/frontend/src/migrations` on the SQL editor in Supabase to create the tables
3. Copy the values from the project settings and add them to the .env variables in the `/frontend` package (`SUPABASE_URL` - project url, `SUPABASE_KEY` - anon key). Do the same for the `/backend`
4. Bundle the backend code with `npm run build` and then run the backend with `npm run start`
5. Create an account from the avatar on the top right side in the nav bar
6. Login to the app
7. Search for a trip (for now, there is one available from Salzburg Hbf to Graz Hbf on the 20/03/2025 which you can use - you can change or add more trips from the dummy JSON in the `frontend\src\mocks\trips.ts` file)
8. Select an available trip after submitting the search
9. Add it to the cart
10. Go through the trip buying process (it is just a dummy checkout process)
11. After the trip has been successfully added to the user_trips on Supabase, click on My Trips in the top navigation dropdown on click of the user avatar
12. Then click on the trip and you will have access to the trip ticket
13. If you click on the subscribe button, it will add a notification to the respective trip and then you will be able to see the update on the trip

## Architectural decisions

For the development of this project, I decided to follow the 3-layer model for the backend, and therefore have a "controller>service>repository" approach, and maintain a separation of concerns to have a clean architecture, and thus easier to scale and maintain in the future. For the frontend, I followed a component-based architecture, applying the same principles of encapsulation and separation of concerns as much as possible, to make it easier to scale the applications, and also to fix issues if they arise.
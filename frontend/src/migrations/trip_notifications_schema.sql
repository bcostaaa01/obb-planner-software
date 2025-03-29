-- Notifications table
create table notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  trip_id text not null,
  message text not null,
  severity text not null,
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- Trip subscriptions table (to track which users are subscribed to which trips)
create table trip_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  trip_id text not null,
  created_at timestamp with time zone default now(),
  unique(user_id, trip_id)
);
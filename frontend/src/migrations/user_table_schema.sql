CREATE TABLE user_data (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    -- Personal Details
    first_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip VARCHAR(20),
    phone VARCHAR(20),
    
    -- Customer Details
    discount VARCHAR(50),
    passenger_type VARCHAR(50),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Foreign key constraint to link with Supabase auth
    CONSTRAINT fk_user_id FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON user_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a function to check one row per auth user
CREATE OR REPLACE FUNCTION check_single_user_row_per_auth()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM user_data
        WHERE id = NEW.id
    ) THEN
        RAISE EXCEPTION 'A record for this user already exists';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger that runs before insert to ensure one row per auth user
CREATE TRIGGER ensure_single_user_per_auth
    BEFORE INSERT ON user_data
    FOR EACH ROW
    EXECUTE FUNCTION check_single_user_row_per_auth();
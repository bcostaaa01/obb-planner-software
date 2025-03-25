-- Create the user_trips table
CREATE TABLE public.user_trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Station and time information
    startstation VARCHAR(255) NOT NULL,
    endstation VARCHAR(255) NOT NULL,
    starttime TIME NOT NULL,
    endtime TIME NOT NULL,
    date DATE NOT NULL,
    
    -- Price and passenger information
    price DECIMAL(10,2) NOT NULL,
    passengercount INTEGER NOT NULL,
    passengertype VARCHAR(50) NOT NULL,
    passengerdiscount VARCHAR(50),
    
    -- Trip segments and status
    segments JSONB[] NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_price CHECK (price >= 0),
    CONSTRAINT valid_passengercount CHECK (passengercount > 0)
);

-- Create indexes for better query performance
CREATE INDEX idx_user_trips_user_id ON public.user_trips(user_id);
CREATE INDEX idx_user_trips_stations ON public.user_trips(startstation, endstation);
CREATE INDEX idx_user_trips_date ON public.user_trips(date);
CREATE INDEX idx_user_trips_status ON public.user_trips(status);

-- Add table and column comments
COMMENT ON TABLE public.user_trips IS 'Stores train trip information including routes, times, and passenger details';
COMMENT ON COLUMN public.user_trips.segments IS 'Array of JSON objects containing train segments with type, duration, and transfers';
COMMENT ON COLUMN public.user_trips.passengertype IS 'Type of passenger (adult, child, senior, etc.)';
COMMENT ON COLUMN public.user_trips.passengerdiscount IS 'Applied discount type if any';

-- Enable RLS
ALTER TABLE public.user_trips ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own trips"
    ON public.user_trips
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trips"
    ON public.user_trips
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips"
    ON public.user_trips
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips"
    ON public.user_trips
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.user_trips
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime('updated_at');
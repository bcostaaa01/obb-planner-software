CREATE TABLE user_trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    start_station VARCHAR(255) NOT NULL,
    end_station VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Passenger information
    passenger_count INTEGER NOT NULL,
    passenger_type VARCHAR(50) NOT NULL,
    passenger_discount VARCHAR(50),
    
    -- Trip segments
    segments JSONB[] NOT NULL,
    
    -- Additional metadata
    date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    
    -- Constraints
    CONSTRAINT valid_price CHECK (price >= 0),
    CONSTRAINT valid_passenger_count CHECK (passenger_count > 0)
);

-- Index for common queries
CREATE INDEX idx_trips_stations ON trips(start_station, end_station);
CREATE INDEX idx_trips_date ON trips(date);
CREATE INDEX idx_trips_status ON trips(status);

-- Comments for better documentation
COMMENT ON TABLE trips IS 'Stores train trip information including routes, times, and passenger details';
COMMENT ON COLUMN trips.segments IS 'Array of JSON objects containing train segments with type, duration, and transfers';
COMMENT ON COLUMN trips.passenger_type IS 'Type of passenger (adult, child, senior, etc.)';
COMMENT ON COLUMN trips.passenger_discount IS 'Applied discount type if any';
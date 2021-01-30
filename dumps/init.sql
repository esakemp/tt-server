CREATE TABLE measurements (
    id SERIAL PRIMARY KEY,
    measurement_name varchar NOT NULL,
    unit varchar NOT NULL,
    lowerbound integer NOT NULL,
    upperbound integer NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp
);

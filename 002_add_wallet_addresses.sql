-- Add wallet_address column to rsvps and wristbands tables
ALTER TABLE rsvps ADD COLUMN wallet_address TEXT;

ALTER TABLE wristbands ADD COLUMN wallet_address TEXT;

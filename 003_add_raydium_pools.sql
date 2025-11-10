-- Create Raydium pools table for anchoring system
CREATE TABLE IF NOT EXISTS raydium_pools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  apy REAL NOT NULL,
  tvl REAL NOT NULL,
  volume_24h REAL NOT NULL,
  fee REAL NOT NULL,
  risk TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  pool_address TEXT NOT NULL,
  token_a_symbol TEXT NOT NULL,
  token_a_address TEXT NOT NULL,
  token_b_symbol TEXT NOT NULL,
  token_b_address TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create anchoring transactions table
CREATE TABLE IF NOT EXISTS anchoring_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wallet_address TEXT NOT NULL,
  pool_id TEXT NOT NULL,
  amount REAL NOT NULL,
  relief_allocation REAL NOT NULL,
  raydium_allocation REAL NOT NULL,
  transaction_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pool_id) REFERENCES raydium_pools (id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_raydium_pools_updated_at ON raydium_pools (updated_at);
CREATE INDEX IF NOT EXISTS idx_anchoring_transactions_wallet ON anchoring_transactions (wallet_address);
CREATE INDEX IF NOT EXISTS idx_anchoring_transactions_pool ON anchoring_transactions (pool_id);

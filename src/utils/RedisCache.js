class RedisCache {
  constructor() {
    this.redis = new Redis();
  }

  /**
   * Sets a value in the cache with a specified TTL (Time to Live).
   * If no TTL is provided, it defaults to 60 seconds.
   * @param {string} key - The key for the cached item.
   * @param {*} value - The value to cache.
   * @param {number} [ttl=60] - Time to live in seconds .
   */
  async set(key, value, ttl) {
    if (ttl == null) this.redis.set(key, JSON.stringify(value), 'EX');
    else await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  /**
   * Gets a value from the cache.
   * @param {string} key - The key for the cached item.
   * @returns {*} - The cached value or null if not found or expired.
   */
  async get(key) {
    const cachedValue = await this.redis.get(key);
    return cachedValue ? JSON.parse(cachedValue) : null;
  }

  /**
   * Clears a specific key from the cache.
   * @param {string} key - The key to delete from the cache.
   */
  async delete(key) {
    await this.redis.del(key);
  }

  /**
   * Clears all keys from the cache (use with caution).
   */
  async clear() {
    await this.redis.flushall();
  }
}

module.exports = RedisCache;

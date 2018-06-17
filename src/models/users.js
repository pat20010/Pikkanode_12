module.exports = {
  async createEntity (row) {
    if (!row.id) { return {} }

    return {
      id: row.id,
      name: row.name
    }
  },

  async findAll (pool) {
    const [rows] = await pool.query(`SELECT * FROM users`)
    return rows
  },

  async findById (pool, id) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id])
    return rows
  },

  async findByEmail (pool, email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
    return rows
  },

  async removeById (pool, id) {
    const [rowsRemove] = await pool.query(`DELETE FROM users WHERE id = ?`, [id])
    return rowsRemove
  },

  async insertUsers (pool, email, password) {
    const rowInsert = await pool.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password])
    return rowInsert
  }
}

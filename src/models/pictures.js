module.exports = {

  async createEntity (row) {
    if (!row.id) { return {} }

    return {
      id: row.id
    }
  },

  async findAll (pool) {
    const [rows] = await pool.query(`SELECT * FROM pictures`)
    console.log(rows)
    return rows
  },

  async findById (pool, id) {
    const [rows] = await pool.query(`SELECT * FROM pictures WHERE id = ?`, [id])
    return rows
  },

  async removeById (pool, id) {
    const [rowsRemove] = await pool.query(`DELETE FROM pictures WHERE id = ?`, [id])
    return rowsRemove
  },

  async insertPictures (pool, id, caption, createdBy) {
    const rowInsert = await pool.query(`INSERT INTO pictures (id, caption, created_by) VALUES (?, ?, ?)`, [id, caption, createdBy])
    return rowInsert
  }
}

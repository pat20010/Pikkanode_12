const pool = require('../config/connectDB')

async function getAllPictureData () {
  const result = await pool.query(`
    SELECT * 
    FROM pictures
    `)

  return result[0]
}

async function getPictureDataById (id) {
  const result = await pool.query(`
    SELECT * 
    FROM pictures 
    WHERE id = ?
    `, [id])

  return result[0]
}

async function removePictureById (id) {
  const result = await pool.query(`
    DELETE 
    FROM pictures 
    WHERE id = ?
    `, [id])

  return result[0]
}

async function insertPicture (id, caption, createdBy) {
  const result = await pool.query(`
    INSERT INTO pictures (id, caption, created_by) 
    VALUES (?, ?, ?)
    `, [id, caption, createdBy])

  return result[0]
}

module.exports = {
  getAllPictureData,
  getPictureDataById,
  removePictureById,
  insertPicture
}

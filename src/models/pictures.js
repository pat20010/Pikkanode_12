const pool = require('../config/connectDB')

async function getAllPictureData () {
  const result = await pool.query(`
    SELECT * 
    FROM pictures
    `)

  return result[0]
}

async function getPictureCommentLikeData () {
  const result = await pool.query(`
    SELECT p.id, p.caption, p.created_at, u.email as created_by, 
    COUNT(c.picture_id) as comment_count,
    COUNT(l.picture_id) as like_count 
    FROM pikkanode.pictures p JOIN pikkanode.users u 
    ON p.created_by = u.id 
    LEFT JOIN pikkanode.comments c 
    ON p.id = c.picture_id 
    LEFT JOIN pikkanode.likes l 
    ON l.user_id = u.id 
    GROUP BY p.id`)

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
  await pool.query(`
    INSERT INTO pictures (id, caption, created_by) 
    VALUES (?, ?, ?)
    `, [id, caption, createdBy])

  return id
}

async function getPictureCreateDateById (id) {
  const result = await pool.query(`
    SELECT created_at 
    FROM pictures 
    WHERE id = ?
    `, [id])

  return result[0]
}

module.exports = {
  getAllPictureData,
  getPictureCommentLikeData,
  getPictureDataById,
  removePictureById,
  insertPicture,
  getPictureCreateDateById
}

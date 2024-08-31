const crypto = require('crypto');
const pool = require('../database')

function encryptLink(link, maxLength = 20) {
  const hashBuffer = crypto.createHash('sha256').update(link).digest(); 
  const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let num = BigInt('0x' + hashBuffer.toString('hex')); 

  let base62 = '';
  while (num > 0n) {
      base62 = base62Chars[num % 62n] + base62; 
      num /= 62n;
  }

  return base62.slice(0, maxLength); 
}

const bookController = {
    redirectToDestination: async(req, res) => {
        try {
            const source = req.params.source;
            const { rows, fields } = await pool.sql`SELECT * FROM Links WHERE source =${source};`;
            res.redirect(rows[0].destination);
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    createSource: async(req, res) => {
        try {
            const { destination } = req.body
            const source = encryptLink(destination)
            const { rows } = await pool.sql`INSERT INTO Links(source, destination) VALUES(${source}, ${destination}) RETURNING *;`;
            res.json({msg: "OK", data: rows[0]})
        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

module.exports = bookController
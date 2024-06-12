const db = require('../db');
const { generateToken, calculateDays } = require('../utils/tokenUtils');

const generateTokenController = (req, res) => {
  const { meter_number, amount } = req.body;

  if (!meter_number || meter_number.toString().length !== 6) {
    return res.status(400).json({ message: 'Meter number must be 6 digits.' });
  }

  if (amount < 100 || amount % 100 !== 0) {
    return res.status(400).json({ message: 'Amount must be a multiple of 100 Rwf and at least 100 Rwf.' });
  }

  const days = calculateDays(amount);
  if (days > 1825) {
    return res.status(400).json({ message: 'Amount exceeds the maximum limit of 5 years of electricity.' });
  }

  const token = generateToken();

  db.query('SELECT id FROM meters WHERE meter_number = ?', [meter_number], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length === 0) {
      db.query('INSERT INTO meters (meter_number) VALUES (?)', [meter_number], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error.' });
        }
        const meter_id = result.insertId;
        db.query('INSERT INTO tokens (meter_id, token, days, amount) VALUES (?, ?, ?, ?)', 
          [meter_id, token, days, amount], (err) => {
            if (err) {
              return res.status(500).json({ message: 'Database error.' });
            }
            res.status(201).json({ meter_number, amount, token, days });
          });
      });
    } else {
      const meter_id = results[0].id;
      db.query('INSERT INTO tokens (meter_id, token, days, amount) VALUES (?, ?, ?, ?)', 
        [meter_id, token, days, amount], (err) => {
          if (err) {
            return res.status(500).json({ message: 'Database error.' });
          }
          res.status(201).json({ meter_number, amount, token, days });
        });
    }
  });
};

const validateTokenController = (req, res) => {
  const { meter_number, token } = req.body;

  if (!meter_number || meter_number.toString().length !== 6) {
    return res.status(400).json({ message: 'Meter number must be 6 digits.' });
  }

  if (!token || token.toString().length !== 8) {
    return res.status(400).json({ message: 'Token must be 8 digits.' });
  }

  db.query(
    `SELECT t.days, t.amount, t.created_at FROM tokens t
     JOIN meters m ON t.meter_id = m.id 
     WHERE m.meter_number = ? AND t.token = ?`,
    [meter_number, token], 
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Token not found.' });
      }
      res.status(200).json(results[0]);
    }
  );
};

const getTokensByMeterNumberController = (req, res) => {
  const { meter_number } = req.params;

  if (!meter_number || meter_number.toString().length !== 6) {
    return res.status(400).json({ message: 'Meter number must be 6 digits.' });
  }

  db.query(
    `SELECT t.token, t.days, t.amount, t.created_at FROM tokens t
     JOIN meters m ON t.meter_id = m.id 
     WHERE m.meter_number = ?`,
    [meter_number], 
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error.' });
      }
      res.status(200).json(results);
    }
  );
};

module.exports = {
  generateTokenController,
  validateTokenController,
  getTokensByMeterNumberController
};

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'FlavorFit'
});

export const saveUserInfo = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  DOB: string;
  age: number;
  medicalconcerns: string;
  allergies: string;
  dietarypreferences: string;
}) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO userinformation VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        userData.firstname,
        userData.lastname,
        userData.email,
        userData.password,
        userData.DOB,
        userData.age,
        userData.medicalconcerns,
        userData.allergies,
        userData.dietarypreferences
      ]
    );
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM userinformation WHERE email = ?',
      [email]
    );
    return rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
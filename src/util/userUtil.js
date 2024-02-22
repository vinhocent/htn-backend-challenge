
import db from "../database/db.js"



export const getAllUsers = async (req, res) => {
  const query = `
      SELECT u.name AS user_name, u.email, u.phone, u.company,
             s.name AS skill_name, us.rating
      FROM user u
      JOIN user_skills us ON u.id = us.userID
      JOIN skills s ON us.skillID = s.id
  `;


    // Execute the query
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error retrieving users with skills:', err);
            res.status(500).send('Internal Server Error');
            return;
        }


        // Group skills by user
        const usersWithSkills = {};
        rows.forEach(row => {
            const { user_name, email, phone, company, skill_name, rating } = row;
            if (!usersWithSkills[user_name]) {
                usersWithSkills[user_name] = { user_name, email, phone, company, skills: [] };
            }
            usersWithSkills[user_name].skills.push({ skill_name, rating });
        });

        // Convert object to array
        const formattedData = Object.values(usersWithSkills);

        // Send the formatted data as a JSON response
        res.json(formattedData);
    });
}
5
export const getUser = async (req, res) => {
  const query = `
      SELECT u.*, s.name AS skill_name, us.rating
      FROM user u
      JOIN user_skills us ON u.id = us.userID
      JOIN skills s ON us.skillID = s.id
      WHERE u.id = ?
  `;

    // Execute the query
    db.all(query, [req.params.userID], (err, rows) => {
        if (err) {
            console.error('Error retrieving users with skills:', err);
            res.status(500).send('Internal Server Error');
            return;
        }


        if (rows.length === 0) {
            res.status(404).send('Data not found for the specified user');

            return;
        }

        // Format the data
        const userData = {
            user: {
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email,
                phone: rows[0].phone,
                company: rows[0].company
            },
            skills: rows.map(row => ({
                name: row.skill_name,
                rating: row.rating
            }))
        };

        // Send the formatted data as a JSON response
        res.json(userData);
    });
}

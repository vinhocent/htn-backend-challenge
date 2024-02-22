import db from "../database/db.js";

export const getSkills = async (req, res) => {
    const { min_frequency, max_frequency } = req.query;

    let query = `
        SELECT s.name AS skill_name, COUNT(us.userID) AS num_users
        FROM skills s
        LEFT JOIN user_skills us ON s.id = us.skillID
        GROUP BY s.name
    `;

    if (min_frequency !== undefined || max_frequency !== undefined) {
        query += ' HAVING ';
        if (min_frequency !== undefined) {
            query += `COUNT(us.userID) >= ${min_frequency}`;
        }
        if (min_frequency !== undefined && max_frequency !== undefined) {
            query += ' AND ';
        }
        if (max_frequency !== undefined) {
            query += `COUNT(us.userID) <= ${max_frequency}`;
        }
    }

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error retrieving skills:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(rows);
    });
}

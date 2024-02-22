import db from "../database/db.js";

export const getSkills = async (req, res) => {
    const minFrequency = req.query.min_frequency;
    const maxFrequency = req.query.max_frequency;
    let query = `
        SELECT s.name AS skill_name, COUNT(us.userID) AS num_users
        FROM skills s
        LEFT JOIN user_skills us ON s.id = us.skillID
        GROUP BY s.name
    `;

    if (minFrequency == undefined) {
        minFrequency = 0
    }

    if (maxFrequency !== undefined) {
      maxFrequency = Number.MAX_SAFE_INTEGER
    }
    query += `HAVING (COUNT(us.skillID) >= ${minFrequency} AND COUNT(us.skillID) <= ${maxFrequency})`


    db.all(
        query, [minFrequency,maxFrequency],
        (err, rows) => {
            if (err) {
            console.error('Error retrieving skills:', err);
            res.status(500).send('Internal Server Error');
            return;
            }

            res.json(rows);
        }
    )
}

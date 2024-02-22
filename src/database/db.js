import sqlite3 from 'sqlite3';
import fs from 'fs';

const DBSOURCE = "hackers.db";

// Read the JSON file synchronously
const rawData = fs.readFileSync('HTN_2023_BE_Challenge_Data.json');
const userData = JSON.parse(rawData);

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            company TEXT,
            email TEXT ,
            phone TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating userTable:', err);
            } else {
                console.log('Created userTable');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE
        )`, (err) => {
            if (err) {
                console.error('Error creating skillsTable:', err);
            } else {
                console.log('Created skillsTable');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS user_skills (
            userID INTEGER,
            skillID INTEGER,
            rating INTEGER,
            CONSTRAINT userToSkill PRIMARY KEY (userID, skillID),
            FOREIGN KEY (userID) REFERENCES user(id),
            FOREIGN KEY (skillID) REFERENCES skills(id)
        )`, (err) => {
            if (err) {
                console.error('Error creating userSkillsTable:', err);
            } else {
                console.log('Created userSkillsTable');

                db.serialize(() => {
                    userData.forEach(user => {
                        db.run('INSERT INTO user (name, company, email, phone) VALUES (?, ?, ?, ?)', [user.name, user.company, user.email, user.phone], function (err) {
                            if (err) {
                                console.error('Error inserting user:', err);
                                return;
                            }
                            const userID = this.lastID; // Get the ID of the inserted user
                            user.skills.forEach(skill => {
                                // Insert skills if they don't exist
                                db.run('INSERT OR IGNORE INTO skills (name) VALUES (?)', [skill.skill], function (err) {
                                    if (err) {
                                        console.error('Error inserting skill:', err);
                                        return;
                                    }
                                    const skillID = this.lastID; // Get the ID of the inserted skill
                                    // Insert into user_skills table
                                    db.run('INSERT INTO user_skills (userID, skillID, rating) VALUES (?, ?, ?)', [userID, skillID, skill.rating], function (err) {
                                        if (err) {
                                            console.error('Error inserting user_skill:', err);
                                            return;
                                        }
                                        console.log(`Inserted user_skill: userID=${userID}, skillID=${skillID}, rating=${skill.rating}`);
                                    });
                                });
                            });
                        });
                    });
                });
            }
        });
    }
});

export default db;

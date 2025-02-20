const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET route to get all hosting information
router.get('/', async (req, res) => {
    try {
        const allHostingInfo = await pool.query(`
        SELECT 
        "hosting_request"."id" AS "request_id",
        "hosting_request"."start_date" AS "request_start_date",
        "hosting_request"."end_date" AS "request_end_date",
        "hosting_request"."date_comments",
        "volunteer_hosting"."start_date" AS "volunteer_start_date",
        "volunteer_hosting"."end_date" AS "volunteer_end_date",
        "volunteer_hosting"."comments" AS "volunteer_comments",
        "host_status"."status",
        "dogs"."dog_name",
        "photo_latest"."photo",
        "raiser"."name" AS "raiser_name",
        "raiser"."id" AS "raiser_id",
        "sitter"."name" AS "sitter_name",
        "sitter"."id" AS "sitter_id"
    FROM 
        "hosting_request"
    JOIN 
        "volunteer_hosting" ON "hosting_request"."id" = "volunteer_hosting"."request_id"
    JOIN 
        "host_status" ON "volunteer_hosting"."id" = "host_status"."volunteer_request_id"
    JOIN 
        "dogs" ON "hosting_request"."dog_id" = "dogs"."id"
    JOIN 
        "user" AS "raiser" ON "dogs"."user_id" = "raiser"."id"
    JOIN
        "user" AS "sitter" ON "volunteer_hosting"."user_id" = "sitter"."id"
    LEFT JOIN LATERAL (
        SELECT 
            "photo"."photo"
        FROM 
            "photo"
        WHERE 
            "photo"."dog_id" = "dogs"."id"
        ORDER BY 
            "photo"."id" DESC
        LIMIT 1
    ) AS "photo_latest" ON TRUE;
        `);
  
        res.json(allHostingInfo.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
  });


  module.exports = router;
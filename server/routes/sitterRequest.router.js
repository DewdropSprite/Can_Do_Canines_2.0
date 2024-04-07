const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // This endpoint doesn't require authentication to see all dog hosting requests
  let sqlText = `
      SELECT
        "hosting_request"."id" AS "requestId",
        "hosting_request"."dog_id",
        "hosting_request"."start_date",
        "hosting_request"."end_date",
        "hosting_request"."date_comments",
        "hosting_request"."appointments",
        "dogs"."dog_name" AS "dog_name",
        "user"."name" AS "user_name",
        "photo"."photo" AS "photo",
        "host_status"."status" AS "confirmation_status"    
        FROM
        "hosting_request"
      JOIN
        "dogs" ON "hosting_request"."dog_id" = "dogs"."id"
      JOIN
        "user" ON "dogs"."user_id" = "user"."id"
      LEFT JOIN LATERAL (
          SELECT "photo"."photo" FROM "photo" WHERE "photo"."dog_id" = "dogs"."id"
          ORDER BY "photo"."id" DESC
          LIMIT 1) "photo" ON true
      LEFT JOIN
        "host_status" ON "hosting_request"."id" = "host_status"."volunteer_request_id"
        WHERE
        "host_status"."status" IS NULL OR "host_status"."status" = false;
    `;

  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("Error fetching all dog hosting requests", error);
      res.sendStatus(500);
    });
});

module.exports = router;

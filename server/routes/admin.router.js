const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const sqlText = 
`
SELECT 
  "volunteer_hosting"."id" AS "volunteer_id",
  "volunteer_hosting"."user_id" AS "volunteer_user_id",
  "dogs"."dog_name",
  "volunteer_hosting"."request_id",
  "hosting_request"."start_date" AS "host_start_date",
  "hosting_request"."end_date" AS "host_end_date",
  "volunteer_hosting"."start_date" AS "volunteer_start_date",
  "volunteer_hosting"."end_date" AS "volunteer_end_date",
  "volunteer_user"."name" AS "volunteer_name",
  "volunteer_user"."email" AS "volunteer_email",
  "host_user"."name" AS "host_name",
  "host_user"."id",
  "photo"."photo" AS "photo",
  "host_status"."status" AS "status"
FROM
  "volunteer_hosting"
JOIN
  "host_status" ON "volunteer_hosting"."id" = "host_status"."volunteer_request_id"
JOIN 
  "user" AS "volunteer_user" ON "volunteer_hosting"."user_id" = "volunteer_user"."id"
JOIN 
  "hosting_request" ON "volunteer_hosting"."request_id" = "hosting_request"."id"
JOIN 
  "dogs" ON "hosting_request"."dog_id" = "dogs"."id"
JOIN 
  "user" AS "host_user" ON "dogs"."user_id" = "host_user"."id"
  LEFT JOIN LATERAL (
    SELECT "photo"."photo" FROM "photo" WHERE "photo"."dog_id" = "dogs"."id"
    ORDER BY "photo"."id" DESC
    LIMIT 1) "photo" ON true;
`

  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("Error fetching user's dogs with SQL:", error);
      res.sendStatus(500); // Send a server error status code
    });
});

/**
 * PUT route to update the status column on "hosting_status" table
 *  the :id here is the hostingId of the corresponding request (volunteer_request_id)
 */
router.put("/:id", async (req, res) => {
  console.log(req.body)
  const hostId = req.params.id;
  const sqlText = `
    UPDATE "host_status"
    SET 
        "status" = $1
    WHERE "id" = $2;
  `;

    
  const status = req.body.status;
  const sqlParams = [status, hostId];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      console.log("success!");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;

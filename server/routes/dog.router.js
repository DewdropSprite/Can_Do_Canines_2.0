const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/**
 * MULTER storage setup
 */
const storage = multer.diskStorage({
  destination: (__dirname, "../..", "public/Images/"),
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Math.round(Math.random() * 999) +
        "-" +
        file.originalname
    );
  },
});

/**
 * MULTER configuration
 */
const upload = multer({ storage: storage });


/**
 * GET route to retrieve the "dog" table from the DB
 */
router.get("/", async (req, res) => {
  console.log("/dog GET route ");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const userId = req.user.id;

      const query = `
      SELECT
      "dogs"."id",
      "dogs"."user_id",
      "dogs"."dog_name", 
      "dogs"."age", 
      "dogs"."breed", 
      "dogs"."spayed_neutered", 
      "dogs"."food_type", 
      "dogs"."food_amount", 
      "dogs"."meals_per_day", 
      "dogs"."eating_times", 
      "dogs"."medical_conditions", 
      "dogs"."recovering_from_surgery", 
      "dogs"."medications", 
      "dogs"."in_heat", 
      "dogs"."potty_routine", 
      "dogs"."potty_habits_notes", 
      "dogs"."limit_water",
      "dogs"."limit_toy_play",
      "dogs"."watch_carefully",
      "dogs"."ingest_toys",
      "dogs"."keep_away",
      "dogs"."shares_toys", 
      "exercise_equipment"."exercise_equipment", 
      "dogs"."crate_manners", 
      "dogs"."house_manners", 
      "dogs"."living_with_other_dogs", 
      "dogs"."living_with_cats", 
      "living_with_children_ten_and_up",
      "living_with_children_younger_ten", 
      "dogs"."living_with_adults", 
      "dogs"."living_with_small_animals", 
      "dogs"."living_with_large_animals", 
      "behavior_dog"."behavior_category_name" AS "behavior_with_other_dogs",
      "behavior_cat"."behavior_category_name" AS "behavior_with_cats",
      "behavior_child"."behavior_category_name" AS "behavior_with_children"
  FROM 
      "dogs"
  
  JOIN 
      "exercise_equipment" AS "exercise_equipment" ON "dogs"."exercise_equipment" = "exercise_equipment"."id"
  JOIN 
      "behavior" AS "behavior_dog" ON "dogs"."behavior_with_other_dogs" = "behavior_dog"."id"
  JOIN 
      "behavior" AS "behavior_cat" ON "dogs"."behavior_with_cats" = "behavior_cat"."id"
  JOIN 
      "behavior" AS "behavior_child" ON "dogs"."behavior_with_children" = "behavior_child"."id"
  WHERE
      "dogs"."user_id" = $1;
            `;

      const result = await connection.query(query, [userId]);
      const dogsResult = result.rows;
      console.log(dogsResult);
      res.json(dogsResult);
    } catch (error) {
      console.error("error fetching dogs", error);
      res.sendStatus(500);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } else {
    res.sendStatus(403);
  }
});

/**
 * GET route to retrieve a single dog from "dogs" table from the DB
 * The dog's ID is passed as a URL parameter named 'id'
 */
router.get("/:id", async (req, res) => {
  console.log("/dog/:id GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    let connection;
    try {
      connection = await pool.connect();
      const dogId = req.params.id;

      console.log("dogId server", dogId);
      const query = `SELECT
        "dogs"."user_id",
        
        "dogs"."dog_name", 
        "dogs"."age", 
        "breed"."breed" as "breed", 
        "dogs"."breed" as "breed_id",
        "dogs"."spayed_neutered", 
        "food_type"."food_type" AS "food_type", 
        "dogs"."food_type" AS "food_type_id",
        "dogs"."food_amount", 
        "dogs"."meals_per_day", 
        "dogs"."eating_times", 
        "dogs"."medical_conditions", 
        "dogs"."recovering_from_surgery", 
        "dogs"."medications", 
        "in_heat"."in_heat", 
        "dogs"."in_heat" AS "in_heat_id",
        "dogs"."potty_routine", 
        "dogs"."potty_habits_notes",  
        "dogs"."limit_water",
        "dogs"."limit_toy_play",
        "dogs"."watch_carefully",
        "dogs"."ingest_toys",
        "dogs"."keep_away",
        "dogs"."shares_toys",
        "exercise_equipment"."exercise_equipment", 
        "dogs"."exercise_equipment" AS "exercise_equipment_id", 
        "dogs"."crate_manners", 
        "dogs"."house_manners", 
        "dogs"."living_with_other_dogs", 
        "dogs"."living_with_cats", 
        "living_with_children_ten_and_up",
        "living_with_children_younger_ten", 
        "dogs"."living_with_adults", 
        "dogs"."living_with_small_animals", 
        "dogs"."living_with_large_animals", 
        "behavior_dog"."behavior_category_name" AS "behavior_with_other_dogs",
        "dogs"."behavior_with_other_dogs" AS "behavior_with_other_dogs_id",
        "behavior_cat"."behavior_category_name" AS "behavior_with_cats",
        "dogs"."behavior_with_cats" AS  "behavior_with_cats_id",
        "behavior_child"."behavior_category_name" AS "behavior_with_children",
        "dogs"."behavior_with_children" AS "behavior_with_children_id",
        "photo"."photo" AS "photo"
    FROM 
        "dogs"
    JOIN
        "food_type" AS "food_type" ON "dogs"."food_type" = "food_type"."id"
    JOIN 
        "breed" AS "breed" ON "dogs"."breed" = "breed"."id"
   Join
        "exercise_equipment" AS "exercise_equipment" ON "dogs"."exercise_equipment" = "exercise_equipment"."id"
    JOIN 
        "behavior" AS "behavior_dog" ON "dogs"."behavior_with_other_dogs" = "behavior_dog"."id"
    JOIN 
        "behavior" AS "behavior_cat" ON "dogs"."behavior_with_cats" = "behavior_cat"."id"
    JOIN 
        "behavior" AS "behavior_child" ON "dogs"."behavior_with_children" = "behavior_child"."id"
    JOIN "in_heat" AS "in_heat" ON "dogs"."in_heat" = "in_heat"."id"
    LEFT JOIN LATERAL (
      SELECT "photo"."photo" FROM "photo" WHERE "photo"."dog_id" = "dogs"."id"
      ORDER BY "photo"."id" DESC
      LIMIT 1) "photo" ON true
        WHERE
        "dogs"."id" = $1;
        `;
      const result = await connection.query(query, [dogId]);
      const dog = result.rows[0];

      console.log("dog result.rows", dog);

      if (dog) {
        res.json(dog);
      } else {
        res.status(404).send("Dog not found");
      }
    } catch (error) {
      console.error("Error fetching dog", error);
      res.sendStatus(500);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } else {
    res.sendStatus(403);
  }
});

/**
 * POST route to create a new dog profile
 */
router.post("/", (req, res) => {
  console.log("/dog POST router");
  console.log("req body", req.body);
  console.log("Is authenticated?", req.isUnauthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()) {
    const user = req.user.id;

    const dogData = [
      req.user.id,
      req.body.dog_name,
      req.body.age,
      req.body.breed,
      req.body.spayed_neutered,
      req.body.food_type,
      req.body.food_amount,
      req.body.meals_per_day,
      req.body.eating_times,
      req.body.medical_conditions,
      req.body.recovering_from_surgery,
      req.body.medications,
      req.body.in_heat,
      req.body.potty_routine,
      req.body.potty_habits_notes,
      req.body.limit_water,
      req.body.limit_toy_play,
      req.body.watch_carefully,
      req.body.ingest_toys,
      req.body.keep_away,
      req.body.shares_toys,
      req.body.exercise_equipment,
      req.body.crate_manners,
      req.body.house_manners,
      req.body.living_with_other_dogs,
      req.body.living_with_cats,
      req.body.living_with_children_ten_and_up,
      req.body.living_with_children_younger_ten,
      req.body.living_with_adults,
      req.body.living_with_small_animals,
      req.body.living_with_large_animals,
      req.body.behavior_with_other_dogs,
      req.body.behavior_with_cats,
      req.body.behavior_with_children,
    ];

    console.log("dog data", dogData);
    console.log("req.user.id", user);

    const queryText = `
            INSERT INTO "dogs" (
                "user_id",
                "dog_name",
                "age",
                "breed",
                "spayed_neutered",
                "food_type",
                "food_amount",
                "meals_per_day",
                "eating_times",
                "medical_conditions",
                "recovering_from_surgery",
                "medications",
                "in_heat",
                "potty_routine",
                "potty_habits_notes",
                "limit_water",
                "limit_toy_play",
                "watch_carefully",
                "ingest_toys",
                "keep_away",
                "shares_toys",
                "exercise_equipment",
                "crate_manners",
                "house_manners",
                "living_with_other_dogs",
                "living_with_cats",
                "living_with_children_ten_and_up",
                "living_with_children_younger_ten",
                "living_with_adults",
                "living_with_small_animals",
                "living_with_large_animals",
                "behavior_with_other_dogs",
                "behavior_with_cats",
                "behavior_with_children")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34);
            `;

    pool
      .query(queryText, dogData)
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.log("Adding a dog failed", error);
        res.sendStatus(500);
      });
  }
});

/**
 * DELETE route to delete a dog profile
 * This route also handles deleting the profile photo from disk storage
 */
router.delete("/:id", async (req, res) => {
  const dogId = req.params.id;
  if (!req.isAuthenticated()) {
    return res.status(403).send("Not authenticated");
  }
  let connection;

  try {
    const connection = await pool.connect();
    await connection.query("BEGIN");

    // Query for the photo path before deletion
    const photoQuery = `SELECT "photo" FROM "photo" WHERE "dog_id" = $1`;
    const photoRes = await connection.query(photoQuery, [dogId]);

    if (photoRes.rows.length > 0) {
      const photoPath = photoRes.rows[0].photo;
      const fullPath = path.join(__dirname, "../..", "public", photoPath);
      // Attempt to delete the photo file
      try {
        fs.unlinkSync(fullPath);
        console.log("Successfully deleted photo:", fullPath);
      } catch (err) {
        console.error("Failed to delete photo", err);
      }
    } else {
      console.log("No Photo found for dogId:", dogId);
    }

    // Delete the dog profile
    const deleteDogQuery = `DELETE FROM "dogs" WHERE "id" = $1;`;
    await connection.query(deleteDogQuery, [dogId]);
    await connection.query("COMMIT");

    connection.release();
    res.sendStatus(200);
  } catch (error) {
    try {
      await connection.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Rollback Error:", rollbackError);
    }

    console.log("Failed to delete dog profile", error);
    res.sendStatus(500);
  }
});

/**
 * POST request handles adding a profile picture in the "photo" table. 
 * It also deletes the old photo from disk storage if a user decides do change the picture.
 */
router.post("/photo/:id", upload.single("photo"), async (req, res) => {
  if (req.isAuthenticated()) {
    let connection;

    const dogId = req.params.id;
    const photoUrl = req.file ? `/Images/${req.file.filename}` : null;

    if (!photoUrl) {
      return res.status(400).send({ message: "No photo uploaded" });
    }

    try {
      connection = await pool.connect();

      const existingPhotoQuery = `SELECT "photo" FROM "photo" WHERE "dog_id" = $1`;
      const { rows } = await connection.query(existingPhotoQuery, [dogId]);
      if (rows.length > 0) {
        const oldPhotoPath = rows[0].photo;
        const fullPath = path.join(__dirname, "../..", "public", oldPhotoPath);

        // Delete the old photo file from the filesystem
        try {
          fs.unlinkSync(fullPath);
          console.log("Successfully deleted old photo:", fullPath);
        } catch (err) {
          console.error("Failed to delete old photo:", err);
        }
      }

      const queryText = `
    INSERT INTO "photo"("dog_id", "photo")
    VALUES ($1, $2)
    ON CONFLICT ("dog_id")
    DO UPDATE SET "photo" = EXCLUDED.photo
    RETURNING "id";
  `;

      const result = await connection.query(queryText, [dogId, photoUrl]);

      const photoResults = result.rows;
      res.json(photoResults);
    } catch (error) {
      console.error("error adding photo");
      console.error(error.stack);
      res.sendStatus(500);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;

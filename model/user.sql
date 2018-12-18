
--- user.authorize
SELECT
	id				AS "id",
	login			AS "login",
	salt			AS "salt",
	hashed_password	AS "hashedPassword",
	email			AS "email",
	balance			AS "balance",
	image_path		AS "imagePath"
FROM 
	"user"
WHERE 
	login = $1;

--- user.registration
INSERT INTO 
	"user" (
		login, 
		salt, 
		hashed_password,
		email,
		image_path
	) 
VALUES
	($1, $2, $3, $4, $5) 
RETURNING
	id				AS "id",
	login			AS "login",
	salt			AS "salt",
	hashed_password	AS "hashedPassword",
	email			AS "email",
	balance			AS "balance",
	image_path		AS "imagePath";

--- user.updateAvatarPath
UPDATE
	"user"
SET
	image_path = $1
WHERE 
	id = $2
RETURNING
	image_path AS "imagePath";

--- user.getUserById
SELECT
	id				AS "id",
	login			AS "login",
	salt			AS "salt",
	hashed_password	AS "hashedPassword",
	email			AS "email",
	balance			AS "balance",
	image_path		AS "imagePath"
FROM 
	"user"
WHERE 
	id = $1;

--- user.updateUserBalance
UPDATE
	"user"
SET
	balance = $1
WHERE 
	id = $2;

--- user.addToBalance
UPDATE
	"user"
SET
	balance = balance + $1
WHERE 
	id = $2;

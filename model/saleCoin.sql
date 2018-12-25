
--- saleCoin.readSaleCoinForInfo
SELECT
	sc.id			AS "id",
	us.login		AS "login",
	sc.id_coin		AS "coinId",
	co.name			AS "name",
	co.image_url	AS "imageUrl",
	sc.quantity		AS "quantity",
	sc.price		AS "price"
FROM
	sale_coin	AS sc,
	"user"		AS us,
	coin		AS co
WHERE
		sc.id_user = us.id
	AND
		sc.id_coin = co.id;

--- saleCoin.readSaleCoin
SELECT
	id			AS "id",
	id_user		AS "userId",
	id_coin		AS "coinId",
	quantity	AS "quantity",
	price		AS "price"
FROM
	sale_coin
WHERE
	id = ANY($1);

--- saleCoin.createSaleCoin
INSERT INTO 
	sale_coin (
		id_user,
		id_coin,
		quantity,
		price
	) 
VALUES 
	($1, $2, $3, $4);

--- saleCoin.updateSaleCoin
UPDATE
	sale_coin
SET
	quantity = $1
WHERE 
	id = $2;

--- saleCoin.deleteSaleCoin
DELETE
FROM
	sale_coin
WHERE 
	id = $1;
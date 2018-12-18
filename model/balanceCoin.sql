
--- balanceCoin.getBalanceCoins
SELECT
	id_coin		AS "coinId", 
	quantity	AS "quantity"
FROM
	balance_coin
WHERE
	id_user = $1;

--- balanceCoin.getInfoAndBalanceCoins
SELECT
	id			AS "id",
	name			AS "name",
	price			AS "price",
	change_per_hour	AS "changePerHour",
	change_per_day	AS "changePerDay",
	change_per_week	AS "changePerWeek",
	quantity		AS "quantity",
	image_url		AS "imageUrl"
FROM
	balance_coin,
	coin
WHERE
		coin.id = balance_coin.id_coin
	AND
		id_user = $1;

--- balanceCoin.createBalanceCoin
INSERT INTO 
	balance_coin (
		id_user,
		id_coin,
		quantity
	) 
VALUES 
	($1, $2, $3);

--- balanceCoin.updateBalanceCoin
UPDATE
	balance_coin
SET
	quantity = $1
WHERE 
		id_user = $2
	AND
		id_coin = $3;


--- coin.insertCoin
INSERT INTO 
	coin(
		id,
		name,
		price,
		change_per_hour,
		change_per_day,
		change_per_week,
		market_cap,
		image_url,
		last_updated
	) 
VALUES 
	($1, $2, $3, $4, $5, $6, $7, $8, $9);

--- coin.updateCoin
UPDATE
	coin
SET
	name = coalesce($2, name),
	price = coalesce($3, price),
	change_per_hour = coalesce($4, change_per_hour),
	change_per_day = coalesce($5, change_per_day),
	change_per_week = coalesce($6, change_per_week),
	market_cap = coalesce($7, market_cap),
	image_url = coalesce($8, image_url),
	last_updated = coalesce($9, last_updated)
WHERE
	id = $1;

--- coin.get
SELECT
	id AS "id",
	name AS "name",
	price AS "price",
	change_per_hour AS "changePerHour",
	change_per_day AS "changePerDay",
	change_per_week AS "changePerWeek",
	market_cap AS "marketCap",
	image_url AS "imageUrl",
	last_updated AS "lastUpdated"
FROM
	coin;

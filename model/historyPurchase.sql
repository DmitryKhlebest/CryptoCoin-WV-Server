
--- historyPurchase.totalQuantity
SELECT
	SUM(quantity)
FROM
	history_purchase;

--- historyPurchase.totalPrice
SELECT
	SUM(price)
FROM
	history_purchase;

--- historyPurchase.createHistoryPurchase
INSERT INTO 
	history_purchase (
		id_buyer, 
		id_seller, 
		id_coin,
		quantity,
		price,
		date_time
	) 
VALUES
	($1, $2, $3, $4, $5, $6) 

--- historyPurchase.purchasesTable
SELECT
	hp.id			AS "id",
	us.login		AS "seller",
	co.id			AS "coinId",
	co.name			AS "name",
	co.image_url	AS "imageUrl",
	hp.quantity		AS "quantity",
	hp.price		AS "price",
	hp.date_time	AS "dateTime"
FROM
	history_purchase	AS hp,
	"user"				AS us,
	coin				AS co
WHERE
		hp.id_seller = us.id
	AND
		hp.id_coin = co.id
	AND
		id_buyer = $1;

--- historyPurchase.salesTable
SELECT
	hp.id			AS "id",
	us.login		AS "buyer",
	co.id			AS "coinId",
	co.name			AS "name",
	co.image_url	AS "imageUrl",
	hp.quantity		AS "quantity",
	hp.price		AS "price",
	hp.date_time	AS "dateTime"
FROM
	history_purchase	AS hp,
	"user"				AS us,
	coin				AS co
WHERE
		hp.id_buyer = us.id
	AND
		hp.id_coin = co.id
	AND
		id_seller = $1;









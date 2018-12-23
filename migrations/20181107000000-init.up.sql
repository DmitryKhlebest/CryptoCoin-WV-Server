--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

CREATE TABLE IF NOT EXISTS "user" (
	id				SERIAL				PRIMARY KEY,
	login			VARCHAR (100)		NOT NULL        UNIQUE,
	salt			TEXT				NOT NULL,
	hashed_password	TEXT				NOT NULL,
	email			VARCHAR (100),
	balance 		DOUBLE PRECISION	NOT NULL	    DEFAULT 0,
	image_path 		TEXT
);

--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

CREATE TABLE IF NOT EXISTS coin (
	id			    VARCHAR (10)		PRIMARY KEY,
	name			VARCHAR (100)		NOT NULL,
	price	 		DOUBLE PRECISION,
	change_per_hour	DOUBLE PRECISION,
	change_per_day	DOUBLE PRECISION,
	change_per_week	DOUBLE PRECISION,
	market_cap		DOUBLE PRECISION,
	image_url 		TEXT,
	last_updated	TIMESTAMP
);

--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

CREATE TABLE IF NOT EXISTS balance_coin (
	id_user		INTEGER				REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
	id_coin		VARCHAR (10)		REFERENCES coin(id) ON UPDATE CASCADE ON DELETE CASCADE,
	quantity	DOUBLE PRECISION	NOT NULL
);

--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

CREATE TABLE IF NOT EXISTS sale_coin (
	id			SERIAL				PRIMARY KEY,
	id_user		INTEGER				REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
	id_coin		VARCHAR (10)		REFERENCES coin(id) ON UPDATE CASCADE ON DELETE CASCADE,
	quantity	DOUBLE PRECISION	NOT NULL,
	price	 	DOUBLE PRECISION	NOT NULL
);

--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

CREATE TABLE IF NOT EXISTS history_purchase (
	id			SERIAL				PRIMARY KEY,
	id_buyer	INTEGER				REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
	id_seller	INTEGER				REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
	id_coin		VARCHAR (10)		REFERENCES coin(id) ON UPDATE CASCADE ON DELETE CASCADE,
	quantity	DOUBLE PRECISION	NOT NULL,
	price	 	DOUBLE PRECISION	NOT NULL,
	date_time 	TIMESTAMP			NOT NULL
);

--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

-- CREATE TABLE IF NOT EXISTS avatar (
-- 	id_user	INTEGER	REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
-- 	image	 	TEXT	NOT NULL
-- );

--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

-- CREATE TABLE IF NOT EXISTS image_coin_url (
-- 	id_coin		INTEGER	REFERENCES coin(id) ON UPDATE CASCADE ON DELETE CASCADE,
-- 	name		VARCHAR (100)	NOT NULL,
-- 	image_url 	TEXT
-- );

--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

-- CREATE TABLE IF NOT EXISTS message (
-- 	id			SERIAL				PRIMARY KEY,
-- 	id_"user"		INTEGER				REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
-- 	name		VARCHAR (100),
-- 	title		VARCHAR (100),
-- 	email		VARCHAR (100),
-- 	text		TEXT
-- );

--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--__--

INSERT INTO "user" 
	(login,salt,hashed_password,email,balance,image_path)
VALUES
	('system','0.7453885178206416','a7fcf13953987e9730c49ac34f9e911ed71b5d7f','admin@admin',0,'resourse/images/defaultAvatar.png'),
	('user1','0.7453885178206416','a7fcf13953987e9730c49ac34f9e911ed71b5d7f','1@2',1000,'resourse/images/defaultAvatar.png'),
	('user2','0.43321477485035764','b76d4b855e73ea22ae2f6b7a6f77f69933e01371','3@4',2000,'resourse/images/defaultAvatar.png'),
	('user3','0.7453885178206416','a7fcf13953987e9730c49ac34f9e911ed71b5d7f','5@6',3000,'resourse/images/defaultAvatar.png'),
	('user4','0.43321477485035764','b76d4b855e73ea22ae2f6b7a6f77f69933e01371','7@8',4000,'resourse/images/defaultAvatar.png'),
	('user5','0.7453885178206416','a7fcf13953987e9730c49ac34f9e911ed71b5d7f','9@10',5000,'resourse/images/defaultAvatar.png');

INSERT INTO coin 
	(id,name,price,change_per_hour,change_per_day,change_per_week,market_cap,image_url,last_updated)
VALUES
	-- ('BTC', 'Bitcoin', 4143.25, 0.23, -0.95, 9.47, 72106158992, 'https://www.cryptocompare.com/media/19633/btc.png', 1543754124),
	-- ('LTC', 'Litecoin', 33.63 , 0.37 , 0.35 , 17.95 , 1997678932 , 'https://www.cryptocompare.com/media/19782/litecoin-logo.png' ,   1543754103),
	-- ('XRP', 'XRP', 0.37 , 0.59 , -1.35 , 6.82 , 14864054282 , 'https://www.cryptocompare.com/media/34477776/xrp.png' ,   1543754103),
	-- ('XLM', 'Stellar' , 0.16 , 0.34 , -2.32 , 14.55 ,  3127619945 , 'https://www.cryptocompare.com/media/20696/str.png' ,   1543754105),
	-- ('USDT', 'Tether' , 1 , 0.23 , -0.01 , 2.04 ,  1853071921 , 'https://www.cryptocompare.com/media/1383672/usdt.png' ,   1543754107),
	-- ('ETH', 'Ethereum' , 116.92 , 0.25 , -1.24 , 7.89 , 12107758636 , 'https://www.cryptocompare.com/media/20646/eth_logo.png' ,   1543754120),
	-- ('EOS', 'EOS' , 2.93 , 0.07 , -0.84 , -8.2 ,  2659723337 , 'https://www.cryptocompare.com/media/1383652/eos_1.png' ,   1543754111),
	-- ('BCH', 'Bitcoin Cash' , 173 , 0.04 , -1.19 , 2.26 ,  3025649504 , 'https://www.cryptocompare.com/media/1383919/12-bitcoin-cash-square-crop-small-grn.png' , 1543754112),
	-- ('TRX', 'TRON' , 0.01 , -0.03 , -2.3 , 27.52 , 984187732 , 'https://www.cryptocompare.com/media/34477805/trx.jpg' ,   1543754114),
	-- ('ADA', 'Cardano' , 0.04 , 0.23 , 0.29 , 17.83 ,  1068162391 , 'https://www.cryptocompare.com/media/12318177/ada.png' ,   1543754115);
	('BTC', 'Bitcoin', 4143.25, 0.23, -0.95, 9.47, 72106158992, 'https://www.cryptocompare.com/media/19633/btc.png', '2018-12-23 00:29:22'),
	('LTC', 'Litecoin', 33.63 , 0.37 , 0.35 , 17.95 , 1997678932 , 'https://www.cryptocompare.com/media/19782/litecoin-logo.png' ,   '2018-12-23 00:29:23'),
	('XRP', 'XRP', 0.37 , 0.59 , -1.35 , 6.82 , 14864054282 , 'https://www.cryptocompare.com/media/34477776/xrp.png' ,   '2018-12-23 00:29:24'),
	('XLM', 'Stellar' , 0.16 , 0.34 , -2.32 , 14.55 ,  3127619945 , 'https://www.cryptocompare.com/media/20696/str.png' ,   '2018-12-23 00:29:25'),
	('USDT', 'Tether' , 1 , 0.23 , -0.01 , 2.04 ,  1853071921 , 'https://www.cryptocompare.com/media/1383672/usdt.png' ,   '2018-12-23 00:29:26'),
	('ETH', 'Ethereum' , 116.92 , 0.25 , -1.24 , 7.89 , 12107758636 , 'https://www.cryptocompare.com/media/20646/eth_logo.png' ,   '2018-12-23 00:29:27'),
	('EOS', 'EOS' , 2.93 , 0.07 , -0.84 , -8.2 ,  2659723337 , 'https://www.cryptocompare.com/media/1383652/eos_1.png' ,   '2018-12-23 00:29:28'),
	('BCH', 'Bitcoin Cash' , 173 , 0.04 , -1.19 , 2.26 ,  3025649504 , 'https://www.cryptocompare.com/media/1383919/12-bitcoin-cash-square-crop-small-grn.png' , '2018-12-23 00:29:29'),
	('TRX', 'TRON' , 0.01 , -0.03 , -2.3 , 27.52 , 984187732 , 'https://www.cryptocompare.com/media/34477805/trx.jpg' ,   '2018-12-23 00:29:30'),
	('ADA', 'Cardano' , 0.04 , 0.23 , 0.29 , 17.83 ,  1068162391 , 'https://www.cryptocompare.com/media/12318177/ada.png' ,   '2018-12-23 00:29:31');

INSERT INTO balance_coin 
	(id_user,id_coin,quantity)
VALUES
	(2, 'BTC', 53.56),
	(2, 'XRP', 176.2),
	(2, 'TRX', 21.91),
	(3, 'TRX', 1.91),
	(3, 'BTC', 78.34);

INSERT INTO sale_coin 
	(id_user,id_coin,quantity,price)
VALUES
	(2, 'BTC', 34, 12.3),
	(2, 'XRP', 6.2, 0.24),
	(2, 'TRX', 87.1, 0.29),
	(3, 'TRX', 4, 29.24),
	(3, 'BTC', 23.76, 55);

INSERT INTO history_purchase 
	(id_buyer,id_seller,id_coin,quantity,price,date_time)
VALUES
	(2, 3, 'BTC',  53, 23.59, '2018-09-18 08:29:09.593'),
	(2, 3, 'BTC',  12,     5, '2018-10-05 10:20:45.793'),
	(2, 3, 'BTC', 154, 34.16, '2018-10-11 15:21:12.992'),
	(3, 2, 'BTC',  62,  89.1, '2018-11-06 17:22:27.533'),
	(3, 2, 'BTC',   1, 13.94, '2018-12-09 22:23:41.093');

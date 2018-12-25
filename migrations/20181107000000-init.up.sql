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
	(login, salt, hashed_password, email, balance, image_path)
VALUES
	('system', '0.7453885178206416', 'a7fcf13953987e9730c49ac34f9e911ed71b5d7f', 'admin@admin', 0, 'resourse/images/defaultAvatar.png'),
	('Abraham Lincoln', '0.5231864183824488', 'ecf6839b4ae32459375511c586a54a4ef2c48e75', 'abrahamlincoln@gmail.com', 678.67, 'resourse/images/defaultAvatar.png'),
	('Pablo Picasso', '0.6257493126696407', '5904551cecbbca79ff82b481ea68f46ab7553dd4', 'pablopicasso@gmail.com',  216.88, 'resourse/images/defaultAvatar.png'),
	('Dmitry', '0.11371284985093699', '4473c60271af19f11d83818a138fba9118ee9ced', 'khlebestdima@gmail.com', 217.9, 'resourse/images/defaultAvatar.png');

INSERT INTO coin 
	(id, name, price, change_per_hour, change_per_day, change_per_week, market_cap, image_url, last_updated)
VALUES
	('BTC'  , 'Bitcoin'      , 3783.02 ,            0.47 ,          -7.69 ,            5.62 , 65987843993 , 'https://www.cryptocompare.com/media/19633/btc.png'                                     , '2018-12-25 21:59:21'),
	('LTC'  , 'Litecoin'     ,   30.78 ,            0.83 ,          -10.6 ,            5.88 ,  1838646909 , 'https://www.cryptocompare.com/media/19782/litecoin-logo.png'                           , '2018-12-25 21:59:03'),
	('XRP'  , 'XRP'          ,    0.37 ,            0.81 ,          -8.72 ,            11.1 , 15257423673 , 'https://www.cryptocompare.com/media/34477776/xrp.png'                                  , '2018-12-25 22:00:12'),
	('XLM'  , 'Stellar'      ,    0.12 ,             0.8 ,          -9.39 ,            9.28 ,  2303530757 , 'https://www.cryptocompare.com/media/20696/str.png'                                     , '2018-12-25 21:59:06'),
	('USDT' , 'Tether'       ,    1.02 ,           -0.04 ,           0.31 ,            1.06 ,  1893909992 , 'https://www.cryptocompare.com/media/1383672/usdt.png'                                  , '2018-12-25 21:59:07'),
	('ETH'  , 'Ethereum'     ,  129.06 ,            2.57 ,          -9.19 ,           34.55 , 13423252967 , 'https://www.cryptocompare.com/media/20646/eth_logo.png'                                , '2018-12-25 21:59:17'),
	('EOS'  , 'EOS'          ,    2.49 ,            1.78 ,         -12.61 ,           -2.64 ,  2259552024 , 'https://www.cryptocompare.com/media/1383652/eos_1.png'                                 , '2018-12-25 21:59:14'),
	('BCH'  , 'Bitcoin Cash' ,   163.5 ,            1.27 ,         -12.41 ,           65.77 ,  2866151641 , 'https://www.cryptocompare.com/media/1383919/12-bitcoin-cash-square-crop-small-grn.png' , '2018-12-25 21:59:14'),
	('TRX'  , 'TRON'         ,    0.02 ,            0.83 ,         -10.14 ,           33.45 ,  1284967567 , 'https://www.cryptocompare.com/media/34477805/trx.jpg'                                  , '2018-12-25 21:59:14'),
	('ADA'  , 'Cardano'      ,    0.04 ,            1.61 ,         -12.86 ,           20.27 ,  1044675003 , 'https://www.cryptocompare.com/media/12318177/ada.png'                                  , '2018-12-25 21:59:16');

INSERT INTO balance_coin 
	(id_user, id_coin, quantity)
VALUES
    (2 , 'BTC'     ,      0.1),
    (2 , 'BCH'     ,      0.2),
    (2 , 'EOS'     ,        1),
    (2 , 'XRP'     ,       14),
    (2 , 'XLM'     ,        5),
    (3 , 'ETH'     ,      0.2),
    (3 , 'ADA'     ,       82),
    (3 , 'LTC'     ,     2.96),
    (3 , 'TRX'     ,    44.74),
    (3 , 'BCH'     ,      0.1),
    (3 , 'USDT'    ,     12.2),
    (3 , 'XRP'     ,     26.7),
    (3 , 'EOS'     ,     2.87),
    (4 , 'ADA'     ,       25),
    (4 , 'BCH'     ,      0.1),
    (4 , 'USDT'    ,     4.98),
    (4 , 'LTC'     ,        7),
    (4 , 'XRP'     ,       14),
    (4 , 'TRX'     ,     28.5),
    (4 , 'XLM'     ,       24),
    (2 , 'LTC'     ,     2.94),
    (2 , 'USDT'    ,     2.37),
    (2 , 'USDT'    ,       12),
    (2 , 'TRX'     ,    100.4);

INSERT INTO sale_coin 
	(id, id_user, id_coin, quantity, price)
VALUES
	(  3 ,       2 , 'EOS'     ,    17.13 ,     3),
	(  1 ,       2 , 'BCH'     ,      0.1 ,   170),
	(  2 ,       2 , 'LTC'     ,      0.5 ,    35),
	(  4 ,       2 , 'XRP'     ,      4.3 ,  0.22),
	(  5 ,       2 , 'XLM'     ,       46 ,   0.1),
	(  6 ,       2 , 'TRX'     ,    12.24 ,  0.02),
	(  7 ,       3 , 'USDT'    ,     2.72 ,     1),
	(  9 ,       3 , 'LTC'     ,     5.24 ,  31.2),
	( 10 ,       4 , 'LTC'     ,    16.06 ,    31),
	( 11 ,       4 , 'USDT'    ,    26.26 ,  1.05),
	(  8 ,       3 , 'TRX'     ,     2.04 ,  0.01),
	( 12 ,       4 , 'TRX'     ,       40 ,  0.05);

ALTER SEQUENCE sale_coin_id_seq RESTART WITH 13;

INSERT INTO history_purchase 
	(id, id_buyer, id_seller, id_coin, quantity, price, date_time)
VALUES
	(  1 ,        2 ,         1 , 'BTC'     ,      0.1 , 3783.02 , '2018-12-25 22:03:58.144'),
	(  2 ,        2 ,         1 , 'XRP'     ,       59 ,    0.37 , '2018-12-25 22:03:58.153'),
	(  3 ,        2 ,         1 , 'EOS'     ,       21 ,    2.49 , '2018-12-25 22:03:58.156'),
	(  4 ,        2 ,         1 , 'BCH'     ,      0.5 ,   163.5 , '2018-12-25 22:03:58.158'),
	(  5 ,        2 ,         1 , 'TRX'     ,       98 ,    0.02 , '2018-12-25 22:03:58.159'),
	(  6 ,        2 ,         1 , 'XLM'     ,       75 ,    0.12 , '2018-12-25 22:04:02.592'),
	(  7 ,        2 ,         1 , 'LTC'     ,      2.5 ,   30.78 , '2018-12-25 22:04:09.271'),
	(  8 ,        3 ,         1 , 'LTC'     ,     15.3 ,   30.78 , '2018-12-25 22:13:17.024'),
	(  9 ,        3 ,         1 , 'USDT'    ,     18.3 ,    1.02 , '2018-12-25 22:13:17.026'),
	( 10 ,        3 ,         1 , 'ETH'     ,      0.2 ,  129.06 , '2018-12-25 22:13:17.028'),
	( 11 ,        3 ,         1 , 'TRX'     ,     56.8 ,    0.02 , '2018-12-25 22:13:17.029'),
	( 12 ,        3 ,         1 , 'ADA'     ,       82 ,    0.04 , '2018-12-25 22:13:17.031'),
	( 13 ,        3 ,         2 , 'LTC'     ,        1 ,      35 , '2018-12-25 22:18:27'),
	( 14 ,        3 ,         2 , 'BCH'     ,      0.1 ,     170 , '2018-12-25 22:18:45.51'),
	( 15 ,        3 ,         2 , 'XRP'     ,     21.7 ,    0.22 , '2018-12-25 22:18:45.512'),
	( 16 ,        3 ,         2 , 'TRX'     ,       12 ,    0.02 , '2018-12-25 22:18:45.514'),
	( 17 ,        3 ,         3 , 'USDT'    ,      5.9 ,       1 , '2018-12-25 22:18:55.571'),
	( 18 ,        3 ,         3 , 'USDT'    ,        3 ,       1 , '2018-12-25 22:18:59.96'),
	( 19 ,        3 ,         2 , 'XRP'     ,        5 ,    0.22 , '2018-12-25 22:19:17.005'),
	( 20 ,        3 ,         2 , 'EOS'     ,     2.87 ,       3 , '2018-12-25 22:19:27.068'),
	( 21 ,        4 ,         1 , 'LTC'     ,       23 ,   30.78 , '2018-12-25 22:23:28.551'),
	( 22 ,        4 ,         1 , 'USDT'    ,    42.23 ,    1.02 , '2018-12-25 22:23:28.557'),
	( 23 ,        4 ,         1 , 'TRX'     ,     76.5 ,    0.02 , '2018-12-25 22:23:28.56'),
	( 24 ,        4 ,         1 , 'ADA'     ,       25 ,    0.04 , '2018-12-25 22:23:28.562'),
	( 25 ,        4 ,         2 , 'BCH'     ,      0.1 ,     170 , '2018-12-25 22:24:55.547'),
	( 26 ,        4 ,         2 , 'LTC'     ,      0.5 ,      35 , '2018-12-25 22:25:22.943'),
	( 27 ,        4 ,         2 , 'XRP'     ,       14 ,    0.22 , '2018-12-25 22:25:22.945'),
	( 28 ,        4 ,         3 , 'USDT'    ,     1.01 ,       1 , '2018-12-25 22:25:22.947'),
	( 29 ,        4 ,         3 , 'LTC'     ,      2.5 ,    31.2 , '2018-12-25 22:25:22.948'),
	( 30 ,        4 ,         2 , 'XLM'     ,       24 ,     0.1 , '2018-12-25 22:25:37.937'),
	( 31 ,        4 ,         2 , 'TRX'     ,     1.36 ,    0.02 , '2018-12-25 22:25:37.94'),
	( 32 ,        4 ,         3 , 'TRX'     ,       20 ,    0.01 , '2018-12-25 22:25:37.941'),
	( 33 ,        2 ,         3 , 'USDT'    ,     2.37 ,       1 , '2018-12-25 22:26:11.613'),
	( 34 ,        2 ,         3 , 'LTC'     ,      5.6 ,    31.2 , '2018-12-25 22:26:11.615'),
	( 35 ,        2 ,         4 , 'LTC'     ,     2.44 ,      31 , '2018-12-25 22:26:11.617'),
	( 36 ,        2 ,         4 , 'USDT'    ,       12 ,    1.05 , '2018-12-25 22:26:11.619'),
	( 37 ,        2 ,         3 , 'TRX'     ,     2.02 ,    0.01 , '2018-12-25 22:26:26.17'),
	( 38 ,        2 ,         4 , 'TRX'     ,       28 ,    0.05 , '2018-12-25 22:26:26.173');

ALTER SEQUENCE history_purchase_id_seq RESTART WITH 39;


INSERT INTO "user" 
    (id,login,salt,hashed_password,email,balance,image_path)
VALUES
    (1,'user1','0.7453885178206416','a7fcf13953987e9730c49ac34f9e911ed71b5d7f','1@2',1000,'resourse/images/defaultAvatar.png'),
    (2,'user2','0.43321477485035764','b76d4b855e73ea22ae2f6b7a6f77f69933e01371','3@4',2000,'resourse/images/defaultAvatar.png'),
    (3,'user3','0.7453885178206416','a7fcf13953987e9730c49ac34f9e911ed71b5d7f','5@6',3000,'resourse/images/defaultAvatar.png'),
    (4,'user4','0.43321477485035764','b76d4b855e73ea22ae2f6b7a6f77f69933e01371','7@8',4000,'resourse/images/defaultAvatar.png'),
    (5,'user5','0.7453885178206416','a7fcf13953987e9730c49ac34f9e911ed71b5d7f','9@10',5000,'resourse/images/defaultAvatar.png');

INSERT INTO coin 
    (id,name,price,change_per_hour,change_per_day,change_per_week,market_cap,image_url,last_updated)
VALUES
    ('BTC', 'Bitcoin', 4143.25, 0.23, -0.95, 9.47, 72106158992, 'https://www.cryptocompare.com/media/19633/btc.png', 1543754124),
    ('LTC', 'Litecoin', 33.63 , 0.37 , 0.35 , 17.95 , 1997678932 , 'https://www.cryptocompare.com/media/19782/litecoin-logo.png' ,   1543754103),
    ('XRP', 'XRP', 0.37 , 0.59 , -1.35 , 6.82 , 14864054282 , 'https://www.cryptocompare.com/media/34477776/xrp.png' ,   1543754103),
    ('XLM', 'Stellar' , 0.16 , 0.34 , -2.32 , 14.55 ,  3127619945 , 'https://www.cryptocompare.com/media/20696/str.png' ,   1543754105),
    ('USDT', 'Tether' , 1 , 0.23 , -0.01 , 2.04 ,  1853071921 , 'https://www.cryptocompare.com/media/1383672/usdt.png' ,   1543754107),
    ('ETH', 'Ethereum' , 116.92 , 0.25 , -1.24 , 7.89 , 12107758636 , 'https://www.cryptocompare.com/media/20646/eth_logo.png' ,   1543754120),
    ('EOS', 'EOS' , 2.93 , 0.07 , -0.84 , -8.2 ,  2659723337 , 'https://www.cryptocompare.com/media/1383652/eos_1.png' ,   1543754111),
    ('BCH', 'Bitcoin Cash' , 173 , 0.04 , -1.19 , 2.26 ,  3025649504 , 'https://www.cryptocompare.com/media/1383919/12-bitcoin-cash-square-crop-small-grn.png' , 1543754112),
    ('TRX', 'TRON' , 0.01 , -0.03 , -2.3 , 27.52 , 984187732 , 'https://www.cryptocompare.com/media/34477805/trx.jpg' ,   1543754114),
    ('ADA', 'Cardano' , 0.04 , 0.23 , 0.29 , 17.83 ,  1068162391 , 'https://www.cryptocompare.com/media/12318177/ada.png' ,   1543754115);

INSERT INTO balance_coin 
    (id_user,id_coin,quantity)
VALUES
    (1, 'BTC', 53.56),
    (1, 'XRP', 176.2),
    (1, 'TRX', 21.91),
    (2, 'TRX', 1.91),
    (2, 'BTC', 78.34);

INSERT INTO sale_coin 
    (id_user,id_coin,quantity,price)
VALUES
    (1, 'BTC', 34, 12.3),
    (1, 'XRP', 6.2, 0.24),
    (1, 'TRX', 87.1, 0.29),
    (2, 'TRX', 4, 29.24),
    (2, 'BTC', 23.76, 55);

INSERT INTO history_purchase 
    (id,id_buyer,id_seller,id_coin,quantity,price,date_time)
VALUES
    (1, 1, 2, 'BTC',  53, 23.59, '2018-09-18 00:10:14.599'),
    (2, 1, 2, 'BTC',  12,     5, '2018-10-05 00:10:14.599'),
    (3, 1, 2, 'BTC', 154, 34.16, '2018-10-11 00:10:14.599'),
    (4, 2, 1, 'BTC',  62,  89.1, '2018-11-06 00:10:14.599'),
    (5, 2, 1, 'BTC',   1, 13.94, '2018-12-09 00:10:14.599');

SELECT * FROM "user";
SELECT * FROM coin;
SELECT * FROM balance_coin;
SELECT * FROM sale_coin;
SELECT * FROM history_purchase;

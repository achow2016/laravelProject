SET GLOBAL event_scheduler=ON

CREATE EVENT clean_corkboard
	ON SCHEDULE EVERY 24 HOUR STARTS NOW()
	DO TRUNCATE TABLE corkboardposts;
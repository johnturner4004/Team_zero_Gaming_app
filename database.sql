
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "games" (
	"game_id" SERIAL PRIMARY KEY,
	"game" VARCHAR(120) NOT NULL,
	"image_url" VARCHAR(300)
);

CREATE TABLE "event" (
	"event_id" SERIAL PRIMARY KEY,
	"description" VARCHAR(120),
	"game_id" INT REFERENCES "games" NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
	"created_by" INT REFERENCES "user" NOT NULL
);

CREATE TABLE "participant" (
	"pid" SERIAL PRIMARY KEY,
	"event_id" INT NOT NULL,
	"user_id" INT REFERENCES "user",
	CONSTRAINT fk_event
		FOREIGN KEY(event_id)
			REFERENCES "event"(event_id)
				ON DELETE CASCADE
);

--Before inserting any sample data run the application and server and creat at least three users. This works better than trying to insert them with SQL because the passwords will not go through the server unless entered into the client application, and the server is what encrypts the passwords.
-- The following will insert some sample data into the app to see how its  various features work but the inserts into the "events" and "participant" tables will give an error

INSERT INTO "games" ("game", "image_url")
	VALUES ('Fortnite', 'https://www.mobygames.com/images/covers/l/583431-fortnite-battle-royale-nintendo-switch-front-cover.jpg'), ('Astroneer', 'https://www.mobygames.com/images/covers/l/547082-astroneer-windows-apps-front-cover.jpg');
	
INSERT INTO "games" ("game", "image_url")
	VALUES ('Factorio', 'https://cdn.factorio.com/assets/img/artwork/factorio-cover.png'), ('Destiny 2', 'https://upload.wikimedia.org/wikipedia/en/b/be/Destiny_2_Beyond_Light_cover.jpeg');
	
INSERT INTO "event" ("description", "game_id", "date", "time", "created_by")
	VALUES ('Kfen custom tournaments', 1, '05/28/2021', '8:00 PM', 1);
	
INSERT INTO "event" ("description", "game_id", "date", "time", "created_by")
	VALUES ('Playing Astroneer', 2, '05/29/2021', '10:00 PM', 1);
	
INSERT INTO "participant" ("event_id", "user_id")
	VALUES ('1', '2'), ('1', '3'), ('2', '2'), ('2', '3');


--To add additional games use the following SQL but replace <game> and <url> in the "VALUES" line with your data. Be sure those values have a set of single quotes around each field. To insert more than one simply put a comma acter the parentheses for the first game, add a second set of parentheses, fill in the <game> and <inage_url> with your data and after the final entry add a semicolon
INSERT INTO "game" ("game, image_url")
  VALUES ('<game>', '<image_url>');


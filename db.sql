-- Local database definition.

DROP DATABASE IF EXISTS sport_app;

CREATE DATABASE sport_app;

USE sport_app;

DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id int(10) NOT NULL,
  eventTime varchar(30) NOT NULL DEFAULT '',
  awayTeam varchar(5) NOT NULL DEFAULT '',
  homeTeam varchar(5) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);
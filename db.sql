-- Local database definition.

DROP DATABASE IF EXISTS sport_app;

CREATE DATABASE sport_app;

USE sport_app;

DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id int(10) NOT NULL,
  eventTime DATETIME NOT NULL,
  awayTeam varchar(5) NOT NULL DEFAULT '',
  homeTeam varchar(5) NOT NULL DEFAULT '',
  fullContent JSON,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS live_runs;

CREATE TABLE live_runs (
  id varchar(50) NOT NULL DEFAULT '',
  startTime DATETIME NOT NULL,
  endTime DATETIME NOT NULL,
  PRIMARY KEY (id)
);
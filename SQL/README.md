Just basic SQL cheat sheet

```
-------------------------------
-- CREATE TABLE
-------------------------------
CREATE TABLE AUTHORS (
    author_id int(11) NOT NULL,
    author_name varchar(200) COLLATE utf8_unicode_ci NOT NULL,
    joining_date date DEFAULT NULL,
    PRIMARY KEY (author_id)
);

-------------------------------
-- INSERT
-------------------------------
INSERT INTO
    AUTHORS (author_name, joining_date)
VALUES
    ('Goethe', '2020-01-22'),
    ('Schiller', '2020-01-22');

-------------------------------
-- SELECT
-------------------------------
SELECT
    *
FROM
    AUTHORS a
WHERE
    a.author_name = 'Schiller';

-------------------------------
-- UPATE
-------------------------------
UPDATE
    AUTHORS a
SET
    a.joining_date = CURRENT_DATE -1
WHERE
    a.author_name LIKE 'Goet%';

-------------------------------
-- DELETE
-------------------------------
DELETE FROM
    AUTHORS
WHERE
    author_name = 'Goethe';

-------------------------------
-- DROP
-------------------------------
DROP TABLE AUTHORS;
 ```
--SCHEMA

CREATE EXTENSION "uuid-ossp"; --extension for uuid_generate_v4()
CREATE TYPE dish_type AS ENUM ('starter','main','dessert','beverage');
CREATE TABLE dish(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, 
    name TEXT NOT NULL UNIQUE, 
    dish_type dish_type NOT NULL, 
    price NUMERIC(4,2) NOT NULL, 
    likes INTEGER DEFAULT 0
);
CREATE TABLE ingredient(
    id uuid DEFAULT uuid_generate_v1() PRIMARY KEY, 
    name TEXT NOT NULL UNIQUE
);
CREATE TABLE dish_ingredient(
    dish_id uuid REFERENCES dish(id) NOT NULL, 
    ingredient_id uuid REFERENCES ingredient(id) NOT NULL, 
    CONSTRAINT pk_dish_ingredient PRIMARY KEY (dish_id, ingredient_id)
);


--INITAL DUMP

INSERT INTO dish (name, dish_type, price, likes)
VALUES 
('MOB Burger','main', 11.5, 6),
('DUKE Burger','main', 13.3, 4),
('Coleslaw homemade', 'starter', 3, 0),
('Cheesecake', 'dessert', 5, 2),
('Brooklyn beer IPA', 'beverage', 4.5, 0);

INSERT into ingredient (name)
VALUES
('bread'),
('beaf'),
('cheddar'),
('salade'),
('tomato'),
('oignon'),
('mustard'),
('bacon'),
('bleu d''auvergne');

INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'MOB Burger' AND i.name = 'bread';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'MOB Burger' AND i.name = 'beaf';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'MOB Burger' AND i.name = 'cheddar';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'MOB Burger' AND i.name = 'salade';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'MOB Burger' AND i.name = 'tomato';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'MOB Burger' AND i.name = 'oignon';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'MOB Burger' AND i.name = 'mustard';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'DUKE Burger' AND i.name = 'bread';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'DUKE Burger' AND i.name = 'bacon';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'DUKE Burger' AND i.name = 'bleu d''auvergne';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'DUKE Burger' AND i.name = 'salade';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'DUKE Burger' AND i.name = 'tomato';
INSERT INTO dish_ingredient (dish_id, ingredient_id)
SELECT d.id, i.id from dish as d CROSS JOIN ingredient as i 
where d.name = 'DUKE Burger' AND i.name = 'oignon';
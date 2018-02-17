CREATE TABLE task (
	task_id serial primary key,
	task_name VARCHAR (280)
);

CREATE TABLE catergory (
	catergory_id serial primary key,
	catergory_name VARCHAR (240)
);

SELECT * FROM task;
SELECT * FROM catergory;



CREATE TABLE task_catergory (
	task_catergory_id serial primary key,
	task_id INT REFERENCES task,
	catergory_id INT REFERENCES catergory
);

INSERT INTO catergory (catergory_name)
VALUES ('Kitchen'),
	   ('Bathroom'),
	   ('Laundry'),
	   ('Bills'),
	   ('Personal'),
	   ('Work'),
	   ('School'),
	   ('Misc')	;

INSERT INTO task (task_name)
VALUES ('Do Dishes'),
	   ('Wash Clothes'),
	   ('Cook Dinner'),
	   ('Make ToDo App'),
	   ('Clean Bathroom'),
	   ('Get Haircut'),
	   ('Do TPS Report');

INSERT INTO task_catergory (task_id, catergory_id)
VALUES (1,1),(2,3),(3,1),(4,7),(5,2),(6,5),(7,6);

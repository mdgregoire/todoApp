CREATE TABLE task (
	task_id serial primary key,
	task_name VARCHAR (280),
	task_due_date date,
	task_date_assigned date default now(),
	task_completed VARCHAR(1)
);

CREATE TABLE catergory (
	catergory_id serial primary key,
	catergory_name VARCHAR (240)
);


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

INSERT INTO task (task_name, task_due_date, task_completed)
VALUES ('Do Dishes', '03/17/18', 'N'),
	   ('Wash Clothes', '02/18/18', 'N'),
	   ('Cook Dinner', '02/23/18', 'N'),
	   ('Make ToDo App', '04/19/18', 'N'),
	   ('Clean Bathroom', '06/17/18', 'N'),
	   ('Get Haircut', '02/22/18', 'N'),
	   ('Do TPS Report', '02/17/18', 'N');

INSERT INTO task_catergory (task_id, catergory_id)
VALUES (1,1),(2,3),(3,1),(4,7),(5,2),(6,5),(7,6)

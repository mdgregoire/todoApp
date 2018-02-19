-- Run these  in postico to create Dummy entries for testing --

INSERT INTO task (task_name, task_due_date, task_completed)
VALUES ('Do Dishes', '03/17/18', 'N'),
	   ('Wash Clothes', '02/18/18', 'N'),
	   ('Cook Dinner', '02/23/18', 'N'),
	   ('Make ToDo App', '04/19/18', 'N'),
	   ('Clean Bathroom', '06/17/18', 'N'),
	   ('Get Haircut', '02/22/18', 'N'),
	   ('Do TPS Report', '02/17/18', 'N');

INSERT INTO task_catergory (task_id, catergory_id)
VALUES (1,1),(2,3),(3,1),(4,7),(5,2),(6,5),(7,6);

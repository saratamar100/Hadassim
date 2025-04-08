INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (1, 'Avraham', 'Shaul', 'Male', NULL, NULL, NULL);
INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (2, 'Sara', 'Shaul', 'Female', NULL, NULL, 1);
UPDATE Person SET Spouse_Id = 2 WHERE Person_Id = 1;
INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (3, 'David', 'Shaul', 'Male', 1, 2, NULL);
INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (4, 'Moshe', 'Shaul', 'Male', 1, 2, NULL);
INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (5, 'Dana', 'Shaul', 'Female', 1, 2, NULL);
INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (6, 'Rivka', 'Shaul', 'Female',NULL,NULL, 3);
INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (7, 'Efrat', 'Shaul', 'Female',NULL,NULL, 4);
UPDATE Person SET Spouse_Id = 6 WHERE Person_Id = 3;
UPDATE Person SET Spouse_Id = 7 WHERE Person_Id = 4;

INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (8, 'Sara', 'Cohen', 'Female',NULL,NULL, NULL);
INSERT INTO Person (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES (9, 'Avi', 'Cohen', 'Male',NULL,NULL, 8);
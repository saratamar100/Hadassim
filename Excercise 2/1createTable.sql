CREATE TABLE Person (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(100) NOT NULL,
    Family_Name VARCHAR(100) NOT NULL,
    Gender ENUM('Male', 'Female') NOT NULL,
    Father_Id INT,
    Mother_Id INT,
    Spouse_Id INT,
    FOREIGN KEY (Father_Id) REFERENCES Person(Person_Id),
    FOREIGN KEY (Mother_Id) REFERENCES Person(Person_Id),
    FOREIGN KEY (Spouse_Id) REFERENCES Person(Person_Id)
);


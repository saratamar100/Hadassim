CREATE TABLE Relative (
    Person_Id INT,
    Relative_Id INT,
    Connection_Type ENUM('Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter', 'Husband', 'Wife') NOT NULL,
    PRIMARY KEY (Person_Id, Relative_Id),
    FOREIGN KEY (Person_Id) REFERENCES Person(Person_Id),
    FOREIGN KEY (Relative_Id) REFERENCES Person(Person_Id)    
);


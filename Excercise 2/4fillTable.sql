DELIMITER $$

CREATE PROCEDURE Relative()
BEGIN
  DECLARE done INT DEFAULT 0; 
  declare Person_Id1 int;
   declare Father_Id1 int;
   declare Mother_Id1 int;
   declare Spouse_Id1 int;
   declare Preson_Id2 int;
   declare Father_Id2 int;
   declare Mother_Id2 int;
   declare Spouse_Id2 int;
   declare Gender1 ENUM('Male', 'Female');
   declare Gender2  ENUM('Male', 'Female');
  DECLARE cur1 CURSOR FOR select p1.Person_Id as Person_Id1, p1.Father_Id as Father_Id1, p1.Mother_Id as Mother_Id1, p1.Spouse_Id as Spouse_Id1, p1.Gender as Gender1,
   p2.Person_Id as Preson_Id2, p2.Father_Id as Father_Id2, p2.Mother_Id as Mother_Id1, p2.Spouse_Id as Spouse_Id2,p2.Gender as Gender2
   from Person p1 join Person p2;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
  OPEN cur1;
   
  read_loop: LOOP
    FETCH cur1 INTO Person_Id1, Father_Id1, Mother_Id1, Spouse_Id1,Gender1,Preson_Id2, Father_Id2, Mother_Id1, Spouse_Id2, Gender2;
    IF done THEN 
      LEAVE read_loop; 
    END IF;
    IF Gender2="Male" THEN 
		IF Father_Id1 = Preson_Id2 THEN
			insert into Relative values(Person_Id1,Preson_Id2,"Father");
		elseif Father_Id1 = Father_Id2 AND Father_Id1 IS NOT NULL OR Mother_Id1 = Mother_Id2 AND Mother_Id1 IS NOT NULL THEN
			insert into Relative values(Person_Id1,Preson_Id2,"Brother");
        elseif Father_Id2 = Person_Id1 OR Mother_Id2 = Person_Id1 THEN
			insert into Relative values(Person_Id1,Preson_Id2,"Son");
        elseif Spouse_Id1 = Preson_Id2 THEN
			insert into Relative values(Person_Id1,Preson_Id2,"Husband");
		end if;
    
	Else
        IF Mother_Id1 = Preson_Id2 THEN
			insert into Relative values(Person_Id1,Preson_Id2,"Mother");
		elseif Father_Id1 = Father_Id2 AND Father_Id1 IS NOT NULL OR Mother_Id1 = Mother_Id2 AND Mother_Id1 IS NOT NULL THEN
			insert into Relative values(Person_Id1,Preson_Id2,"Sister");
        elseif Father_Id2 = Person_Id1 OR Mother_Id2 = Person_Id1 THEN
			insert into Relative values(Person_Id1,Preson_Id2,"Daughter");
        elseif Spouse_Id1 = Preson_Id2 THEN
			insert into Relative values(Person_Id1,Preson_Id2,"Wife");
		end if;
    END IF;

  END LOOP;

  CLOSE cur1;
END $$

DELIMITER ;


delete from MedCount;


select  Name || ' ' || DoseValue || DoseUnit as MedicationName, count(*) as Count from Medications
group by Name || ' ' || DoseValue || DoseUnit


select  Name as MedicationName,  count(*) as Count from Medications
group by Name 

-- Script

INSERT INTO MedCount (MedicationName, Count)
select  Name as MedicationName,  count(*) as Count from Medications
group by Name;


WITH Meds AS (
  select 
    Name || ' ' || DoseValue || DoseUnit as MedicationName,
    Name as NameWithoutDose,
    count(*) as Count from Medications
  group by Name || ' ' || DoseValue || DoseUnit
)
INSERT INTO MedCount (MedicationName, Count, ParentId)
SELECT m.MedicationName, m.Count, mc.Id as ParentId FROM Meds m
JOIN MedCount mc ON m.NameWithoutDose = mc.MedicationName;

-----------------


PRAGMA table_info(Medications);



--------- Script casting

UPDATE Medications
SET DoseValue =
    CASE
        WHEN CAST(DoseValue AS REAL) = CAST(DoseValue AS INTEGER)
        THEN CAST(CAST(DoseValue AS INTEGER) AS TEXT) || '.0'
        ELSE DoseValue
    END;
--
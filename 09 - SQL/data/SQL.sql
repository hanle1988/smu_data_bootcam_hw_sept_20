SELECT 
	emp_no,
	first_name,
	last_name,
	sex
FROM
	employees
JOIN salaries 
on employees.emp_no =salaries.emp_no;

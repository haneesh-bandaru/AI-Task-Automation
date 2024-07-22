import { getEmployees } from "@/services/Api";
import  { useEffect, useState } from "react";

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    getEmployees()
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {employeeData?.map((item, index) => (
        <div key={index}>{item.empid}</div>
      ))}
    </div>
  );
};

export default Employees;

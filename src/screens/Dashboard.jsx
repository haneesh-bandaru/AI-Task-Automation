import { useEffect, useState } from "react";
import EmployeeChart from "@/components/EmployeeChart";
import TasksCharts from "@/components/TasksCharts";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import API from "@/services/Api";

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    API.getEmployees()
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex h-screen  flex-col gap-4 mx-4 ml-4">
      <div className="flex gap-4 m-2">
        <EmployeeChart />
        <TasksCharts />
      </div>
      <div className="ml-4 m-2">
        <Card className="max-h-[45vh] overflow-scroll w-[75vw]">
          <Table className="overflow-scroll">
            <TableCaption>
              List of Employees with their task status
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Id</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                {/* <TableHead>Status</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeData.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {employee.empid}
                  </TableCell>
                  <TableCell>{employee.empname}</TableCell>
                  <TableCell>{employee.empmail}</TableCell>
                  <TableCell>{employee.emprole}</TableCell>
                  {/* <TableCell>{employee.status}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

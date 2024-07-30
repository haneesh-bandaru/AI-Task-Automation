import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import API from "@/services/Api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { FileCheck } from "lucide-react";

const UploadDocument = () => {
  const [formResponse, setFormResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [otherStatus, setOtherStatus] = useState([]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", data.file[0]);
      const response = await API.uploadedDocument(formData);
      setFormResponse(response.data);
      setTasks(response.data.Tasks);
      setOtherStatus([
        {
          "Tech Stack of the project": response.data["Tech Stack of the project"],
        },
        { "Number of tasks": response.data["Number of tasks"] },
        { "Name of the project": response.data["Name of the project"] }
      ]);
      setLoaded(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading document:", error);
    }
  };

  const handleTaskChange = (index, key, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][key] = value;
    setTasks(updatedTasks);
  };

  const SaveChanges = async () => {
    try {
      await API.sendTasks(tasks);
      console.log("Changes saved successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const AssignTasks = async () => {
    try {
      console.log([...otherStatus, ...tasks]);
      await API.sendTasks([...otherStatus, ...tasks]);
      console.log("Tasks assigned successfully");
    } catch (error) {
      console.error("Error assigning tasks:", error);
    }
  };

  return (
    <div className="mx-auto p-4">
      {!loaded && (
        <div className="flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardDescription>
                  Upload your Project Document here
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Input
                  type="file"
                  accept="application/pdf"
                  name="file"
                  className="w-min mr-2"
                  {...register("file", { required: true })}
                />
                <Button type="submit">Upload Document</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center h-50">
          <div className="w-10 h-10 border-4 border-primary border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading && formResponse && (
        <div className="mb-2">
          <Toaster />

          <h2 className="text-2xl mb-2">Project Report</h2>
          <Card>
            <Table className="table-auto w-full border-collapse border  border-gray-200">
              <TableHeader>
                <TableRow>
                  <TableHead className="border border-gray-200 px-4 py-2">
                    Project Name
                  </TableHead>
                  <TableHead className="border border-gray-200 px-4 py-2">
                    Frontend
                  </TableHead>
                  <TableHead className="border border-gray-200 px-4 py-2">
                    Backend
                  </TableHead>
                  <TableHead className="border border-gray-200 px-4 py-2">
                    Database
                  </TableHead>
                  <TableHead className="border border-gray-200 px-4 py-2">
                    Other
                  </TableHead>
                  <TableHead className="border border-gray-200 px-4 py-2">
                    Number of Tasks
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="border border-gray-200 px-4 py-2">
                    {formResponse?.["Name of the project"]}
                  </TableCell>
                  <TableCell className="border border-gray-200 px-4 py-2">
                    <ul>
                      {
                        formResponse?.["Tech Stack of the project"]?.[
                          "Front end"
                        ]
                      }
                    </ul>
                  </TableCell>
                  <TableCell className="border border-gray-200 px-4 py-2">
                    <ul>
                      {
                        formResponse?.["Tech Stack of the project"]?.[
                          "Back end"
                        ]
                      }
                    </ul>
                  </TableCell>
                  <TableCell className="border border-gray-200 px-4 py-2">
                    <ul>
                      {
                        formResponse?.["Tech Stack of the project"]?.[
                          "Database"
                        ]
                      }
                    </ul>
                  </TableCell>
                  <TableCell className="border border-gray-200 px-4 py-2">
                    <ul>
                      {formResponse?.["Tech Stack of the project"]?.["Other"]}
                    </ul>
                  </TableCell>
                  <TableCell className="border border-gray-200 px-4 py-2">
                    {formResponse?.["Number of tasks"]}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <h2 className="text-2xl mt-4 mb-2">Task Details</h2>
          <Card className="max-h-[55vh]  overflow-scroll">
            <Table className="overflow-scroll ">
              <TableHeader>
                <TableRow className="items-center">
                  <TableHead className="border border-gray-200 px-0 py-2 transform translate-x-[25%] ">
                    Task ID
                  </TableHead>
                  <TableHead className="border border-gray-200 px-4 py-2">
                    Name of the task
                  </TableHead>
                  <TableHead className="border border-gray-200 px-4 py-2">
                    Description of the task
                  </TableHead>
                  <TableHead className="border transform translate-x-[25%] border-gray-200 px-1  py-2">
                    Time
                    <br />
                    (weeks)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={task.TaskId}>
                    <TableCell className="border border-gray-200 px-4 py-2">
                      <p className="mx-auto">{task["TaskId"]}</p>
                    </TableCell>
                    <TableCell className="border border-gray-200 px-2 py-2">
                      <Input
                        className="mx-auto border-none"
                        type="text"
                        value={task["Name of the Task"]}
                        onChange={(e) =>
                          handleTaskChange(
                            index,
                            "Name of the Task",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="border border-gray-200 px-2 py-2">
                      <Input
                        className="mx-auto border-none"
                        type="text"
                        value={task["Description of the Task"]}
                        onChange={(e) =>
                          handleTaskChange(
                            index,
                            "Description of the Task",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="border border-gray-200 px-4  py-2">
                      <Input
                        className="w-8 mx-auto border-none"
                        type="text"
                        value={task["Time(in weeks)"]}
                        onChange={(e) =>
                          handleTaskChange(
                            index,
                            "Time(in weeks)",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <div className="flex justify-between mt-4">
            <Button
              className="bg-secondary text-primary hover:bg-secondary/90"
              onClick={handleSubmit(onSubmit)}
            >
              Regenerate
            </Button>
            <div className="flex gap-4">
              <Button
                className="bg-secondary text-primary hover:bg-secondary/90"
                onClick={() => {
                  toast({
                    variant: "success",
                    title: (
                      <p className="flex items-center  text-black">
                        <FileCheck />
                        Changes saved successfully
                      </p>
                    ),
                  });
                }}
              >
                Save Changes
              </Button>
              <Button onClick={AssignTasks}> Assign Tasks</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;

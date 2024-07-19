import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TaskScreen = () => {
  const Tasks = [
    {
      TaskId: 1,
      "Name of the Task": "Gather requirements from the client",
      Time: 24,
      "Description of the Task":
        "Meet with the client to understand their requirements and expectations for the ACSS.",
    },
    {
      TaskId: 2,
      "Name of the Task": "Define use cases for the ACSS",
      Time: 16,
      "Description of the Task":
        "Identify the various types of customer inquiries that the ACSS will need to handle.",
    },
    {
      TaskId: 3,
      "Name of the Task": "Design system architecture",
      Time: 32,
      "Description of the Task":
        "Create a high-level architecture for the ACSS that takes into account the various components and how they will interact with each other.",
    },
    {
      TaskId: 4,
      "Name of the Task": "Build out front-end interface",
      Time: 40,
      "Description of the Task":
        "Develop the user interface for the ACSS that will allow customers to interact with the system.",
    },
    {
      TaskId: 5,
      "Name of the Task": "Develop back-end functionality",
      Time: 48,
      "Description of the Task":
        "Build out the back-end functionality of the ACSS, including integration with CRM systems and NLP/ML models for answering customer inquiries.",
    },
    {
      TaskId: 6,
      "Name of the Task": "Test front-end interface",
      Time: 16,
      "Description of the Task":
        "Conduct thorough testing of the front-end interface to ensure that it is user-friendly, accessible, and fully functional.",
    },
    {
      TaskId: 7,
      "Name of the Task": "Test back-end functionality",
      Time: 24,
      "Description of the Task":
        "Conduct thorough testing of the ACSS back-end functionality to ensure that it is accurate, reliable, and scalable.",
    },
    {
      TaskId: 8,
      "Name of the Task": "Integrate ACSS with existing systems",
      Time: 32,
      "Description of the Task":
        "Integrate the ACSS with the client's existing systems and infrastructure to ensure seamless operation.",
    },
    {
      TaskId: 9,
      "Name of the Task":
        "Implement data encryption and access control measures",
      Time: 16,
      "Description of the Task":
        "Put in place robust security measures to ensure the protection of customer data and privacy.",
    },
    {
      TaskId: 10,
      "Name of the Task": "Deploy ACSS to AWS",
      Time: 8,
      "Description of the Task":
        "Deploy the ACSS to AWS for cloud-based hosting and scalability.",
    },
    {
      TaskId: 11,
      "Name of the Task": "Train support agents on ACSS",
      Time: 8,
      "Description of the Task":
        "Train the support agents on how to use the ACSS and its various features and capabilities.",
    },
    {
      TaskId: 12,
      "Name of the Task": "Provide ongoing maintenance and support for ACSS",
      Time: 40,
      "Description of the Task":
        "Provide ongoing maintenance and support for the ACSS to ensure that it continues to operate effectively and efficiently over time.",
    },
  ];
  return (
    <div className="ml-8 w-[70vw]">
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-primary-foreground mt-5 rounded-lg p-3">Tasks</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableCaption>This section is under development.</TableCaption>
              <TableHeader>
                <TableRow>
                <TableHead>Project Id</TableHead>
                  <TableHead>Task Id</TableHead>
                  <TableHead>Name of the Task</TableHead>
                  <TableHead>Description of the Task</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Tasks.map((item, index) => {
                  <TableRow key={index}>
                    <TableCell>{item.TaskId}</TableCell>
                    <TableCell>{item["Name of the Task"]}</TableCell>
                    <TableCell>{item["Description of the Task"]}</TableCell>
                    <TableCell>{item.Time}</TableCell>
                  </TableRow>;
                })}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TaskScreen;

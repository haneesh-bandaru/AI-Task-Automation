import { useState } from "react";
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

const UploadDocument = () => {
  const [formResponse, setFormResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      file: null,
    },
  });

  // const response = {
  //   "Name of the project": "Automated Customer Support System",
  //   "Tech Stacks needed": {
  //     "Front end": "React",
  //     "Back end": "Node.js",
  //     Database: "MongoDB",
  //     Other: "AWS (for cloud deployment)",
  //   },
  //   "Number of tasks": 12,
  //   Task: [
  //     {
  //       TaskId: 1,
  //       "Name of the Task": "Gather requirements from the client",
  //       Time: 24,
  //       "Description of the Task":
  //         "Meet with the client to understand their requirements and expectations for the ACSS.",
  //     },
  //     {
  //       TaskId: 2,
  //       "Name of the Task": "Define use cases for the ACSS",
  //       Time: 16,
  //       "Description of the Task":
  //         "Identify the various types of customer inquiries that the ACSS will need to handle.",
  //     },
  //     {
  //       TaskId: 3,
  //       "Name of the Task": "Design system architecture",
  //       Time: 32,
  //       "Description of the Task":
  //         "Create a high-level architecture for the ACSS that takes into account the various components and how they will interact with each other.",
  //     },
  //     {
  //       TaskId: 4,
  //       "Name of the Task": "Build out front-end interface",
  //       Time: 40,
  //       "Description of the Task":
  //         "Develop the user interface for the ACSS that will allow customers to interact with the system.",
  //     },
  //     {
  //       TaskId: 5,
  //       "Name of the Task": "Develop back-end functionality",
  //       Time: 48,
  //       "Description of the Task":
  //         "Build out the back-end functionality of the ACSS, including integration with CRM systems and NLP/ML models for answering customer inquiries.",
  //     },
  //     {
  //       TaskId: 6,
  //       "Name of the Task": "Test front-end interface",
  //       Time: 16,
  //       "Description of the Task":
  //         "Conduct thorough testing of the front-end interface to ensure that it is user-friendly, accessible, and fully functional.",
  //     },
  //     {
  //       TaskId: 7,
  //       "Name of the Task": "Test back-end functionality",
  //       Time: 24,
  //       "Description of the Task":
  //         "Conduct thorough testing of the ACSS back-end functionality to ensure that it is accurate, reliable, and scalable.",
  //     },
  //     {
  //       TaskId: 8,
  //       "Name of the Task": "Integrate ACSS with existing systems",
  //       Time: 32,
  //       "Description of the Task":
  //         "Integrate the ACSS with the client's existing systems and infrastructure to ensure seamless operation.",
  //     },
  //     {
  //       TaskId: 9,
  //       "Name of the Task":
  //         "Implement data encryption and access control measures",
  //       Time: 16,
  //       "Description of the Task":
  //         "Put in place robust security measures to ensure the protection of customer data and privacy.",
  //     },
  //     {
  //       TaskId: 10,
  //       "Name of the Task": "Deploy ACSS to AWS",
  //       Time: 8,
  //       "Description of the Task":
  //         "Deploy the ACSS to AWS for cloud-based hosting and scalability.",
  //     },
  //     {
  //       TaskId: 11,
  //       "Name of the Task": "Train support agents on ACSS",
  //       Time: 8,
  //       "Description of the Task":
  //         "Train the support agents on how to use the ACSS and its various features and capabilities.",
  //     },
  //     {
  //       TaskId: 12,
  //       "Name of the Task": "Provide ongoing maintenance and support for ACSS",
  //       Time: 40,
  //       "Description of the Task":
  //         "Provide ongoing maintenance and support for the ACSS to ensure that it continues to operate effectively and efficiently over time.",
  //     },
  //   ],
  // };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", data.file[0]);
      const response = await API.sendDocument(formData);
      setFormResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading document:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
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
                {...register("file")}
              />
              <Button type="submit">Upload Document</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center h-50">
          <div className="w-10 h-10 border-4 border-primary border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading && formResponse && (
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Project Report</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">
                  Project Name
                </th>
                <th className="border border-gray-200 px-4 py-2">Frontend</th>
                <th className="border border-gray-200 px-4 py-2">Backend</th>
                <th className="border border-gray-200 px-4 py-2">Database</th>
                <th className="border border-gray-200 px-4 py-2">Other</th>
                <th className="border border-gray-200 px-4 py-2">
                  Number of Tasks
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">
                  {formResponse?.["Title"]}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <ul>{formResponse?.["Tech Stacks needed"]?.["Frontend"]}</ul>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <ul>{formResponse?.["Tech Stacks needed"]?.["Backend"]}</ul>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <ul>{formResponse?.["Tech Stacks needed"]?.["Database"]}</ul>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <ul>{formResponse?.["Tech Stacks needed"]?.["Other"]}</ul>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {formResponse?.Tasks?.[0]?.["Number of tasks"]}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;

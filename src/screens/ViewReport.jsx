import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const ViewReport = () => {
  const ProjectData = [
    {
      name: "Project Alpha",
      description:
        "This project is focused on building an AI-based recommendation system.",
      details:
        "The task involves developing a recommendation algorithm using machine learning techniques. The project will be divided into several sprints, with each sprint focusing on different aspects such as data collection, model training, and evaluation.",
    },
    {
      name: "Project Beta",
      description: "Developing a mobile application for health monitoring.",
      details:
        "This task includes designing and implementing a mobile app that can track and analyze health data from various sensors. Key features will include real-time monitoring, data visualization, and integration with health APIs.",
    },
  ];

  return (
    <div className=" flex flex-grid col-span-3 row-span-4 gap-6 m-4">
      {ProjectData.map((project, index) => (
        <Card key={index} className="w-[300px] h-[210px]">
          <CardHeader>{project.name}</CardHeader>
          <CardContent>
            <CardDescription> {project.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90">
                View Report
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{project.name}</DialogTitle>
                  <DialogDescription>{project.details}</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ViewReport;

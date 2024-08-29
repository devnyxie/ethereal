import React from "react";

const WorkTree = () => {
  const workHistory = [
    {
      name: "Freelance",
      location: "Remote",
      position: "Software Engineer",
      date: "2024 - Present",
    },
    {
      name: "DemandSphere",
      location: "Tokyo, Japan",
      position: "Full Stack Developer",
      date: "2023 - 2024",
    },
    {
      name: "Draive.gr",
      location: "Thessaloniki, Greece",
      position: "Frontend Trainee",
      date: "2022 - 2023",
    },
  ];

  return (
    <div className="py-2">
      <div className="space-y-10 pl-4">
        {workHistory.map((work, index) => (
          <div key={index} className="relative pl-8">
            <div
              className={`absolute left-0 top-0 h-[calc(100%+40px)] w-px  ${
                index == workHistory.length - 1
                  ? "bg-gradient-to-b from-accent-foreground/50 to-transparent"
                  : "bg-accent-foreground/50"
              }`}
            ></div>
            <div
              className="absolute left-0 top-2 w-4 h-4 rounded-full bg-background border border-accent-foreground/50"
              style={{ transform: "translate(-50%, -50%)" }}
            ></div>
            <div className="">
              <h3 className="text-lg font-semibold">{work.name}</h3>
              {work.location && <p className="text-sm ">{work.location}</p>}
              {work.position && <p className="text-sm ">{work.position}</p>}
              <p className="text-sm">{work.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkTree;

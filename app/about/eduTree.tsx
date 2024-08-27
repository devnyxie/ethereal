import React from "react";

const EducationTree = () => {
  const education = [
    {
      name: "42Warsaw",
      location: "Warsaw, Poland",
      degree: "RNCP Level 7 - Computer Science",
      date: "2024 - 2028",
    },
    {
      name: "Epicode Bootcamp",
      degree: "MERN Full Stack Developer",
      date: "2022-2023",
    },
    {
      name: "2nd High School of Thessaloniki, Greece",
      degree: "Computer Science",
      date: "2019-2022",
    },
  ];

  return (
    <div className="py-2">
      <div className="space-y-10 pl-4">
        {education.map((edu, index) => (
          <div key={index} className="relative pl-8">
            <div
              className={`absolute left-0 top-0 h-[calc(100%+40px)] w-px  ${
                index == education.length - 1
                  ? "bg-gradient-to-b from-accent to-transparent"
                  : "bg-accent"
              }`}
            ></div>
            <div
              className="absolute left-0 top-2 w-4 h-4 rounded-full bg-background border"
              style={{ transform: "translate(-50%, -50%)" }}
            ></div>
            <div className="">
              <h3 className="text-lg font-semibold">{edu.name}</h3>
              {edu.location && <p className="text-sm ">{edu.location}</p>}
              <p className="text-sm font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationTree;

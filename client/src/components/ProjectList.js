import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";

export default function ProjectList(props) {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/projects")
      .then(res => {
        console.log(res.data);
        setProjectData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {projectData.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

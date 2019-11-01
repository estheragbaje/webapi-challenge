import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProjectList(props) {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/projects")
      .then(res => {
        setProjectData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return <div></div>;
}

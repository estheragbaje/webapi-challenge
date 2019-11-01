import React from "react";

export default function ProjectCard(props) {
  const { id, name, description, completed } = props.project;

  return (
    <div>
      <h2>{name}</h2>
      <h5>{description}</h5>
      <p>{completed}</p>
      <p>{id}</p>
    </div>
  );
}

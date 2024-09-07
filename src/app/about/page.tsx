import { technologies } from "./techData";

export default function About() {
  return (
    <>
      <div className="flex justify-center">
        <div className="p-6 space-y-4">
          <h2 className="rainbow-heading-text rainbow-text pb-8">Technologies Used</h2>
          <ul className="space-y-2">
            {technologies.map((tech, index) => (
              <li key={index} className={`text-style justify-center ${tech.github ? "pt-8" : ""}`}>
                {tech.icon}
                <span>{tech.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

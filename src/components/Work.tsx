import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { config } from "../config";

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          MY <span>WORK</span>
        </h2>
        <div className="work-grid">
          {config.projects.map((project, index) => (
            <div className="work-card" key={project.id}>
              <div className="work-card-content">
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.technologies}</p>
                </div>
                <WorkImage image={project.image} alt={project.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

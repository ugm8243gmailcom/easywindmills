export default function TopicsSection() {
  const topics = [
    {
      id: 'how-they-work',
      title: 'How wind turbines work',
      description: 'Airflow over aerodynamic blades generates aerodynamic lift, rotating the hub and driving an internal generator to produce clean electricity.'
    },
    {
      id: 'main-components',
      title: 'The main components of a wind turbine',
      description: 'Key structural assemblies include the aerodynamic rotor, nacelle, gearbox, generator, yaw drive, and tubular steel tower.'
    },
    {
      id: 'types-of-turbines',
      title: 'Different types of wind turbines',
      description: 'Horizontal-axis wind turbines (HAWT) represent the global utility standard, complemented by vertical-axis configurations (VAWT) for specialized wind flows.'
    }
  ];

  return (
    <section className="over-video-section" id="topics">
      <div className="content-container">
        <div className="frosted-panel content-narrow">
          <h2 className="section-title">Understanding wind energy</h2>
          <p className="lead-text">
            Wind turbines convert kinetic energy from moving air into electrical energy through an engineered combination of aerodynamic, mechanical, and electrical systems.
          </p>

          <div className="topic-list">
            {topics.map((topic) => (
              <article key={topic.id} className="topic-item">
                <h3 className="topic-heading">{topic.title}</h3>
                <p className="topic-description">{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LearnSection() {
  const learningTopics = [
    {
      title: 'Aerodynamics & Rotor Dynamics',
      body: 'How curved aerofoil blade profiles generate lift rather than pure drag, optimizing power extraction across varying wind velocity gradients.'
    },
    {
      title: 'Mechanical Drivetrain & Power Generation',
      body: 'The mechanical path from low-speed rotor rotation to high-speed electromagnetic generator rotation, or direct-drive permanent magnet alternators.'
    },
    {
      title: 'Active Pitch & Yaw Control Systems',
      body: 'How electromechanical drives orient the nacelle directly into oncoming wind flow and feather blade angles to protect against high wind shears.'
    },
    {
      title: 'Grid Integration & Power Electronics',
      body: 'Frequency synchronization, voltage conversion, and transformer integration allowing utility-scale wind plants to deliver stable electricity to regional grids.'
    }
  ];

  return (
    <section className="over-video-section" id="learn">
      <div className="content-container">
        <div className="frosted-panel content-narrow">
          <h2 className="section-title">Learn</h2>
          <p className="lead-text">
            A concise overview of the core mechanical, aerodynamic, and electrical principles behind modern wind power generation.
          </p>

          <div className="learn-grid">
            {learningTopics.map((topic, index) => (
              <div key={index} className="learn-entry">
                <h3 className="learn-entry-title">{topic.title}</h3>
                <p className="learn-entry-body">{topic.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

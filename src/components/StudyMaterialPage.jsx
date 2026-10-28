import { useState, useMemo } from 'react';
import { RESEARCH_PAPERS, TOPIC_FILTERS, PUBLISHER_FILTERS } from '../data/researchPapers';

export default function StudyMaterialPage({ onBackToHome }) {
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedPublisher, setSelectedPublisher] = useState('All Publishers');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter papers
  const filteredPapers = useMemo(() => {
    return RESEARCH_PAPERS.filter((paper) => {
      const matchTopic = selectedTopic === 'All Topics' || paper.topic === selectedTopic;
      const matchPub =
        selectedPublisher === 'All Publishers' ||
        paper.sourcePublisher.toLowerCase().includes(selectedPublisher.toLowerCase());
      const matchType = selectedType === 'All' || paper.type === selectedType;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        paper.title.toLowerCase().includes(q) ||
        paper.authors.toLowerCase().includes(q) ||
        paper.journal.toLowerCase().includes(q) ||
        paper.summary.toLowerCase().includes(q) ||
        paper.topic.toLowerCase().includes(q);

      return matchTopic && matchPub && matchType && matchSearch;
    });
  }, [selectedTopic, selectedPublisher, selectedType, searchQuery]);

  return (
    <div className="study-material-page">
      <div className="content-container page-content-wrap">
        {/* Page Header */}
        <header className="catalog-header study-header">
          <div className="catalog-eyebrow">
            <span className="eyebrow-dot" />
            <span>ACADEMIC REPOSITORY & LITERATURE COMPENDIUM</span>
          </div>
          <h1 className="catalog-title">Wind Turbine Engineering Study Material</h1>
          <p className="catalog-subtitle">
            Curated repository of peer-reviewed research papers, seminal review articles, 
            and authoritative technical reports across aerodynamics, electromechanics, grid integration, offshore dynamics, 
            and unconventional turbine designs from recognized scientific publishers.
          </p>

          {/* Quick Stats Strip */}
          <div className="study-stats-strip">
            <div className="study-stat-item">
              <span className="stat-number">6+</span>
              <span className="stat-label">Trusted Publishers (IEEE, Elsevier, NREL, Nature)</span>
            </div>
            <div className="study-stat-item">
              <span className="stat-number">9</span>
              <span className="stat-label">Core Mechanical & Electrical Disciplines</span>
            </div>
            <div className="study-stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Verified Publisher Access Links</span>
            </div>
          </div>
        </header>

        {/* Filter Toolbar */}
        <section className="shopping-toolbar study-toolbar" aria-label="Literature Filter Controls">
          {/* Search Field */}
          <div className="study-search-row">
            <div className="search-input-box study-search-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search papers by title, author, keyword, or journal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field"
                aria-label="Search study material papers"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Publication Type Selector */}
            <div className="study-type-tabs" role="tablist" aria-label="Publication Type">
              {['All', 'Review Paper', 'Research Article', 'Technical Report'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`category-tab ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type === 'All' ? 'All Types' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Pills */}
          <div className="study-topics-scroll" role="tablist" aria-label="Disciplines and Subjects">
            {TOPIC_FILTERS.map((topic) => (
              <button
                key={topic}
                type="button"
                className={`category-tab topic-tab ${selectedTopic === topic ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Publisher Quick Filters */}
          <div className="publisher-filter-row">
            <span className="filter-label">Filter by Publisher:</span>
            <div className="publisher-tags-list">
              {PUBLISHER_FILTERS.map((pub) => (
                <button
                  key={pub}
                  type="button"
                  className={`pub-filter-btn ${selectedPublisher === pub ? 'active' : ''}`}
                  onClick={() => setSelectedPublisher(pub)}
                >
                  {pub}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Papers Listing Grid */}
        <section className="study-papers-section" aria-label="Research Papers List">
          <div className="results-count-bar">
            <span>Peer-reviewed engineering research literature</span>
            {(selectedTopic !== 'All Topics' || selectedPublisher !== 'All Publishers' || selectedType !== 'All' || searchQuery) && (
              <button
                type="button"
                className="clear-all-filters-btn"
                onClick={() => {
                  setSelectedTopic('All Topics');
                  setSelectedPublisher('All Publishers');
                  setSelectedType('All');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredPapers.length === 0 ? (
            <div className="catalog-empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3>No publications found</h3>
              <p>Try searching for different keywords or reset your discipline and publisher filters.</p>
            </div>
          ) : (
            <div className="study-papers-grid">
              {filteredPapers.map((paper, index) => (
                <article key={paper.id} className="study-paper-card">
                  {/* Card Header */}
                  <div className="paper-card-top">
                    <div className="paper-index-badge">#{String(index + 1).padStart(2, '0')}</div>
                    <div className="paper-meta-tags">
                      <span className={`paper-type-tag ${paper.type.toLowerCase().replace(/\s+/g, '-')}`}>
                        {paper.type}
                      </span>
                      <span className="paper-source-tag">
                        {paper.sourcePublisher}
                      </span>
                    </div>
                  </div>

                  {/* Major Title: prominently visible */}
                  <h2 className="paper-card-title">
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="paper-title-link"
                      title={`Open paper: ${paper.title}`}
                    >
                      {paper.title}
                    </a>
                  </h2>

                  {/* Authors & Journal Info */}
                  <div className="paper-citation-info">
                    <div className="paper-authors">
                      <span className="author-label">Authors:</span> {paper.authors}
                    </div>
                    <div className="paper-journal-row">
                      <span className="journal-name">{paper.journal}</span>
                      <span className="journal-year">({paper.year})</span>
                      <span className="paper-topic-badge">{paper.topic}</span>
                    </div>
                  </div>

                  {/* Abstract / Factual Summary */}
                  <p className="paper-card-summary">
                    {paper.summary}
                  </p>

                  {/* Card Footer with Direct Outbound Link (DOI Removed as requested) */}
                  <div className="paper-card-footer">
                    <span className="paper-publisher-label">{paper.sourcePublisher}</span>

                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="paper-external-btn"
                      aria-label={`Open publication in new tab: ${paper.title}`}
                    >
                      <span>Read Publication</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function SearchAndFilter({
  handleSearch,
  handleReset,
  allCompanies,
  searchQuery: externalSearchQuery,
  selectedCompany: externalSelectedCompany
}) {
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");
  const [selectedCompany, setSelectedCompany] = useState(externalSelectedCompany || "");

  useEffect(() => {
    setSearchQuery(externalSearchQuery || "");
    setSelectedCompany(externalSelectedCompany || "");
  }, [externalSearchQuery, externalSelectedCompany]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery, selectedCompany);
  };

  const onReset = () => {
    setSearchQuery("");
    setSelectedCompany("");
    handleReset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center flex-col gap-4 mb-6">
      <div className="flex flex-wrap justify-center gap-4">

        <input
          type="text"
          placeholder="Search job titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered "
        />
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Companies</option>
          {allCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center gap-4'>

        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button
          type="button"
          onClick={onReset}
          className="btn btn-secondary"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
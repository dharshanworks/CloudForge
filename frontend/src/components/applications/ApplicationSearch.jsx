function ApplicationSearch({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div
      style={{
        marginBottom: "25px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search applications..."
        value={searchTerm}
        onChange={(event) =>
          setSearchTerm(event.target.value)
        }
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          fontSize: "15px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default ApplicationSearch;
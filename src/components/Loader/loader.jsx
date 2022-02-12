function Loader({ loading }) {
  return (
    <>
      {loading && (
        <div className="loader">
          <div className="loader_image_container">
            <img
              className="loader_image"
              src={
                "https://gist.githubusercontent.com/ManulMax/2d20af60d709805c55fd784ca7cba4b9/raw/bcfeac7604f674ace63623106eb8bb8471d844a6/github.gif"
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Loader;

import { useEffect, useState, useRef } from "react";
import Repocard from "./components/repocard";
import "./App.css";

function App() {
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://api.github.com/search/repositories?q=stars:%3E1&sort=stars")
      .then((response) => response.json())
      .then((data) => {
        setTrendingRepos(data.items);
        setLoading(false);
        inputRef.current.focus();
      });
  }, []);

  return (
    <>
      {loading ? (
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
      ) : (
        <div className="app">
          <div>
            <h1 className="app_title">trendingRepos</h1>
          </div>
          <div className="app_search_container">
            <div className="app_search_bar">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={inputRef}
                className="app_search_input"
                placeholder="Find a repository..."
              />
            </div>
          </div>
          <div className="app_repos_container">
            {trendingRepos.length > 0 &&
              trendingRepos
                .filter((repo) => {
                  if (
                    repo.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    repo.description
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return true;
                  }
                })
                .map((repo) => {
                  return (
                    <Repocard
                      language={repo.language}
                      title={repo.name}
                      issues={repo.open_issues_count}
                      forks={repo.forks_count}
                      starGazers={repo.stargazers_count}
                      description={repo.description}
                      privateRepo={repo.private}
                      license={repo.license ? repo.license.key : ""}
                    />
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;

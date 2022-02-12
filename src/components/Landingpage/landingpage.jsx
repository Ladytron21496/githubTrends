import { useEffect, useState, useRef } from "react";
import Loader from "../Loader/loader";
import Repocard from "../Repocard/repocard.jsx";
import "./landingpage.css";

function Landingpage() {
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <Loader loading={loading} />
      {loading === false && (
        <div className="landing_app">
          <div>
            <h1 className="landing_app_title">trendingRepos</h1>
          </div>
          <div className="landing_app_search_container">
            <div className="landing_app_search_bar">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={inputRef}
                className="landing_app_search_input"
                placeholder="Find a repository..."
              />
            </div>
          </div>
          <div className="landing_app_repos_container">
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
                      repopage={false}
                      topics={repo.topics}
                      contributionUrl={repo.contributors_url}
                      language={repo.language}
                      title={repo.name}
                      issues={repo.open_issues_count}
                      forks={repo.forks_count}
                      starGazers={repo.stargazers_count}
                      description={repo.description}
                      privateRepo={repo.private}
                      loginName={repo.owner.login}
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

export default Landingpage;

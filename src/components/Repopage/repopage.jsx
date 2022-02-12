import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Repocard from "../Repocard/repocard";
import Loader from "../Loader/loader";

import "./repopage.css";

function Repopage() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [headerData, setHeaderData] = useState({});
  const [topics, setTopics] = useState([]);
  const [reposData, setReposData] = useState([]);
  const [contriButorsData, setContriButorsData] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (state.topicsArray) {
      setTopics(state.topicsArray);
    }
    if (state) {
      fetch(`https://api.github.com/users/${state.name}`)
        .then((response) => response.json())
        .then((data) => {
          setHeaderData(data);
          fetch(data.repos_url)
            .then((res) => res.json())
            .then((data) => {
              setReposData(data);
            });
          setLoading(false);
        });
      if (state.contributorsUrl) {
        fetch(state.contributorsUrl + "?per_page=100")
          .then((res) => res.json())
          .then((data) => {
            setContriButorsData(data);
          });
      }
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="repopage-container">
          <div className="repopage-header-container">
            <div className="repopage-avatar-container">
              <img className="repopage-avatar" src={headerData.avatar_url} />
            </div>
            <div>
              <div className="repopage-title">
                {headerData.name ? headerData.name : headerData.login}
              </div>
              <div className="repopage-bio">{headerData.bio}</div>
            </div>
          </div>
          <div className="repopage-body-main-container">
            <div className="repopage-body-container">
              <div className="repopage-topic-title-repos">
                {headerData.name ? headerData.name : headerData.login}'s Repos
              </div>
              {reposData.map((repo) => {
                return (
                  <Repocard
                    repoPage={true}
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
            <div>
              <div className="repopage-topic-title">Most Used Topics</div>
              <div className="repopage-topics-container">
                {topics.map((topic) => {
                  return <div className="repopage-topic">{topic}</div>;
                })}
              </div>
              <div className="repopage-topic-title">Contributors</div>
              <div className="repopage-contributors-container">
                {contriButorsData.map((contributor) => {
                  return (
                    <div>
                      <img
                        className="repopage-contributors-avatar-placeholder"
                        style={{ height: "3rem", borderRadius: "50%" }}
                        src={contributor.avatar_url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Repopage;

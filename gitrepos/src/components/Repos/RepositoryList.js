import React, { useState } from "react";
import { Button, Card, CardBody, Col, FormGroup } from "reactstrap";
import {
  useFetchRepositoryData,
  useFetchLanguageData,
  useFetchStarsData,
} from "../ApiCollection/Api";
import "./RepoList.css";
import Search from "../SearchBar/Search";
import FilterData from "../FilterData/FilterData";

const RepositoryList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [repoData, setRepoData, fetchRepositoryData] = useFetchRepositoryData();
  const language = useFetchLanguageData(repoData);
  const [stars, setStars] = useFetchStarsData(repoData);

  return (
    <>
      <FormGroup>
        <h2>
          <b>List Of All The Public Repos</b>
        </h2>
      </FormGroup>
      <Search
        dataList={repoData}
        searchType={"name"}
        setData={setRepoData}
        handleDefaultData={fetchRepositoryData}
      />
      <Button className="menu-buttons" onClick={() => setIsOpen(!isOpen)}>
        Filter Options
      </Button>
      {isOpen && (
        <FilterData
          repoData={repoData}
          setRepoData={setRepoData}
          toggleDropdown={toggleDropdown}
          isOpen={isOpen}
          stars={stars}
          setStars={setStars}
        />
      )}
      <FormGroup>
        <div className="list-main">
          {repoData?.length > 0 &&
            repoData?.map((value, i) => {
              const repoLanguage = language[i];
              const repoStars = stars[i]?.length;
              return (
                <Col key={i} className="card-main-div">
                  <Card className="card-main">
                    <img
                      src={value.owner.avatar_url}
                      alt="Card image cap"
                      className="image-main"
                    />
                    <CardBody className="info-main">
                      <div className="info-card">
                        <p>Repo Name</p>
                        <p>{value?.name}</p>
                      </div>
                      <div className="info-card">
                        <p>Description</p>
                        <p>{value?.description}</p>
                      </div>
                      <div className="info-card">
                        <p>Languages</p>
                        <p>
                          {repoLanguage ? (
                            Object.keys(repoLanguage).join(", ")
                          ) : (
                            <span>No languages found</span>
                          )}
                        </p>
                      </div>
                      <div className="info-card">
                        <p>Stars</p>
                        <p>{repoStars}</p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </div>
      </FormGroup>
    </>
  );
};

export default RepositoryList;

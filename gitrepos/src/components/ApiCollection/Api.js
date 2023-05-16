import React, { useState, useEffect } from "react";

export const useFetchRepositoryData = () => {
  const [repoData, setRepoData] = useState([]);

  const fetchRepositoryData = async () => {
    try {
      const data = await fetch("https://api.github.com/repositories", {
        method: "GET",
        headers: {
          Authorization: "Bearer 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",
        },
      });
      const listData = await data.json();
      setRepoData(listData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRepositoryData();
  }, []);

  return [repoData, setRepoData, fetchRepositoryData];
};

//Fetch languages based on repoData
export const useFetchLanguageData = (repoData) => {
  const [language, setLanguage] = useState([]);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const languages = await Promise.all(
          repoData.map((val) =>
            fetch(val.languages_url, {
              method: "GET",
              headers: {
                Authorization:
                  "Bearer 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",
              },
            }).then((res) => res.json())
          )
        );
        setLanguage(languages);
      } catch (error) {
        console.log(error);
      }
    };

    if (repoData?.length > 0) {
      fetchLanguage();
    }
  }, [repoData]);

  return language;
};

//Fetch stars associated to repos
export const useFetchStarsData = (repoData) => {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const fetchStars = async () => {
      try {
        const languages = await Promise.all(
          repoData.map((val) =>
            fetch(val.stargazers_url, {
              method: "GET",
              headers: {
                Authorization:
                  "Bearer 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",
              },
            }).then((res) => res.json())
          )
        );
        setStars(languages);
      } catch (error) {
        console.log(error);
      }
    };
    if (repoData?.length > 0) {
      fetchStars();
    }
  }, [repoData]);
  return [stars, setStars];
};

import React, { useState, useLayoutEffect } from "react";
import axios from "axios";

import TextListBody from "./TextListBody";
import TextEditor from "./TextEditor";

export default function TextList() {
  //List of all articles/texts
  const [articles, setArticles] = useState([]);
  //Single article/text ID
  const [articleId, setArticleId] = useState(null);
  //Loading state
  const [loading,setLoading] = useState(true);
  //Setter for text ID
  const setterForTextId = (e) => {
    setArticleId(e);
  };
  //URL to get all texts
  const URL = "https://texter-test.herokuapp.com/text/admin";
  //Initial value for text list
  useLayoutEffect(() => {
    let mounted = true;
    axios.get(URL).then((response) => {
      setArticles(response.data);
      setLoading(false);
    });
    return () => (mounted = false);
  }, []);
  //Reload Text list after Delete, Approve or Update text
  const reloadTextList = () => {
    setLoading(true);
    axios.get(URL).then((response) => {
      setArticles(response.data);
      setLoading(false);
    });
  };

  return (
    <>
      { loading === true ? (
        <h1 className="text-loader">X</h1>
      ) :(<div>
        {articleId ? (
          <TextEditor
            articleId={articleId}
            reloadTextList={reloadTextList}
            setterForTextId={setterForTextId}
          />
        ) : (
          <div className="text-list">
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>Naslov</th>
                  <th>Autor</th>
                  <th>Tema</th>
                  <th>Odobri</th>
                  <th>Obrisi</th>
                  <th>Uredi</th>
                </tr>
              </thead>
              <tbody>
                {articles &&
                  articles
                    .reverse()
                    .sort((a, b) => a.approved - b.approved)
                    .map((article) => (
                      <TextListBody
                        key={article._id}
                        reloadTextList={reloadTextList}
                        article={article}
                        setterForTextId={setterForTextId}
                      />
                    ))}
              </tbody>
            </table>
          </div>
        )}
      </div>)}
    </>
  );
}
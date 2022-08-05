import React, { useLayoutEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import napred from "../../images/napred.png";
import nazad from "../../images/nazad.png";

export default function TextEditor({
  user,
  articleId,
  reloadTextList,
  setterForTextId,
}) {
  //One article/text
  const [article, setArticle] = useState({
    title: "",
    text: "",
    color: "",
    readTime: "",
    image: "",
    textSummary: "",
    theme: "Politika",
    author: articleId ? "" : user.nameUser,
    authorImage: articleId ? "" : user.image,
    authorSignature: articleId ? "" : user.signature,
    authorId: articleId ? "" : user._id,
  });

 
  const onEditorChange = (e) => {
    setArticle({ ...article, text: e.target.getContent() });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setArticle((prevState) => ({
      ...article,
      text: value,
    }));
  };
  const parseEditorData = (content, editor) => {
    const { targetElm } = editor;
    const { name } = targetElm;
    return {
      target: {
        value: content,
      },
    };
  };
  // btn display
  const [btnDisplay, setBtnDisplay] = useState("flex");
  const URL = "https://texter-test.herokuapp.com/text";
  //Function to send new article/text to server
  const createText = () => {
    axios
      .post(URL, {
        title: article.title,
        text: article.text,
        color: article.color,
        readTime: article.readTime,
        image: article.image,
        textSummary: article.textSummary,
        theme: article.theme,
        author: user.nameUser,
        authorImage: user.image,
        authorSignature: user.signature,
        authorId: user._id,
      })
      .then((response) => {
        if (response.status === 201) {
          setBtnDisplay("flex");
          alert("Text Kreiran");
          setArticle({
            title: "",
            text: "",
            color: "",
            readTime: "",
            image: "",
            textSummary: "",
            theme: "Politika",
            author: user.nameUser,
            authorImage: user.image,
            authorSignature: user.signature,
            authorId: user._id,
          });
        }
        if (response.status === 409) {
          alert("Greška!");
          setArticle({
            title: "",
            text: "",
            color: "",
            readTime: "",
            image: "",
            textSummary: "",
            theme: "Politika",
            author: user.nameUser,
            authorImage: user.image,
            authorSignature: user.signature,
            authorId: user._id,
          });
        }
      });
  };
  //Update article/text by Id
  const updateText = () => {
    setBtnDisplay("none");
    axios
      .patch(URL + "/" + articleId, {
        title: article.title,
        text: article.text,
        color: article.color,
        readTime: article.readTime,
        image: article.image,
        textSummary: article.textSummary,
        theme: article.theme,
        author: article.author,
        authorImage: article.authorImage,
        authorSignature: article.authorSignature,
        authorId: article.authorId,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Tekst je izmenjen");
          reloadTextList();
          setterForTextId(null);
        }
      });
  };
  // Initial occurrence if the article/text id exists
  useLayoutEffect(() => {
    let mounted = true;
    if (articleId) {
      axios.get(URL + "/" + articleId).then((response) => {
        setArticle({
          ...article,
          text: response.data.text,
          title: response.data.title,
          color: response.data.color,
          readTime: response.data.readTime,
          image: response.data.image,
          textSummary: response.data.textSummary,
          theme: response.data.theme,
          author: response.data.author,
          authorImage: response.data.authorImage,
          authorSignature: response.data.authorSignature,
          authorId: response.data.authorId,
        });
      });
    }
    return () => (mounted = false);
  }, []);
  // Create Confirm Question
  const createTextConfirm = () => {
    if (window.confirm("Da li ste sigurni da zelite da kreirate text?")) {
      createText();
    }
  };
  // Update Confirm Question
  const updateTextConfirm = () => {
    if (window.confirm("Da li ste sigurni da zelite da izmenite text?")) {
      updateText();
    }
  };
  return (
    <div className="inputs" id="#inputs">
      <input
        className="editor_input"
        type="text"
        placeholder="Naslov"
        value={article.title}
        onChange={(e) => {
          setArticle({ ...article, title: e.target.value });
        }}
      />
      <input
        className="editor_input"
        type="text"
        placeholder="Boja"
        value={article.color}
        onChange={(e) => {
          setArticle({ ...article, color: e.target.value });
        }}
      />
      <input
        className="editor_input"
        type="text"
        placeholder="Vreme čitanja"
        value={article.readTime}
        onChange={(e) => {
          setArticle({ ...article, readTime: e.target.value });
        }}
      />
      <textarea
        className="editor_input"
        cols="30"
        rows="5"
        placeholder="Naslovni text"
        value={article.textSummary}
        maxLength="90"
        onChange={(e) => {
          setArticle({ ...article, textSummary: e.target.value });
        }}
      ></textarea>
      <select
        className="editor_input"
        name="Tema"
        onChange={(e) => {
          setArticle({ ...article, theme: e.target.value });
        }}
      >
        <option value="Politika">Politika</option>
        <option value="Sport">Sport</option>
        <option value="Priče">Priče</option>
        <option value="Svaštara">Svaštara</option>
        <option value="Kultura">Kultura</option>
        <option value="Čitaoci pisci">Čitaoci pisci</option>
      </select>
      <img className="inputs_Image" src={article.image} alt="Article Image" />
      <input
        className="editor_input"
        type="text"
        placeholder="Naslovna Slika"
        value={article.image}
        onChange={(e) => {
          setArticle({ ...article, image: e.target.value });
        }}
      />
      <div className="editorWrapper">
        <Editor
          apiKey="jp858r559wmy49zcwy5iz076m0pgbe6aey6eh5t290g6te62"
          value={article.text}
          init={{
            height: "auto",
            menubar: true,
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | help",
          }}
          onEditorChange={(content, editor) =>
            handleChange(parseEditorData(content, editor))
          }
        />
      </div>
      {articleId ? (
        <>
          <button
            className="button-form-submit"
            style={{ display: btnDisplay }}
            onClick={() => updateTextConfirm()}
          >
            <span>Potvrdi</span> <img src={napred} alt="Arrow Right" />
          </button>
          <button
            className="button-form-submit"
            onClick={() => setterForTextId(null)}
          >
            <span>Nazad</span> <img src={nazad} alt="Arrow Left" />
          </button>
        </>
      ) : (
        <>
          <button
            className="button-form-submit"
            style={{ display: btnDisplay }}
            onClick={() => createTextConfirm()}
          >
            <span>Kreiraj</span> <img src={napred} alt="Arrow Right" />
          </button>
        </>
      )}
    </div>
  );
}

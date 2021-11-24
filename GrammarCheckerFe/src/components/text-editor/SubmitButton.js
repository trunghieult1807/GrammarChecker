import React, { useState } from "react";
import axios from "axios";

export const SubmitButton = ({input}) => {
  const [loading, setLoading] = useState(false)
  
  const handle_input = () => {
    let text = '';
    for (let obj of input) {
      for (let child of obj['children']) {
        text = text.concat(child['text']);
      }
      text = text.concat(' ');
    }
    return text;
  }

  const grammar_check = async () => {
    const url = 'http://localhost:8000/grammar_checker';
    const params = {
      body: handle_input(),
    }
    setLoading(true);
    await axios.post(url, params).then((res) => {
      console.log(res.data);
    })
    setLoading(false);
  };
  return (
    <div style={{ marginTop: "60px" }}>
      <button className="button" onClick={grammar_check} disabled={loading}>
        {loading && (
          <i
            className="fa fa-refresh fa-spin"
            style={{ marginRight: "5px" }}
          />
        )}
        {loading && <span>Checking...</span>}
        {!loading && <span>Check Grammar</span>}
      </button>
    </div>
  );

}

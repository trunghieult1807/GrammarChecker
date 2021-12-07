import React, { useState } from "react";
import axios from "axios";

export const SubmitButton = ({ setValueHandler, onClick, pass }) => {
  const [loading, setLoading] = useState(false);

  const grammar_check = async () => {
    let output = [];
    const url = 'http://localhost:8000/grammar_checker';
    var raw = onClick();
    console.log('raw', raw);
    var input = raw.replace(/<div>(.*?)div>?/gm, '');
    console.log('input', input);
    input = input.replace(/<(.*?)>?/gm, '');
    
    const params = {
      body: input,
    }
    setLoading(true);
    await axios.post(url, params).then((res) => {
      output = res;
      console.log(res);
    });

    pass(output['data']['tagged_output'])
    setValueHandler(output['data']['tagged_input']);
    console.log('out', output['data']['tagged_input']);
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

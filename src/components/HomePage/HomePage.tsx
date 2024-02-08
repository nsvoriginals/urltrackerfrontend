import React, { useState } from 'react';
import axios from 'axios';
import './HomePage.css'; // Import CSS file


function HomePage() {
  const [input, setInput] = useState({
    longUrl: "",
    urlCode: ""
  });
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
console.log(url)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
    setIsError(false);
  };
  const handleSubmit = () => {
    setIsLoading(true);
    axios.post('https://urltracker.onrender.com/api/url/shorten', input)
      .then(res => {
        const data = res.data;
        setUrl(data.shortUrl);
      })
      .catch(error => {
        console.error(error);
        setUrl("An error occurred while shortening the URL");
      })
      .finally(() => {
        console.log(isError)
        setIsLoading(false);
      });
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>URL TRACKER</h3>
        <label htmlFor="longUrl">Long Url</label>
        <input
          type="text"
          placeholder="URL"
          id="longUrl"
          value={input.longUrl}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="urlCode">Custom Code</label>
        <input
          type="text"
          placeholder="Optional"
          id="urlCode"
          value={input.urlCode}
          onChange={handleInputChange}
        />
        <button  onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {url && (
        <div id="copy">
          <input value={url} readOnly />
          <div className="social">
            <button onClick={() => navigator.clipboard.writeText(url)}>
              <i className="fab fa-google"></i> Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

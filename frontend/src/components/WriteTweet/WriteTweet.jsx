import "./WriteTweet.css";

const WriteTweet = () => {
  return (
    <div className="write-tweet">
      <h4>Write a new tweet</h4>
      <textarea placeholder="Write a tweet"></textarea>
      <button type="button">post Tweet</button>
    </div>
  );
};

export default WriteTweet;

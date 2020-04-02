import React from 'react';
import './App.css';
import BuildCard from "./components/BuildCard";

function App() {
  return (
    <div id="content">
      <BuildCard
        status={"succeeded"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"342"}
        author={"nhalstead"}
        authorIcon={"https://avatars3.githubusercontent.com/u/5577816?s=40&amp;v=4"}
      />
      <BuildCard
        status={"failed"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"341"}
      />
      <BuildCard
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"341"}
      />
      <BuildCard
        status={"canceled"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
      <BuildCard
        status={"running"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
      <BuildCard
        status={"waiting"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
      <BuildCard
        status={"failed"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
      <BuildCard
        status={"failed"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
      <BuildCard
        status={"failed"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
      <BuildCard
        status={"failed"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
      <BuildCard
        status={"failed"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
      <BuildCard
        status={"failed"}
        org={"nhalstead"}
        repo={"testing123"}
        buildNumber={"340"}
      />
    </div>
  );
}

export default App;


## Circle CI Build Watcher

This is a simple tool to watch what builds are running on CircleCI and allow you to open directly to that build.

This tool is a small window that will open up and connect to the CircleCI API using your [API Token from your Account](https://circleci.com/account/api)
  and return the following information in a handy UI.
  
 - Build Status
 - Build Number
 - Author
 - Repository & Branch
 - Pull Request (If present)
 
This tool supports using multiple circle CI accounts/token for when you have many organizations you need to watch builds on.

## How to start

At this point no releases are available so your only option is to clone the source code from github.

```
git clone https://github.com/nhalstead/circleci_build_watcher.git
```

Once you have it cloned you can then run the following command to install all of the needed libraries.

```
npm install
```

Finally you are ready to run, just run the following command to start the UI.

```
 npm start
```

Once it opens up nothing will be in the list so you will need to configure the Json File (UI Config is comming soon).

In this project I used `electron-store` which will store the file in one of the following locations:

| Operating System | Path                                                 |
|:-----------------|:-----------------------------------------------------|
| Windows          | %APPDATA%/circleci_build_watcher                     |
| Mac              | ~/Library/Application Support/circleci_build_watcher |
| Linux            | $XDG_CONFIG_HOME/circleci_build_watcher              |
| Linux            | ~/.config/circleci_build_watcher                     |


## The Config File

This config file is loaded on start and is never written to from the application (yet).

The Config file looks like this for simple use.
You can get the token from your account in each org by going to the following [URL](https://circleci.com/account/api).

```json
{
  "endpoints": [
    {
      "type": "github",
      "org": "example_org",
      "token": "xyz123"
    }
  ]
}
```
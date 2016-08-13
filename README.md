# g2tbl
Gmail to Trello backlog. Takes incoming e-mails and saves them as cards on Trello

* [Requirements](#requirements)
* [Setup](#setup)
* [Usage](#usage)

## <a name="requirements">Requirements</a>

Before starting to use **g2tbl** you need to have done the following steps:
* Install [Node](#https://nodejs.org/en/)
* Have [Trello](#https://trello.com/) user
* Get API key and token for Trello from [here](#https://trello.com/app-key)
* Create a board on Trello, and a list on that board
* Get the id of the list as per this [guide](#https://developers.trello.com/get-started/start-building#create)
* Have a [Gmail](#https://mail.google.com/) account
* Create a project on [Google Developer Console](#https://console.developers.google.com)
* Get auth credentials for your google account from [here](#https://console.developers.google.com/apis/credentials)
* Create a topic for your project [here](#https://console.cloud.google.com/cloudpubsub/topicList)
* Add `serviceAccount:gmail-api-push@system.gserviceaccount.com` as a Pub/sub-publisher to the topic

## <a name="setup">Setup</a>

1. [Copy the repo](#https://help.github.com/articles/duplicating-a-repository/)
2. Copy the `config-example.js` and rename the copy to `config.js` (run the following script in the folder) `cp config-example.js config.js`
3. Fill in the config.js as per the instructions in the file (previous [requirements](#requirements))

## <a name="usage">Usage</a>

After setup is complete, just enter `node index.js` into a console in the home dir of the project.

### Proudly sponsored by [Spice Program](#http://spiceprogram.org/)

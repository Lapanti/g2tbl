# g2tbl
[![Dependency Status](https://dependencyci.com/github/Lapanti/g2tbl/badge)](https://dependencyci.com/github/Lapanti/g2tbl)
Gmail to Trello backlog. Takes incoming e-mails and saves them as cards on Trello

* [Requirements](#requirements)
* [Setup](#setup)
* [Usage](#usage)
* [Sponsored by](#sponsored)

## <a name="requirements">Requirements</a>
Before starting to use **g2tbl** you need to have done the following steps:
* Install [Node](https://nodejs.org/en/)
* [Trello](https://trello.com/)
    * Have a Trello user
    * Get API key and token for Trello from [here](https://trello.com/app-key)
    * Create a board on Trello, and a list on that board
    * Get the id of the list as per this [guide](https://developers.trello.com/get-started/start-building#create)
* [Gmail](https://mail.google.com/)
    * Have a Google account
    * Enable 2-factor authentication on your google account if not already done
    * Create an app password [here](https://support.google.com/accounts/answer/185833?hl=en)

## <a name="setup">Setup</a>
1. [Copy the repo](https://help.github.com/articles/duplicating-a-repository/)
2. Copy the `config-example.js` and rename the copy to `config.js` (run the following script in the folder) 
    * `cp config-example.js config.js`
3. Fill in the config.js as per the instructions in the file (previous [requirements](requirements))

## <a name="usage">Usage</a>
After setup is complete, just enter `node index.js` into a console in the home dir of the project.

## <a name="sponsored">Sponsored by</a>
[Spice Program](http://spiceprogram.org/)

# Journalized

The journal app [day one](https://dayone.me) misses features like having multi-user support, channel-support and also a public flag for both channels or user-entries. This project is going to implement these missing features in a stand-alone client based on ember-cli (currently shipping with Ember.js 2.2.0).

## Use-Cases

* Writing a private journal entry by keeping it to yourself (not public).
* Write a journal entry and share it with everyone by making it public. This can be seen in the users profile? On the other hand - users which like your entry or feel related or whatsoever can then add this entry to their chronic as well.
* Write a journal entry and share it to a specific friend (link your entry to another user)
* Share that written entry to a channel. (Channel approve workflow - in case you're not )
* Create a private channel 'My family journal' and add all family members as members with the role 'read'
* Create a public channel for posting the latest "programmers jokes". Everyone can read and laugh, but just members can do write/approve/admin. TODO: Think of non-members can add "un-approved" entries - which then by approve/admin can be verified.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

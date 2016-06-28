# Micropub

![Micropub](https://raw.githubusercontent.com/evbogue/micropub/master/micropub1.png)

The goal of Micropub is to view a "micro" message type on the Scuttlebot distributed database.

Make sure you have scuttlebot installed and the server running

	% sudo npm install -g scuttlebot
	% sbot server

To start Micropub, first clone it down.

	% git clone git@github.com:evbogue/micropub.git 
	
Next install the modules

	% npm install

And run Micropub with:

	% node index.js

You should see a list of micro messages.

If you want to view a message type other than 'micro' pass the type you want to view as an argument. For example, if you want to see Patchwork-style Sbot posts, try

	% node index.js post

For right now, to publish you'll need to use the sbot interface. In another window, type

	% sbot publish --type micro --text "Hello World"

While Scuttlebot has an 8k limit, micro posts should be kept to reasonable number characters. This is enforced using the honor system, and eventually some client-side code.

A few implementable goals

- [x] View micro messages
- [x] View micro messages in realtime
- [ ] Limit micro messages to reasonable number of characters
- [x] Find and render user handles
- [ ] Post messages

Initially based on @myf's [Patchterm](https://github.com/myf/patchterm).


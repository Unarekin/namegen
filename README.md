# Namegen
This is a fairly simple Markov-chain based word generation module.  It is based on a set of scripts from Chris Pound (http://generators.christopherpound.com/), originally written in PERL and not updated in quite a long time.

## Data Files
The module uses a series of name files, in the names directory, to store sample data it uses to build names.  Each of these files returns an object with a name property, and a subsets property.  The subsets property has keys for the subsets available (male, female, etc).  When generating a name, one must specify the template used as well as the subset.

## How it Works
When generating a name, a template and subset is selected.  IE: "English" and "Male", or "Japanese" and "Female" or the like.  We randomly select a name from this list, and store the first two letters in it.  This becomes the start of our word.
We then take that pair of letters and look for every letter in the data set that is valid to follow that pair.  In this, the end of a word is a valid choice.  We randomly select one of these letters, and add it to our word.
We repeat the previous step, always using the last two letters of the word, until we determine that we should end the word.

It is possible to enforce a maximum or average limit on words, possibly calculated from the provided data set, but that is not currently implemented.
 

# Credits
The credits section from Chris Pound's page, reproduced here to ensure it isn't lost one day:
```
Credits, etc.

If you're intrigued by all of this, subscribe to the world-design mailing list via majordomo@erzo.org. I think Majordomo wants you to say "subscribe world-design [address]" in the body of the message. Or, maybe you'd prefer the constructed-languages list. Tell majordomo@diku.dk to "subscribe conlang". Have fun!

Alan Sweeney (Page 637@aol.com) contributed all the datasets for Arabic, Celtic, Modern Greek, Spanish, and Thai names. Loren Miller (loren@wharton.upenn.edu) contributed the datasets for Cthulhoid, Carmanian, Assyrian, Japanese, and Viking names. Alex Fink (fink@cadvision.com) contributed the Latvian files. Hayden Sweeney (bmalehtmai@aol.com) contributed the dataset for Ancient Egyptian. Kaoru Moriyama (caro@aaa-int.or.jp) provided some excellent info on Japanese names, which I'm afraid I corrupted a bit given the way I incorporated it into the Japanese ruleset for werd. Aaron Parecki (www.aaronparecki.com) contributed the Hawaiian ruleset for werd. Mark Rosenfelder (markrose@tezcat.com) gave me a copy of an old Pascal program of his that inspired me to write my little "werd" script (so much simpler in perl! :-). My thanks to Skyfox (skyfox@telia.com) for help with the kung-fu move generator.

If you have any question or comments, or if you have a new dataset you'd like to contribute, email me: cpound@gmail.com.
```

The algorithm itself I took from the scripts on Chris Pound's page some years back.  Unless I am informed otherwise, I assume credit for the actual generation algorithm goes to Chris Pound.


# Testing
Tests are written in mocha and may require this library be installed.

ex:

```sh
sudo npm install -g mocha
```

Otherwise, ```npm run test ``` will execute the tests.

# History
 
Version 1.0 (2017-09-24) - Initial setup
 
# License
 
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

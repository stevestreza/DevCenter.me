DevCenter.me
=

DevCenter.me is a website to easily get to many developer websites for various APIs. It includes a directory of supported sites, as well as memorable URL shortcuts.

Adding Sites
=

The sites are driven from a file, sites.json. To add a site to the directory, fork this repository, add a site, and submit a pull request.

Each site is represented in JSON as a hash mapping to the following keys and values:

- `shortcuts`: an array of shortcuts which are used for generating URLs. Required.
- `name`: a displayable name for the particular developer portal. Required.
- `url`: the URL to redirect to. Required.
- `sortKey`: a key to sort on for display in the directory. If not present, the `name` will be used. Optional.

**Please use hard tabs, not spaces, when adding entries to the JSON file.**

Installing
=

To run, clone the repository, run `npm install`, and then run `node app`. You can also show a dynamic hostname by setting the `HOSTNAME` environment variable.

License
=

The MIT License (MIT)

Copyright (c) 2013 Steve Streza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
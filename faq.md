Node-bell Q&A
==============

How to run webapp with multiple workers
----------------------------------------

For example, using [cluster-master](https://github.com/isaacs/cluster-master),
touch a file, i.e `webapp-master.js`:

```js
var clusterMaster = require('cluster-master');

clusterMaster({
  exec: '/usr/bin/bell',  // bell bin path
  size: 5,  // workers count
  args: ['webapp', '-c', './configs.toml', '-l', '5']
})
```

and then run it:

```bash
$ node --harmony-generators webapp-master.js
```

"Too many open files" in my ssdb log
------------------------------------

You need to set your linux's `max open files` to at least 10k, 
see [how to](http://stackoverflow.com/questions/34588/how-do-i-change-the-number-of-open-files-limit-in-linux).


Why do you use ssdb (not redis, or not sql-based-db..) ?
--------------------------------------------------------

I need a disk-based data structure server. No, redis is limited to the memory capacity.

How many analyzer instances should I start?
--------------------------------------------

If the analyzation cannot catch up with the incomming mertics, we should increase analyzer instances.
[Beanstats](https://github.com/hit9/beanstats) is a simple console tool to watch a single beanstalk tube
, and show you how fast jobs are going in and out of the queue.
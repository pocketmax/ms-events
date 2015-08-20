var bus = new function(){

	var listenerList = [];

	this.subscribe = function(cfg, cb){

		listenerList.push({
			cfg: cfg,
			cb: cb
		});

	};

	this.publish = function(cfg){

		for(var i=0; i<listenerList.length; i++){
			var itm = listenerList[i];
			if(cfg.channel === itm.cfg.channel){
				itm.cb(cfg.message);
			}
		}

	};
};

// TODO: missed events when device is offline, are played on client via ver IDs on events
// TODO: sync events where event order is preserved
// TODO: events can be namespaced so events higher in the tree are emitted to all it's children recursively
// TODO: events can run through a pipeline that applies changes to event via custom code
// TODO: listeners can be attached to tree structure nodes, devices or pipelines
// TODO: devices can subscribe to channels and listen for events inside the channel
// TODO: events can be clobbered for more recent events i.e. recent event wins
// TODO: events can be broadcast across multiple devices or channels
// TODO: events can be syncrenous so events are emitted one at a time

bus.subscribe({
//	tags: ['foo', 'bar'],
//	users: ['user1', 'user2'],
	channel: 'foobar'
	}, function(msg){
		console.log('foobar was fired');
		console.log(msg);
	}
);


bus.publish({
	channel: 'foobar',
//	tags: ['foo', 'bar'],
//	users: ['user1', 'user2'],
	message: 'my message'
});
var Rx = require('rx');

module.exports = function (superagent) {
    superagent.Request.prototype.observe = function() {
        var self = this;
        // wrap into observable and return
        return Rx.Observable.create(function(observable) {
            self.end(function(err, res){
                if(err){
                    observable.onError(err);
                } else {
                    observable.onNext(res);
                }
                observable.onCompleted();
            });
        });
    };

    return superagent;
};

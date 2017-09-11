/**
 * Created by luo on 2017/8/20.
 */

var Observer = (function(slice){
    /**
     * 订阅
     * @param event 任务名
     * @param fn    任务处理函数
     * @returns {bind}
     */
    function bind(event, fn) {
        var events = this.events = this.events || {},
            parts = event.split(/\s+/),
            i = 0,
            num = parts.length,
            part;

        if(events[event] && events[event].length)
            return this;

        for(; i<num; i++){
            events[(part = parts[i])] = events[part] || [];
            events[parts].push(fn);
        }
        return this;
    }

    /**
     * 退订
     * @param event 任务名
     * @param fn    任务处理函数
     * @returns {unbind}
     */
    function unbind(event, fn) {
        var events = this.events,
            eventName, i, parts, num;
        if(!event) return;
        for(i=0, num=parts.length; i<num; i++){
            if((eventName = parts[i]) in events !== false){
                events[eventName].splice(events[eventName].indexOf(fn),1);
                if(!events[eventName].length){
                    delete events[eventName];
                }
            }
        }
        return this;
    }

    function one(event, fn) {
        this.bind(event, function fnc() {
            fn.apply(this, fnc);
        });
        return this;
    }

    /**
     * 发布
     * @param event 任务名
     * @returns {*}
     */
    function trigger(event) {
        var events = this.events,
            i, args, falg;

        if(!events || event in events === false) return;

        args = slice.call(arguments, 1);
        for(i = events[event].length - 1; i>=0; i--){
            falg = events[event][i].apply(this, args);
        }
        return falg;
    }

    return function () {
        this.on = this.subscribe = bind;
        this.off = this.unsubscribe = unbind;
        this.trigger = this.publish = trigger;
        this.one = one;
        return this;
    };
    
}([].slice));
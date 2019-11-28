class MyVue {
    constructor(settings) {
        this.el = document.querySelector(settings.el);
        this.data = {};
        this.$data = settings.data;
        this.template = settings.template;

        for (let key in this.$data) {
            Object.defineProperty(this, key, {
                get: function () {
                    return this.$data[key]
                },
                set: function (value) {
                    this.$data[key] = value;
                    this.refresh();
                }
            })
        }

        this.render();
    }

    refresh() {
        this.render();
    }

    render() {
        var varsPattern = /{{(.*)}}/g;

        var myVue = this;

        var res = this.template.replace(varsPattern, function (match, name) {
            var key = name.trim();

            if (myVue[key] !== undefined) {
                return myVue[key];
            } else {
                return match;
            }
        });

        this.el.innerHTML = res;
    }
}
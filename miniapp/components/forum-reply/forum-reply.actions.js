export default {
    format(dateStr) {
        var date = this.parse(dateStr);
        var diff = Date.now() - date.getTime();
        if (diff < this.UNITS['天']) {
            return this.humanize(diff);
        }
        var _format = function (number) {
            return number < 10 ? '0' + number : number;
        };
        return (
            date.getFullYear() +
            '-' +
            _format(date.getMonth() + 1) +
            '-' +
            _format(date.getDate()) +
            ' ' +
            _format(date.getHours()) +
            ':' +
            _format(date.getMinutes())
        );
    },

    humanize(milliseconds) {
        var humanize = '';
        for (var key in this.UNITS) {
            if (milliseconds >= this.UNITS[key]) {
                humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
                break;
            }
        }
        return humanize || '刚刚';
    },

    parse(str) {
        var a = str.split(/[^0-9]/);
        return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
    },

    onReplyTap(pid) {
        this.$utils.jump(`../forum-reply/forum-reply?pid=${pid}`);
    },
};

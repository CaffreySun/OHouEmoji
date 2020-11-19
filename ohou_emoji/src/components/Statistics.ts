declare var _hmt: any;

export function Statistics() {
    function statistics(way: number, type: string) {
        if (type == null || type == undefined || type == "") {
            return
        }

        var wayStr = ""
        if (way == 0) {
            wayStr = "convert"
        } else {
            wayStr = "restore"
        }

        if (wayStr == "") {
            return
        }

        _hmt.push(['_trackEvent', wayStr, type])
    }

    return {
        statistics,
    }
}
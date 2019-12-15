/******************************************************************************/
/* File:        mz-cookies.js                                                      */
/* Create Date: 15/12/2019                                                    */
/* Version:     1.0                                                           */
/*                                                                            */
/* Author:      Marcin Żemlok                                                 */
/* E-mail:      marcinzemlok@gmail.com                                        */
/*                                                                            */
/* HISTORY:                                                                   */
/* DATE			|AUTHOR				|COMMENT                                  */
/* 15/12/2019	|Marcin Żemlok		|Basic funcionality of converting cookies
/*                                   to JS object.
/******************************************************************************/

var mzCookies = {
    cookies: [],

    // Mandatory
    __init: function () {
        this.load();
    },

    load: function () {
        if (this.cookies != {}) {
            this.cookies = {};
        }
        var cookieString = document.cookie;
        var jsonString = "{";
        cookieString.split(";").forEach((c, i) => {
            c = c.split("=");
            c[0] = c[0].replace(" ", "");
            if (i != 0) jsonString += ", "
            jsonString += `"${c[0]}": "${c[1]}"`;
        });
        jsonString += "}";
        this.cookies = JSON.parse(jsonString);
        console.log("Loaded cookies:", this.cookies);
    },

    bodyOf: function (cname) {
        var tmpVal = this.valueOf(cname);
        var ret = JSON.parse(tmpVal);
        console.log(ret);
    },

    set: function (cname, cvalue = "", exdays = 365) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        this.load();
    },

    // Alias for set function
    add: function (cname, cvalue = "", exdays = 365) {
        this.set(cname, cvalue, exdays);
    },

    remove: function (cname) {
        var d = new Date();
        d.setTime(d.getTime() - 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "= " + ";" + expires + ";path=/";
        this.load();
    }
};

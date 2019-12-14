/******************************************************************************/
/* File:        mz-carousel.js                                                */
/* Create Date: 14/12/2019                                                    */
/* Version:     0.1                                                           */
/*                                                                            */
/* Author:      Marcin Żemlok                                                 */
/* E-mail:      marcinzemlok@gmail.com                                        */
/*                                                                            */
/* HISTORY:                                                                   */
/* DATE			|AUTHOR				|COMMENT                                  */
/* 14/12/2019	|Marcin Żemlok		|Innitial working setup for carousel.
/******************************************************************************/

var mzCarousel = {
    carousel: document.querySelector(".mz-carousel"),
    cards: document.querySelectorAll(".mz-card"),
    current: 0,

    // FIRST SETUP
    __init: function () {
        this.cardsNum = this.cards.length;
        this.cards.forEach((c) => {
            c.style.left = "100%";
        });
        this.cards[0].style = "left: 0%; visibility: visible";
        this.cards[this.cardsNum - 1].style.left = "-100%";
    },

    flipAll: function () {
        this.cards.forEach((c, i) => {
            if (i != 0 && i != (this.cardsNum - 1)) {
                var v = parseInt(c.style.left);
                c.style.left = (v * (-1)) + "%";
            }
        });
    },

    edgeCase: function () {
        if (this.cardsNum == 3) {
            if (this.current == 0) {
                this.cards[1].style.left = "100%";
                this.cards[2].style.left = "-100%";
            } else if (this.current == 1) {
                this.cards[0].style.left = "-100%";
                this.cards[2].style.left = "100%";
            } else if (this.current == 2) {
                this.cards[0].style.left = "100%";
                this.cards[1].style.left = "-100%";
            }
        } else if (this.current < this.cardsNum / 2) {
            this.cards[0].style.left = "-100%";
            this.cards[this.cardsNum - 1].style.left = "-100%";
        } else {
            this.cards[0].style.left = "100%";
            this.cards[this.cardsNum - 1].style.left = "100%";
        }
    },

    rotateRight: function () {
        this.cards[this.current].style.left = "-100%";
        this.cards[this.current].style.visibility = "hidden";
        if (++this.current >= this.cardsNum) {
            this.current = 0;
            this.flipAll();
        } else this.edgeCase();
        this.cards[this.current].style.visibility = "visible";
        this.cards[this.current].style.left = "0%";
    },

    rotateLeft: function () {
        this.cards[this.current].style.left = "100%";
        this.cards[this.current].style.visibility = "hidden";
        if (--this.current < 0) {
            this.current = this.cardsNum - 1;
            this.flipAll();
        } else this.edgeCase();
        this.cards[this.current].style.visibility = "visible";
        this.cards[this.current].style.left = "0%";
    }
}

///////////////////////////////////////////////////////////////////////////////
// EXAMPLE USAGE                                                            //
/////////////////////////////////////////////////////////////////////////////
mzCarousel.__init(); // THIS IS MANDATORY!!!

mzCarousel.carousel.addEventListener("wheel", (val = 0) => { // SLIDE LEFT/RIGHT ON MOUSE WHEEL
    if (val.deltaY < 0) mzCarousel.rotateLeft();
    else mzCarousel.rotateRight();
});

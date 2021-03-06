import $ from "jquery";
import {
  url,
  localUrl
} from "cfg/cfg.json";
import "css/reset.scss";
import "css/common.scss";
import "../css/goldegg.scss";

$(() => {
  let eventUtil, bindClick, noticeText, maskRender, domUtil, poxy;
  let nogiftPic = ['Goose', 'African-Elephant', 'Black-Headed-Heron', 'Grant-Gazelle', 'Grey-Crowned-Crane', 'Hippopotamu', 'Leopard', 'Lion', 'Marabou-Stork', 'Masai-Giraffe', 'Nile-Crocodile', 'Olive-Baboon', 'Pied-Kingfisher', 'Plain-Zebra', 'Red-Billed-Hornbill', 'Red-Billed-Oxpecker', 'Superb-Starling', 'White-Rhinoceros', 'Yellow-Billed-Stork'];
  let chooseNoGift = '';
  poxy = {
    ajax(_url, data) {
      $.ajax({
        type: "POST",
        url: url + _url,
        data: data,
        success: ret => {
          ret = $.parseJSON(ret);
          this.successCallback(ret);
        }
      })
    },
    successCallback(ret) {
      if (ret.code === "0") {
        let {
          awardIndex,
          awardMoney,
          egg,
          isAward,
          coin
        } = ret.data;
        eventUtil.openResult = ret.data;
        domUtil.openEgg(awardIndex, awardMoney, isAward, coin);
        domUtil.showOtherResult(egg, awardIndex);
      } else {
        if (ret.code === "coin.insufficient") {
          maskRender.render("insufficient");
          $("#J_mask").fadeIn();
        } else {
          location.replace(localUrl + "index.html");
        }
      }
    }
  }
  domUtil = {
    randomNoGiftPic() {
      return nogiftPic[~~(nogiftPic.length * Math.random())];
    },
    setEggs() {
      $(".egg-wrap").each((index, item) => {
        $(item).find('img').attr('src',require(`../img/eggpic/eggs${Math.floor(Math.random()*20)+1}.png`));
        $(item).css({
          transform: "rotate(" + 360 / 5 * index + "deg) translateY(3rem) rotate(" + -360 / 5 * index + "deg)",
          webkitTransform: "rotate(" + 360 / 5 * index + "deg) translateY(3rem) rotate(" + -360 / 5 * index + "deg)",
          oTransform: "rotate(" + 360 / 5 * index + "deg) translateY(3rem) rotate(" + -360 / 5 * index + "deg)",
        })
      })
    },
    // show Other Result
    // showOtherResult() {
    //   const data = eventUtil.openResult;
    //   let {
    //     egg,
    //     awardIndex
    //   } = data;
    //   $(".egg-wrap").each((index, item) => {
    //     ((index, item) => {
    //       setTimeout(() => {
    //         if (index + 1 == awardIndex) {
    //           $(item).html("<img src='"+require('../img/Goose.png')+"' alt='' class='egg-pic'><p class='result-egg-p pink'>" + egg[index].showMoney + "</p>");
    //         } else {
    //           $(item).html("<img src='"+require('../img/Goose.png')+"' alt='' class='egg-pic'><p class='result-egg-p'>" + egg[index].showMoney + "</p>");
    //         }
    //       }, 300 * index)
    //     })(index, item)
    //   })
    //   setTimeout(() => {
    //     $("#J_game-box").append("<div class='ready-go' id='J_ready-go'>3</div>");
    //     eventUtil.countDown(3, $("#J_ready-go"), () => {
    //       location.reload();
    //     })
    //   }, 2000)
    // },
    // openEgg(awardIndex, awardMoney, isAward, coin) {
    //   $("#J_result-wrap").remove();
    //   const giftHtml = "";
    //   const giftImg = isAward ? "<img src=" + require("../img/gift.gif") + "?" + new Date().getTime() + "  class='result-pic'/>" : "<img src=" + require('../img/nogift.gif') + "?" + new Date().getTime() + "  class='result-pic'/>";
    //   const resultHtml = "<div class='result-wrap' id='J_result-wrap'>\
    //     <div class='result-mask'></div>" + giftImg + "<i class='result-num'>" + awardIndex + "</i>\
    //     </div>";
    //   $("document,body").append(resultHtml);
    //   setTimeout(function () {
    //     if (isAward) {
    //       $("#J_result-wrap").append("<div class='result-gift'><h2>Congratulations</h2><p class='result-gift-p'>You won Ksh <b class='result-gift-b'>" + awardMoney + " </b>Ksh</p></div>");
    //     } else {
    //       $("#J_result-wrap").append("<div class='result-gift'><img src='" + require('../img/' + chooseNoGift + '.png') + "'/><p class='result-gift-p'>You got a "+chooseNoGift+"!</br> Try again. </p></div>");
    //     }
    //     $("#J_result-wrap").append("<div class='cur-bal'>Current Bal: Ksh <b class='cur-bal-b'>" + coin + "</b></div>");
    //     $("#J_result-wrap").append("<div class='result-text'>Time out: <b id='J_sr-time'>3</b></div>");
    //     eventUtil.countDown(3, $("#J_sr-time"), () => {
    //       $("#J_result-wrap").remove();
    //       domUtil.showOtherResult();
    //     })
    //   }, 3000)
    // }，
    openEgg(awardIndex, awardMoney, isAward, coin) {
      if (isAward) {
        $('.result-box').html(`LUCKY!!!</br>You won ${awardMoney} Ksh!`);
      } else {
        chooseNoGift = domUtil.randomNoGiftPic();
        $('.result-box').html(`GENIUS!!!</br>You got a ${chooseNoGift.replace(/-/g,' ')}`);
      }
      $('#J_result').fadeIn();
    },
    showOtherResult(egg, awardIndex) {
      $(".egg-wrap").each((index, item) => {
        ((index, item) => {
          setTimeout(() => {
            let html = '';
            if (egg[index].rank >= 1 && egg[index].rank <= 3) {
              html += "<img src='" + require('../img/winGift-' + egg[index].rank + '.png') + "' alt='' class='egg-pic'>"
            } else {
              if (chooseNoGift && index + 1 == awardIndex) {
                html += "<img src='" + require('../img/animal/' + chooseNoGift.replace(/-/g,'') + '.png') + "' alt='' class='egg-pic'>"
              } else {
                html += "<img src='" + require('../img/animal/' + domUtil.randomNoGiftPic().replace(/-/g,'') + '.png') + "' alt='' class='egg-pic'>"
              }
            }
            if (index + 1 == awardIndex) {
              html += "<p class='result-egg-p red'>" + egg[index].showMoney + "</p>";
            } else {
              html += "<p class='result-egg-p'>" + egg[index].showMoney + "</p>";
            }
            $(item).html(html);
          }, 300 * index)
        })(index, item)
      })
    },
  }
  eventUtil = {
    eggIndex: 0,
    inGameBox: false,
    // result countDown
    countDown(time, dom, callback) {
      if (time--) {
        setTimeout(() => {
          dom.html(time);
          this.countDown(time, dom, callback);
        }, 1000)
      } else {
        callback();
      }
    },
    // gamebox position
    gameBoxPos: (() => {
      const gameBox = $("#J_game-box");
      return {
        x: gameBox.get(0).getBoundingClientRect().left,
        y: gameBox.get(0).getBoundingClientRect().top,
        width: gameBox.width(),
        height: gameBox.height(),
      }
    })(),
    // hammer size
    hammerSize: (() => ({
      width: $("#J_hammer").width(),
      height: $("#J_hammer").height(),
    }))(),
    // touchpos
    touchPos(_e) {
      const e = _e || window.event;
      const x = e.originalEvent.touches[0].pageX & e.originalEvent.changedTouches[0].pageX & e.originalEvent.targetTouches[0].pageX;
      const y = e.originalEvent.touches[0].pageY & e.originalEvent.changedTouches[0].pageY & e.originalEvent.targetTouches[0].pageY;
      return {
        x: x,
        y: y,
      }
    },
    // set hammer position
    setHammerPos(e) {
      const touchPos = this.touchPos(e);
      const {
        gameBoxPos,
        hammerSize
      } = this;
      let x = touchPos.x - gameBoxPos.x - hammerSize.width / 2,
        y = touchPos.y - gameBoxPos.y - hammerSize.height / 2;

      x = x < 0 ? 10 : x;
      x = x > gameBoxPos.width - hammerSize.width / 2 ? gameBoxPos.width - hammerSize.width / 2 - 10 : x;
      y = y < 0 ? 10 : y;
      y = y > gameBoxPos.height - hammerSize.height / 2 ? gameBoxPos.height - hammerSize.height / 2 : y;
      $("#J_hammer").css({
        left: x + "px",
        top: y + "px",
      })
    }
  }
  bindClick = {
    notOpen() {
      $("#J_notopen").click(() => {
        $("#J_mask").fadeOut();
      })
    },
    confrim() {
      $("#J_confrim").click(() => {
        $("#J_mask").hide();
        $(".egg-wrap").off("click");
        poxy.ajax("kenegg/go", {
          index: eventUtil.eggIndex,
          token: localStorage.getItem("tokenCode")
        })
      });
    },
    eggs() {
      // egg click
      $(".egg-wrap").click(function (e) {
        $(".egg-wrap").off("click");
        eventUtil.eggIndex = $(this).index() + 1;
        // $(this)  
          // .find(".egg-pic")
          // .remove()
          // .end()
          // .append("<img src=" + require("../img/egg-full-act.png") + " alt='' class='egg-pic'>")
          // .siblings(".egg-wrap")
          // .find(".egg-pic")
          // .remove()
          // .end()
          // .append("<img src=" + require("../img/egg-full.png") + " alt='' class='egg-pic'>")
        // setTimeout(function () {
          // maskRender.render("confrim");
          // $("#J_mask").fadeIn();
          poxy.ajax("kenegg/go", {
            index: eventUtil.eggIndex,
            token: localStorage.getItem("tokenCode")
          })
        // }, 300)
      })
    },
  }
  // errortext
  // noticeText = {
  //   insufficient: {
  //     title: "Balance is insufficient",
  //     textp: "Balance is insufficient，please top up to continue.",
  //   },
  //   confrim: {
  //     title: "Confirmed",
  //     textp: "Are you sure?</br> open this Egg!"
  //   },

  // }
  // maskRender = {
  //   clearCustom() {
  //     $("#J_custom").remove();
  //   },
  //   confrim() {
  //     this.clearCustom();
  //     $(".pop-tit").html(noticeText.confrim.title);
  //     $(".pop-notice-text").html(noticeText.confrim.textp);
  //     $("#J_mask-pop").append(
  //       "<div id='J_custom'>\
  //       <div class='btn-group'>\
  //         <div class='btn-item btn-blue' id='J_notopen'>NO</div>\
  //         <div class='btn-item btn-pink' id='J_confrim'>YES SURE</div>\
  //       </div>\
  //     </div>")
  //     bindClick.notOpen();
  //     bindClick.confrim();
  //   },
  //   insufficient() {
  //     this.clearCustom();
  //     $(".pop-tit").html("<p style='font-size:.7rem'>" + noticeText.insufficient.title + "</p>");
  //     $(".pop-notice-text").html(noticeText.insufficient.textp);
  //     $("#J_mask-pop").append(
  //       "<div id='J_custom'>\
  //       <h3 class='pop-h3'>Pay bill <b>290008</b></h3>\
  //       <div class='btn-group'>\
  //         <a href='" + localUrl + "index.html'><div class='btn-item btn-pink' id='J_notopen'>HOME</div></a>\
  //       </div>\
  //     </div>")
  //     bindClick.notOpen();
  //   },
  //   render(name) {
  //     this[name]();
  //   }
  // }
  domUtil.setEggs();
  bindClick.eggs();
  // Again
  // $("#J_new-game").click(() => {
  //   location.reload();
  // });
  $("#J_go-home").click(() => {
    location.replace(localUrl+'main.html');
  });
  $("#J_game-box").on("touchstart", (e) => {
    eventUtil.inGameBox = true;
  });
  $("#J_game-box").on("touchend", (e) => {
    eventUtil.inGameBox = false;
  });
  $("#J_game-box").on("touchstart", (e) => {
    eventUtil.setHammerPos(e);
  });
  $("#J_game-box").on("touchmove", (e) => {
    eventUtil.setHammerPos(e);
  });
  $('#J_again').click(function () {
    location.reload();
  })
})
var _body = document.getElementsByTagName("body")[0];

var _boy = ["陳翰威", "詹宗憲", "鄭有城", "吳鈞哲", "尹維增", "邱振溢", "鄧維富", "丁作文", "陳家富", "李維仁", "洪偉捷", "鄭榮葳", "陳俊龍", "黃任杰", "呂志桓"];
var _girl = ["鍾恬恬", "游毓婉", "李培琴", "李曉雯", "何致玫", "駱姝妍", "洪以涵", "林依穎", "黃淑婷", "游玉蓉", "黃淑梅", "賴宛螢", "徐惠玲", "葉芷琳", "賴玫岑", "沈姵嫻", "沈名晏", "廖佳珍", "林宜慧"];

var _T_Status = {
    "b": true,
    "g": true
}

var _L_Status = {
    "sl": true,
    "sm": true
}

var _R_Status = {
    "e": true,
    "n": true,
    "h": true
}
var events;

var STUDENT_SLOT, MISSION_SLOT;
function init() {
    setBarInit();
    setStudent();
    //setMission();
    setSelectize();
    events = $._data($("#playFancy")[0], "events");
    events = events["click"].slice();
    // btn = byId("playFancy");
    // btn.addEventListener("click", hahaha);
    // function hahaha() {
    //     alert(0);
    // }
}


function setBarInit() {
    var topEle = document.getElementsByClassName("topEle")[0];
    // var leftEle = document.getElementsByClassName("leftEle")[0];
    // var rightEle = document.getElementsByClassName("rightEle")[0];

    var topBar = document.getElementsByClassName("topBar")[0];
    // var leftBar = document.getElementsByClassName("leftBar")[0];
    // var rightBar = document.getElementsByClassName("rightBar")[0];

    var tClose = true;
    var lClose = true;
    var rClose = true;

    topEle.style.top = "-220px";
    // leftEle.style.left = "-225px";
    // rightEle.style.right = "-225px";

    topBar.addEventListener("click", function (e) {
        if (tClose) {
            topEle.style.top = "-20px";
            tClose = false;
            setStatus("top");
        } else {
            topEle.style.top = "-220px";

            temp_T_status = getNowStatus("top");
            // if ((JSON.stringify(temp_T_status) != JSON.stringify(_T_Status)) && _L_Status["sl"]) { //有修改
            setStudent();
            // }

            tClose = true;
        }
    });

    return;


    leftBar.addEventListener("click", function (e) {
        if (lClose) {
            leftEle.style.left = "-20px";
            setStatus("left");
            lClose = false;
        } else {
            leftEle.style.left = "-225px";

            sl = byId("slot-list");
            sm = byId("slot-mission");

            if (_L_Status["sl"] !== isC(sl)) {
                if (!isC(sl)) {
                    $("#playFancy").unbind('click', events[0]);
                } else {
                    setStudent();
                }
            }


            if (_L_Status["sm"] !== isC(sm)) {
                if (!isC(sm)) {
                    $("#playFancy").unbind('click', events[1]);
                } else {
                    setMission();
                }
            }

            // setStatus("left");
            lClose = true;
        }
    });

    rightBar.addEventListener("click", function (e) {
        if (rClose) {
            rightEle.style.right = "-20px";
            rClose = false;
            setStatus("right");
        } else {
            rightEle.style.right = "-225px";
            temp_R_status = getNowStatus("right");

            if ((JSON.stringify(temp_R_status) != JSON.stringify(_R_Status)) && _L_Status["sm"]) { //有修改
                setMission();
            }
            // setStatus("right");
            rClose = true;
        }
    });
}

function setStatus(type) {
    if (type == "top") {
        b = byId("boy");
        g = byId("girl");
        _T_Status = {
            "b": isC(b),
            "g": isC(g)
        }
    }
    else if (type == "left") {
        sl = byId("slot-list");
        sm = byId("slot-mission");

        _L_Status = {
            "sl": isC(sl),
            "sm": isC(sm)
        }
    } else if (type == "right") {
        e = byId("misEasy");
        n = byId("misNormal");
        h = byId("misHard");

        _R_Status = {
            "e": isC(e),
            "n": isC(n),
            "h": isC(h)
        }
    }
}


function getNowStatus(type) {
    if (type == "top") {
        b = byId("boy");
        g = byId("girl");
        return {
            "b": isC(b),
            "g": isC(g)
        }
    }
    else if (type == "left") {
        sl = byId("slot-list");
        sm = byId("slot-mission");

        return {
            "sl": isC(sl),
            "sm": isC(sm)
        }

    } else if (type == "right") {
        e = byId("misEasy");
        n = byId("misNormal");
        h = byId("misHard");

        return {
            "e": isC(e),
            "n": isC(n),
            "h": isC(h)
        }
    }
}
// $.jSlots.defaultOptions = {
//     number : 3,          // Number: number of slots
//     winnerNumber : 1,    // Number or Array: list item number(s) upon which to trigger a win, 1-based index, NOT ZERO-BASED
//     spinner : '',        // CSS Selector: element to bind the start event to
//     spinEvent : 'click', // String: event to start slots on this event
//     onStart : $.noop,    // Function: runs on spin start,
//     onEnd : $.noop,      // Function: run on spin end. It is passed (finalNumbers:Array). finalNumbers gives the index of the li each slot stopped on in order.
//     onWin : $.noop,      // Function: run on winning number. It is passed (winCount:Number, winners:Array, finalNumbers:Array)
//     easing : 'swing',    // String: easing type for final spin. I recommend the easing plugin and easeOutSine, or an easeOut of your choice.
//     time : 7000,         // Number: total time of spin animation
//     loops : 6            // Number: times it will spin during the animation
// };
function setSlot(eleClassName, btnId) {
    return $(eleClassName).jSlots({
        number: 1, //要幾格
        spinner: btnId, //轉盤ID '#playFancy'
        easing: 'easeInOutBounce', //轉盤風格
        time: 600, //時間
        loops: 10, //模擬跑幾圈
        onStart: function (spinner) {
            $('.slot').removeClass('winner');
        },
        onEnd: function (array) {
            $('.slot').addClass('winner');
        }
    });
}



function setStudent() {
    $(".list", _body).remove();

    div = document.createElement('div');
    div.setAttribute('class', 'fancy intermediate list');
    ul = document.createElement('ul');
    ul.id = 'student';
    ul.setAttribute('class', 'slot');
    div.appendChild(ul);
    _body.appendChild(div);


    studentList = [];
    var boy = byId("boy");
    var girl = byId("girl");
    if (isC(boy))
        addList(studentList, _boy);
    if (isC(girl))
        addList(studentList, _girl);


    passAry = $("#input-tags").val().split(',');

    for (var i = 0; i < passAry.length; i++) {
        stu = passAry[i];
        index = studentList.indexOf(stu);
        if (index > -1) {
            studentList.splice(index, 1);
        }
    }


    sl = byId("slot-list");
    btnId = '#playFancy';
    // if (!isC(sl))
    //     btnId = '#123';



    shuffle(studentList);
    setList("student", studentList);
    STUDENT_SLOT = setSlot('.list .slot', btnId);
}

function setMission() {
    $(".mission", _body).remove();

    div = document.createElement('div');
    div.setAttribute('class', 'fancy intermediate mission');
    ul = document.createElement('ul');
    ul.id = 'mission';
    ul.setAttribute('class', 'slot missionSlot');
    div.appendChild(ul);
    _body.appendChild(div);
    var misEasy = byId("misEasy");
    var misNormal = byId("misNormal");
    var misHard = byId("misHard");

    var misList = [];
    if (isC(misEasy))
        addList(misList, _easy);
    if (isC(misNormal))
        addList(misList, _normal);
    if (isC(misHard))
        addList(misList, _hard);

    sm = byId("slot-mission");
    btnId = '#playFancy';
    if (!isC(sm))
        btnId = '#123';

    shuffle(misList);
    setList("mission", misList);
    MISSION_SLOT = setSlot('.mission .slot', btnId);
}

function setList(parentID, list) {
    var slot = byId(parentID);
    $("li", slot).remove();

    for (var i = 0; i < list.length; i++) {
        var li = document.createElement("li");
        var classNum = i % 7 + 1;
        li.setAttribute("class", "c" + classNum);
        p = document.createElement('p');
        p.innerHTML = list[i];
        p.setAttribute('class', 'intermediate');
        p.style.position = 'relative';
        li.appendChild(p);
        slot.appendChild(li);
    }
}

function setSelectize() {
    $('#input-tags').selectize({
        delimiter: ',',
        persist: false,
        create: function (input) {
            return {
                value: input,
                text: input
            }
        }
    });
}



// 使用亂數
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addList(parent, childNode) {
    for (var i = 0; i < childNode.length; i++) {
        parent.push(childNode[i]);
    }
    return parent;
}

function byId(id) {
    return document.getElementById(id);
}

function isC(ele) {
    if (ele.checked)
        return true;
    else
        false;
}

init();
const NONE = 0;
const TAP = 1;
const HOLD_START = 2;
const HOLD_END = 3;
const ATTACK = 4;
let cursor = NONE;

let maxLine = 0;    // 一番上のライン
let maxSection = 0; // 何小節あるか

// 赤の線(曲の位置)
let nowSelected = 0;

const NOTES_SYMBOL = ["・", "〇", "□", "■", "×"];

async function changeNotes(section, row, line)
{
    let notes = document.getElementById(`notes_${section}${row}${line}`);
    notes.innerHTML = (notes.innerHTML === NOTES_SYMBOL[cursor]) ? NOTES_SYMBOL[NONE] : NOTES_SYMBOL[cursor];
}

async function changeNotesMode(mode)
{
    switch (mode)
    {
        case "pointer":
            cursor = NONE; break;
        case "tap":
            cursor = TAP; break;
        case "holdStart":
            cursor = HOLD_START; break;
        case "holdEnd":
            cursor = HOLD_END; break;
        case "attack":
            cursor = ATTACK; break;
    }
    
    document.getElementById("cur").innerHTML = NOTES_SYMBOL[cursor];
}

async function move()
{
    // let nowNotes = new Array(4);
    // for (let i = 0; i < 5; i++)
    // {
    //     for (let j = 0; j < 4; j++)
    //     {
    //         document.getElementById(`notes_${i}${j}`).firstChild.style.backgroundColor = "blue";
    //     }
    // }
    // for (let i = 0; i < 4; i++)
    // {
    //     nowNotes[i] = document.getElementById(`notes_${now}${i}`);
    // }
}

async function makeNewScore()
{
    maxSection++;

    let bpm = document.getElementById("numBPM").value;

    let section = document.createElement("th");
    let bpmEl = document.createElement("input");
    bpmEl.setAttribute("type", "text");
    bpmEl.setAttribute("class", "bpm");
    bpmEl.setAttribute("value", bpm);
    let numBar = document.getElementById("numBar");
    // alert(`${numBar.value}小節の譜面をつくります。`);

    let score = document.getElementById("score");
    for (let i = numBar.value; i > 0; i--)
    {
        maxLine++;

        let tr = document.createElement("tr");
        tr.setAttribute("id", `line_${maxLine}`);

        let th = document.createElement("th");
        th.innerHTML = `${i}`;
        tr.appendChild(th);
        section.innerHTML = maxSection;
        
        for (let j = 0; j < 4; j++)
        {   
            let td = document.createElement("td");
            td.innerHTML = `<button id='notes_${maxSection}${i}${j}' onclick='changeNotes(${maxSection}, ${i}, ${j})'> ・ </button>`;
            tr.appendChild(td);
        }
        
        // "-"のプログラム
        let selectnow = document.createElement("td");
        let selectButton = document.createElement("button");
        selectButton.setAttribute("onclick", "selectNow()");
        selectButton.setAttribute("id", `select_${i}`);
        selectButton.innerHTML = "ー";
        selectnow.appendChild(selectButton);

        tr.appendChild(selectnow);
        tr.appendChild(section);
        tr.appendChild(bpmEl);

        let lastTr = document.getElementById(`line_${maxLine - 1}`);
        let table = document.getElementsByTagName("table")[0];

        console.log(lastTr);

        table.insertBefore(tr, lastTr);
        // score.appendChild(tr);
        
    }
}

let file;
let music;  // 曲のデータ
async function selectAudioFile(e)
{
    file = document.getElementById("getFile").files[0];

    music = new Audio(file.name);
    music.play();
}


async function startMusic()
{
    music.play();
}
async function stopMusic()
{
    music.pause();
}

async function selectNow()
{
    let now = document.getElementById()
}
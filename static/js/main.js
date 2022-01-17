const NONE = 0;
const TAP = 1;
const HOLD_START = 2;
const HOLD_END = 3;
const ATTACK = 4;
let cursor = NONE;

let now = 0;
let maxSection = 0;

// 赤の線(曲の位置)
let nowSelected = 0;

// 最後のライン
let lastLine;

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
        let tr = document.createElement("tr");
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
        
        let selectnow = document.createElement("td");
        let selectButton = document.createElement("button");
        selectButton.setAttribute("onclick", "selectNow()");
        selectButton.setAttribute("id", `select_${i}`);
        selectButton.innerHTML = "ー";

        selectnow.appendChild(selectButton);
        tr.appendChild(selectnow);
        tr.appendChild(section);
        tr.appendChild(bpmEl);

        let lastTr = document.getElementById(`tr_${maxSection}`);
        let table = document.getElementsByTagName("table")[0];
        table.insertBefore(tr, lastTr);
        // score.appendChild(tr);

        if (i === numBar.value || i === 0)
        {
            lastLine = document.getElementById()
            console.log(`${lastLine}`);
        }
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
    // let now = document.getElementById()
}
const NONE = 0;
const TAP = 1;
const HOLD_START = 2;
const HOLD_END = 3;
const ATTACK = 4;
let cursor = NONE;

let maxLine = 0;        // 一番上のライン
let maxSection = 0;     // 何小節あるか
let nowLine = 1;        // 何個目が選択されているか
let nowSection = 1;     // 何小節目が選択されているか
let nowSpeed = 0;       // 現在のBPMから計算したスピード(秒)
let allSection = new Array();// 全ての小節数

let file;
let music;  // 曲のデータ
let isPlayingMusic = false;

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
    bpmEl.setAttribute("id", `bpm_${maxSection}`);
    let numBar = document.getElementById("numBar");
    // alert(`${numBar.value}小節の譜面をつくります。`);

    for (let i = 1; i <= numBar.value; i++)
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
        selectButton.setAttribute("id", `select_${maxLine}`);
        selectButton.setAttribute("name", `select`);
        selectButton.setAttribute("onclick", `selectNow(${maxSection}, ${maxLine});`);
        selectButton.innerHTML = "ー";
        selectnow.appendChild(selectButton);

        tr.appendChild(selectnow);
        tr.appendChild(bpmEl);
        if (i === 1)
        {
            tr.appendChild(section);
        }

        let lastTr = document.getElementById(`line_${maxLine - 1}`);
        let table = document.getElementsByTagName("table")[0];

        table.insertBefore(tr, lastTr);
        // score.appendChild(tr);

        // "_"の色変更
        let select = document.getElementsByName("select");
        for (let i = 0; i < maxLine; i++)
        {
            if (i === nowLine && i !== 1)
                continue;
            select[i].style.backgroundColor = "#e4f5e1";
            // document.getElementById(`select_${i}`).style.backgroundColor = "#e4f5e1";
        }

    }

    allSection.append(numBar.value);
}

async function selectAudioFile(e)
{
    file = document.getElementById("getFile").files[0];

    music = new Audio(file.name);

    calcSpeed();
    updateSelection();
}


async function startMusic()
{
    isPlayingMusic = true;
    music.play();
}
async function stopMusic()
{
    isPlayingMusic = false;
    music.pause();
}

async function updateSelection()
{
    // setInterval(function()
    // {
    //     calcSpeed();
    //     if (isPlayingMusic && nowLine < maxLine)
    //     {
    //         console.log("Playing!");
    //         nowLine++;
    //         showSelection();
    //     } else {
    //         isPlayingMusic = false;
    //         console.log("Not Playing!");
    //     }
    // }, nowSpeed * 1000);
    while (true)
    {
        setTimeout(function()
        {
            calcSpeed();
            if (isPlayingMusic && nowLine < maxLine)
            {
                console.log("Playing!");
                nowLine++;
                showSelection();
            } else {
                isPlayingMusic = false;
                console.log("Not Playing!");
            }
        }, nowSpeed * 1000);
    }
}

async function selectNow(section, line)
{
    // 選択されている要素の選択
    nowLine = line;
    nowSection = section;

    showSelection();
}

async function showSelection()
{
    // trの色変更
    for (let i = 1; i <= maxLine; i++)
    {
        document.getElementById(`select_${i}`).style.backgroundColor = "#e4f5e1";
    }
    document.getElementById(`select_${nowLine}`).style.backgroundColor = "#aaaaaa";
}

// BPMから一つのノーツあたり何秒かかるかを計算
async function calcSpeed()
{
    const bpm = document.getElementById(`bpm_${nowSection}`).value;
    nowSpeed = 60 / bpm;
}
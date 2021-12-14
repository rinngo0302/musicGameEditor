const NONE = 0;
const TAP = 1;
const HOLD_START = 2;
const HOLD_END = 3;
const ATTACK = 4;
let cursor = NONE;

let now = 0;
let maxSection = 0;

const NOTES_SYMBOL = ["・", "〇", "□", "■", "×"];

// 音声ファイル
let audio;

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
        
        tr.appendChild(section);
        tr.appendChild(bpmEl);
        score.appendChild(tr);
    }

}

// onload = function()
// {
//     let form = document.forms.makeScore;
//     form.selectAudioFile.addEventListener("change", function(e)
//     {
//         console.log(e);
//     });
// }

let reader;
async function selectMusic(e)
{
    let input = e.target;
    if (input.files.length == 0)
    {
        return;
    }

    audio = input.files[0];
    if (audio.type !== "audio/mpeg")
    {
        alert("MP3形式のファイルをロードしてください。");
        return;
    }

    reader = new FileReader();
    reader.readAsArrayBuffer(audiogi);
}
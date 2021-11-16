const NONE = 0;
const TAP = 1;
const HOLD_START = 2;
const HOLD_END = 3;
const ATTACK = 4;
let cursor = NONE;

let now = 0;

const NOTES_SYMBOL = ["・", "〇", "□", "■", "×"];

async function changeNotes(row, line)
{
    let notes = document.getElementById(`notes_${row}${line}`);
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

function makeNewScore()
{
    let numBar = document.getElementById("numBar");
    alert(`${numBar.value}小節の譜面をつくります。`);

    let score = document.getElementById("socre");
    let emptyNotesTr = new Array();
    let emptyNotesTd = new Array();
    for (let i = 0; i < parseInt(numBar.value); i++)
    {
        emptyNotesTr.push(document.createElement("tr"));
        for (let j = 0; j < 4; j++)
        {
            emptyNotesTd.push(document.createElement("td"));

        }

        score.insertBefore()
    }

    console.log(emptyNotesTr);
    console.log(emptyNotesTd);
}
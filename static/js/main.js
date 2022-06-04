const NONE = -1;
const TAP = 0;
const HOLD_START = 1;
const HOLD_END = 2;
const ATTACK = 3;
let cursor = NONE;

let score = new Array();// 譜面のデータ
let maxLine = 0;        // 一番上のライン
let maxSection = 0;     // 何小節あるか
let nowLine = 1;        // 何個目が選択されているか
let nowSection = 1;     // 何小節目が選択されているか
let nowSpeed = 0;       // 現在のBPMから計算したスピード(秒)
let allMaxLine = new Array();// 全てのmaxLine
let allSection = new Array();// 全てのLine
let nowBPM = 0;         // 現在のBPM

let file;
let music;  // 曲のデータ
let isPlayingMusic = false;

let NOTES_SYMBOL = ["〇", "□", "■", "×"];
NOTES_SYMBOL[-1] = "・";

onload = function()
{
    let score = document.getElementById("score");
    score.style.height = `${window.innerHeight - 200}px`;
}

async function changeNotes(section, row, line, mLine)
{
    let notes = document.getElementById(`notes_${section}${row}${line}`);
    notes.innerHTML = (notes.innerHTML === NOTES_SYMBOL[cursor]) ? NOTES_SYMBOL[NONE] : NOTES_SYMBOL[cursor];

    score[mLine - 1][line] = `${cursor}`;
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

async function sendDataToMakeNewScore()
{
    let bpm = document.getElementById("numBPM").value;
    let numBar = document.getElementById("numBar").value;

    makeNewScore(bpm, numBar);
}

let hasSet = false;
async function makeNewScore(bpm, numBar)
{
    hasSet = false;
    maxSection++;

    let section = document.createElement("th");
    let bpmEl = document.createElement("input");
    bpmEl.setAttribute("type", "text");
    bpmEl.setAttribute("class", "bpm");
    bpmEl.setAttribute("value", bpm);
    bpmEl.setAttribute("id", `bpm_${maxSection}`);
    // alert(`${numBar.value}小節の譜面をつくります。`);

    for (let i = 1; i <= numBar; i++)
    {
        //譜面のデータの配列
        score.push(new Array(6));
        if (!hasSet)
        {
            score[maxLine][5] = `${maxSection}`;
            score[maxLine][4] = bpm;   // BPM設定

            hasSet = true;
        }

        // 配列の初期化
        for (let i = 0; i < 4; i++)
        {
            score[maxLine][i] = "-1";
        }
        maxLine++;

        let tr = document.createElement("tr");
        tr.setAttribute("id", `line_${maxLine}`);

        let th = document.createElement("th");
        if (i === 1)// 最初のTH
        {
            th.setAttribute("class", "firstTh");
        }
        th.innerHTML = `${i}`;
        tr.appendChild(th);
        section.innerHTML = maxSection;
        
        for (let j = 0; j < 4; j++)
        {   
            let td = document.createElement("td");
            td.innerHTML = `<button id='notes_${maxSection}${i}${j}' class='notes_button' onclick='changeNotes(${maxSection}, ${i}, ${j}, ${maxLine})'> ・ </button>`;
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
        if (i === 1)
        {
            tr.appendChild(section);
            tr.appendChild(bpmEl);
        }

        let lastTr = document.getElementById(`line_${maxLine - 1}`);
        let table = document.getElementsByTagName("table")[0];

        table.insertBefore(tr, lastTr);
        // score.appendChild(tr);

        showSelection();
    }

    allMaxLine.push(maxLine);
    allSection.push(numBar);

    hasSet = true;
}

async function selectAudioFile(e)
{
    file = document.getElementById("getFile").files[0];

    music = new Audio(file.name);
    music.currentTime = 0;

    calcSpeed();
    updateSelection();
}


async function startMusic()
{
    isPlayingMusic = true;
    updateSelection();
    music.play();
}
async function stopMusic()
{
    isPlayingMusic = false;
    music.pause();
}

async function updateSelection()
{
    setTimeout(async function()
    {
        await calcSpeed();
        if (isPlayingMusic && nowLine < maxLine)
        {
            console.log("Playing!");
            nowLine++;
            setNowSectionFromNowLine();
            
            if (nowBPM !== document.getElementById(`bpm_${nowSection}`).value)
            {
                clearInterval();
                await calcSpeed();
                console.log(`BPM was changed!!\nBPM: ${nowBPM}, Speed: ${nowSpeed}`);
            }

            showSelection();

            updateSelection();
        } else {
            stopMusic();
            console.log("Not Playing!");
        }
    }, nowSpeed * 1000);
}

async function setNowSectionFromNowLine()
{
    for (let i = 0; i < allMaxLine.length; i++)
    {
        if (nowLine <= allMaxLine[i])
        {
            nowSection = i + 1;
            return;
        }
    }
}
function getSectionFromLine(line)
{
    for (let i = 0; i < allMaxLine.length; i++)
    {
        if (line <= allMaxLine[i])
        {
            return i + 1;
        }
    }
}

async function selectNow(section, line)
{
    // 選択されている要素の選択
    nowLine = line;
    nowSection = section;

    showSelection();

    setCurrentTime();
    updateSelection();
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
    nowBPM = document.getElementById(`bpm_${nowSection}`).value;
    nowSpeed = 60 / nowBPM;
    nowSpeed *= 4 / allSection[nowSection - 1];
}


async function deleteSection()
{
    if (maxSection <= 0)
    {
        alert("これ以上は削除できません。");
        return;
    }

    
    let deleteNotesId = allMaxLine[maxSection - 2] + 1;

    if (maxSection === 1)
    {
        deleteNotesId = 1;
    }

    console.log(deleteNotesId);

    for (let i = allMaxLine[maxSection - 1]; i >= deleteNotesId; i--)
    {
        let lineEl = document.getElementById(`line_${i}`);
        lineEl.remove();
        maxLine--;

        score.pop();
    }
    allMaxLine.pop();
    allSection.pop();
    maxSection--;
    

    console.log(`maxSection: ${maxSection}\nmaxLine: ${maxLine}`);
}

async function setCurrentTime()
{
    calcSpeed();
    let tmpCurrent = 0;
    for (let i = 1; i < nowLine; i++)
    {
        // let bpm = document.getElementById(`bpm_${getSectionFromLine(i)}`).value;
        let speed = 0;
        speed = 60 / nowBPM;
        console.log(speed);
        speed *= 4 / allSection[nowSection - 1];
        tmpCurrent += speed;
        // console.log(speed);
    }
    music.currentTime = tmpCurrent;
    console.log(music.currentTime);
}
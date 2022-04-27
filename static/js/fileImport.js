let text;

async function readFile(e)
{
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", function()
    {
        text = reader.result;

        let line = 0;
        let now = 0;
        for (let i = 0; i < text.length; i++)
        {
            if (text[now] === "\n") 
            {
                line++;
            }
            now++;
        }
        line--;
        console.log(`line: ${line}`);
        
        getReader(line);

        // makeScoreFromScoreData();
    });
}

let textCursor = 0;
let tmpscore;
function getReader(line)
{
    tmpscore = new Array(line + 1);
    for (let i = 0; i < line + 1; i++)
    {
        tmpscore[i] = new Array(6);
    }

    let num = 0;
    let now = 1;
    
    while (true)
    {
        let i = 0;
        
        let getc = "";
        while (true)
        {
            if (i === 0)
            {
                console.log(`iが一番目だよ！\nnum: ${num}\ngetc: ${getc}\nnow: ${now}\ntext[now]: ${text[now]}`);
            }
            if (text[now] === "/")
            {
                while (text[now] != "\r" && text[now] != "\n")  // "/"があったら改行までループ
                {
                    now++;
                    console.log(text[now]);
                }
                now += 2;
            }
            
            if (text[now] === "," || text[now] === "\n" || text[now] === "\r" || now === text.length)
            {
                if (getc === "")
                {
                    tmpscore[num][i] = undefined;
                } else {
                    tmpscore[num][i] = getc;
                }
                console.log(`getc: ${getc}`);
                getc = "";
                i++;
                if (text[now] != ",")
                {
                    now++;
                }
            } else {
                getc += text[now];
                console.log(`${now}: ${getc}`);
            }

            now++;

            if (i === 6)
            {
                break;
            }
        }
        
        if (num >= line)
        {
            // alert("終了！");
            break;
        }
        num++;
    }

    makeScoreFromScoreData();
}

async function makeScoreFromScoreData()
{
    // await makeNewScore();

    for (let i = 0; i < tmpscore.length; i++)
    {
        let countLine = 0;
        if (tmpscore[i][5] != undefined && i !== tmpscore.length - 1)
        {
            // console.log(`tmpscore[i][5]: ${tmpscore[i][5]}`);
            // 1小節内に何個Lineがあるかを計算
            let j = i;
            countLine = 0;
            while (i === j || tmpscore[j][5] === undefined)
            {
                countLine++;
                
                if (j >= tmpscore.length - 1)
                {
                    // console.log(`////InFor////\ni: ${i}\nj: ${j}\n\ncountLine: ${countLine}\n\nscore[j][5]: ${score[j][5]}\n////InFor////`);
                    break;
                }

                j++;
            }
            
            console.log(`BPM: ${tmpscore[i][4]}\nnumBar: ${tmpscore[i][5]}\ncountLine: ${countLine}\ni: ${i}`);
            await makeNewScore(tmpscore[i][4], countLine);

            // await makeNewScore(score[i][4], 5);
            console.log(`i: ${i}`);
        }

        console.log(`i: ${i}`);
        // _notes[section][line][]
    }

    score = tmpscore;

    let tmpNumLine = -1;
    for (let i = 1; i <= maxSection; i++)
    {
        for (let j = 1; j <= allSection[i - 1]; j++)
        {
            tmpNumLine += 1;
            for (let k = 0; k < 4; k++)
            {
                let note = document.getElementById(`notes_${i}${j}${k}`);
                
                // がんばってこのコード↓書いたから残しといてあげる
                // for (let l = 0; l < i - 1; l++)
                // {
                //     tmpNumLine += allSection[l];
                // }
                // tmpNumLine += j;

                // console.log(`i: ${i}\nj: ${j}\nk: ${k}\ntmpNumLine: ${tmpNumLine}`);
                note.innerHTML = NOTES_SYMBOL[score[tmpNumLine][k]];
                console.log(`\n\nNOTES_SYMBOL[score[tmpNumLine][k]]: ${NOTES_SYMBOL[score[tmpNumLine][k]]}`);
            }
        }
    }
}
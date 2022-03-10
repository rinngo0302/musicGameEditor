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

        makeScoreFromScoreData();
    });
}

let textCursor = 0;
function getReader(line)
{
    score = new Array(line + 1);
    for (let i = 0; i < line + 1; i++)
    {
        score[i] = new Array(6);
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
                    score[num][i] = undefined;
                } else {
                    score[num][i] = getc;
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
    await makeNewScore();
    let numLine = 0;

    for (let i = 1; i <= score.length; i++)
    {
        if (score[i][5] != undefined)
        {   
            let j = 0;
            while (j === 0 || score[i][5] == undefined)
            {
                console.log("vgahjc");
                document.getElementById("numBar").innerHTML = ""
                await makeNewScore();
        
                for (let k = 0; k < 4; k++)
                {
                    let notes = document.getElementById(`notes_${i}${j}${k}`);
                    notes.innerHTML = NOTES_SYMBOL[score[j][k]];
                }
            }
        }
    }
}
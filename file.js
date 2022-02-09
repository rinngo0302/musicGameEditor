let text;

async function readFile(e)
{
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", function()
    {
        text = reader.result;
        // for (let i = 0; i < text.length; i++)
        // {
        //     console.log(text[i]);
        // }
        getReader();
    });
}

let data = new Array(17);
let textCursor = 0;
async function getReader()
{
    for (let i = 0; i < data.length; i++)
    {
        data[i] = new Array(6);
    }

    let num = 0;
    let now = 1;
    
    while (true)
    {
        let i = 0;
        
        let getc = "";
        while (true)
        {
            if (text[now] === "/")
            {
                while (text[now] != "\r" && text[now] != "\n")  // "/"があったら改行までループ
                {
                    now++;
                    console.log(text[now]);
                }
                now += 2;
            }
            
            if (text[now] === "," || text[now] === "\n" || text[now] === "\r")
            {
                data[num][i] = getc;
                // console.log(`getc: ${getc}`);
                getc = "";
                i++;
                if (i === 6)
                {
                    console.log(`i: ${getc}`);
                    break;
                }
            } else {
                getc += text[now];
                console.log(`${now}: ${getc}`);
            }

            now++;

        }

        if (num === 10)
        {
            break;
        }
        num++;
    }
}
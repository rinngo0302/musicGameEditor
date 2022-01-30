let text;

async function readFile(e)
{
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", function()
    {
        text = reader.result;
        for (let i = 0; i < text.length; i++)
        {
            console.log(text[i]);
        }
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
    let i = 0;

    while (true)
    {
        let getc = "";
        while (true)
        {
            if (text[textCursor] === "/")
            {
                while (text[textCursor] != "\n" && text[textCursor] != "\r")
                {
                    console.log(`${textCursor}: ${text[textCursor]}`);
                    textCursor += 1;
                }
            }

            if (text[textCursor] == "\n" || text[textCursor] == "," || text[textCursor] == "\r")
            {
                console.log(`${textCursor - 1}: ${getc}`);
                data[num][i] = getc;
                getc = "";
                textCursor++;
                i++;
                console.log(getc);
            } else {
                // console.log(getc);
                getc += text[textCursor];
                textCursor++;
            }

            if (textCursor % data[i].length === 0)
            {
                // console.log("num");
                console.log(data[i]);
                break;
            }
            // console.log(data[num][i]);
        }
        if (num >= 16)
        {
            break;
        }
        num++;
    }

}
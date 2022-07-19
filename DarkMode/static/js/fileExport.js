text = "";

async function fileExport()
{
    convertArryToString();
}

async function convertArryToString()
{
    text = "";
    for (let i = 0; i < score.length; i++)
    {
        for (let j = 0; j < 6; j++)
        {
            if (score[i][j] === undefined)
            {
                // alert(`i: ${i}\nj: ${j}\ntext: ${text}`);
                text += ",";
                continue;
            }
            text += score[i][j];

            if (j === 5)
            {
                continue;
            }

            if (score[i][j + 1] === undefined)
            {
                continue;
            }
            text += ",";
            // alert(`i: ${i}\nj: ${j}\ntext: ${text}`);
        }

        // text += ",";
        text += "\n";
    }

    text = text.slice(0, -1);
    let textel = document.getElementById("text");
    textel.innerHTML = text;
}
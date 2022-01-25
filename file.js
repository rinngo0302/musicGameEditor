async function readFile(e)
{
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", function()
    {
        getReader(reader.result);
    });
}

let notes = new Array(5);
let textCursor = 0;
async function getReader(text)
{
    for (let i = 0; i < 5; i++)
    {
        notes[i] = new Array();
    }

    while (true)
    {
        if (text[textCursor] === "/")
        {
            while (text[textCursor] != "\n")
                textCursor++;
        }

        if (text[textCursor] == "\n")
        {
            textCursor++;
        }

        if (textCursor === text.length)
        {
            break;
        }

        for (let i = 0; i < 5; i++)
        {
            notes[i] = text[textCursor];
            console.log(notes);
        }
    }

    console.log(notes);
}
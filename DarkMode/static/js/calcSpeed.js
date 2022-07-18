let bpm;

let speed = 0;
async function calcSpeed()
{
    bpm = document.getElementById("getBPM").value;
    speed = 60 / bpm;
    console.log(`speed: ${speed}`);

    setInterval(
        function()
        {
            console.log("Next!");
        }, speed * 1000
    );
}
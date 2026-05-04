let flagsContainer = document.getElementById("flagsContainer")
let search = document.getElementById("search")
let flags = []

async function getFlags(){
    try{
        let response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,flags"
        )
        console.log(response);
        flags = await response.json()
        console.log(flags);  
        renderFlags(flags)
    }
    catch (error){
        console.log('Error',error);
        
    }
}

function renderFlags(data) {
    if(data.length === 0){
        flagsContainer.innerHTML = `<p>Natija topilmadi...</p>`
        return
    }
    flagsContainer.innerHTML = data
    .map((flag) => 
        `<div class="card">
        <img src="${flag.flags.svg}" />
        <h3>${flag.name.common}</h3>
        </div>`
    )
    .join("")
}
search.addEventListener("input",(e) => {
    let text = e.target.value.toLowerCase();
    console.log(text)

    let filteredFlags = flags.filter((flag) =>
        flag.name.common.toLowerCase().includes(text)
    )
    renderFlags(filteredFlags)
})
getFlags()
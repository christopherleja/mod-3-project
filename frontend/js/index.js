const BASE_URL = "http://localhost:3000/"
const petList = document.querySelector(".pets-ul")
const mainRender = document.querySelector("#main-render")
const headers = document.querySelector("#headers")
const selectedPetDiv = document.querySelector('.selected-pet')
const petDetailDiv = document.querySelector('.pet-details')
const container = document.querySelector('.container')
const playerPet = []
const createTab = document.querySelector(".create-tab")
const battleTab = document.querySelector(".battle-tab")


const backgrounds = ["./css/images/liquorstore.jpeg", "./css/images/forestscape.jpg", "./css/images/mountainscape.jpg", "./css/images/pixelbackground.jpg"]

const effectArray = ["none", `reduces opponent's defense`, "increases defense", "lowers opponent's speed", "increases speed", "lowers opponent's attack", "increases attack", "restores hp"]

fetch(BASE_URL + "pets")
    .then(response => response.json())
    .then(pets => {
    let petsArr = pets.data
    petsArr.forEach(petObj => renderPet(petObj.attributes));
});

function renderPet(petObj){
    let petNameLi = document.createElement('li')
    let petNameSpan = document.createElement('span')
    
    petNameSpan.innerText = `${petObj.name}`
    petNameSpan.className = "pets-name-text"
    petNameLi.className = "pets-li"

    petNameLi.append(petNameSpan)
    petList.append(petNameLi)

    petNameLi.addEventListener("click", () => {

        displayPet(petObj)
    })
}


function displayWelcome() {
    stopSound()
    container.innerHTML = ""
    selectedPetDiv.innerHTML = ""
    const welcome = document.createElement('div')
    welcome.setAttribute('id', 'welcome-page')
    const header = document.createElement('h1')
    header.setAttribute('class', 'welcome-header')
    header.textContent = 'Welcome to Super Pet Bros. Unleashed!'
    const rules1 = document.createElement('h3')
    const rules2 = document.createElement('h4')
    rules1.classList.add("rules")
    rules2.classList.add("rules")
    rules1.textContent = "To enter the arena, select NEW PET, or choose an existing pet from the menu"
    rules2.innerHTML = "Use your pet's abilities to defeat your opponent, <strike>just like in pokemon!</strike>"
    welcome.append(header, rules1, rules2)
    container.append(welcome)
}
  
function displayPet(petObj) {
    stopSound()

    container.innerHTML = ""
    selectedPetDiv.style.display = "inline-block"
    petDetailDiv.setAttribute('id', 'pet-details')
    petDetailDiv.innerHTML = `
    <h1 class="welcome-header">Champion</h1>
    <img class="pet-image" src="${petObj['pet-image-url']}"><br />
    <h2 id="pet-name">${petObj.name}</h2>
    <ul class="pet-stat-ul">
        <li>HP: ${petObj.hp}</li>
        <li>Attack: ${petObj.attack}</li>
        <li>Defense: ${petObj.defense}</li>
        <li>Speed: ${petObj.speed}</li>
    </ul>
    <ol class="pet-move-ol">
        <li>${petObj.moves[0].name}</li>
            <ul class="move-stats-ul">
                <li>Power: ${petObj.moves[0].power}</li>
                <li>Effect: ${effectArray[petObj.moves[0].effect_target]} by ${petObj.moves[0].effect}%</li>
            </ul>
        <li>${petObj.moves[1].name}</li>
            <ul class="move-stats-ul">
                <li>Power: ${petObj.moves[1].power}</li>
                <li>Effect: ${effectArray[petObj.moves[1].effect_target]} by ${petObj.moves[1].effect}%</li>
            </ul>
        <li>${petObj.moves[2].name}</li>
            <ul class="move-stats-ul">
                <li>Power: ${petObj.moves[2].power}</li>
                <li>Effect: ${effectArray[petObj.moves[2].effect_target]} by ${petObj.moves[2].effect}%</li>
            </ul>
        <li>${petObj.moves[3].name}</li>
            <ul class="move-stats-ul">
                <li>Power: ${petObj.moves[3].power}</li>
                <li>Effect: ${effectArray[petObj.moves[3].effect_target]} by ${petObj.moves[3].effect}%</li>
            </ul>
    `
    let choosePetButton = document.createElement('button')
    choosePetButton.id = "choose-pet-btn"
    choosePetButton.innerText = `Choose ${petObj.name}`
    choosePetButton.setAttribute('class', 'pet-button')

    let battleButton = document.createElement('button')
    battleButton.id = "battle-btn"
    if(playerPet.length > 0) {
        battleButton.style.display = "block"
    }
    
    battleButton.innerText = `Battle ${petObj.name}`
    battleButton.setAttribute('class', 'pet-button')

    petDetailDiv.append(choosePetButton, battleButton)
    container.append(petDetailDiv)

    choosePetButton.addEventListener("click", function(e){
        e.preventDefault()
            if (playerPet.length > 0){
                playerPet.pop()
                playerPet.push(petObj)
                battleButton.style.display = "block"
                selectedPet(playerPet[0])
            }else {
                playerPet.push(petObj)
                selectedPet(playerPet[0])
                battleButton.style.display = "block"
            }
    })

    if(!!playerPet[0]) {
        selectedPet(playerPet[0])
    }

    battleButton.addEventListener("click", function(e){
        e.preventDefault()
        if (playerPet.length === 1){
        renderBattle(playerPet, petObj)
        } else {
            window.alert("You have to choose a pet before you can battle!")
        }
    })
}

function selectedPet(petObj) {
    selectedPetDiv.style.display = "block"
    selectedPetDiv.innerHTML = `
    <h1 class="welcome-header">Chosen Champion</h1>
    <img class="pet-image" src="${petObj['pet-image-url']}"><br />
    <h2 id="pet-name">${petObj.name}</h2>
    <ul class="pet-stat-ul">
        <li>HP: ${petObj.hp}</li>
        <li>Attack: ${petObj.attack}</li>
        <li>Defense: ${petObj.defense}</li>
        <li>Speed: ${petObj.speed}</li>
    </ul>
    <ol class="pet-move-ol">
        <li>${petObj.moves[0].name}</li>
            <ul class="move-stats-ul">
                <li>Power: ${petObj.moves[0].power}</li>
                <li>Effect: ${effectArray[petObj.moves[0].effect_target]} by ${petObj.moves[0].effect}%</li>
            </ul>
        <li>${petObj.moves[1].name}</li>
            <ul class="move-stats-ul">
                <li>Power: ${petObj.moves[1].power}</li>
                <li>Effect: ${effectArray[petObj.moves[1].effect_target]} by ${petObj.moves[1].effect}%</li>
            </ul>
        <li>${petObj.moves[2].name}</li>
            <ul class="move-stats-ul">
                <li>Power: ${petObj.moves[2].power}</li>
                <li>Effect: ${effectArray[petObj.moves[2].effect_target]} by ${petObj.moves[2].effect}%</li>
            </ul>
        <li>${petObj.moves[3].name}</li>
            <ul class="move-stats-ul">
                <li>Power: ${petObj.moves[3].power}</li>
                <li>Effect: ${effectArray[petObj.moves[3].effect_target]} by ${petObj.moves[3].effect}%</li>
            </ul>
    `
}

createTab.addEventListener("click", ()=> {
    createPet()
})

function credits() {
    mainRender.innerHTML = ""

    sexySaxophone.play()
    let div = document.createElement('div')
    div.setAttribute('class', 'fade')

    let section = document.createElement('section')
    section.setAttribute('class', 'credit-container')

    let crawl = document.createElement('div')
    crawl.setAttribute('class', 'crawl')

    let credits = document.createElement('div')
    credits.setAttribute('class', 'credits')
    credits.innerHTML = `
    <br>
    <br>
    <h1 id="welcome-header">A TRIPLE C PRODUCTION!!</h1>
    <br>
    <h2 id="welcome-header"><strong>C</strong>hris Leja</h2>
    <br>
    <h2 id="welcome-header"><strong>C</strong>heung, Eric</h2>
    <br>
    <h2 id="welcome-header"><strong>C</strong>lark, Kevin</h2>
    `
    crawl.append(credits)
    section.append(crawl)
    div.append(section)
    mainRender.append(div)
    setTimeout(()=> {sexySaxophone.play(), 0})
}

displayWelcome()

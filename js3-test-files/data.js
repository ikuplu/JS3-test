/*
  This list gives the ids of all the great houses that we want to look up.
  It should be inserted into the html above all the other files to ensure it is available
*/
const houseIdList = [
    7, // Eyrie
    17, // Baratheon
    169, // Greyjoy
    229, // Lannister
    362, // Stark
    378, // Targaryen
    395, // Tully
    398, // Tyrell
];

const fetchCurrentLord = () => {
  houseIdList.forEach(element => {
    fetch(`https://anapioficeandfire.com/api/characters/${element}`)
    .then(res => {
      return res.json();
    })
    .then(result => {
      return result.name;
    })
  })
}


const fetchHouseTitle = () => {
  houseIdList.forEach(element => {
    fetch(`https://anapioficeandfire.com/api/houses/${element}`)
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      const gotHouseList = document.getElementById('got-house-list');
      gotHouse = document.createElement('div');
      gotHouse.setAttribute("class", "got-house");
      gotHouseTitle = document.createElement('h1');
      gotHouseTitle.setAttribute("class", "got-house__title");
      gotHouseTitle.textContent = jsonData.name;
      gotHouseCurrentLord = document.createElement('span');
      gotHouseCurrentLord.setAttribute("class", "got-house__current-lord");
      const fetchCurrentLord = function() {
        fetch(`https://anapioficeandfire.com/api/characters/${element}`)
        .then(res => {
          return res.json()
        })
        .then(jsonData =>{
          return jsonData.name;
        })
      };
      gotHouseCurrentLord.innerText = fetchCurrentLord();
      gotHouse.appendChild(gotHouseTitle);
      gotHouse.appendChild(gotHouseCurrentLord);
      gotHouseList.appendChild(gotHouse);
    })
  
  })
}
fetchHouseTitle();

const killRandomLordButton = document.getElementById('kill-random-lord-button');
killRandomLordButton.addEventListener('click', function() {
  const fetchSwornMember = () => {
    fetch(`https://anapioficeandfire.com/api/houses/${houseIdList[Math.floor(Math.random() * houseIdList.length)]}`)
    .then(res => {
      return res.json();
    })
    .then(jsonData => {
      console.log(jsonData.swornMembers[0]);
      return fetch(`${jsonData.swornMembers[0]}`);
    })
    .then(result => {
      return result.json();
    })
    .then(jsonData => {
      console.log(jsonData.name);
      return jsonData.name;
    })
  }
  gotHouseCurrentLord.innerText = fetchSwornMember();
  console.log(gotHouseCurrentLord.innerText);
})



    
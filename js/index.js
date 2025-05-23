removeActiveClass = () => {
  const buttons = document.getElementsByClassName("categoryButton");

  for(let btn of buttons){
    btn.classList.add("bg-white");
    btn.classList.remove(
        "bg-[rgba(14,122,129,0.1)]",
        "border-[rgb(14,122,129)]",
        "rounded-full");
}
}

const sortByPriceDesc = () => {
  const sortedPets = [...currentPets].sort((a, b) => b.price - a.price);
  displayAllPets(sortedPets);
};

const loadAllPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
}

const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.petData))
    .catch((error) => console.log(error));
}

const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
  .then((res) => res.json())
  .then((data) => displayCategories(data.categories))
  .catch((error) => console.log(error));
}

const loadCategoryPets = (category) => {

  document.getElementById("loadData").classList.remove("hidden");
  document.getElementById("allPetSection").classList.add("hidden");

  setTimeout(function () {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {

      //category button active
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${category}`);
      activeBtn.classList.remove("bg-white");
      activeBtn.classList.add(
        "bg-[rgba(14,122,129,0.1)]",
        "border-[rgb(14,122,129)]",
        "rounded-full"
      );
      
      displayAllPets(data.data)

    })
    .then((error) => console.log(error))
  },2000)
  
}


let currentPets = [];
const displayAllPets = (pets) => {
    currentPets = pets; // Store pets globally

    // loading
    document.getElementById("loadData").classList.add("hidden");
    document.getElementById("allPetSection").classList.remove("hidden");
    //

    const allPetsContainer = document.getElementById("allPets");
    const noContentContainer = document.getElementById("noContent")

    allPetsContainer.innerHTML = "";

    if(pets.length == 0){
      noContentContainer.classList.remove("hidden");
      return;
    }else{
      noContentContainer.classList.add("hidden");
    }

    pets.forEach( (pet) => {
        // console.log(pet);
        const card = document.createElement("div");
        card.classList = "card bg-base-100 w-full border-2";

        card.innerHTML = `
            <figure class="px-4 pt-4">
              <img src="${pet.image}" alt="pet" class="rounded-xl" />
            </figure>
            <div class="card-body p-4">
              <h2 class="card-title font-bold">${pet.pet_name}</h2>
  
              <p class="text-secondaryColor"><i class="pr-2 fa-solid fa-grip-vertical"></i>
                  <span>Breed: ${pet.breed || "Not Available"}</span></p>
  
              <p class="text-secondaryColor"><i class="pr-2 fa-regular fa-calendar"></i>
                <span>Birth: ${pet.date_of_birth || "Not Available"}</span></p>
  
              <p class="text-secondaryColor"><i class="pr-2 fa-solid fa-venus"></i>
                <span>Gender: ${pet.gender || "Not Available"}</span></p>

              <p class="pb-4 border-b-2 text-secondaryColor"><i class="pr-2 fa-solid fa-dollar-sign"></i>
                <span>Price: ${pet.price || "Not Available"}$</span></p>
  
              <div class="card-actions flex pt-4">
                <button onclick="displayLikePets('${pet.image}')" class="btn text-xl px-4  bg-white border-2 border-customBorder"><i class="text-secondaryColor fa-regular fa-thumbs-up"></i></button>

                <button onclick="displayAdopt(this)" class="btn bg-white border-2 border-customBorder text-primaryColor">Adopt</button>

                <button onclick="loadDetails('${pet.petId}')" class="btn bg-white border-2 border-customBorder text-primaryColor">Details</button>
              </div>
            </div>

        `
        allPetsContainer.append(card);
    })
}

const displayDetails = (pet) => {
  // console.log(pet);
  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `
    <img class="w-full" src = ${pet.image}>
    <h3 class="text-xl font-bold py-4">${pet.pet_name}</h3>

    <div class="flex gap-8 border-b-2 pb-4 text-secondaryColor">
      <div>
        <p><i class="pr-2 fa-solid fa-grip-vertical"></i>
          <span>Breed: ${pet.breed}</span></p>
  
        <p><i class="pr-2 fa-solid fa-venus"></i>
          <span>Gender: ${pet.gender}</span></p>
  
        <p><i class="pr-2 fa-solid fa-venus"></i>
          <span>Vaccinated status: ${pet.vaccinated_status}</span></p>
      </div>
      <div>
        <p><i class="pr-2 fa-regular fa-calendar"></i>
          <span>Birth: ${pet.date_of_birth}</span></p>
              
        <p><i class="pr-2 fa-solid fa-dollar-sign"></i>
          <span>Price: ${pet.price}$</span></p>
      </div>
    </div>

    <h4 class="text-xl font-bold py-4">Details Information</h4>
    <p class="text-secondaryColor">${pet.pet_details}</p>
  `
  customModal.showModal();
}

const displayCategories = (categories) => {

  // console.log(categories);
  const categoryContainer = document.getElementById("category");

  categories.forEach((item) => {
    //console.log(item);
    const buttonContainer = document.createElement("button");

    buttonContainer.setAttribute("id", `btn-${item.category}`);

    buttonContainer.classList = "btn categoryButton text-xl h-20 bg-white hover:bg-[rgba(14,122,129,0.1)] hover:border-[rgb(14,122,129)] hover:rounded-full";

    buttonContainer.innerHTML = `
        <span><img src=${item.category_icon} alt="" class="w-12 h-12 mr-2"></span>
                ${item.category}
    `

    buttonContainer.setAttribute("onclick", `loadCategoryPets('${item.category}')`);

    categoryContainer.append(buttonContainer);
  })
}

function displayLikePets(img) {
 
  const likeContainer = document.getElementById("likePets");
  likeContainer.className = "grid grid-cols-2 gap-4 border-2 p-4 rounded-2xl";

  const image = document.createElement("img");
  image.className = "rounded-lg";
  image.src = img;

  likeContainer.appendChild(image);
}

const displayAdopt = (adoptBtn) => {

  const countNum = document.getElementById('countNumber');
  
  let count = 3;
  countNum.textContent = count;

  const timer = setInterval(() => {
    count--;
    countNum.textContent = count;

    if (count <= 1) {
      clearInterval(timer);
      adoptModel.close();

      adoptBtn.disabled = true;
      adoptBtn.innerText = "Adopted";
    }
  }, 1000);

  
  adoptModel.showModal();
}


loadAllPets();
loadCategories();

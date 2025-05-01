const loadAllPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
}

const displayAllPets = (pets) => {

    const allPetsContainer = document.getElementById("allPets");

    pets.forEach( (pet) => {
        console.log(pet);
        const card = document.createElement("div");
        card.classList = "card bg-base-100 w-full border-2";

        card.innerHTML = `
            <figure class="px-4 pt-4">
              <img src="${pet.image}" alt="pet" class="rounded-xl" />
            </figure>
            <div class="card-body p-4">
              <h2 class="card-title font-bold">${pet.pet_name}</h2>
  
              <p class="text-secondaryColor"><i class="pr-2 fa-solid fa-grip-vertical"></i>
                  <span>Breed: ${pet.breed}</span></p>
  
              <p class="text-secondaryColor"><i class="pr-2 fa-regular fa-calendar"></i>
                <span>Birth: ${pet.date_of_birth}</span></p>
  
              <p class="text-secondaryColor"><i class="pr-2 fa-solid fa-venus"></i>
                <span>Gender: ${pet.gender}</span></p>

              <p class="pb-4 border-b-2 text-secondaryColor"><i class="pr-2 fa-solid fa-dollar-sign"></i>
                <span>Price: ${pet.price}$</span></p>
  
              <div class="card-actions flex pt-4">
                <button class="btn text-xl px-4  bg-white border-2 border-customBorder"><i class="text-secondaryColor fa-regular fa-thumbs-up"></i></button>
                <button class="btn bg-white border-2 border-customBorder text-primaryColor">Adopt</button>
                <button onclick="my_modal_1.showModal()" class="btn bg-white border-2 border-customBorder text-primaryColor">Details</button>
              </div>
            </div>

        `
        allPetsContainer.append(card);
    })
}

const displayDetails = (pets) => {

}

loadAllPets();
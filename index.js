//CONSIDER IF YOU CAN MAKING A BOX THAT APPEARS WHICH GIVES RECENT ACTIVITY LIKE WHETHER YOU ADDED, DELETED, OR UPDATED SOMETHING
//      MAKE THIS THE INSTRUCTION BOX, THAT WAY YOU CAN REPOSITION THINGS AND YOU ALREADY KNOW SIZE
//          IF YOU CAN, MAKE IT SO IT ONLY HOLDS 3 AT A TIME, ANY MORE THAN THAT AND IT ONLY SHOWS MOST RECENT 3

// start off hiding activity history box, if user wants to see it they can toggle it on with button
let showActivity = false;
const startUp = () => {
  // we need to wait to hide activity container until everything is ready, hence why it's within a function we do once document is ready
  $(".activityContainer").hide();
};

// create a function whose purpose is to get the current array of cars,
const getCars = () => {
  return cars;
};

// Because of the filtering functionality I cannot use "array" when trying to read object info in readContent
//  Instead I will have to read from the filtered array. However If "filteredCars" is equal to "array" unless filtered, 
//    then I can use same readContent function regardless of if car is part of filtered array or not
let array = getCars();
let filteredCars = array;

// this 
const loadCars = () => {
  // when calling upon loadCars it may be as result of another function that changed ".carsWrapper" styling
  //  so make sure that all styling is reset to default first
  $(".carsWrapper").html(" ");
  $(".carsWrapper").css("border-radius", "5%");
  $(".carsWrapper").css("margin-left", "9%");
  $(".carsWrapper").css("width", "80%");
  $(".carsWrapper").css("flex-direction", "row");

  // create variable tied to carsWrapper class that contains everything so its easier to append to later
  let carsWrapper = $(".carsWrapper");

  // This is here in the case that the user deletes every single car. Here because carsWrapper has to be declared first
  // If user creates a car this will go away
  if (cars.length == 0) {
    carsWrapper.append(`There are no cars`)
  }

  // before iterating through our cars create index variable that will be used to track, increments at the end
  let carIndex = 0;

  // iterates through all cars and makes special container for each
  array.forEach((car) => {
    // carCard will contain ALL relevant car information that will be appended to it at end of iteration
    let carCard = $(`<div class = "carCard"></div>`);

    // nameLine contains the make and model or 'name' of the car
    let nameLine = $(`<div class = "nameLine">
            ${car.carMake} ${car.carModel}
        </div>`);

    // carImage contains the image for the type of car
    //  image based off type of car (ie: luxury, sedan, suv, etc) so that created entries may have an image too
    //  I use a generic silhouette image so that it can be applied to all entries
    let carImage = $(`<div class = "carImage">
            <img src="./images/${car.carType}.jpg" alt="${car.carType}"/>
        </div>`);

    // buttonBar contains the buttons for reading, updating, and deleting
    let buttonBar = $(`<div class = "buttonBar">
            <button class = "readCar" id = ${carIndex}>Read</button>
            <button class = "updateCar" id = ${carIndex}>Update</button>
            <button class = "deleteCar" id = ${carIndex}>Delete</button>
            </div>`);

    // will be updated to have info with "Read" button that activates ReadContent function
    let infoBar = $(`<div class = "infoBar"></div>`);

    // end of iteration, append all stuff to the card in the order I want it to appear
    carCard.append(nameLine);
    carCard.append(carImage);
    carCard.append(buttonBar);
    carCard.append(infoBar);
    carsWrapper.append(carCard);

    // carsWrapper is already put within parentContainer in html document so I don't think I need this, but comment in case there's issues
    // $(".parentContainer").append(carsWrapper);

    carIndex++;
  });

  // create a mouse over/mouse out event for read, update, delete buttons within "buttonBar" div
  $("button").on("mouseover", function () {
    $(this).css("background-color", "#2898D7");
    $(this).css("box-shadow", "3px 3px 3px #8B56A9");
    $(this).css("width", "120px");
    $(this).css("height", "40px");
    $(this).css("margin-left", "17px");
    $(this).css("margin-right", "18px");
  });
  $("button").on("mouseout", function () {
    $(this).css("box-shadow", "");
    $(this).css("width", "135px");
    $(this).css("height", "50px");
    $(this).css("margin", "10px");
    $(this).css("background-color", "");
    $(this).css("color", " ");
  });

  // create the mouse over and mouseout functions for the buttons specifically in nav bar
  $(".navbar button").on("mouseover", function () {
    $(this).css("background-color", "#2898D7");
    $(this).css("box-shadow", "3px 3px 3px #8B56A9");
    $(this).css("width", "130px");
    $(this).css("height", "35px");
    $(this).css("margin-left", "20px");
    $(this).css("margin-right", "20px");
  });
  $(".navbar button").on("mouseout", function () {
    $(this).css("box-shadow", "");
    $(this).css("width", "150px");
    $(this).css("height", "40px");
    $(this).css("margin", "10px");
    $(this).css("background-color", "");
    $(this).css("color", " ");
  });

  // When "Read" button is clicked, update "infoBar" to contain informaiton about the car
  $(".readCar").on("click", readContent);

  // When "Update" button is clicked, bring up box with text fields and drop down with "submit" button to change information
  $(".updateCar").on("click", updateContent);

  // When "delete" button is clicked, delete corresponding car from array and (if I can make it work) animate loading before refreshing
  $(".deleteCar").on("click", deleteContent);
};

const createContent = () => {
  // console commands to keep track of index we will use later
  console.log(`Now carrying out the 'createContent' function`);

  // update some of the styling and clear the content of ".carsWrapper "
  $(".carsWrapper").css("border-radius", "10%");
  $(".carsWrapper").css("margin-left", "33%");
  $(".carsWrapper").css("width", "30%");
  $(".carsWrapper").css("flex-direction", "column");
  $(".carsWrapper").html(" ");

  // define carsWrapper like we did in the loadCars function
  let carsWrapper = $(".carsWrapper");

  // make a series of fields for users to input values into to update, essentially copy and paste with exception for drop down list
  let userCarMake = $(`<div class = "userCarMake">
        <br>
        <label for="id_CarMake"> Car Make: </label>
        <input type="text" id="CarMake" size="20"/>
    </div>`);

  let userCarModel = $(`<div class = "userCarModel">
        <br>
        <label for="id_CarModel"> Car Model: </label>
        <input type="text" id="CarModel" size="20"/> 
    </div>`);

  // Add drop down list for the type of car. This is a drop down so that a very specific input can be used
  //  this input will determine the image that is used
  let carTypeList = $(`<div class = "carTypeList">
        <br>
        <label for = "carTypes">Car Type</label>
        <select name = "carTypes" id = "typeID">
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
        </select>
    </div>`);

  let userCarColor = $(`<div class = "userCarColor">
        <br>
        <label for="id_CarColor"> Car Color: </label>
        <input type="text" id="CarColor" size="20"/> 
    </div>`);

  let userCarYear = $(`<div class = "userCarYear">
        <br>
        <label for="id_CarYear"> Car Year: </label>
        <input type="number" id="CarYear" size="20"/>    
    </div>`);

  let userCarMiles = $(`<div class = "userCarMiles">
        <br>
        <label for="id_CarMiles"> Car Miles: </label>
        <input type="number" id="CarMiles" size="20"/>
    </div>`);

  let userCarPrice = $(`<div class = "userCarPrice">
        <br>
        <label for="id_CarPrice"> Car Price: </label>
        <input type="number" id="CarPrice" size="20"/>
    </div>`);

  let userSubmitButton = $(`<button class = "userSubmitButton" id = "createButton">Create</button>`);

  let userBackButton = $(`<button class = "userSubmitButton" id = "backButton" onclick = "loadCars()">Cancel</button>`)

  carsWrapper.append(userCarMake);
  carsWrapper.append(userCarModel);
  carsWrapper.append(carTypeList);
  carsWrapper.append(userCarColor);
  carsWrapper.append(userCarYear);
  carsWrapper.append(userCarMiles);
  carsWrapper.append(userCarPrice);
  carsWrapper.append(userSubmitButton);
  carsWrapper.append(userBackButton);

  // another function I am choosing to make anonymous for efficiency sake and it's not very big
  $("#createButton").on("click", () => {
    // make variable for the object that will be pushed, containing all information user had
    let userSubmittedCar = {
      carMake: $("#CarMake").val(),
      carModel: $("#CarModel").val(),
      carType: $("#typeID").val(),
      carColor: $("#CarColor").val(),
      carYear: $("#CarYear").val(),
      carMiles: $("#CarMiles").val(),
      carPrice: $("#CarPrice").val(),
    };

    // log the object
    console.log(userSubmittedCar);

    // push the created car to the cars array before checking to see if it worked
    array.push(userSubmittedCar);
    console.log(array[cars.length - 1]);

    // update the user activity box to show what they user has done
    let userActivity = `<div class = "userActivity"> 
            Added ${userSubmittedCar.carColor} ${userSubmittedCar.carYear} ${userSubmittedCar.carMake} ${userSubmittedCar.carModel}<br>
        </div>`;
    $(".activityContainer").append(userActivity);

    // refresh the page
    loadCars();
  });
};

// Read out relevant information for the specific car
const readContent = (event) => {
  // series of logs to claify that we are in function and what we are doing
  console.log(`Now carrying out the 'readContent' function`);
  index = event.target.id;
  console.log(`The index we are working with is ${index}`);
  console.log(
    `We are working with the ${filteredCars[index].carMake} ${filteredCars[index].carModel}`
  );

  // set what the text content is going to be, use the imported index to ensure correct car info is used, then log
  // at the end after a line break we also add a close button
  infoBarContent = `<div class = "infoBarContent" style="font-size: x-large;">
    This ${filteredCars[index].carYear} ${filteredCars[index].carMake} ${filteredCars[index].carModel} is a ${filteredCars[index].carColor} ${filteredCars[index].carType} with ${filteredCars[index].carMiles} miles on it, for a price of $${filteredCars[index].carPrice}. 
    <br> <br>
    <button class = "close" style = margin-left: 0px; margin-right: 0px;>Close</button>`;
  console.log(infoBarContent);

  // Every carCard has a ".moreInfo" div, we need to make sure we're appending to the right one
  // we know that something jQuery does is automatically assign an index to objects created using it
  // so we can make variable equal to the ".infoBar" div that has an index equal to the index we used for car info
  let correspondingDiv = $(".infoBar:eq(" + index + ")");

  let missingContentWarning = $(`<div class="noContentWarning" style="font-size: large; text-align: center;">
    There is missing info that needs to be updated! <br>
  </div>`);

  // if there is any missing information at all we will append the missing content warning before the info, otherwise it only shows info
  if (!filteredCars[index].carYear || 
  !filteredCars[index].carMake || 
  !filteredCars[index].carModel || 
  !filteredCars[index].carColor || 
  !filteredCars[index].carType || 
  !filteredCars[index].carMiles || 
  !filteredCars[index].carPrice) {
    correspondingDiv.html(missingContentWarning)
    correspondingDiv.append(infoBarContent);
  }
  else {
    // once we have locked onto the correct one, we can append the text content to it
  correspondingDiv.html(infoBarContent);
  }

  // when the close button is clicked, we will "close" the information by using .html set to empty
  // use anonymous function since it's very quick and easy
  // only want to close respective box, if only there was some variable beforehand that determined how to find it...
  $(".close").on("click", () => {
    $(correspondingDiv).html(" ");
  });
};

//Update the content of the car that was clicked
const updateContent = (event) => {
  // console commands to keep track of index we will use later
  console.log(`Now carrying out the 'updateContent' function`);
  index = event.target.id;
  index = parseInt(index);
  console.log(`The index we are working with is ${index}`);
  console.log(
    `We are updating the ${array[index].carMake} ${array[index].carModel}`
  );

  // update some of the styling and clear the content of ".carsWrapper "
  $(".carsWrapper").css("border-radius", "10%");
  $(".carsWrapper").css("margin-left", "33%");
  $(".carsWrapper").css("width", "30%");
  $(".carsWrapper").css("flex-direction", "column");
  $(".carsWrapper").html(" ");

  // define carsWrapper like we did in the loadCars function
  let carsWrapper = $(".carsWrapper");

  // make a series of fields for users to input values into to update, essentially copy and paste with exception for drop down list
  let userCarMake = $(`<div class = "userCarMake">
        <br>
        <label for="id_CarMake"> Car Make: </label>
        <input type="text" id="CarMake" size="20" value="${array[index].carMake}"/>
    </div>`);

  let userCarModel = $(`<div class = "userCarModel">
        <br>
        <label for="id_CarModel"> Car Model: </label>
        <input type="text" id="CarModel" size="20" value="${array[index].carModel}"/> 
    </div>`);

  // Add drop down list for the type of car. This is a drop down so that a very specific input can be used
  //  this input will determine the image that is used
  let carTypeList = $(`<div class = "carTypeList">
        <br>
        <label for = "carTypes">Car Type</label>
        <select name = "carTypes" id = "typeID">
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
        </select>
    </div>`);

  // This one I needed help to make and looked up, I don't think we learned specifically in class
  //  not at all vital to the function it just bothered me that only car type didn't take existing value
  carTypeList.find(`#typeID`).val(array[index].carType);

  // Optionally log again to verify if the value was correctly set
  console.log("Selected car type: " + $("#typeID").val());

  let userCarColor = $(`<div class = "userCarColor">
        <br>
        <label for="id_CarColor"> Car Color: </label>
        <input type="text" id="CarColor" size="20" value="${array[index].carColor}"/> 
    </div>`);

  let userCarYear = $(`<div class = "userCarYear">
        <br>
        <label for="id_CarYear"> Car Year: </label>
        <input type="text" id="CarYear" size="20" value="${array[index].carYear}"/>    
    </div>`);

  let userCarMiles = $(`<div class = "userCarMiles">
        <br>
        <label for="id_CarMiles"> Car Miles: </label>
        <input type="text" id="CarMiles" size="20" value="${array[index].carMiles}"/>
    </div>`);

  let userCarPrice = $(`<div class = "userCarPrice">
        <br>
        <label for="id_CarPrice"> Car Price: </label>
        <input type="text" id="CarPrice" size="20" value="${array[index].carPrice}"/>
    </div>`);

  let userSubmitButton = $(`<button class = "userSubmitButton" id = "updateButton">Update</button>`);

  let userBackButton = $(`<button class = "userSubmitButton" id = "backButton" onclick = "loadCars()">Cancel</button>`)


  carsWrapper.append(userCarMake);
  carsWrapper.append(userCarModel);
  carsWrapper.append(carTypeList);
  carsWrapper.append(userCarColor);
  carsWrapper.append(userCarYear);
  carsWrapper.append(userCarMiles);
  carsWrapper.append(userCarPrice);
  carsWrapper.append(userSubmitButton);
  carsWrapper.append(userBackButton)

  // another function I am choosing to make anonymous for efficiency sake and it's not very big
  $("#updateButton").on("click", () => {
    array[index].carMake = $("#CarMake").val();
    array[index].carModel = $("#CarModel").val();
    array[index].carType = $("#typeID").val();
    array[index].carColor = $("#CarColor").val();
    array[index].carYear = $("#CarYear").val();
    array[index].carMiles = $("#CarMiles").val();
    array[index].carPrice = $("#CarPrice").val();

    let userActivity = `<div class = "userActivity"> 
      Updated ${array[index].carColor} ${array[index].carYear} ${array[index].carMake} ${array[index].carModel}<br>
    </div>`;
    $(".activityContainer").append(userActivity);

    // now we just have to refresh the content so call upon loadCars function
    loadCars();
  });
};

//Delete the car that is clicked
const deleteContent = (event) => {
  // console commands to keep track of index we will use later to delete car
  console.log(`Now carrying out the 'deleteContent' function`);
  index = event.target.id;
  index = parseInt(index);
  console.log(`The index we are working with is ${index}`);
  console.log(
    `We are deleting the ${array[index].carMake} ${array[index].carModel}`
  );

  let userActivity = `<div class = "userActivity"> 
    Deleted ${array[index].carColor} ${array[index].carYear} ${array[index].carMake} ${array[index].carModel} <br>
  </div>`;
  $(".activityContainer").append(userActivity);

  array.splice(index, 1);

  loadCars();
};

const toggleUserActivity = () => {
  console.log(`now in user activity function`);
  if (showActivity) {
    showActivity = false;
    $(".activityContainer").hide();
    console.log("showing user activity is now " + showActivity);
  } else if (!showActivity) {
    showActivity = true;
    $(".activityContainer").show();
    console.log("showing user activity is now " + showActivity);
  }
};

// thinking of making a function that creates the boxes for update and create and filter, do that once everything is functional
// How should I filter the cars after bringing up filter box?
// one idea is to have multiple boxes with options like with create/update along with button at bottom
// but how would

const filterContent = () => {
  // idea of filtering is that we start with showing Everything and only cut down if specified
  // create array we will populate later
  // obligatory console command
  console.log(`Now carrying out the 'filterContent' function`);
  filteredCars = [];
  // update some of the styling and clear the content of ".carsWrapper "
  $(".carsWrapper").css("border-radius", "10%");
  $(".carsWrapper").css("margin-left", "25%");
  $(".carsWrapper").css("width", "50%");
  $(".carsWrapper").css("flex-direction", "column");
  $(".carsWrapper").html(" ");

  // define carsWrapper like we did in the loadCars function
  let carsWrapper = $(".carsWrapper");

  // make another series of boxes akin to other functions, but this time every input will have drop down
  // had an issue for a while where inputs wouldn't actually filter and used console to figure out inputs counted as strings
  //    rather than numbers despite believing I had parsed them correctly. I found out I can allow ONLY numbers to be type
  let carTypeList = $(`<div class = "carTypeList">
        <br>
        <label for = "carTypes">Car Type</label>
        <select name = "carTypes" id = "typeID">
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option selected value="All">All</option>
        </select>
    </div>`);

  let userCarYear = $(`<div class = "userCarYear">
        <br>
        <label for="id_CarYear"> Car Year: </label>
        <input type="number" id="CarYear" size="20"/> 
        <select name = "year" id = "yearID">
            <option value="exact">Exactly</option>
            <option value="and before">And Earlier</option>
            <option value="and later">And Later</option>
        </select>   
    </div>`);

  let userCarMiles = $(`<div class = "userCarMiles">
        <br>
        <label for="id_CarMiles"> Car Miles: </label>
        <input type="number" id="CarMiles" size="20"/>
        <select name = "miles" id = "milesID">
            <option value="and below">And Below</option>
            <option value="and above">And Above</option>
        </select>
    </div>`);

  let userCarPrice = $(`<div class = "userCarPrice">
        <br>
        <label for="id_CarPrice"> Car Price: </label>
        <input type="number" id="CarPrice" size="20"/>
        <select name = "price" id = "priceID">
            <option value="and below">And Below</option>
            <option value="and above">And Above</option>
        </select>
    </div>`);

  let userSubmitButton = $(
    `<button class = "userSubmitButton" id = "filterButton">Filter</button>`
  );

  carsWrapper.append(carTypeList);
  carsWrapper.append(userCarYear);
  carsWrapper.append(userCarMiles);
  carsWrapper.append(userCarPrice);
  carsWrapper.append(userSubmitButton);

  // will make filter an anonymous function within scope of "filterContent()" so I can easily access everything
  //  it's only activated with a button press so there should be no issues making it anonymous

  // I'm thinking process will be either push all relevant items to new temp array and display that
  $("#filterButton").on("click", () => {
    filteredCars = [];
    let typeCheck = true;
    let yearCheck = true;
    let milesCheck = true;
    let priceCheck = true;
    // parse every text field to be integers so that they can be numerically compared, otherwise they will be considered strings
    let userSubmittedYear = $("#CarYear").val();
    userSubmittedYear = parseInt(userSubmittedYear);
    console.log(typeof userSubmittedYear);
    let userSubmittedMiles = $("#CarMiles").val();
    userSubmittedMiles = parseInt(userSubmittedMiles);
    console.log(typeof userSubmittedMiles);
    let userSubmittedPrice = $("#CarPrice").val();
    userSubmittedPrice = parseInt(userSubmittedPrice);
    console.log(typeof userSubmittedPrice);

    // do a forEach that checks every car, and only pushes them to new temp array if they qualify
    array.forEach((car) => {
      let typeCheck = true;
      let yearCheck = true;
      let milesCheck = true;
      let priceCheck = true;
      // make variables that will check if item qualifies
      // these checks will return a boolean, and car will only qualify if it satisfies all booleans aka what user filters for
      // check to see if car is the same type as user wants
      // CONSIDER ADDING AN ALL OPTION SO THAT EVERY TYPE OF CAR CAN BE SEEN
      if ($("#typeID").val() != "All") {
        typeCheck = car.carType == $("#typeID").val();
      }

      if (userSubmittedYear > 0) {
        if ($("#yearID").val() == "exact") {
          yearCheck = car.carYear == userSubmittedYear;
        } else if ($("#yearID").val() == "and before") {
          yearCheck = car.carYear <= userSubmittedYear;
        } else if ($("#yearID").val() == "and later") {
          yearCheck = car.carYear >= userSubmittedYear;
        }
      }

      // check to see if the car miles are in the range the user wants
      if (userSubmittedMiles > 0) {
        if ($("#milesID").val() == "and below") {
          milesCheck = car.carMiles <= userSubmittedMiles;
        } else if ($("#milesID").val() == "and above") {
          milesCheck = car.carMiles >= userSubmittedMiles;
        }
      }
      
      // // check to see if the car price is in the range the user wants
      if (userSubmittedPrice > 0) {
        if ($("#priceID").val() == "and below") {
          priceCheck = car.carPrice <= userSubmittedPrice;
        } else if ($("#priceID").val() == "and above") {
          priceCheck = car.carPrice >= userSubmittedPrice;
        }
      }

      // if the qualifications are met, push to array and after we check all the cars use array as paremeter for display function
      if (typeCheck && yearCheck && milesCheck && priceCheck) {
        filteredCars.push(car);
        console.log(`${car.carMake} ${car.carModel} was added`);
      }
    });
    console.log(filteredCars)
    
    

    let userActivity = `<div class = "userActivity"> 
      filtered for a year ${userSubmittedYear} ${$("#yearID").val()} for ${$("#typeID").val()}, with ${userSubmittedMiles} ${$("#milesID").val()} miles, at a cost of ${userSubmittedPrice} ${$("#priceID").val()}
    </div>`;
    $(".activityContainer").append(userActivity);

    displayFilteredCars(filteredCars);
  });
};

const displayFilteredCars = (filteredCars) => {
  let carsWrapper = $(".carsWrapper");

  $(".carsWrapper").html(" ");
  $(".carsWrapper").css("border-radius", "5%");
  $(".carsWrapper").css("margin-left", "9%");
  $(".carsWrapper").css("width", "80%");
  $(".carsWrapper").css("flex-direction", "row");

  if (filteredCars.length > 0) {
    let carIndex = 0;
    filteredCars.forEach((car) => {
      // Do if filtered cars.length =0 then display div or info saying nothing here, consider putting after everything

      // carCard will contain ALL relevant car information that will be appended to it at end of iteration
      let carCard = $(`<div class = "carCard"></div>`);

      // nameLine contains the make and model or 'name' of the car
      let nameLine = $(`<div class = "nameLine">
            ${car.carMake} ${car.carModel}
        </div>`);

      // carImage contains the image for the type of car
      //  image based off type of car (ie: luxury, sedan, suv, etc) so that created entries may have an image too
      //  I use a generic silhouette image so that it can be applied to all entries
      let carImage = $(`<div class = "carImage">
            <img src="./images/${car.carType}.jpg" alt="${car.carType}"/>
        </div>`);

      // buttonBar contains the buttons for reading, updating, and deleting
      let buttonBar = $(`<div class = "buttonBar">
            <button class = "readCar" id = ${carIndex}>Read</button>
            <button class = "goBack" id = ${carIndex}>Return</button>
            </div>`);

      // will be updated to have info with "Read" button that activates ReadContent function
      let infoBar = $(`<div class = "infoBar"></div>`);

      // end of iteration, append all stuff to the card in the order I want it to appear
      carCard.append(nameLine);
      carCard.append(carImage);
      carCard.append(buttonBar);
      carCard.append(infoBar);
      carsWrapper.append(carCard);

      // carsWrapper is already put within parentContainer in html document so I don't think I need this, but comment in case there's issues
      // $(".parentContainer").append(carsWrapper);

      carIndex++;
    });

    // create a mouse over/mouse out event for read, update, delete buttons within "buttonBar" div
    $("button").on("mouseover", function () {
      $(this).css("background-color", "#2898D7");
      $(this).css("box-shadow", "3px 3px 3px #8B56A9");
      $(this).css("width", "120px");
      $(this).css("height", "40px");
      $(this).css("margin-left", "17px");
      $(this).css("margin-right", "18px");
    });
    $("button").on("mouseout", function () {
      $(this).css("box-shadow", "");
      $(this).css("width", "135px");
      $(this).css("height", "50px");
      $(this).css("margin", "10px");
      $(this).css("background-color", "");
      $(this).css("color", " ");
    });

    // create the mouse over and mouseout functions for the buttons specifically in nav bar
    $(".navbar button").on("mouseover", function () {
      $(this).css("background-color", "#2898D7");
      $(this).css("box-shadow", "3px 3px 3px #8B56A9");
      $(this).css("width", "130px");
      $(this).css("height", "35px");
      $(this).css("margin-left", "20px");
      $(this).css("margin-right", "20px");
    });
    $(".navbar button").on("mouseout", function () {
      $(this).css("box-shadow", "");
      $(this).css("width", "150px");
      $(this).css("height", "40px");
      $(this).css("margin", "10px");
      $(this).css("background-color", "");
      $(this).css("color", " ");
    });

    // could I call upon these functions with parameter of "fromFilter" and at end of update/delete, if "fromFilter" is true
    //  then call upon this function again, if not then just do normal loadCars()
    // goal is to make it so an employee could find a specific car they are looking for and update or delete if needed

    // When "Read" button is clicked, update "infoBar" to contain informaiton about the car
    $(".readCar").on("click", readContent);

    // When "Update" button is clicked, bring up box with text fields and drop down with "submit" button to change information
    $(".goBack").on("click", loadCars);
  } else {
    carsWrapper.append(`There are no results`);
    carsWrapper.append(`<button class = "userSubmitButton" id = "backButton">Return</button>`)

    $("button").on("mouseover", function () {
      $(this).css("background-color", "#2898D7");
      $(this).css("box-shadow", "3px 3px 3px #8B56A9");
      $(this).css("width", "150px");
      $(this).css("height", "30px");
      $(this).css("margin-left", "17px");
      $(this).css("margin-right", "18px");
      $(this).css("margin-bottom", "22px");
    });
    $("button").on("mouseout", function () {
      $(this).css("box-shadow", "");
      $(this).css("width", "165px");
      $(this).css("height", "35px");
      $(this).css("margin", "10px");
      $(this).css("background-color", "");
      $(this).css("color", " ");
    });
    $("#backButton").on("click", loadCars);
  }
};

// when document is ready we want to hide activity history as a one time thing
//  if I were to put it in loadCars then everytime someone goes back to the menus it would be hidden
$(document).ready(startUp);
// by starting loadCars we are allowing everything to happen either as a part of it or a function resulting from it
$(document).ready(loadCars);

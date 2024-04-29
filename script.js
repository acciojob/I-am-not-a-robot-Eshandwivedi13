let allImages = document.getElementById('images');
let mainContent = document.getElementById('content');
/* // Method - 1 (By Sir)
let imagesClassNames = ["img1", "img2", "img3","img4","img5"]
let imagesClassNames2 = [...imagesClassNames, imagesClassNames[Math.floor(Math.random()*imagesClassNames.length)] ]
function deleteElement(array, index){
      
     for(let i = index; i<=array.length-2; i++){
         array[i] = array[i+1]
     }
     array.pop()
     console.log(array)
     return array
}
for(let i = 1; i<=6; i++){
    let counter = Math.floor(Math.random()*imagesClassNames2.length) 
   
     let imageTag = document.createElement('img');
     console.log(counter)
     imageTag.className =  imagesClassNames2[counter];
     imageTag.id = "pic"+i;
     robotContainer.append(imageTag);
     // can I modify my array:
     let newArray = deleteElement(imagesClassNames2, counter)
     imagesClassNames2 = [...newArray]
    
}*/

//Method - 2(By me)

let firstTimeSameClass = true;
let i = 0;
let imageClassNames = ['img1', 'img2', 'img3', 'img4', 'img5'];
let randomClassNames = [];
let idx = 0;
while (i < 6){//could use indexOf, .find() or .some() & array.includes()
    const randomIdx = parseInt(Math.random() * imageClassNames.length);
    const curClassName = imageClassNames[randomIdx];
    if(firstTimeSameClass && randomClassNames.includes(curClassName)){
        
        firstTimeSameClass = false;
    }else if(randomClassNames.includes(curClassName)){
        continue;
    }
    randomClassNames[idx++] = curClassName;
    i++; // Increment i to eventually exit the loop
}
let counterForId = 1;
for(let rc of randomClassNames){
    const newImg = document.createElement('img');
    newImg.className = rc;
    newImg.id = 'pic' + counterForId;
    counterForId++;
    allImages.append(newImg);
}

let h3element = document.createElement('h3');
h3element.id = 'h';
h3element.innerText = "Please click on the identical tiles to verify that you are not a robot.";
h3element.style.fontSize = '0.99rem';
mainContent.append(h3element);

const imagesArr = document.querySelectorAll('img');
const buttons = document.querySelectorAll('#btn');
let clicks = 0;
let prevId = '';
for(let image of imagesArr){ 
    image.addEventListener('click', (event)=>{
        curElem = event.target;
        curElemId = curElem.id;
        if(prevId !== curElemId){
            clicks++;
            if(clicks >= 1){//we can either create buttons here or change its display here
                buttons[0].style.cssText = `display : inline-block`;
                image.classList.add('selected');    
            }
            if(clicks == 2){
                buttons[1].style.cssText = `display : inline-block` 
            }else{
                buttons[1].style.cssText = `display : none`
            }
            //clicking on buttons
            buttons[0].addEventListener('click', reset)
            buttons[1].addEventListener('click', verify)  
        }
        prevId = curElemId;
    })
}

function reset(){
    //resetBtn
    if(clicks == 2){
        const lastChild = mainContent.lastElementChild;
        // if(lastChild.includes(p))mainContent.removeChild(lastChild);
         if (lastChild && lastChild.tagName.toLowerCase() === 'p') {
            // Remove the lastChild (which is the last <p> element)
            mainContent.removeChild(lastChild);
        }
    }
    prevId = '';
    clicks = 0;
    buttons[0].style.cssText = `display : none`;
    buttons[1].style.cssText = `display : none`;
    const selectedImages = document.querySelectorAll('.selected')
    selectedImages.forEach((simg)=>{
        simg.classList.remove('selected');
    })
}

function verify(){
   //after clicking on verify button it gets disabled
    buttons[1].style.cssText = `display : none`;
    let selectedImages = document.querySelectorAll(".selected")
    const paraTag = document.createElement('p');
    paraTag.id = 'para';
    if(selectedImages[0].className === selectedImages[1].className){
        paraTag.innerText = 'You are a human. Congratulations!';
    }else{
        paraTag.innerText = ` We can't verify you as a human. You selected the non-identical tiles.`
    } 
    mainContent.append(paraTag);
    
    // selectedImages.forEach((simg)=>{
    //     simg.classList.remove('selected');
    // })

}


//deleteElement from mid of array
//let newArr = arr.slice(0, indexToRemove).concat(arr.slice(indexToRemove + 1));

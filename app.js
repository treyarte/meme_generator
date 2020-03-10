// const canvas = document.querySelector('#meme-canvas');
const memeSection = document.querySelector('.meme-section');
const imageInput = document.querySelector('#image-input');
const topInput = document.querySelector('#text-top-input');
const bottomInput = document.querySelector('#text-bottom-input');
const memeBtn = document.querySelector('.generate-btn');

memeBtn.addEventListener('click', function(e) {
  e.preventDefault();
  validateFields();
});

function generateMeme() {
  const memeContainer = document.createElement('DIV');
  memeContainer.classList.add('meme-container');

  const canvas = document.createElement('CANVAS');
  canvas.setAttribute('id', 'meme-canvas');

  const removeButton = document.createElement('Button');
  removeButton.classList.add('remove-btn');
  removeButton.innerText = 'Remove';

  removeButton.addEventListener('click', function() {
    memeContainer.remove();
  });

  const imageUrl = imageInput.value;
  const topText = topInput.value;
  console.log(topText);
  const bottomText = bottomInput.value;

  const img = document.createElement('IMG');
  img.classList.add('meme-image');
  img.alt = 'your meme';

  canvas.width = 1920;
  canvas.height = 1080;

  let ctx = canvas.getContext('2d');

  //using a canvas writes the text on the image instead of just placing it on top of it
  //users can actually download their memes by right clicking.
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = '900 6.25rem Impact';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    //the black outline around the text
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;

    //top text outline
    ctx.strokeText(`${topText}`, canvas.width / 2, canvas.height * 0.11);
    //top text
    ctx.fillText(`${topText}`, canvas.width / 2, canvas.height * 0.11);

    //bottom text
    ctx.strokeText(`${bottomText}`, canvas.width / 2, canvas.height - 30);
    ctx.fillText(`${bottomText}`, canvas.width / 2, canvas.height - 30);
  };
  img.src = imageUrl;

  memeContainer.append(canvas);
  memeContainer.append(removeButton);
  memeSection.append(memeContainer);

  imageInput.value = '';
  topInput.value = '';
  bottomInput.value = '';
}

//check if input fields are empty
function validateFields() {
  if (imageInput.value === '') {
    alert('Please enter an image URL');
  } else if (topInput.value === '' || bottomInput.value === '') {
    alert('Please fill out the top and bottom fields');
  } else {
    generateMeme();
  }
}

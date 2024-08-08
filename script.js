function searchButton() {
    const input = document.getElementById('input-search').valeu;
 
    motionInput()
}

function closeInput() {
    document.getElementById('input-search').style.visibility = 'hidden';
    document.getElementById('input-search').style.width = '40px';
    document.getElementById('input-search').style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    document.getElementById('input-search').style.transition = 'all 0.5s ease-in-out 0s';
    document.getElementById('inout-search').valeu = "";
}

function openInput() {
    document.getElementById('input-search').style.visibility = 'visible';
    document.getElementById('input-search').style.width = '300px';
    document.getElementById('input-search').style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
    document.getElementById('input-search').style.transition = 'all 0.5s ease-in-out 0s';
    document.getElementById('inout-search').valeu = "";
}

function motionInput() {
   const visibility = document.getElementById('input-search').style.visibility;
   
   if (visibility === 'hidden') {
    openInput()
   } else {
    closeInput()
   }
}

document.addEventListener('DOMContentLoaded', () => {
    closeInput() 
})
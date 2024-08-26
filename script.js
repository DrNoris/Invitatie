window.addEventListener('scroll', function() {
    const videoContainer = document.getElementById('videoContainer');
    
    // Maximum scroll distance to affect the size of the video container
    const maxScroll = 500; // Maximum scroll distance after which resizing stops
    const minWidth = 50; // Minimum width in viewport width percentage
    const minHeight = 50; // Minimum height in viewport height percentage

    // Calculate new size based on scroll position
    let scrollPosition = window.scrollY;
    let newWidth = 100 - (scrollPosition / maxScroll) * (100 - minWidth);
    let newHeight = 100 - (scrollPosition / maxScroll) * (100 - minHeight);

    // Ensure the size does not go below minimum values
    if (newWidth < minWidth) newWidth = minWidth;
    if (newHeight < minHeight) newHeight = minHeight;

    videoContainer.style.width = newWidth + 'vw';
    videoContainer.style.height = newHeight + 'vh';
    videoContainer.style.borderRadius = (scrollPosition / 7) + 'px'; // Optional: Rounded corners based on scroll
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('draggableContainer');
    let draggedElement = null;

    textContainer.addEventListener('dragstart', (event) => {
        console.log('Drag started'); // Verifică dacă acest mesaj apare
        draggedElement = event.target;
        if (draggedElement.tagName === 'H1') {
            event.dataTransfer.setData('text/plain', null); // Required for Firefox
            draggedElement.style.opacity = '0.5'; // Indicație că elementul este tras
        }
    });

    textContainer.addEventListener('dragend', (event) => {
        event.target.style.opacity = '1'; // Restaurare opacitate
        draggedElement = null; // Resetează elementul tras
    });

    textContainer.addEventListener('dragover', (event) => {
        event.preventDefault(); // Necesare pentru a permite drop-ul
    });

    textContainer.addEventListener('drop', (event) => {
        event.preventDefault();
        const target = event.target;
        if (target.tagName === 'H1' && draggedElement !== target) {
            // Schimbă locul elementului draguit
            const rect = target.getBoundingClientRect();
            const nextElement = (rect.top < event.clientY) ? target.nextSibling : target;
            textContainer.insertBefore(draggedElement, nextElement);
        }
    });
});



const Texts = [
    'Alcool', 'Bere', 'Muzica',
    'Cazare peste noapte', 'Poate gratar', 'Poate pizza inca nu stiu ce gatesc',
    'Piscina (murdara)', 'Loc frumos, linistit', 'Suc',
    'AC', 'Casa mare', '2 caini', 'Vreo 14 oameni', 'Vin', 'Conian', 'Cred ca mai am rom'
  ];
  var tagCloud = TagCloud('.Sphere', Texts, {
    // Sphere radius in px
    radius: 250,
    // animation speed
    // slow, normal, fast
    maxSpeed: 'normal',
    initSpeed: 'fast',
    // Rolling direction [0 (top) , 90 (left), 135 (right-bottom)] 
    direction: 135,
    // interaction with mouse or not [Default true (decelerate to rolling init speed, and keep rolling with mouse).]
    keep: true
  });
  // Giving color to each text in sphere
  var color = 'white';
  document.querySelector('.Sphere').style.color = color;

  
  
 let decrypted = false;

        function decrypt(textInvitatie, textInitial) {
            let index = 0; // Index pentru a urmări poziția în textul inițial
            const interval = 100; // Intervalul de actualizare în milisecunde

            // Funcția care actualizează textul
            function updateText() {
                if (index >= textInitial.length) {
                    textInvitatie.innerText = textInitial;
                    textInvitatie.classList.remove('hidden'); // Afișează textul final
                    clearInterval(timer);
                    return;
                }

                let textProvizoriu = '';
                // Adaugă caractere corecte până la index
                for (let i = 0; i < index; ++i) {
                    textProvizoriu += textInitial[i];
                }

                // Adaugă caractere aleatorii pentru restul textului
                for (let i = index; i < textInitial.length; ++i) {
                    // Caracter aleatoriu
                    let r = Math.floor(Math.random() * 95) + 32; // Generare caracter între 32 și 126
                    let character = String.fromCharCode(r);
                    textProvizoriu += character;
                }

                textInvitatie.innerText = textProvizoriu;
                index++;
            }

            // Setează intervalul pentru actualizare
            const timer = setInterval(updateText, interval);
        }

        document.addEventListener('scroll', () => {
            let textInvitatie = document.getElementById('textInvitatie');
            const textInitial = textInvitatie.innerText;

            if (textInvitatie.getBoundingClientRect().top <= window.innerHeight / 1.5 && !decrypted) {
                decrypt(textInvitatie, textInitial);
                decrypted = true; // Asigură-te că decryptia nu se apelează de mai multe ori
            }
        });
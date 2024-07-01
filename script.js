const firebaseConfig = {
    apiKey: "AIzaSyA8_60ZFtQDc90DQ9myCVuUe_L-3N99JSw",
    authDomain: "formulario-de-validaciones.firebaseapp.com",
    projectId: "formulario-de-validaciones",
    storageBucket: "formulario-de-validaciones.appspot.com",
    messagingSenderId: "315853255676",
    appId: "1:315853255676:web:7dc6c97ace0ce3cbc83879",
    measurementId: "G-X2WDYQ3D8S"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit', (evento) =>{
    evento.preventDefault()
    

    let nombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(nombre.value.trim() === ''){
        errorNombre.textContent = 'Debe escribir un nombre'
        errorNombre.classList.add('error-message')
    }else{
          errorNombre.textContent = ''
          errorNombre.classList.remove('error-message')
    }

    let email = document.getElementById('email')
    let errorEmail = document.getElementById('emailError')
    let patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!patternEmail.test(email.value)){
        errorEmail.textContent = 'ESTO NO ES UN EMAIL'
        errorEmail.classList.add('error-message')
    }else{
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }

    let contra = document.getElementById('password')
    let errorContra = document.getElementById('passwordError')
    let patternContra = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;

    if(!patternContra.test(contra.value)){
        errorContra.textContent = 'Debe escribir una contraseña valida'
        errorContra.classList.add('error-message')
    }else{
        errorContra.textContent = ''
        errorContra.classList.remove('error-message')
    }

    if(!errorNombre.textContent && !errorEmail.textContent && !errorContra.textContent)//El operador de negación (!) se utiliza para verificar que textContent esté vacío 'null' (es decir, que no haya mensajes de error)
    {

        db.collection("Usuarios").add({
            nombre: nombre.value,
            email: email.value,
            pass: contra.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });


       alert('FORMULARIO ENVIADO CON EXITO')
       document.getElementById('formulario').reset()
    }
    else{
      alert('NO SE ENVIO EL FORMULARIO')
    }
})

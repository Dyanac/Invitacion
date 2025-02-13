import React, { useState, useEffect } from 'react';
import YouTube from "react-youtube";
import './Valentine.css';
import emailjs from 'emailjs-com';


const sendEmail = (respuesta) => {
    const templateParams = {
        to_email: "winislol19@gmail.com",
        from_name: "Formulario San Valentín",
        message: `La respuesta fue: ${respuesta}`,
    };

    emailjs.send("service_c0ean3d", "template_26de2v8", templateParams, "fd2QBvbrL1QU2ASu7")
        .then((response) => {
            console.log("Correo enviado", response);
        })
        .catch((error) => {
            console.error("Error al enviar correo", error);
        });
};

// Llamar a `sendEmail(respuesta)` cuando el usuario responda

const ValentineInvite = () => {
    const [response, setResponse] = useState('');
    const [accepted, setAccepted] = useState(null);

    useEffect(() => {
        if (accepted === true) {
            document.body.classList.add('body-acepta');
            document.body.classList.remove('body-rechaza');
        } else if (accepted === false) {
            document.body.classList.add('body-rechaza');
            document.body.classList.remove('body-acepta');
        } else {
            document.body.classList.remove('body-acepta', 'body-rechaza');
        }
    }, [accepted]);

const handleResponse = () => {
    const lowerResponse = response.toLowerCase();
    const affirmativeKeywords = ["acepto", "si", "claro", "sí", "obvio", "por supuesto"];
    // Verifica si alguna de las palabras afirmativas está presente en la respuesta
    const isAffirmative = affirmativeKeywords.some(keyword => lowerResponse.includes(keyword));

    if (isAffirmative) {
        setAccepted(true);
        sendEmail("Aceptó 💖");
    } else {
        setAccepted(false);
        sendEmail("Rechazó 💔");
    }
};
    const opts = {
      height: "0",
      width: "0",
      playerVars: {
          autoplay: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0
      }
  };
      const handleVideoReady = (event) => {
    // Reproduce el video tan pronto como está listo
    event.target.playVideo();
  };

    return (
        <div className={`container ${accepted === true ? 'container-acepta' : accepted === false ? 'container-rechaza' : ''}`}>
            <YouTube videoId="mGgMZpGYiy8" opts={opts} onReady={(event) => event.target.playVideo()} />
            <h1 className="title">¿Quieres ser mi San Valentín?</h1>
            <p className="message">Hola Dalita, te envío esta invitación para pedirte por favor que seas mi Valentín este año.</p>
            <input type="text" value={response} onChange={(e) => setResponse(e.target.value)} placeholder="¿Aceptarías?" required className="input" />
            <button onClick={handleResponse} className="button">Enviar</button>
            {accepted !== null && (
                <p className={`response ${accepted ? 'response-acepta' : 'response-rechaza'}`}>
                    {accepted ? "¡Gracias por aceptar Dalita! Tendremos el mejor San Valentin de todos." : "Por favor, di que sí :c"}
                </p>
            )}
            {accepted !== null && (
                <img src={accepted ? "https://play-lh.googleusercontent.com/1xja2rlBYxx464zli6R0CMrJp47s2syuKqbR6hCp3jaomo6COmiKQpU6gls4pZPeMfk" : "https://i.pinimg.com/originals/9a/a3/0b/9aa30b73c1a0fbdd04f121736ac36e34.jpg"} 
                     alt="Respuesta" className="response-image" />
            )}
        </div>
    );
};

export default ValentineInvite;

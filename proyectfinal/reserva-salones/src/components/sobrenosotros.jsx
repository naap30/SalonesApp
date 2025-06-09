import React from 'react';
//import '../sobrenosotros.css';

const SobreNosotros = () => {
  return (
    <main className="sobre-nosotros-container">
      <section className="hero-section">
        <h1>Sobre Nosotros</h1>
        <p className="subtitle">Facilitando la gestión de espacios para tu éxito académico</p>
      </section>

      <section className="content-section">
        <article className="mission-section">
          <h2>Nuestra Misión</h2>
          <p>
            Nos dedicamos a proporcionar un sistema eficiente y fácil de usar para la reserva
            de salones, facilitando la organización de actividades académicas y eventos en
            nuestra institución.
          </p>
        </article>

        <article className="vision-section">
          <h2>Nuestra Visión</h2>
          <p>
            Ser la plataforma líder en la gestión de espacios educativos, mejorando la
            experiencia de estudiantes y profesores a través de la tecnología.
          </p>
        </article>

        <article className="values-section">
          <h2>Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Eficiencia</h3>
              <p>Optimizamos el proceso de reserva para ahorrar tu tiempo</p>
            </div>
            <div className="value-item">
              <h3>Transparencia</h3>
              <p>Información clara y disponible en tiempo real</p>
            </div>
            <div className="value-item">
              <h3>Innovación</h3>
              <p>Mejora continua de nuestros servicios</p>
            </div>
            <div className="value-item">
              <h3>Compromiso</h3>
              <p>Dedicados a la excelencia en el servicio</p>
            </div>
          </div>
        </article>

        <article className="team-section">
          <h2>Nuestro Equipo</h2>
          <p>
            Contamos con un equipo dedicado de profesionales comprometidos con hacer
            que tu experiencia de reserva de salones sea simple y efectiva.
          </p>
        </article>

        <article className="contact-section">
          <h2>Contáctanos</h2>
          <p>
            ¿Tienes alguna pregunta o sugerencia? No dudes en contactarnos.
            Estamos aquí para ayudarte.
          </p>
          <div className="contact-info">
            <p>Email: contacto@reservasalones.com</p>
            <p>Teléfono: (809) 456-7890</p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default SobreNosotros;

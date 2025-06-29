document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToAnimate = document.querySelectorAll('section, .footer');
    elementsToAnimate.forEach(el => {
        // Adiciona uma classe para o estado inicial (invisível)
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Adiciona um estilo dinâmico para a animação
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
// Form submission handling
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const status = document.getElementById("form-status");
        const data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "Obrigado por sua mensagem! Entraremos em contato em breve.";
                status.style.color = 'var(--accent-color)';
                form.reset()
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                        status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
                        status.style.color = 'red';
                    }
                })
            }
        }).catch(error => {
            status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
            status.style.color = 'red';
        });
    }
    form.addEventListener("submit", handleSubmit)

});
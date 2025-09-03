// Funcionalidad mejorada del dado
class DadoMejorado {
    constructor() {
        this.dado = document.getElementById('Dado');
        this.botonGirar = document.getElementById('Girar');
        this.numeroConstelacion = document.getElementById('NumeroConstelacion');
        this.mensajeEstado = document.getElementById('mensaje-estado');
        this.botonModoCepillado = document.getElementById('ModoCepillado');
        this.textoInstrucciones = document.getElementById('TextoInstrucciones');
        this.numeroActual = 1;
        this.tirando = false;
        
        // Variables para manejo de dientes
        this.dientes = document.querySelectorAll(".Dientes");
        this.contadorClicks = 0;
        this.yaPinto = false;
        this.contadorCirculosRellenos = 0;
        this.dientesSucios = [];
        this.contador = 0;
        this.max = 6;
        this.estanSuciosDientes = false;
        this.modoCepilladoDirecto = false;
        
        this.inicializar();
    }
    
    inicializar() {
        // Añadir event listener al botón
        this.botonGirar.addEventListener('click', () => this.tirarDado());
        
        // Añadir event listener al botón de modo cepillado
        if (this.botonModoCepillado) {
            this.botonModoCepillado.addEventListener('click', () => this.activarModoCepillado());
        }
        
        // Configurar dientes
        this.configurarDientes();
        
        // Escalar la boca
        this.escalarBoca();
        
        // Mostrar el estado inicial
        this.mostrarNumero(this.numeroActual);
        
        // Mostrar mensaje inicial
        this.actualizarMensaje('🎲 ¡Tira el dado para comenzar!');
        
        // Añadir efectos visuales
        this.añadirEfectosVisuales();
    }
    
    configurarDientes() {
        // Hacer todos los dientes no arrastrables
        this.dientes.forEach(elemento => elemento.setAttribute("draggable", "false"));
        
        // Limpiar event listeners existentes y añadir nuevos
        this.dientes.forEach(diente => {
            // Remover event listeners existentes
            diente.removeEventListener('click', this.cambiarImagen);
            diente.removeEventListener('click', this.cambiarImagenALimpios);
            
            // Añadir nuevo event listener
            diente.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.cambiarImagen(e.target.id);
            });
        });
    }
    
    escalarBoca() {
        const boca = document.getElementById('Boca');
        if (boca) {
            boca.style.transform = 'scale(1.1)';
            boca.style.transition = 'transform 0.3s ease';
            console.log('Boca escalada a 1.1x');
        }
        
        // Estirar la boca expandiendo las posiciones de los dientes de manera equilibrada
        this.dientes.forEach(diente => {
            // Obtener el elemento computado para las posiciones CSS
            const computedStyle = window.getComputedStyle(diente);
            const currentLeft = parseFloat(computedStyle.left) || 0;
            const currentTop = parseFloat(computedStyle.top) || 0;
            
            // Calcular nueva posición expandida
            let newLeft = currentLeft;
            let newTop = currentTop;
            
            // Expandir horizontalmente con factor adaptativo
            if (diente.id.includes('I')) {
                // Dientes izquierdos - mover ligeramente a la izquierda
                // Usar factor fijo para evitar separación excesiva
                newLeft = currentLeft ; // Reducido de 8px a 5px
            } else if (diente.id.includes('D')) {
                // Dientes derechos - mover ligeramente a la derecha
                // Usar factor fijo para evitar separación excesiva
                newLeft = currentLeft; // Reducido de 8px a 5px
            }
            
            // Expandir verticalmente con factor adaptativo
            if (diente.id.includes('Abajo')) {
                // Dientes inferiores - mover ligeramente más abajo
                newTop = currentTop + 3; // Reducido de 5px a 3px
            } else {
                // Dientes superiores - mover ligeramente más arriba
                newTop = currentTop - 3; // Reducido de 5px a 3px
            }
            
            // Aplicar nuevas posiciones
            diente.style.left = newLeft + 'px';
            diente.style.top = newTop + 'px';
            diente.style.transition = 'all 0.3s ease';
        });
        
        console.log(`Boca estirada sutilmente y ${this.dientes.length} dientes reposicionados`);
    }
    
    tirarDado() {
        if (this.tirando) return;
        
        this.tirando = true;
        this.botonGirar.disabled = true;
        this.actualizarMensaje('🎲 ¡Tirando el dado...!');
        
        // Reproducir sonido de dados
        this.reproducirSonidoDados();
        
        // Actualizar texto del botón
        const span = this.botonGirar.querySelector('span');
        if (span) {
            span.textContent = 'Tirando...';
        }
        
        // Añadir clase de animación
        this.dado.classList.add('tirando');
        
        // Mostrar puntos mientras gira
        this.mostrarPuntosGirando();
        
        // Generar número aleatorio con lógica del juego
        const numeroAleatorio = this.generarNumeroAleatorio();
        
        // Simular tiempo de tirada
        setTimeout(() => {
            this.numeroActual = numeroAleatorio;
            this.mostrarNumero(this.numeroActual);
            
            // Remover clase de animación y añadir resultado
            this.dado.classList.remove('tirando');
            this.dado.classList.add('resultado');
            
            // Actualizar constelación
            this.actualizarConstelacion(this.numeroActual);
            
            // Habilitar edición de dientes según el modo
            if (this.modoCepilladoDirecto || this.estanSuciosDientes) {
                this.habilitarEdicionDeDientesLimpieza();
            } else {
                this.habilitarEdicionDeDientes();
            }
            
            // Restaurar texto del botón inmediatamente después de mostrar el número
            const span = this.botonGirar.querySelector('span');
            if (span) {
                span.textContent = '¡Tirar Dado!';
            }
            this.tirando = false;
            
            // Remover clase de resultado después de un momento
            setTimeout(() => {
                this.dado.classList.remove('resultado');
            }, 1000);
            
        }, 2000);
    }
    
    generarNumeroAleatorio() {
        let numeroAleatorio;
        
        // Calcular cuántos dientes quedan por pintar
        const dientesRestantes = 32 - this.dientesSucios.length;
        
        if (dientesRestantes <= 6 && dientesRestantes > 0) {
            // Cuando quedan 6 o menos dientes, usar el número exacto
            numeroAleatorio = dientesRestantes;
            console.log(`🎯 Dientes restantes: ${dientesRestantes}, dado mostrará: ${numeroAleatorio}`);
        } else {
            // Cuando quedan más de 6 dientes, usar número aleatorio normal
            numeroAleatorio = Math.floor(Math.random() * 6) + 1;
        }
        
        this.contador += numeroAleatorio;
        
        // Verificar si se completó el juego - solo cuando TODOS los dientes estén sucios
        if (this.dientesSucios.length >= 32) { // 32 es el número total de dientes
            this.mostrarCepilloCartel();
            this.actualizarMensaje('🎉 ¡Todos los dientes están sucios! ¡Ahora a limpiarlos!');
            this.max = 6;
            this.contador = numeroAleatorio;
            // NO resetear dientesSucios aquí, solo cambiar el modo
            this.estanSuciosDientes = true;
            
            // Actualizar texto de instrucciones
            this.actualizarTextoInstrucciones();
            
            // Cambiar a modo limpiar dientes
            this.dientes.forEach(elemento => {
                // Remover event listener anterior
                elemento.removeEventListener('click', this.cambiarImagen);
                // Añadir nuevo event listener para limpiar
                elemento.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.cambiarImagenALimpios(e.target.id);
                });
            });
            
            // Habilitar el botón de tirar dado para continuar el juego
            this.botonGirar.disabled = false;
            this.botonGirar.style.cursor = 'pointer';
        }
        
        return numeroAleatorio;
    }
    
    habilitarEdicionDeDientes() {
        console.log(`Habilitando edición de dientes. Número del dado: ${this.numeroActual}`);
        console.log(`Dientes ya pintados: ${this.dientesSucios.length}`);
        console.log(`Array dientesSucios:`, this.dientesSucios);
        
        // LIMPIAR ESTADO COMPLETAMENTE
        this.yaPinto = true;
        this.contadorClicks = 0;
        this.contadorCirculosRellenos = 0;
        
        // Solo habilitar dientes que no estén ya pintados
        this.dientes.forEach(diente => {
            if (!this.dientesSucios.includes(diente.id)) {
                diente.classList.remove("Desactivado");
                console.log(`Diente ${diente.id} habilitado`);
            } else {
                diente.classList.add("Desactivado");
                console.log(`Diente ${diente.id} ya está pintado, manteniendo desactivado`);
            }
        });
        
        console.log(`Estado final: yaPinto=${this.yaPinto}, contadorClicks=${this.contadorClicks}`);
    }
    
    mostrarCepilloCartel() {
        const cepilloCartel = document.getElementById('CepilloCartel');
        if (cepilloCartel) {
            // Crear efectos mágicos
            this.crearEfectosMagicos();
            
            // Mostrar la imagen del cepillo
            cepilloCartel.classList.add('Modal');
            
            // Reproducir sonido mágico (si está disponible)
            this.reproducirSonidoMagico();
            
            // Limpiar efectos después de la animación y habilitar dientes
            setTimeout(() => {
                cepilloCartel.classList.remove('Modal');
                this.limpiarEfectosMagicos();
                
                // Habilitar edición de dientes para modo limpieza después del cartel
                if (this.estanSuciosDientes) {
                    this.habilitarEdicionDeDientesLimpieza();
                }
            }, 3500);
        }
    }
    
    crearEfectosMagicos() {
        // Crear contenedor de partículas
        const particulasContainer = document.createElement('div');
        particulasContainer.className = 'particulas-magicas';
        document.body.appendChild(particulasContainer);
        
        // Crear ondas mágicas
        const ondasContainer = document.createElement('div');
        ondasContainer.className = 'ondas-magicas';
        document.body.appendChild(ondasContainer);
        
        // Crear resplandor de fondo
        const resplandorFondo = document.createElement('div');
        resplandorFondo.className = 'resplandor-fondo';
        document.body.appendChild(resplandorFondo);
        
        // Crear partículas flotantes
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particula = document.createElement('div');
                particula.className = 'particula';
                particula.style.left = Math.random() * 100 + '%';
                particula.style.animationDelay = Math.random() * 2 + 's';
                particulasContainer.appendChild(particula);
            }, i * 200);
        }
        
        // Crear ondas expansivas
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const onda = document.createElement('div');
                onda.className = 'onda';
                onda.style.animationDelay = i * 0.5 + 's';
                ondasContainer.appendChild(onda);
            }, i * 500);
        }
    }
    
    limpiarEfectosMagicos() {
        // Remover todos los efectos mágicos
        const efectos = document.querySelectorAll('.particulas-magicas, .ondas-magicas, .resplandor-fondo');
        efectos.forEach(efecto => {
            if (efecto.parentNode) {
                efecto.parentNode.removeChild(efecto);
            }
        });
    }
    
    reproducirSonidoDados() {
        // Intentar reproducir sonido de dados si está disponible
        try {
            const audio = new Audio('./575152__code_e__dd_dice__1xd201xd12_004_shake_roll.m4a');
            audio.volume = 0.4; // Volumen apropiado para sonido de dados
            audio.loop = false; // No repetir
            audio.currentTime = 0; // Empezar desde el inicio
            
            // Reproducir el sonido completo de dados
            audio.play().catch(e => {
                console.log('No se pudo reproducir el sonido de dados:', e);
            });
        } catch (e) {
            console.log('Sonido de dados no disponible:', e);
        }
    }
    
    reproducirSonidoMagico() {
        // Intentar reproducir sonido mágico si está disponible
        try {
            const audio = new Audio('../../Sonidos/Ganar.mp3');
            audio.volume = 0.2; // Volumen más bajo para sonido mágico
            audio.loop = false; // No repetir
            audio.currentTime = 0; // Empezar desde el inicio
            
            // Reproducir solo los primeros 2 segundos del sonido mágico
            audio.play().then(() => {
                // Detener el audio después de 2 segundos
                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }, 2000);
            }).catch(e => {
                console.log('No se pudo reproducir el sonido mágico:', e);
                // Fallback: usar sonido de dados si no está disponible el mágico
                this.reproducirSonidoDados();
            });
        } catch (e) {
            console.log('Sonido mágico no disponible:', e);
            // Fallback: usar sonido de dados si no está disponible el mágico
            this.reproducirSonidoDados();
        }
    }
    
    reproducirSonidoCepillo() {
        // Intentar reproducir sonido de cepillo si está disponible
        try {
            const audio = new Audio('./cepillo.m4a');
            audio.volume = 0.3; // Volumen apropiado para sonido de cepillo
            audio.loop = false; // No repetir
            audio.currentTime = 0; // Empezar desde el inicio
            
            // Reproducir el sonido de cepillo
            audio.play().catch(e => {
                console.log('No se pudo reproducir el sonido de cepillo:', e);
            });
        } catch (e) {
            console.log('Sonido de cepillo no disponible:', e);
        }
    }
    
    mostrarPuntosGirando() {
        // Ocultar todos los círculos
        const todosLosCirculos = document.querySelectorAll('.circulos');
        todosLosCirculos.forEach(circulos => {
            circulos.style.display = 'none';
        });
        
        // Crear contenedor de puntos girando
        const contenedorPuntos = document.createElement('div');
        contenedorPuntos.className = 'puntos-girando';
        contenedorPuntos.innerHTML = `
            <div class="punto-girando"></div>
            <div class="punto-girando"></div>
            <div class="punto-girando"></div>
        `;
        
        // Añadir al dado
        const numeroContainer = this.dado.querySelector('.numero-container');
        if (numeroContainer) {
            // Limpiar contenido anterior
            numeroContainer.innerHTML = '';
            numeroContainer.appendChild(contenedorPuntos);
        }
    }
    
    mostrarNumero(numero) {
        // Crear el contenido del número directamente
        const numeroContainer = this.dado.querySelector('.numero-container');
        if (numeroContainer) {
            // Crear el número
            const numeroElement = document.createElement('h1');
            numeroElement.className = 'numero';
            numeroElement.textContent = numero;
            
            // Crear contenedor de círculos
            const circulosContainer = document.createElement('div');
            circulosContainer.className = 'circulos';
            
            // Crear los círculos según el número
            this.crearCirculos(numero, circulosContainer);
            
            // Limpiar y añadir contenido
            numeroContainer.innerHTML = '';
            numeroContainer.appendChild(numeroElement);
            numeroContainer.appendChild(circulosContainer);
        }
        
        // Actualizar el número visible
        const numeroVisible = document.getElementById('NumeroAleatorio');
        if (numeroVisible) {
            numeroVisible.textContent = numero;
        }
    }
    
    crearCirculos(numero, container) {
        // Definir posiciones de círculos para cada número
        const posiciones = {
            1: ['centro'],
            2: ['esquina-superior-izquierda', 'esquina-inferior-derecha'],
            3: ['esquina-superior-izquierda', 'centro', 'esquina-inferior-derecha'],
            4: ['esquina-superior-izquierda', 'esquina-superior-derecha', 'esquina-inferior-izquierda', 'esquina-inferior-derecha'],
            5: ['esquina-superior-izquierda', 'esquina-superior-derecha', 'centro', 'esquina-inferior-izquierda', 'esquina-inferior-derecha'],
            6: ['esquina-superior-izquierda', 'esquina-superior-derecha', 'centro-izquierda', 'centro-derecha', 'esquina-inferior-izquierda', 'esquina-inferior-derecha']
        };
        
        const posicionesNumero = posiciones[numero] || [];
        
        posicionesNumero.forEach((posicion, index) => {
            const circulo = document.createElement('div');
            circulo.className = `circulo ${posicion}`;
            circulo.style.animationDelay = `${index * 0.1}s`;
            circulo.style.animation = 'aparecerCirculo 0.5s ease-in-out forwards';
            container.appendChild(circulo);
        });
    }
    
    actualizarConstelacion(numero) {
        // Limpiar constelación anterior
        this.numeroConstelacion.innerHTML = '';
        
        // Crear círculos SVG para la constelación
        for (let i = 0; i < numero; i++) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'CirculosConstelacion');
            svg.setAttribute('width', '20');
            svg.setAttribute('height', '20');
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '10');
            circle.setAttribute('cy', '10');
            circle.setAttribute('r', '8');
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('fill', 'rgba(255, 255, 255, 0.3)');
            
            svg.appendChild(circle);
            this.numeroConstelacion.appendChild(svg);
            
            // Añadir animación de aparición
            svg.style.opacity = '0';
            svg.style.transform = 'scale(0)';
            setTimeout(() => {
                svg.style.transition = 'all 0.3s ease';
                svg.style.opacity = '1';
                svg.style.transform = 'scale(1)';
            }, i * 100);
        }
        
        // Añadir texto del número
        const textoNumero = document.createElement('span');
        textoNumero.textContent = `${numero}`;
        textoNumero.style.marginLeft = '10px';
        textoNumero.style.fontWeight = 'bold';
        textoNumero.style.fontSize = '1.5em';
        this.numeroConstelacion.appendChild(textoNumero);
        
        // Actualizar mensaje
        this.actualizarMensaje(`🎯 ¡Cepilla ${numero} diente${numero > 1 ? 's' : ''}!`);
    }
    
    actualizarMensaje(mensaje) {
        if (this.mensajeEstado) {
            this.mensajeEstado.textContent = mensaje;
        }
    }
    
    actualizarTextoInstrucciones() {
        if (this.textoInstrucciones) {
            if (this.estanSuciosDientes || this.modoCepilladoDirecto) {
                this.textoInstrucciones.textContent = 'Dientes a cepillar:';
            } else {
                this.textoInstrucciones.textContent = 'Caries a descubrir:';
            }
        }
    }
    
    cambiarImagen(identifier) {
        console.log(`Intentando pintar diente: ${identifier}`);
        console.log(`Estado actual: yaPinto=${this.yaPinto}, contadorClicks=${this.contadorClicks}, numeroActual=${this.numeroActual}`);
        
        // Verificar que el diente no esté desactivado
        const diente = document.getElementById(identifier);
        if (!diente || diente.classList.contains('Desactivado')) {
            console.log(`Diente ${identifier} está desactivado o no existe`);
            return; // No hacer nada si está desactivado
        }
        
        // Verificar que no esté ya pintado
        if (this.dientesSucios.includes(identifier)) {
            console.log(`Diente ${identifier} ya está pintado`);
            return; // No hacer nada si ya está pintado
        }
        
        // Verificar que se pueda pintar
        if (!this.yaPinto || this.contadorClicks >= this.numeroActual) {
            console.log(`No se puede pintar: yaPinto=${this.yaPinto}, contadorClicks=${this.contadorClicks}, numeroActual=${this.numeroActual}`);
            return; // No hacer nada si no se puede pintar
        }
        
        // DESACTIVAR EL DIENTE INMEDIATAMENTE para evitar doble click
        diente.classList.add('Desactivado');
        
        // Pintar el diente
        this.contadorClicks++;
        this.dientesSucios.push(identifier);
        diente.src = `DB/${identifier}1.png`;
        
        console.log(`Diente ${identifier} pintado. Contador: ${this.contadorClicks}/${this.numeroActual}`);
        console.log(`Array dientesSucios actualizado:`, this.dientesSucios);
        
        // Rellenar círculo de la constelación
        const circulos = this.numeroConstelacion.querySelectorAll('circle');
        if (circulos[this.contadorCirculosRellenos]) {
            circulos[this.contadorCirculosRellenos].style.fill = '#ffff';
        }
        this.contadorCirculosRellenos++;
        
        // Actualizar mensaje de progreso
        const restantes = this.numeroActual - this.contadorClicks;
        if (restantes > 0) {
            this.actualizarMensaje(`🦷 ¡Cepilla ${restantes} diente${restantes > 1 ? 's' : ''} más!`);
        }
        
        // Verificar si se completó el turno
        if (this.contadorClicks >= this.numeroActual) {
            console.log(`Turno completado: ${this.contadorClicks}/${this.numeroActual}`);
            this.finalizarTurno();
        }
    }
    
    cambiarImagenALimpios(identifier) {
        console.log(`Intentando limpiar diente: ${identifier}`);
        console.log(`Estado actual: yaPinto=${this.yaPinto}, contadorClicks=${this.contadorClicks}, numeroActual=${this.numeroActual}`);
        
        // Verificar que el diente no esté desactivado
        const diente = document.getElementById(identifier);
        if (!diente || diente.classList.contains('Desactivado')) {
            console.log(`Diente ${identifier} está desactivado o no existe`);
            return; // No hacer nada si está desactivado
        }
        
        // En modo limpieza, verificar que el diente esté sucio (en dientesSucios)
        if (!this.dientesSucios.includes(identifier)) {
            console.log(`Diente ${identifier} no está sucio, no se puede limpiar`);
            return; // No hacer nada si el diente no está sucio
        }
        
        // Verificar que se pueda limpiar
        if (!this.yaPinto || this.contadorClicks >= this.numeroActual) {
            console.log(`No se puede limpiar: yaPinto=${this.yaPinto}, contadorClicks=${this.contadorClicks}, numeroActual=${this.numeroActual}`);
            return; // No hacer nada si no se puede limpiar
        }
        
        // DESACTIVAR EL DIENTE INMEDIATAMENTE para evitar doble click
        diente.classList.add('Desactivado');
        
        // Limpiar el diente
        this.contadorClicks++;
        // Remover de la lista de dientes sucios
        const index = this.dientesSucios.indexOf(identifier);
        if (index > -1) {
            this.dientesSucios.splice(index, 1);
        }
        diente.src = `DN/${identifier}.png`;
        
        // Reproducir sonido de cepillo
        this.reproducirSonidoCepillo();
        
        console.log(`Diente ${identifier} limpiado. Contador: ${this.contadorClicks}/${this.numeroActual}`);
        
        // Rellenar círculo de la constelación
        const circulos = this.numeroConstelacion.querySelectorAll('circle');
        if (circulos[this.contadorCirculosRellenos]) {
            circulos[this.contadorCirculosRellenos].style.fill = '#ffff';
        }
        this.contadorCirculosRellenos++;
        
        // Verificar si se completó el turno
        if (this.contadorClicks >= this.numeroActual) {
            console.log(`Turno completado: ${this.contadorClicks}/${this.numeroActual}`);
            this.finalizarTurno();
        }
    }
    
    finalizarTurno() {
        console.log(`Finalizando turno. Dientes pintados: ${this.contadorClicks}/${this.numeroActual}`);
        console.log(`Array dientesSucios antes de finalizar:`, this.dientesSucios);
        
        // Desactivar TODOS los dientes
        this.dientes.forEach(diente => diente.classList.add("Desactivado"));
        
        // LIMPIAR ESTADO COMPLETAMENTE (PERO NO dientesSucios)
        this.contadorClicks = 0;
        this.contadorCirculosRellenos = 0;
        
        // Solo resetear yaPinto si NO estamos en modo cepillado
        if (!this.estanSuciosDientes && !this.modoCepilladoDirecto) {
            this.yaPinto = false;
        }
        
        // Actualizar mensaje de finalización según el modo
        if (this.estanSuciosDientes || this.modoCepilladoDirecto) {
            this.actualizarMensaje('✅ ¡Turno de cepillado completado! ¡Tira el dado de nuevo!');
        } else {
            this.actualizarMensaje('✅ ¡Turno completado! ¡Tira el dado de nuevo!');
        }
        
        // Habilitar botón para siguiente tirada (el texto ya se restauró cuando salió el número)
        this.botonGirar.disabled = false;
        this.botonGirar.style.cursor = 'pointer';
        
        console.log(`Turno finalizado. Botón habilitado para siguiente tirada`);
        console.log(`Estado limpio: yaPinto=${this.yaPinto}, contadorClicks=${this.contadorClicks}`);
        console.log(`Modo cepillado: ${this.estanSuciosDientes || this.modoCepilladoDirecto}`);
        console.log(`Array dientesSucios después de finalizar:`, this.dientesSucios);
    }
    
    activarModoCepillado() {
        if (this.modoCepilladoDirecto) {
            // Desactivar modo cepillado directo
            this.modoCepilladoDirecto = false;
            this.botonModoCepillado.classList.remove('activo');
            this.botonModoCepillado.title = 'Activar modo cepillado directo';
            this.actualizarMensaje('🎲 ¡Modo normal activado! ¡Tira el dado para comenzar!');
            
            // Resetear el juego al estado inicial
            this.resetearJuego();
        } else {
            // Activar modo cepillado directo
            this.modoCepilladoDirecto = true;
            this.botonModoCepillado.classList.add('activo');
            this.botonModoCepillado.title = 'Desactivar modo cepillado directo';
            
            // Saltar directamente a la fase de limpieza
            this.saltarAFaseLimpieza();
        }
    }
    
    saltarAFaseLimpieza() {
        // Marcar todos los dientes como sucios (con caries)
        this.dientesSucios = [];
        this.dientes.forEach(diente => {
            // Cambiar a imagen de diente sucio
            diente.src = `DB/${diente.id}1.png`;
            this.dientesSucios.push(diente.id);
        });
        
        // Activar modo de limpieza
        this.estanSuciosDientes = true;
        this.contador = 33; // Simular que ya se completó la fase de caries
        
        // Mostrar cartel de cepillo
        this.mostrarCepilloCartel();
        
        // Cambiar event listeners para modo limpieza
        this.dientes.forEach(elemento => {
            elemento.removeEventListener('click', this.cambiarImagen);
            elemento.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.cambiarImagenALimpios(e.target.id);
            });
        });
        
        // Actualizar mensaje
        this.actualizarMensaje('🦷 ¡Modo cepillado directo activado! ¡Cepilla los dientes sucios!');
        
        // Actualizar texto de instrucciones
        this.actualizarTextoInstrucciones();
        
        // Habilitar edición de dientes para modo limpieza
        this.habilitarEdicionDeDientesLimpieza();
    }
    
    habilitarEdicionDeDientesLimpieza() {
        console.log(`Habilitando edición de dientes para limpieza. Dientes sucios: ${this.dientesSucios.length}`);
        
        // LIMPIAR ESTADO COMPLETAMENTE
        this.yaPinto = true;
        this.contadorClicks = 0;
        this.contadorCirculosRellenos = 0;
        
        // Habilitar solo dientes que estén sucios
        this.dientes.forEach(diente => {
            if (this.dientesSucios.includes(diente.id)) {
                diente.classList.remove("Desactivado");
                console.log(`Diente ${diente.id} habilitado para limpieza`);
            } else {
                diente.classList.add("Desactivado");
                console.log(`Diente ${diente.id} ya está limpio, manteniendo desactivado`);
            }
        });
        
        // Habilitar el botón de tirar dado para continuar
        this.botonGirar.disabled = false;
        this.botonGirar.style.cursor = 'pointer';
        
        console.log(`Estado de limpieza: yaPinto=${this.yaPinto}, contadorClicks=${this.contadorClicks}`);
    }
    
    resetearJuego() {
        // Resetear variables
        this.contador = 0;
        this.dientesSucios = [];
        this.estanSuciosDientes = false;
        this.contadorClicks = 0;
        this.yaPinto = false;
        this.contadorCirculosRellenos = 0;
        this.max = 6;
        
        // Restaurar dientes a estado limpio
        this.dientes.forEach(diente => {
            diente.src = `DN/${diente.id}.png`;
            diente.classList.add('Desactivado');
        });
        
        // Restaurar event listeners para modo normal
        this.configurarDientes();
        
        // Limpiar constelación
        this.numeroConstelacion.innerHTML = '';
        
        // Habilitar botón de tirar dado
        this.botonGirar.disabled = false;
        
        // Actualizar texto de instrucciones
        this.actualizarTextoInstrucciones();
    }
    
    añadirEfectosVisuales() {
        // Efecto hover en el dado
        this.dado.addEventListener('mouseenter', () => {
            if (!this.tirando) {
                this.dado.style.transform = 'scale(1.05)';
                this.dado.style.transition = 'transform 0.3s ease';
            }
        });
        
        this.dado.addEventListener('mouseleave', () => {
            if (!this.tirando) {
                this.dado.style.transform = 'scale(1)';
            }
        });
        
        // Efecto click en círculos
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('circulo')) {
                e.target.style.animation = 'aparecerCirculo 0.3s ease-in-out';
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear una sola instancia y hacerla globalmente accesible
    window.dadoMejorado = new DadoMejorado();
});

// Función global para compatibilidad con el código existente
function AnimacionGirar() {
    const dadoMejorado = window.dadoMejorado;
    if (dadoMejorado) {
        dadoMejorado.tirarDado();
    }
}

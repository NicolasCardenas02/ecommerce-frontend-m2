// Contiene toda la información necesaria para mostrar los productos
const productos = [
  {
    id: 1,
    nombre: "Set 4 pelotas",
    precio: 1990,
    imagen: "assets/img/Pelotas.jpg",
    alt: "Pack de 4 pelotas de juguete para gatos",
    descripcion:
      "Pelotas de 11 cm de diámetro, con diseño arcoíris y fabricadas en espuma resistente.",
  },
  {
    id: 2,
    nombre: "Alimento pellet Royal Canin renal 1.5kg",
    precio: 22990,
    imagen: "assets/img/Royal canin.jpg",
    alt: "Alimento seco Royal Canin para gatos renal",
    descripcion:
      "Royal Canin Renal Feline es un alimento dietético completo para gatos formulado para apoyar la función renal.",
  },
  {
    id: 3,
    nombre: "Pack x8 alimento húmedo Fancy Feast salmon 85g",
    precio: 7990,
    imagen: "assets/img/Fancy salmon.jpg",
    alt: "Alimento húmedo sabor salmón para gatos",
    descripcion:
      "Fancy Feast mini filetes con salmón, es un suculento festín de salmón cocinado a fuego lento. Posee un sabor único y superior, con texturas que crean una experiencia culinaria.",
  },
  {
    id: 4,
    nombre: "Plato de cerámica con pedestal",
    precio: 11990,
    imagen: "assets/img/Plato comida.jpg",
    alt: "Plato para comida de gatos de material cerámica",
    descripcion:
      "Plato elevado de cerámica que ayuda a una postura más cómoda al comer.",
  },
  {
    id: 5,
    nombre: "Fuente automática tipo flor",
    precio: 7500,
    imagen: "assets/img/Bebedero.jpg",
    alt: "Bebedero para gatos tipo fuente de agua",
    descripcion:
      "Fuente automática con diseño de flor, que mantiene el agua en movimiento para incentivar la hidratación de tu gato.",
  },
  {
    id: 6,
    nombre: "Rascador vertical",
    precio: 35000,
    imagen: "assets/img/Rascador.jpg",
    alt: "Rascador vertical para gatos",
    descripcion:
      "Ofrece a tu gato diversión y confort con el rascador PetWoow de 135 cm. Incluye hamaca, casita y juguetes. ¡Perfecto para su bienestar y entretenimiento!",
  },
];

// Cambia el precio a pesos chilenos
function formatearPrecio(precio) {
  return `$ ${precio.toLocaleString("es-CL")}`;
}

// Obtiene el carrito desde localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guarda el carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Busca un producto por su id dentro de la lista
function buscarProducto(id) {
  return productos.find((producto) => producto.id === id);
}

// Actualiza el contador visible en el navbar
function actualizarContador() {
  const contador = document.querySelector("#contador");
  if (!contador) return;

  const carrito = obtenerCarrito();
  contador.textContent = carrito.length;
}

// Agrega un producto al carrito, guarda cambios y actualiza el contador
function agregarAlCarrito(id) {
  const carrito = obtenerCarrito();
  carrito.push(id);
  guardarCarrito(carrito);
  actualizarContador();
}

// Elimina un producto del carrito según su posición
function eliminarDelCarrito(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  actualizarContador();
  mostrarCarrito();
}

// Vacía completamente el carrito
function vaciarCarrito() {
  guardarCarrito([]);
  actualizarContador();
  mostrarCarrito();
}

// Muestra el detalle del producto seleccionado
function mostrarDetalle() {
  const contenedor = document.querySelector("#product-detail");
  if (!contenedor) return;

  const parametros = new URLSearchParams(window.location.search);
  const id = Number(parametros.get("id"));
  const producto = buscarProducto(id);

  // Si el producto no existe, muestra error
  if (!producto) {
    contenedor.innerHTML = `
      <div class="col-12 text-center">
        <h2>Producto no encontrado</h2>
        <p class="text-secondary">El producto no existe o el enlace está incorrecto.</p>
        <a href="index.html" class="btn btn-primary mt-3">Volver al inicio</a>
      </div>
    `;
    return;
  }

  // Se genera el HTML del producto seleccionado
  contenedor.innerHTML = `
    <div class="col-12 col-lg-6">
      <img
        src="${producto.imagen}"
        alt="${producto.alt}"
        class="img-fluid rounded shadow-sm w-100"
      />
    </div>

    <div class="col-12 col-lg-6">
      <h1 class="mb-3">${producto.nombre}</h1>
      <p class="fs-3 fw-bold">${formatearPrecio(producto.precio)}</p>
      <p class="text-secondary">${producto.descripcion}</p>
      <button class="btn btn-primary" id="btn-agregar-detalle">
        Agregar al carro
      </button>
    </div>
  `;

  // Se selecciona el botón recién creado en el HTML
  const botonDetalle = document.querySelector("#btn-agregar-detalle");
  botonDetalle.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
}

// Cuando el usuario hace clic, el producto se agrega al carrito
function mostrarCarrito() {
  const contenedor = document.querySelector("#carrito-contenido");
  if (!contenedor) return;

  const carrito = obtenerCarrito();

  // Si el carrito está vacío, muestra un mensaje
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-secondary text-center">
        <p>
          Tu carrito está vacío.
        </p>
      </div>
      <div class="text-center">
        <a href="index.html" class="btn btn-primary">Ir a comprar</a>
      </div>
    `;
    return;
  }

  // Convierte la lista de IDs en la lista de productos del carrito
  const productosEnCarrito = carrito.map((id) => buscarProducto(id));

  // Calcula el total
  const total = productosEnCarrito.reduce(
    (acumulador, producto) => acumulador + producto.precio,
    0,
  );

  // Renderiza productos
  contenedor.innerHTML = `
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        ${productosEnCarrito
          .map(
            (producto, index) => `
              <div class="card mb-3">
                <div class="row g-0 align-items-center">
                  <div class="col-4 col-md-3">
                    <img
                      src="${producto.imagen}"
                      alt="${producto.alt}"
                      class="img-fluid rounded-start"
                    />
                  </div>
                  <div class="col-8 col-md-9">
                    <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text fw-bold mb-2">${formatearPrecio(
                        producto.precio,
                      )}</p>
                      <button
                        class="btn btn-sm btn-outline-danger btn-eliminar"
                        data-index="${index}"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>

      <div class="col-12 col-lg-4">
        <div class="card p-3 shadow-sm">
          <h4>Resumen</h4>
          <p class="mb-2">Productos: ${carrito.length}</p>
          <p class="fs-5 fw-bold">Total: ${formatearPrecio(total)}</p>
          <button class="btn btn-primary mb-2">Finalizar compra</button>
          <button class="btn btn-outline-secondary" id="btn-vaciar-carrito">
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  `;

  // Evento para eliminar productos
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const index = Number(boton.dataset.index);
      eliminarDelCarrito(index);
    });
  });

  // Busca en el HTML el id="btn-vaciar-carrito" y si se hace click ejecuta la función vaciarCarrito.
  const botonVaciar = document.querySelector("#btn-vaciar-carrito");
  botonVaciar.addEventListener("click", vaciarCarrito);
}

// Activa los botones del index  "Agregar al carro"
function activarBotonesIndex() {
  const botones = document.querySelectorAll(".btn-agregar");

  botones.forEach((boton) => {
    const id = Number(boton.dataset.id);

    boton.addEventListener("click", () => {
      agregarAlCarrito(id);
    });
  });
}

// Ejecuta las siguientes funciones cuando el HTML ya esta cargado
document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  activarBotonesIndex();
  mostrarDetalle();
  mostrarCarrito();
});

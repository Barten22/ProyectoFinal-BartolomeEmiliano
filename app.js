const stockProductos = [
    {
      id: 1,
      nombre: "Serjeant Siciliano",
      cantidad: 1,
      desc: "Infanteria - Unidad altamente eficiente contra otras unidades - Puede construir Donjons (Torres)",
      precio: 60,
      img: "img/products/unidad-1.jpg",
    },
    {
      id: 2,
      nombre: "Jinete",
      cantidad: 1,
      desc: "Caballeria - Unidad eficaz contra arqueros, infanteria y aldeanos - Buena para raideos rapidos",
      precio: 75,
      img: "img/products/unidad-2.jpg",
    },
    {
      id: 3,
      nombre: "Caballero",
      cantidad: 1,
      desc: "Caballeria pesada - Eficaz contra cualquier unidad, exepto piqueros, monjes y camellos",
      precio: 85.50,
      img: "img/products/unidad-3.jpg",
    },
    {
      id: 4,
      nombre: "Coustillier",
      cantidad: 1,
      desc: "Unidad unica de los Borgoñeces - Caballeria pesada con ataque de carga - altamente eficaz contra infanteria, caballeria y arqueros",
      precio: 110,
      img: "img/products/unidad-4.jpg",
    },
    {
      id: 5,
      nombre: "Konnik ",
      cantidad: 1,
      desc: "Unidad unica Bulgara - Caballeria que sirve de infanteria al desmontarse, eficaz contra infanteria, arqueros y raids",
      precio: 125,
      img: "img/products/unidad-5.jpg",
    },
    {
      id: 6,
      nombre: "Ballestero Genovese",
      cantidad: 1,
      desc: "Unidad unica Italiana - Arquero Ballestero anti caballeria, gran movilidad, debil contra lanceros",
      precio: 90,
      img: "img/products/unidad-6.webp",
    },
    {
      id: 7,
      nombre: "Guerrillero Imperial",
      cantidad: 1,
      desc: "Unidad unica Vietnamita - Arquero - Unidad barata eficaz contra arqueros - buena en grandes cantidades",
      precio: 60,
      img: "img/products/unidad-7.webp",
    },
    {
      id: 8,
      nombre: "Mangudai",
      cantidad: 1,
      desc: "Unidad unica Mongola - Arquero Montado - Unidad versatil anti infanteria y caballeria",
      precio: 120,
      img: "img/products/unidad-8.webp",
    },
    {
      id: 9,
      nombre: "Aldeanos",
      cantidad: 1,
      desc: "El pilar de toda sociedad - Unidad economica - Construye edificios",
      precio: 50,
      img: "img/products/unidad-9.webp",
    },
    {
      id: 10,
      nombre: "Campeon",
      cantidad: 1,
      desc: "Infanteria - Unidad fuerte en grandes cantidades - Eficaz contra edificios",
      precio: 70,
      img: "img/products/unidad-10.webp",
    },
    {
        id: 11,
        nombre: "Condotiero",
        cantidad: 1,
        desc: " Infanteria Italiana - Fuerte contra unidades de polvora",
        precio: 85,
        img: "img/products/unidad-11.webp",
      },
      {
        id: 12,
        nombre: "Wagon Hussite",
        cantidad: 1,
        desc: "Unidad de povlora Bohemia - Las unidades detras de los Wagon reciben menos daño",
        precio: 200,
        img: "img/products/unidad-12.webp",
      },
      




  ];
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
  
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });
  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "compra.html";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("Nada");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Tu carrito esta vacio!</p>
      `;
    } else {
      console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
  }
  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const cliente = document.querySelector('#persona').value
     const email = document.querySelector('#correo').value
     console.log(cliente)
  
     if(correo === '' || persona == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Completa el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
         
     })

   

    } else {
    const btn = document.getElementById('button');

    //document.getElementById('form')
     //.addEventListener('submit', function(event) {
       //event.preventDefault();
    

     btn.value = 'Enviando...';
  
     const serviceID = 'default_service';
     const templateID = 'template_qxwi0jn';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        alert('Correo enviado!');
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
       }, 3000)
  
  
     }, 3000)
   }
   localStorage.clear()
  
   }
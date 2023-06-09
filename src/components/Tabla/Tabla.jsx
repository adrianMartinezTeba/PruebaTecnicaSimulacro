import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/products/productsSlice";
import "./Tabla.scss";

const Tabla = () => {
    // Obtener los productos del estado global
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    // Estados para gestionar la paginación y el orden
    const [currentPage, setCurrentPage] = useState(1);
    //valores para que tome por defecto al ordenar pongo dos para que diferencie primero de la celda y luego entre un boton y otro,celda y tipo de orden para si es una u otra
    const [ordenActual, setOrdenActual] = useState({ celda: "Nombre", tipoOrden: "Asc" });
    // para tener los productos ordenados en funcion del orden actual elegido y va a ser un array vacio para empezar
    const [productosOrdenados, setProductosOrdenados] = useState([]);

    // Ordenar los productos cuando haya cambios en el estado de products o ordenActual
    useEffect(() => {
        // llamamos a la funcion para que al carggarse el componente nos traiga los productos
        dispatch(getAllProducts());
        // variable para manejar products
        const prodOrd = [...products];
        // .sort es un metodo que nos ordena comparando un valor con otro a,b y nos va devolviendo en el mismo array los elemntos ordenados segun le digamos como condicion
        if (ordenActual.celda === "Nombre") {
            // Para identificar en el estado en que celda
            if (ordenActual.tipoOrden === "Asc") {
                // y como la queremos
                prodOrd.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                prodOrd.sort((a, b) => b.title.localeCompare(a.title));
                // localcompare como que tiene de forma predeterminada ordenar por estandar lo hace segun idioma por orden alfabetico y tambien numerico
            }
        } else if (ordenActual.celda === "Precio") {
            if (ordenActual.tipoOrden === "Asc") {
                prodOrd.sort((a, b) => a.price - b.price);
            } else {
                prodOrd.sort((a, b) => b.price - a.price);
            }
        } else if (ordenActual.celda === "Categoría") {
            if (ordenActual.tipoOrden === "Asc") {
                prodOrd.sort((a, b) => a.category.localeCompare(b.category));
            } else {
                prodOrd.sort((a, b) => b.category.localeCompare(a.category));
            }
        }
        // actualizamos el estado de los productos del array vacio para tenr un array de los productos ordenados
        setProductosOrdenados(prodOrd);
    }, [products, ordenActual]);
    // Definimos esos dos parametros para que el estado se actualice si cambia el orden en el que queremos que se muestre
    // Función para manejar el cambio de celda de ordenación
    const manejoCambio = (celda, tipoOrden) => {
        setOrdenActual({ celda, tipoOrden });
    };

    // Número de productos a mostrar por página(de 5 en 5 queda más guay pq me hace la funcion de array.from 4 numeros por ser 20/5)
    const productsPerPage = 10;
    // Calcular el número total de páginas
    const totalPages = (productosOrdenados.length / productsPerPage);

    // Calcular los índices de los productos a mostrar en la página actual
    // el indice del ultimo producto a mostrar por pagina va a ser la pagina por el numero totalPages,pag 1 el ultimo sera el 10 1*10 y de la 2 el ultimo sera 2 *20
    const indexOfLastProduct = currentPage * productsPerPage;
    // y esto para tener el PromiseRejectionEvent,en la pagina 10-10 seria el primero y en la siguiente pagina tendria el valor 10 en el array es decir el 11 objeto
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Obtener los productos de la página actual productosOrdenados era products desestructurado y le decimos que coja la cantidada que hay entre las variables de antes para que nos muestre por pagina esos productos que luego vamos a mapear para el tbody y si pasa a la siguiente pag saca los otros
    let currentProducts = productosOrdenados.slice(indexOfFirstProduct, indexOfLastProduct);
    // Crear un array con los números de página
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    //Se le indica la longitud que va a tener el array primero y lo segundo es como una funcion .map que como no le pasamos ningun valor le decimos _ y le decimos que vamos a usar su indice y como el primero va a ser 0 le decimos mas uno en este caso el array va a ser de 2 pero asi hacemos que si la paginacion sea de 5 en 5 esto lo actualiza

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <span>Nombre</span>
                            {/* Aqui le damos la orden del scss y ue cuando haga click en el boton se ejecute la funcion que maneja el cambio de orden y actualiza el estado de la orden actual para que celda y el otro sean los que se haga click,entonces se le da click aqui cambia el orden actual y el estado se actualiza y se reordenan los productos  */}
                            <button disabled={ordenActual.tipoOrden === "Asc" && ordenActual.celda === 'Nombre'} onClick={() => manejoCambio("Nombre", "Asc")}>A-Z</button>
                            <button disabled={ordenActual.tipoOrden !== "Asc" && ordenActual.celda === 'Nombre'} onClick={() => manejoCambio("Nombre", "Desc")}>Z-A</button>
                        </th>
                        <th>
                            <span>Precio</span>
                            <button disabled={ordenActual.tipoOrden === "Asc" && ordenActual.celda === 'Precio'} onClick={() => manejoCambio("Precio", "Asc")}>Asc</button>
                            <button disabled={ordenActual.tipoOrden !== "Asc" && ordenActual.celda === 'Precio'} onClick={() => manejoCambio("Precio", "Desc")}>Desc</button>
                        </th>
                        <th>
                            <span>Categoría</span>
                            <button disabled={ordenActual.tipoOrden === "Asc" && ordenActual.celda === 'Categoría'} onClick={() => manejoCambio("Categoría", "Asc")}>A-Z</button>
                            <button disabled={ordenActual.tipoOrden !== "Asc" && ordenActual.celda === 'Categoría'} onClick={() => manejoCambio("Categoría", "Desc")}>Z-A</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {/* para ir a la pagina anterior actualizamos el estado actual menos 1 */}
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <div>
                    {/* le pasamos a el numero total de paginas un map para que nos haga boton por numero y que al hacer click se ejecute el cambio de estado de la pagina actual al numero de la pagina clickado*/}
                    {pageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            disabled={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Tabla;

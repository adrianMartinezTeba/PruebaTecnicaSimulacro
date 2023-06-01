import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/products/productsSlice";

const Tabla = () => {
  // Obtener los productos del estado global
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Estados para gestionar la paginación y el orden
  const [currentPage, setCurrentPage] = useState(1);
  const [ordenActual, setOrdenActual] = useState({ criterio: "Nombre", tipoOrden: "Asc" });
  const [ordenCompleto, setOrdenCompleto] = useState([]);

  // Número de productos a mostrar por página
  const productsPerPage = 10;

  useEffect(() => {
    // Obtener los productos al cargar el componente
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    // Ordenar los productos cuando haya cambios en el estado de "products" o "ordenActual"
    const productosOrdenados = [...products];

    if (ordenActual.criterio === "Nombre") {
      if (ordenActual.tipoOrden === "Asc") {
        productosOrdenados.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        productosOrdenados.sort((a, b) => b.title.localeCompare(a.title));
      }
    } else if (ordenActual.criterio === "Precio") {
      if (ordenActual.tipoOrden === "Asc") {
        productosOrdenados.sort((a, b) => a.price - b.price);
      } else {
        productosOrdenados.sort((a, b) => b.price - a.price);
      }
    } else if (ordenActual.criterio === "Categoría") {
      if (ordenActual.tipoOrden === "Asc") {
        productosOrdenados.sort((a, b) => a.category.localeCompare(b.category));
      } else {
        productosOrdenados.sort((a, b) => b.category.localeCompare(a.category));
      }
    }

    setOrdenCompleto(productosOrdenados);
  }, [products, ordenActual]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(ordenCompleto.length / productsPerPage);

  // Calcular los índices de los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Obtener los productos de la página actual
  let currentProducts = ordenCompleto.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Crear un array con los números de página
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Función para manejar el cambio de criterio de ordenación
  const manejoCambio = (criterio, tipoOrden) => {
    setOrdenActual({ criterio, tipoOrden });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Nombre
              <button onClick={() => manejoCambio("Nombre", "Asc")}>A-Z</button>
              <button onClick={() => manejoCambio("Nombre", "Desc")}>Z-A</button>
            </th>
            <th>
              Precio
              <button onClick={() => manejoCambio("Precio", "Asc")}>Asc</button>
              <button onClick={() => manejoCambio("Precio", "Desc")}>Desc</button>
            </th>
            <th>
              Categoría
              <button onClick={() => manejoCambio("Categoría", "Asc")}>A-Z</button>
              <button onClick={() => manejoCambio("Categoría", "Desc")}>Z-A</button>
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
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <div>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
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

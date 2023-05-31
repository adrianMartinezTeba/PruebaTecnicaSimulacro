import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/products/productsSlice";

const Tabla = () => {
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const onChange = (e) => {
        const selectedPage = parseInt(e.target.value);
        setCurrentPage(selectedPage);
    };

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    // Obtener el índice del primer y último producto de la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Obtener los productos de la página actual
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
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
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastProduct >= products.length}>
                    Siguiente
                </button>
                <label htmlFor="selectPage">Selecciona la página a mostrar:</label>
                <input type="text" id="selectPage" min="1" max={Math.ceil(products.length / productsPerPage)} onChange={onChange} />
            </div>
        </div>
    );
};
// Ahora, el input es de tipo number y se agregaron los atributos min y max para establecer los límites de selección. Además, se agregó la función onChange que obtiene el valor seleccionado del input y actualiza la página actual mediante setCurrentPage(selectedPage).

// Ten en cuenta que se utiliza Math.ceil(products.length / productsPerPage) para calcular el número máximo de páginas posibles y establecer el atributo max del input.
export default Tabla;


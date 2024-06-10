import PropTypes from 'prop-types';

// Defino las PropTypes para los componentes de productos
export const ProductPropTypes = {
  // Valido que el título del producto sea una cadena de texto
  title: PropTypes.string.isRequired,
  // Valido que el precio del producto sea un número
  price: PropTypes.number.isRequired,
  // Valido que la descripción del producto sea una cadena de texto
  description: PropTypes.string.isRequired,
  // Valido que el ID del producto sea una cadena de texto
  _id: PropTypes.string.isRequired
};

// Defino las PropTypes para el componente ProductForm
export const ProductFormPropTypes = {
  // Valido que la función addProduct sea requerida y sea una función
  addProduct: PropTypes.func.isRequired,
  // Valido que el producto sea un objeto que puede coincidir con ProductPropTypes o puede ser nulo
  product: PropTypes.shape(ProductPropTypes),
  // Valido que editMode sea un booleano
  editMode: PropTypes.bool
};

// Defino las PropTypes para el componente ProductList
export const ProductListPropTypes = {
  // Valido que products sea un array de objetos que coinciden con ProductPropTypes
  products: PropTypes.arrayOf(PropTypes.shape(ProductPropTypes)).isRequired,
  // Valido que la función removeProduct sea requerida y sea una función
  removeProduct: PropTypes.func.isRequired
};
